"use client";

import { Toaster } from "sonner";
import { CircleAlertIcon, CircleCheckIcon, InfoIcon } from "./icons";

// Sonner, dressed in the site's palette: ivory card, navy serif title,
// sage accent for success.
export function SiteToaster() {
  return (
    <Toaster
      position="bottom-right"
      offset={24}
      mobileOffset={16}
      duration={5000}
      icons={{
        success: (
          <CircleCheckIcon size={20} strokeWidth={1.75} className="text-sage" />
        ),
        error: (
          <CircleAlertIcon
            size={20}
            strokeWidth={1.75}
            className="text-[#b4533c]"
          />
        ),
        info: <InfoIcon size={20} strokeWidth={1.75} className="text-navy" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-[var(--width)] items-start gap-3 rounded-xl border border-line bg-ivory p-4 pr-5 font-sans text-ink shadow-[0_18px_40px_-20px_rgb(18_26_61/0.45)]",
          icon: "mt-0.5 shrink-0",
          content: "flex flex-col gap-1",
          title: "font-serif text-[18px] leading-snug font-medium text-navy",
          description: "text-[14px] leading-[1.55] text-body",
        },
      }}
    />
  );
}
