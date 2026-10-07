"use client";

// Cookie consent, extended from r2hu1/shadcn-cookie-consent: the same shadcn
// Card + Button banner, plus a preferences view with per-category switches,
// a shared consent store (so the footer link and the map can use it), and a
// delayed, gentle entrance.

import { Cookie, X } from "lucide-react";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

/* ---------- Consent store (a first-party cookie) ---------- */

export type ConsentChoice = {
  /** Third-party embeds that set their own cookies (the Google map). */
  embeds: boolean;
  decidedAt: string;
};

const COOKIE_NAME = "kb-cookie-consent";
const MAX_AGE_DAYS = 180;
// Give visitors a moment with the page before asking.
const PROMPT_DELAY_MS = 3500;
// Before any choice, the map is shown (the firm's preference).
const EMBEDS_DEFAULT = true;

const listeners = new Set<() => void>();
let cachedRaw: string | undefined;
let cachedChoice: ConsentChoice | null = null;

function readChoice(): ConsentChoice | null {
  const raw = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);
  if (raw === cachedRaw) return cachedChoice;
  cachedRaw = raw;
  try {
    const parsed = raw ? JSON.parse(decodeURIComponent(raw)) : null;
    cachedChoice =
      parsed && typeof parsed.embeds === "boolean"
        ? { embeds: parsed.embeds, decidedAt: String(parsed.decidedAt ?? "") }
        : null;
  } catch {
    cachedChoice = null;
  }
  return cachedChoice;
}

function writeChoice(embeds: boolean) {
  const value = encodeURIComponent(
    JSON.stringify({ embeds, decidedAt: new Date().toISOString() }),
  );
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${value}; Max-Age=${
    MAX_AGE_DAYS * 24 * 60 * 60
  }; Path=/; SameSite=Lax${secure}`;
  listeners.forEach((notify) => notify());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The stored choice, or null when the visitor hasn't decided (or on the server). */
function useConsentChoice() {
  return useSyncExternalStore(subscribe, readChoice, () => null);
}

/* ---------- Context: open the banner from anywhere ---------- */

type View = "main" | "preferences";

const ConsentUiContext = createContext<{
  openPreferences: () => void;
} | null>(null);

export function useEmbedConsent() {
  const choice = useConsentChoice();
  const ui = useContext(ConsentUiContext);
  return {
    allowed: choice ? choice.embeds : EMBEDS_DEFAULT,
    decided: choice !== null,
    allow: () => writeChoice(true),
    openPreferences: () => ui?.openPreferences(),
  };
}

export function CookieSettingsButton({
  className = "",
}: {
  className?: string;
}) {
  const ui = useContext(ConsentUiContext);
  return (
    <button
      type="button"
      onClick={() => ui?.openPreferences()}
      className={cn(
        "cursor-pointer border-none bg-transparent p-0 font-sans",
        className,
      )}
    >
      Cookie settings
    </button>
  );
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<{ view: View; at: number } | null>(
    null,
  );
  const value = useMemo(
    () => ({
      openPreferences: () =>
        setRequest({ view: "preferences", at: Date.now() }),
    }),
    [],
  );
  return (
    <ConsentUiContext.Provider value={value}>
      {children}
      <CookieConsent request={request} />
    </ConsentUiContext.Provider>
  );
}

/* ---------- The banner ---------- */

const ENTER_MS = 600;

function CookieConsent({
  request,
}: {
  request: { view: View; at: number } | null;
}) {
  const choice = useConsentChoice();
  const titleId = useId();
  const cardRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("main");
  const [cameFromSettings, setCameFromSettings] = useState(false);
  const [embedsDraft, setEmbedsDraft] = useState(EMBEDS_DEFAULT);

  const show = useCallback((nextView: View, fromSettings: boolean) => {
    setView(nextView);
    setCameFromSettings(fromSettings);
    setEmbedsDraft(readChoice()?.embeds ?? EMBEDS_DEFAULT);
    setMounted(true);
    // Let the off-screen state paint first so the entrance transitions.
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => setMounted(false), ENTER_MS);
  }, []);

  // First visit: wait a few seconds, then ask (only if still undecided).
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!readChoice()) show("main", false);
    }, PROMPT_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [show]);

  // "Cookie settings" anywhere on the site opens the preferences straight away.
  useEffect(() => {
    if (!request) return;
    const id = window.setTimeout(() => {
      show(request.view, true);
      window.setTimeout(() => cardRef.current?.focus(), 50);
    }, 0);
    return () => window.clearTimeout(id);
  }, [request, show]);

  const decide = (embeds: boolean) => {
    writeChoice(embeds);
    close();
  };

  if (!mounted) return null;

  const dismissible = cameFromSettings || choice !== null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[60] sm:right-auto sm:bottom-4 sm:left-4 sm:w-full sm:max-w-[440px]",
        "motion-safe:transition-[opacity,translate] motion-safe:duration-[600ms] motion-safe:ease-[cubic-bezier(0.22,0.61,0.24,1)]",
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <Card
        ref={cardRef}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="m-3 gap-4 py-5 shadow-[0_24px_60px_-28px_rgb(18_26_61/0.55)] outline-none sm:m-0"
        onKeyDown={(event) => {
          if (event.key === "Escape" && dismissible) close();
        }}
      >
        <CardHeader className="flex-row items-start justify-between gap-4 px-5">
          <CardTitle id={titleId}>
            {view === "main" ? "Your privacy" : "Cookie preferences"}
          </CardTitle>
          {dismissible ? (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close cookie settings"
              className="-mt-1.5 -mr-2 size-9"
              onClick={close}
            >
              <X className="size-4" />
            </Button>
          ) : (
            <Cookie
              aria-hidden="true"
              className="mt-1 size-5 text-muted-foreground"
              strokeWidth={1.5}
            />
          )}
        </CardHeader>

        {view === "main" ? (
          <>
            <CardContent className="flex flex-col gap-2 px-5">
              <CardDescription>
                We only use cookies that keep this site working. Our contact
                page also shows a Google map, which sets Google’s own cookies.
                You can change your choice at any time under Cookie settings.
              </CardDescription>
              <Link
                href="/privacy#cookies"
                className="w-fit text-[13px] text-primary underline underline-offset-4 hover:text-primary-hover"
              >
                Learn more in our privacy policy
              </Link>
            </CardContent>
            <CardFooter className="flex-col gap-2.5 px-5 pt-1">
              {/* Decline and Accept match exactly: refusing is as easy and as
                  prominent as agreeing. */}
              <div className="flex w-full gap-2.5">
                <Button className="flex-1" onClick={() => decide(false)}>
                  Decline
                </Button>
                <Button className="flex-1" onClick={() => decide(true)}>
                  Accept
                </Button>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setView("preferences")}
              >
                Preferences
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardContent className="flex flex-col px-5">
              <CardDescription className="mb-3">
                Essential cookies keep this site working and are always on. You
                decide on everything else.
              </CardDescription>
              <PreferenceRow
                title="Essential"
                description="Remembers your cookie choice and keeps the site secure. No tracking."
                control={
                  <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium whitespace-nowrap text-secondary-foreground">
                    Always on
                  </span>
                }
              />
              <PreferenceRow
                title="Maps & embedded content"
                description="Shows the Google map on our contact page. Google may set its own cookies when the map is shown."
                control={
                  <Switch
                    checked={embedsDraft}
                    onCheckedChange={setEmbedsDraft}
                    aria-label="Maps & embedded content"
                  />
                }
              />
              {choice?.decidedAt ? (
                <p className="m-0 mt-3 text-xs text-muted-foreground">
                  Last updated{" "}
                  {new Date(choice.decidedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              ) : null}
            </CardContent>
            <CardFooter className="gap-2.5 px-5 pt-1">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => (cameFromSettings ? close() : setView("main"))}
              >
                {cameFromSettings ? "Cancel" : "Back"}
              </Button>
              <Button className="flex-1" onClick={() => decide(embedsDraft)}>
                Save preferences
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}

function PreferenceRow({
  title,
  description,
  control,
}: {
  title: string;
  description: string;
  control: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-border py-3.5">
      <div className="flex flex-col gap-0.5">
        <p className="m-0 text-[15px] font-medium text-primary">{title}</p>
        <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="pt-0.5">{control}</div>
    </div>
  );
}
