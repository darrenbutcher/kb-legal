"use server";

import { headers } from "next/headers";

export type SubscribeResult =
  | { ok: true; status: "subscribed" | "already-subscribed" }
  | { ok: false; error: "invalid" | "rate-limited" | "unavailable" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort per-IP limit: at most MAX_ATTEMPTS sign-ups per WINDOW_MS.
// It lives in server memory, so it resets on deploy and is per instance;
// the client-side cooldown and the sheet's duplicate check back it up.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 3;
const attempts = new Map<string, number[]>();

function isRateLimited(key: string, now: number) {
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) {
    attempts.set(key, recent);
    return true;
  }
  recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > 5000) attempts.clear();
  return false;
}

// Adds an email to the Corporate Briefings list, a Google Sheet behind a
// Google Apps Script web app (see docs/newsletter-apps-script.gs).
export async function subscribeToNewsletter(
  formData: FormData,
): Promise<SubscribeResult> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("company_website") ?? "") !== "") {
    return { ok: true, status: "subscribed" };
  }

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "invalid" };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip, Date.now())) {
    return { ok: false, error: "rate-limited" };
  }

  const scriptUrl = process.env.NEWSLETTER_SCRIPT_URL;
  if (!scriptUrl) {
    console.error("NEWSLETTER_SCRIPT_URL is not set; sign-up not stored.");
    return { ok: false, error: "unavailable" };
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      // Apps Script reads the raw body; text/plain avoids a CORS preflight
      // if this is ever called from a browser.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        email,
        source: String(formData.get("source") ?? "").slice(0, 200),
        secret: process.env.NEWSLETTER_SCRIPT_SECRET ?? "",
      }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const result = (await response.json()) as {
      ok?: boolean;
      status?: string;
    };
    if (!result.ok)
      throw new Error(`Script responded: ${JSON.stringify(result)}`);
    return {
      ok: true,
      status:
        result.status === "already-subscribed"
          ? "already-subscribed"
          : "subscribed",
    };
  } catch (error) {
    console.error("Newsletter sign-up failed:", error);
    return { ok: false, error: "unavailable" };
  }
}
