import type { Metadata } from "next";
import Link from "next/link";
import {
  ClosingCta,
  JsonLd,
  Rule,
  container,
  delay,
  h2Class,
} from "../../_components/ui";
import {
  caribbeanMatters,
  internationalMatters,
  type Matter,
} from "../../_lib/experience";
import { breadcrumbJsonLd, pageMetadata } from "../../_lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Selected Experience",
  description:
    "Selected corporate matters from Kamla Besançon's practice: acquisitions, restructurings and investments in the Dutch Caribbean, and public offers, offerings and IPOs in Amsterdam, including Tele Atlas/TomTom and Arcelor/Mittal Steel.",
  path: "/what/experience",
});

export default function ExperiencePage() {
  return (
    <main className="bg-ivory">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "What", path: "/what" },
          { name: "Experience", path: "/what/experience" },
        ])}
      />

      <section className="bg-ivory">
        <div className={`${container} pt-14 pb-20 md:pt-16`}>
          <nav
            aria-label="Breadcrumb"
            className="hero-fade mb-7 flex items-center gap-3 font-mono text-[13px] tracking-[0.16em] text-muted"
          >
            <Rule />
            <ol className="m-0 flex list-none items-center gap-3 p-0">
              <li>
                <Link
                  href="/what"
                  className="py-2 text-muted no-underline hover:text-navy"
                >
                  WHAT
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-navy">
                EXPERIENCE
              </li>
            </ol>
          </nav>
          <div className="flex flex-wrap items-end gap-x-[72px] gap-y-8">
            <h1
              className="hero-fade m-0 flex-[1_1_420px] font-serif text-[clamp(44px,5.6vw,78px)] leading-[1.04] font-medium tracking-[-0.02em] text-navy"
              style={delay(120)}
            >
              Selected experience
            </h1>
            <p
              className="hero-fade m-0 max-w-[560px] flex-[1_1_420px] text-lg leading-[1.7] text-body"
              style={delay(260)}
            >
              A selection of matters from Kamla&apos;s practice in the Dutch
              Caribbean and Amsterdam, including matters handled before KB Legal
              was founded.
            </p>
          </div>
        </div>
      </section>

      <MatterList
        id="dutch-caribbean"
        title="Dutch Caribbean"
        matters={caribbeanMatters}
        className="border-y border-line bg-sand"
        divider="border-line-strong"
      />
      <MatterList
        id="international"
        title="International · Amsterdam"
        matters={internationalMatters}
        className="bg-ivory pb-4"
        divider="border-line"
      />

      <ClosingCta title="Planning a transaction?" />
    </main>
  );
}

function MatterList({
  id,
  title,
  matters,
  className,
  divider,
}: {
  id: string;
  title: string;
  matters: Matter[];
  className: string;
  divider: string;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className={className}>
      <div className={`${container} py-[88px]`}>
        <div
          data-reveal
          className="mb-8 flex flex-wrap items-baseline justify-between gap-3"
        >
          <h2 id={`${id}-heading`} className={h2Class}>
            {title}
          </h2>
          <span className="font-mono text-[13px] tracking-[0.14em] text-muted">
            {matters.length} MATTERS
          </span>
        </div>
        <ol className="m-0 list-none border-t-[1.5px] border-navy p-0">
          {matters.map((m, i) => (
            <li
              key={m.text}
              data-reveal
              className={`flex flex-wrap items-baseline gap-x-7 gap-y-2 border-b py-6 ${divider}`}
            >
              <span className="w-8 shrink-0 font-mono text-[13px] text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-[999_1_420px] text-[17px] text-ink">
                {m.text}
              </span>
              <span className="flex flex-[0_0_220px] flex-col gap-0.5 md:items-end md:text-right">
                {m.value ? (
                  <span className="font-mono text-lg text-navy">{m.value}</span>
                ) : null}
                <span
                  className={`font-mono text-xs tracking-[0.12em] ${
                    m.value ? "text-muted" : "text-navy"
                  }`}
                >
                  {m.tag}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
