"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { subscribeToNewsletter } from "../_actions/newsletter";
import { site } from "../_lib/site";

// After any submission the form stays locked for this long, even across a
// page reload, so the box can't be hammered.
const COOLDOWN_MS = 30_000;
const STORAGE_KEY = "kb-newsletter-last-submit";

function readLastSubmit() {
  try {
    return Number(window.localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeLastSubmit(at: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(at));
  } catch {
    // Storage unavailable (private mode); the in-memory lock still applies.
  }
}

export function NewsletterForm() {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  // Fallback for when localStorage is unavailable.
  const lastSubmit = useRef(0);

  // Re-derive the remaining cooldown every second from the stored timestamp,
  // so it survives reloads and stays in step across tabs.
  useEffect(() => {
    const tick = () => {
      const until =
        Math.max(readLastSubmit(), lastSubmit.current) + COOLDOWN_MS;
      setSecondsLeft(Math.max(0, Math.ceil((until - Date.now()) / 1000)));
    };
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const locked = secondsLeft > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || locked) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("source", pathname);

    setPending(true);
    const startedAt = Date.now();
    try {
      const result = await subscribeToNewsletter(data);
      if (result.ok) {
        form.reset();
        if (result.status === "already-subscribed") {
          toast("You’re already on the list", {
            description: "This address already receives Corporate Briefings.",
          });
        } else {
          toast.success("You’re subscribed", {
            description:
              "Thank you. Corporate Briefings will arrive in your inbox.",
          });
        }
      } else if (result.error === "invalid") {
        toast.error("Please check your email address", {
          description: "That doesn’t look like a valid email address.",
        });
      } else if (result.error === "rate-limited") {
        toast.error("Too many attempts", {
          description: "Please wait a few minutes before trying again.",
        });
      } else {
        toast.error("We couldn’t add you just now", {
          description: `Please try again later, or email ${site.email}.`,
        });
      }
    } catch {
      toast.error("We couldn’t add you just now", {
        description: `Please try again later, or email ${site.email}.`,
      });
    } finally {
      setPending(false);
      lastSubmit.current = startedAt;
      writeLastSubmit(startedAt);
      setSecondsLeft(
        Math.max(0, Math.ceil((startedAt + COOLDOWN_MS - Date.now()) / 1000)),
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="nl-email" className="text-sm text-white">
        Email address
      </label>
      {/* Honeypot for bots: hidden from people and assistive tech. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="nl-website">Website</label>
        <input
          id="nl-website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="flex flex-wrap gap-2.5">
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="name@company.com"
          className="h-[52px] min-w-0 flex-[1_1_220px] rounded-md border border-white/32 bg-white/4 px-4 font-sans text-base text-white placeholder:text-white/50 focus:border-sage focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending || locked}
          aria-disabled={pending || locked}
          className="h-[52px] min-w-[132px] cursor-pointer rounded-md border-none bg-sand px-7 font-sans text-base font-medium text-navy-deep transition-colors duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-sand"
        >
          {pending
            ? "Subscribing…"
            : locked
              ? `Wait ${secondsLeft}s`
              : "Subscribe"}
        </button>
      </div>
      <span className="text-[13px] text-mist-dim">
        You can unsubscribe at any time.
      </span>
    </form>
  );
}
