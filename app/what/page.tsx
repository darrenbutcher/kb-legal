import type { Metadata } from "next";
import Link from "next/link";
import {
  ClosingCta,
  Eyebrow,
  FramedCard,
  JsonLd,
  PageHero,
  TextLinkArrow,
  container,
  delay,
  h2Class,
} from "../_components/ui";
import { matterCount } from "../_lib/experience";
import { breadcrumbJsonLd, organizationId, pageMetadata } from "../_lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Corporate Law Practice",
  description:
    "KB Legal focuses exclusively on corporate law in the Dutch Caribbean: mergers & acquisitions, joint ventures, corporate structuring, corporate governance, board room and shareholder dynamics, and securities & capital markets.",
  path: "/what",
});

const disciplines = [
  {
    title: "Mergers & Acquisitions",
    body: "Public and private transactions, local and cross-border, for buyers, sellers and investors.",
  },
  {
    title: "Joint Ventures",
    body: "Setting up the venture and the arrangements between its partners.",
  },
  {
    title: "Corporate Structuring",
    body: "Group structures, reorganizations and divisions of shares.",
  },
  {
    title: "Corporate Governance",
    body: "Advice to management boards, supervisory boards and shareholders on their roles and responsibilities.",
  },
  {
    title: "Board Room & Shareholder Dynamics",
    body: "Guidance where the interests of boards and shareholders meet, and sometimes diverge.",
  },
  {
    title: "Securities & Capital Markets",
    body: "Public offers, offerings and listings.",
  },
];

const clients = [
  "Governments and government-owned companies",
  "Management boards and supervisory boards",
  "Shareholders",
  "International law firms, on local law aspects of corporate transactions",
];

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Corporate law services",
  provider: { "@id": organizationId },
  itemListElement: disciplines.map((d) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: d.title,
      description: d.body,
      provider: { "@id": organizationId },
      areaServed: "Dutch Caribbean",
    },
  })),
};

export default function WhatPage() {
  return (
    <main className="bg-ivory">
      <JsonLd
        data={[
          servicesJsonLd,
          breadcrumbJsonLd([{ name: "What", path: "/what" }]),
        ]}
      />

      <PageHero
        eyebrow={<Eyebrow>02 · WHAT</Eyebrow>}
        title={
          <>
            We do one thing, and we do it well –{" "}
            <em className="font-normal italic">corporate law.</em>
          </>
        }
        intro={
          <p className="m-0">
            At KB Legal we are not generalists. We help clients reach their
            goals by providing highly specialized corporate legal support in an
            accessible manner. To safeguard the quality, focus, responsiveness
            and integrity KB Legal stands for, we are selective about the
            matters we undertake.
          </p>
        }
      />

      {/* Practice */}
      <section
        aria-labelledby="practice-heading"
        className="border-y border-line bg-sand"
      >
        <div className={`${container} py-24`}>
          <div data-reveal className="mb-12">
            <Eyebrow className="mb-4">OUR PRACTICE</Eyebrow>
            <h2 id="practice-heading" className={h2Class}>
              Six disciplines. One focus.
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {disciplines.map((d, i) => (
              <FramedCard
                key={d.title}
                reveal
                style={delay((i % 3) * 90)}
                bodyClassName="gap-3 px-7 pt-[26px] pb-8"
              >
                <span className="font-mono text-[13px] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="m-0 font-serif text-[25px] leading-[1.25] font-medium text-navy">
                  {d.title}
                </h3>
                <p className="m-0 text-base text-body">{d.body}</p>
              </FramedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Who we advise */}
      <section aria-labelledby="clients-heading" className="bg-ivory">
        <div
          className={`${container} flex flex-wrap gap-x-[72px] gap-y-10 pt-[104px] pb-20`}
        >
          <div data-reveal className="min-w-0 flex-[1_1_360px]">
            <Eyebrow className="mb-4">WHO WE ADVISE</Eyebrow>
            <h2 id="clients-heading" className={`${h2Class} mb-5`}>
              From boardrooms to governments.
            </h2>
            <p className="m-0 text-body">
              KB Legal advises international and local corporates in various
              (regulated) industries on a wide range of corporate matters, as
              well as:
            </p>
          </div>
          <ul className="m-0 min-w-0 flex-[1_1_480px] list-none border-t border-line-strong p-0">
            {clients.map((client, i) => (
              <li
                key={client}
                data-reveal
                style={delay(i * 80)}
                className="flex items-baseline gap-5 border-b border-line-strong py-[22px]"
              >
                <span className="w-7 shrink-0 font-mono text-[13px] text-muted">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="font-serif text-[23px] leading-[1.3] text-navy">
                  {client}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experience preview */}
      <section aria-label="Selected experience" className="bg-ivory">
        <div data-reveal className={`${container} pb-[104px]`}>
          <Link
            href="/what/experience"
            className="group lift flex flex-wrap items-center justify-between gap-6 rounded-xl border border-t-[3px] border-line border-t-navy bg-white p-8 no-underline md:p-10"
          >
            <div className="flex max-w-[720px] flex-col gap-2.5">
              <span className="font-mono text-xs tracking-[0.16em] text-muted">
                SELECTED EXPERIENCE · {matterCount} MATTERS
              </span>
              <span className="font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.25] text-navy">
                From pension fund acquisitions in Saba to billion-dollar public
                offers in Amsterdam.
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 border-b border-current pb-0.5 text-base font-medium text-navy">
              View our experience
              <TextLinkArrow />
            </span>
          </Link>
        </div>
      </section>

      <ClosingCta title="Have a corporate matter in the Dutch Caribbean?" />
    </main>
  );
}
