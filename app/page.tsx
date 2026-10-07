import type { CSSProperties, ReactNode } from "react";
import { HeroHeading } from "./_components/hero-heading";
import { RevealOnScroll } from "./_components/reveal-on-scroll";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import {
  ArrowRightIcon,
  CalendarIcon,
  MailIcon,
  PhoneIcon,
} from "./_components/icons";
import { site } from "./_lib/site";

const credentials = [
  { title: "Chambers & Partners", detail: "Ranked since 2018" },
  {
    title: "Three bar admissions",
    detail: "Dutch Caribbean · Amsterdam · New York",
  },
  { title: "Over 20 years", detail: "In corporate law" },
  { title: "Leiden · Columbia", detail: "LLM, 1997 · LLM, 2005" },
];

const pillars: {
  id: string;
  index: string;
  label: string;
  heading: ReactNode;
  body: string;
}[] = [
  {
    id: "who",
    index: "01",
    label: "WHO",
    heading: "Big-firm training. Local understanding.",
    body: "KB Legal's founder, Kamla Besançon, is a corporate lawyer with a broad corporate and securities practice. She has a specific focus on mergers and acquisitions and regularly advises clients on joint ventures, corporate structuring, corporate governance and board room dynamics.",
  },
  {
    id: "what",
    index: "02",
    label: "WHAT",
    heading: "Corporate law, exclusively.",
    body: "At KB Legal we are not generalists. We focus exclusively on our expertise: corporate law. To safeguard the quality, focus, responsiveness and integrity KB Legal stands for, we are selective about the matters we undertake.",
  },
  {
    id: "why",
    index: "03",
    label: "WHY",
    heading: (
      <>
        Bigger may be good, but we believe{" "}
        <em className="font-normal italic">smarter is better.</em>
      </>
    ),
    body: "KB Legal provides the quality and experience of a large corporate transactional firm in a boutique setting. Because each client gets the attention of a highly specialized partner, advice is prompt, thorough, pragmatic and cost efficient.",
  },
];

const experience = [
  {
    value: "USD 4.5bn",
    summary: "Tele Atlas on the public offer made by TomTom",
    tag: "PUBLIC M&A · AMSTERDAM",
  },
  {
    value: "USD 33.8bn",
    summary:
      "Arcelor, as local Dutch counsel, on the public offer made by Mittal Steel",
    tag: "PUBLIC M&A · AMSTERDAM",
  },
  {
    value: "Acquisition",
    summary:
      "Execujet Aviation Group on its acquisition of TLC Aviation Corporation, St. Maarten",
    tag: "PRIVATE M&A · SINT MAARTEN",
  },
  {
    value: "Restructuring",
    summary:
      "GEBE on the division of its shares and the formation of utility companies in Saba and St. Eustatius",
    tag: "STRUCTURING · DUTCH CARIBBEAN",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/kb-legal-logo-color.svg`,
  image: `${site.url}/opengraph-image`,
  description: site.description,
  email: site.email,
  telephone: "+1-721-542-4171",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressCountry: site.address.countryCode,
  },
  areaServed: ["Sint Maarten", "Dutch Caribbean", "Caribbean Netherlands"],
  knowsAbout: [
    "Corporate law",
    "Mergers and acquisitions",
    "Joint ventures",
    "Corporate structuring",
    "Corporate governance",
    "Securities law",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  founder: {
    "@type": "Person",
    name: "Kamla Besançon",
    jobTitle: "Founder, Corporate Lawyer",
    alumniOf: ["Leiden University", "Columbia University"],
  },
};

const eyebrow =
  "m-0 flex items-center gap-3 font-mono text-[13px] tracking-[0.16em] text-muted";
const sectionHeading =
  "m-0 font-serif text-[clamp(30px,3.2vw,42px)] leading-[1.15] font-medium text-navy";
const textLink =
  "group inline-flex items-center gap-1.5 border-b border-current pt-2.5 pb-0.5 text-base font-medium no-underline";
const textLinkArrow = (
  <ArrowRightIcon
    size={16}
    strokeWidth={1.75}
    className="transition-transform group-hover:translate-x-0.5"
  />
);
const primaryButton =
  "inline-flex items-center gap-2.5 rounded-md bg-navy text-base font-medium text-white no-underline transition-colors duration-300 hover:bg-navy-deep hover:text-white";

function Rule({ className = "" }: { className?: string }) {
  return <span className={`inline-block h-0.5 w-7 bg-sage ${className}`} />;
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />

      <main className="w-full bg-ivory">
        {/* Hero */}
        <section id="top" className="bg-ivory">
          <div className="mx-auto flex max-w-[1240px] flex-wrap items-end gap-16 px-6 pt-8 pb-[88px] md:pt-10">
            <div className="min-w-0 flex-[999_1_560px]">
              <p className="hero-fade m-0 mb-5 flex items-center gap-3 font-mono text-[13px] tracking-[0.14em] text-muted uppercase">
                <Rule />
                Boutique corporate law firm · Sint Maarten, Dutch Caribbean
              </p>
              <HeroHeading className="m-0 font-serif text-[clamp(42px,5.6vw,78px)] leading-[1.04] font-medium tracking-[-0.02em] text-navy" />
              <p
                className="hero-fade mt-6 mb-0 max-w-[620px] text-[19px] leading-[1.6] text-body"
                style={{ "--delay": "750ms" } as CSSProperties}
              >
                Highly specialized corporate legal support, with partner
                experience dedicated to each client, at manageable rates.
              </p>
              <div
                className="hero-fade mt-8 flex flex-wrap gap-4"
                style={{ "--delay": "900ms" } as CSSProperties}
              >
                <a href="#book" className={`${primaryButton} px-7 py-4`}>
                  <CalendarIcon />
                  Book a consultation
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 rounded-md border border-navy bg-transparent px-[27px] py-[15px] text-base font-medium text-navy no-underline transition-colors duration-300 hover:bg-navy/5 hover:text-navy"
                >
                  <MailIcon />
                  Or send an email
                </a>
              </div>
            </div>

            {/* Credentials panel, framed like the logo */}
            <aside
              aria-label="Credentials"
              className="hero-panel min-w-0 flex-[1_1_340px]"
            >
              <div className="h-[22px] rounded-t-xl border-[1.5px] border-b-0 border-navy" />
              <div className="rounded-b-xl bg-navy px-8 pt-8 pb-9 text-white">
                <p className="m-0 mb-6 font-mono text-xs tracking-[0.16em] text-sage">
                  AT A GLANCE
                </p>
                <dl className="m-0 flex flex-col gap-[22px]">
                  {credentials.map((item, i) => (
                    <div
                      key={item.title}
                      className={`flex flex-col gap-1 ${
                        i < credentials.length - 1
                          ? "border-b border-white/14 pb-5"
                          : ""
                      }`}
                    >
                      <dt className="font-serif text-[26px] leading-[1.2]">
                        {item.title}
                      </dt>
                      <dd className="m-0 text-[15px] text-mist">
                        {item.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </section>

        {/* Who / What / Why */}
        <section
          aria-label="About KB Legal"
          className="border-y border-line bg-sand"
        >
          <div className="mx-auto max-w-[1240px] px-6 pt-6 pb-8">
            {pillars.map((pillar, i) => (
              <article
                key={pillar.id}
                id={pillar.id}
                data-reveal
                className={`flex flex-wrap gap-x-16 gap-y-6 py-16 ${
                  i < pillars.length - 1 ? "border-b border-line-strong" : ""
                }`}
              >
                <div className="flex flex-[1_1_220px] flex-col gap-2.5">
                  <span className="font-mono text-[13px] text-muted">
                    {pillar.index}
                  </span>
                  <span className="font-mono text-[15px] font-medium tracking-[0.18em] text-navy">
                    {pillar.label}
                  </span>
                  <Rule className="reveal-rule" />
                </div>
                <div className="min-w-0 max-w-[760px] flex-[999_1_560px]">
                  <h2 className={`${sectionHeading} mb-5 tracking-[-0.01em]`}>
                    {pillar.heading}
                  </h2>
                  <p className="m-0 mb-6 text-body">{pillar.body}</p>
                  <a href={`#${pillar.id}`} className={textLink}>
                    Read more
                    {textLinkArrow}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Selected experience */}
        <section
          id="experience"
          aria-labelledby="experience-heading"
          className="bg-ivory"
        >
          <div className="mx-auto max-w-[1240px] px-6 py-[104px]">
            <div
              data-reveal
              className="mb-12 flex flex-wrap items-end justify-between gap-6"
            >
              <div>
                <p className={`${eyebrow} mb-4`}>
                  <Rule className="reveal-rule" />
                  SELECTED EXPERIENCE
                </p>
                <h2 id="experience-heading" className={sectionHeading}>
                  From Saba to Euronext Amsterdam.
                </h2>
              </div>
              <a href="#what" className={textLink}>
                View all experience
                {textLinkArrow}
              </a>
            </div>

            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 p-0">
              {experience.map((item, i) => (
                <li
                  key={item.summary}
                  data-reveal
                  className="flex flex-col"
                  style={{ "--delay": `${i * 90}ms` } as CSSProperties}
                >
                  <div className="lift flex grow flex-col rounded-lg">
                    <div className="h-4 rounded-t-lg border-[1.5px] border-b-0 border-navy" />
                    <div className="flex grow flex-col gap-3.5 rounded-b-lg border border-t-0 border-line bg-white px-6 pt-6 pb-7">
                      <span className="font-mono text-[22px] text-navy">
                        {item.value}
                      </span>
                      <span className="text-base leading-normal text-body">
                        {item.summary}
                      </span>
                      <span className="mt-auto font-mono text-xs tracking-[0.12em] text-muted">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing CTA */}
        <section
          id="where"
          aria-labelledby="where-heading"
          className="border-t border-line-cta bg-sand-deep"
        >
          <div className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-x-16 gap-y-12 px-6 py-24">
            <div
              data-reveal
              className="min-w-0 max-w-[720px] flex-[999_1_520px]"
            >
              <p className={`${eyebrow} mb-4`}>
                <Rule className="reveal-rule" />
                WHERE
              </p>
              <h2
                id="where-heading"
                className="m-0 mb-5 font-serif text-[clamp(36px,4.2vw,56px)] leading-[1.08] font-medium tracking-[-0.01em] text-navy"
              >
                Tell us about your matter.
              </h2>
              <p className="m-0 text-lg text-body">
                We are selective about the work we take on, so that every client
                receives our full attention. If you are considering a
                transaction, a restructuring or a governance question in the
                Dutch Caribbean, we would be glad to hear from you.
              </p>
            </div>
            <div
              id="book"
              data-reveal
              className="flex flex-[1_1_300px] flex-col gap-3"
              style={{ "--delay": "150ms" } as CSSProperties}
            >
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Consultation request")}`}
                className={`${primaryButton} justify-center px-7 py-[18px]`}
              >
                <CalendarIcon />
                Book a consultation
              </a>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 py-3 text-[15px] text-navy no-underline"
                >
                  <MailIcon size={17} />
                  Email
                </a>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 py-3 text-[15px] text-navy no-underline"
                >
                  <PhoneIcon size={17} />
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <RevealOnScroll />
    </>
  );
}
