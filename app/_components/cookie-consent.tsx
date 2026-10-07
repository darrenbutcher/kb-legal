"use client";

import type { ReactNode } from "react";
import { CookieManager, useCookieConsent } from "react-cookie-manager";

// The only optional category: third-party embeds that set their own cookies
// (today, the Google map on /where). The site runs no analytics or advertising,
// so the library's built-in Analytics/Social/Advertising rows are hidden rather
// than offered as toggles for tracking that doesn't exist.
export const EMBEDS = "Embeds";

const OFF = { Analytics: false, Social: false, Advertising: false };

// Look and feel: the library's "light" theme re-skinned in globals.css
// (`.cookie-manager[data-cookie-theme="light"]`), which keeps its layout,
// animation and toggle mechanics intact.

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  return (
    <CookieManager
      cookieKey="kb-cookie-consent"
      // The site loads no trackers, and embeds are gated explicitly (see
      // ConsentMap). The library's blocker lists all of google.com under
      // Advertising, which would blank the map even after consent.
      disableAutomaticBlocking
      expirationDays={180}
      displayType="popup"
      theme="light"
      showManageButton
      privacyPolicyUrl="/privacy#cookies"
      cookieCategories={{ Analytics: false, Social: false, Advertising: false }}
      initialPreferences={{ ...OFF, [EMBEDS]: false }}
      categories={[
        {
          id: EMBEDS,
          title: "Maps & embedded content",
          description:
            "Loads the Google map on our contact page. Google may set its own cookies when the map is shown.",
          defaultConsent: false,
        },
      ]}
      translations={{
        title: "Your privacy",
        message:
          "We only use cookies that keep this site working. With your permission, we’ll also show a Google map on our contact page, which sets Google’s own cookies. You can change your choice at any time under Cookie settings.",
        buttonText: "Accept",
        declineButtonText: "Decline",
        manageButtonText: "Preferences",
        privacyPolicyText: "Privacy policy",
        manageTitle: "Cookie preferences",
        manageMessage:
          "Essential cookies keep this site working and are always on. Everything else stays off unless you switch it on.",
        manageEssentialTitle: "Essential",
        manageEssentialSubtitle:
          "Remembers your cookie choice and keeps the site secure. No tracking.",
        manageEssentialStatus: "",
        manageEssentialStatusButtonText: "Always on",
        manageCookiesStatus: "{{status}} on {{date}}",
        manageCookiesStatusConsented: "Allowed",
        manageCookiesStatusDeclined: "Declined",
        manageCancelButtonText: "Cancel",
        manageSaveButtonText: "Save preferences",
      }}
    >
      {children}
    </CookieManager>
  );
}

export function useEmbedConsent() {
  const { detailedConsent, updateDetailedConsent, openPreferencesModal } =
    useCookieConsent();
  const allowed = Boolean(detailedConsent?.[EMBEDS]?.consented);
  const allow = () => updateDetailedConsent({ ...OFF, [EMBEDS]: true });
  return { allowed, allow, openPreferencesModal };
}

export function CookieSettingsButton({
  className = "",
}: {
  className?: string;
}) {
  const { openPreferencesModal } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={openPreferencesModal}
      className={`cursor-pointer border-none bg-transparent p-0 font-sans ${className}`}
    >
      Cookie settings
    </button>
  );
}
