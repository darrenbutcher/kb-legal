"use client";

import { Button } from "@/components/ui/button";
import { useEmbedConsent } from "../_components/cookie-consent";
import { PinIcon } from "../_components/icons";
import { site } from "../_lib/site";

// The Google map is shown by default. If the visitor has declined "Maps &
// embedded content", a placeholder in the site's style stands in instead,
// with a one-click way to show the map after all.
export function ConsentMap() {
  const { allowed, allow, openPreferences } = useEmbedConsent();

  if (allowed) {
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
          You’ve turned off maps and embedded content. The map is provided by
          Google, which sets its own cookies.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          <Button onClick={allow}>Show map</Button>
          <Button variant="outline" onClick={openPreferences}>
            Cookie settings
          </Button>
        </div>
      </div>
    </div>
  );
}
