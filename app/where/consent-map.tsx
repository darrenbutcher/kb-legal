"use client";

import { useSyncExternalStore } from "react";
import { useEmbedConsent } from "../_components/cookie-consent";
import { PinIcon } from "../_components/icons";
import { site } from "../_lib/site";

// The Google map sets Google's cookies, so it only loads once the visitor has
// allowed "Maps & embedded content" — from the banner, preferences, or the
// button here. Until then a placeholder in the site's style stands in.
export function ConsentMap() {
  const { allowed, allow, openPreferencesModal } = useEmbedConsent();
  // Consent lives in a cookie only the browser can read, so the server and
  // first client render both show the placeholder.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  if (mounted && allowed) {
    return (
      <iframe
        title="Map showing KB Legal at 28a Front Street, Philipsburg"
        src={site.maps.embed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 size-full border-0 [filter:grayscale(1)_sepia(0.18)_contrast(0.95)]"
      />
    );
  }

  return (
    <div className="kb-map-grid absolute inset-0 flex items-center justify-center px-6 pt-6 pb-20">
      <div className="flex max-w-[420px] flex-col items-center gap-4 rounded-xl border border-line bg-white px-6 py-7 text-center shadow-[0_18px_40px_-24px_rgb(18_26_61/0.45)]">
        <PinIcon size={26} strokeWidth={1.5} className="text-navy" />
        <div className="flex flex-col gap-1">
          <p className="m-0 font-medium text-navy">{site.name}</p>
          <p className="m-0 text-sm text-body">
            {site.address.street}, {site.address.city}
          </p>
        </div>
        <p className="m-0 text-[13.5px] leading-[1.55] text-muted">
          The map is provided by Google, which sets its own cookies. We only
          load it with your permission.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          <button
            type="button"
            onClick={allow}
            className="inline-flex h-11 cursor-pointer items-center justify-center rounded-md border-none bg-navy px-5 font-sans text-[15px] font-medium text-white transition-colors duration-300 hover:bg-navy-deep"
          >
            Load map
          </button>
          <button
            type="button"
            onClick={openPreferencesModal}
            className="inline-flex h-11 cursor-pointer items-center justify-center rounded-md border border-navy bg-transparent px-5 font-sans text-[15px] font-medium text-navy transition-colors duration-300 hover:bg-navy/5"
          >
            Cookie settings
          </button>
        </div>
      </div>
    </div>
  );
}

function noopSubscribe() {
  return () => {};
}
