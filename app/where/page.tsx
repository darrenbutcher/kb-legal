import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  ClockIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "../_components/icons";
import { Eyebrow, JsonLd, PageHero, container, delay } from "../_components/ui";
import { breadcrumbJsonLd, organizationId, pageMetadata } from "../_lib/seo";
import { site } from "../_lib/site";
import { ConsentMap } from "./consent-map";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Book a Consultation",
  description:
    "Contact KB Legal at 28a Front Street, Philipsburg, Sint Maarten. Book a consultation with Kamla Besançon, call +1 721 542-4171 or send a message about your corporate matter.",
  path: "/where",
});

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${site.url}/where`,
  name: "Contact KB Legal",
  about: { "@id": organizationId },
  mainEntity: {
    "@type": "LegalService",
    "@id": organizationId,
    name: site.name,
    email: site.email,
    telephone: "+1-721-542-4171",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: site.address.countryCode,
    },
    hasMap: site.maps.directions,
    openingHours: "Mo-Fr 09:00-18:00",
  },
};

const iconProps = {
  size: 22,
  strokeWidth: 1.5,
  className: "mt-0.5 shrink-0 text-navy",
} as const;

export default function WherePage() {
  return (
    <main className="bg-ivory">
      <JsonLd
        data={[
          contactPageJsonLd,
          breadcrumbJsonLd([{ name: "Where", path: "/where" }]),
        ]}
      />

      <PageHero
        eyebrow={<Eyebrow>04 · WHERE</Eyebrow>}
        title="Tell us about your matter."
        intro={
          <p className="m-0">
            Our office is on Front Street in Philipsburg, Sint Maarten. We
            advise clients across the Dutch Caribbean and work alongside
            international law firms and advisors around the world.
          </p>
        }
      />

      {/* Contact details + form */}
      <section aria-label="Contact" className="bg-ivory">
        <div
          className={`${container} flex flex-wrap items-start gap-x-16 gap-y-12 pb-24`}
        >
          <div
            data-reveal
            className="flex min-w-0 flex-[1_1_360px] flex-col gap-7"
          >
            <a
              id="book"
              href={site.bookingUrl}
              className="group lift flex flex-col gap-3.5 rounded-xl bg-navy p-7 text-white no-underline hover:text-white"
            >
              <span className="font-mono text-xs tracking-[0.16em] text-sage">
                PREFER TO TALK?
              </span>
              <span className="font-serif text-[26px] leading-[1.25]">
                Book a consultation directly in Kamla&apos;s calendar.
              </span>
              <span className="inline-flex items-center gap-2.5 text-base font-medium">
                <CalendarIcon size={18} strokeWidth={1.75} />
                Choose a time
                <ArrowRightIcon
                  size={16}
                  strokeWidth={1.75}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </a>

            <ul className="m-0 list-none border-t border-line p-0">
              <Detail icon={<PinIcon {...iconProps} />} label="OFFICE">
                <address className="flex flex-col not-italic">
                  <span>{site.address.street}</span>
                  <span>
                    {site.address.city}, {site.address.country}
                  </span>
                </address>
              </Detail>
              <Detail icon={<ClockIcon {...iconProps} />} label="HOURS">
                <span>Monday – Friday, 9:00 am – 6:00 pm</span>
              </Detail>
              <Detail icon={<PhoneIcon {...iconProps} />} label="PHONE">
                <a href={site.phoneHref} className="no-underline">
                  {site.phone}
                </a>
              </Detail>
              <Detail icon={<MailIcon {...iconProps} />} label="EMAIL">
                <a href={`mailto:${site.email}`} className="no-underline">
                  {site.email}
                </a>
              </Detail>
              <Detail icon={<LinkedInIcon {...iconProps} />} label="LINKEDIN">
                <span className="flex flex-wrap gap-x-5 gap-y-1">
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    KB Legal
                  </a>
                  <a
                    href={site.founderLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    Kamla Besançon
                  </a>
                </span>
              </Detail>
            </ul>
          </div>

          <div
            data-reveal
            style={delay(150)}
            className="flex min-w-0 flex-[999_1_520px] flex-col"
          >
            <div className="h-[18px] rounded-t-xl border-[1.5px] border-b-0 border-navy" />
            <div className="rounded-b-xl border border-t-0 border-line bg-white">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section aria-label="Map" className="bg-ivory">
        <div data-reveal className={`${container} pb-[104px]`}>
          <div className="h-[18px] rounded-t-xl border-[1.5px] border-b-0 border-navy" />
          <div className="relative h-[440px] overflow-hidden rounded-b-xl bg-sand-deep">
            <ConsentMap />
            <a
              href={site.maps.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-md border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-navy no-underline shadow-sm hover:text-navy"
            >
              Get directions
              <ArrowUpRightIcon size={15} strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4 border-b border-line py-5">
      {icon}
      <div className="flex flex-col">
        <span className="font-mono text-xs tracking-[0.14em] text-muted">
          {label}
        </span>
        {children}
      </div>
    </li>
  );
}
