import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, LinkedInIcon } from "../_components/icons";
import {
  ClosingCta,
  Eyebrow,
  FramedCard,
  JsonLd,
  PageHero,
  buttonPrimary,
  buttonSecondary,
  container,
  delay,
  h2Class,
} from "../_components/ui";
import {
  breadcrumbJsonLd,
  founderId,
  organizationId,
  pageMetadata,
} from "../_lib/seo";
import { site } from "../_lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Kamla Besançon, Founder",
  description:
    "Kamla Besançon is a corporate lawyer admitted in the Dutch Caribbean, Amsterdam and New York, specializing in cross-border M&A, joint ventures, corporate structuring and governance. Ranked by Chambers & Partners since 2018.",
  path: "/who",
});

const credentials = [
  {
    label: "EDUCATION",
    items: [
      { title: "LLM, Leiden University", detail: "Leiden, Netherlands · 1997" },
      {
        title: "LLM, Columbia University",
        detail: "New York, United States · 2005",
      },
    ],
  },
  {
    label: "BAR ADMISSIONS",
    items: [
      { title: "Dutch Caribbean" },
      { title: "Amsterdam" },
      { title: "New York" },
    ],
  },
  {
    label: "RECOGNITION",
    items: [
      {
        title: "Chambers & Partners",
        detail:
          "Ranked since 2018. In 2023, the only Sint Maarten-based lawyer ranked.",
      },
    ],
  },
  {
    label: "BOARD EXPERIENCE",
    items: [
      {
        title: "Chair, Supervisory Board",
        detail:
          "Princess Juliana International Airport Operating Company · 2020–2023",
      },
    ],
  },
];

const timeline = [
  { year: "1997", text: "Begins practice at local law firms" },
  {
    year: "2005",
    text: "LLM, Columbia University; admitted in New York; joins Houthoff, Amsterdam",
  },
  {
    year: "2012",
    text: "Returns to the Dutch Caribbean; joins VanEps Kunneman VanDoorne",
  },
  { year: "2013", text: "Appointed corporate partner" },
  { year: "2018", text: "Founds KB Legal", current: true },
];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": founderId,
  name: "Kamla Besançon",
  jobTitle: "Founder, Corporate Lawyer",
  url: `${site.url}/who`,
  worksFor: { "@id": organizationId },
  image: `${site.url}/kamla_photo.jpg`,
  sameAs: [site.founderLinkedin],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Leiden University" },
    { "@type": "CollegeOrUniversity", name: "Columbia University" },
  ],
  knowsAbout: [
    "Mergers and acquisitions",
    "Joint ventures",
    "Corporate structuring",
    "Corporate governance",
    "Securities law",
  ],
};

export default function WhoPage() {
  return (
    <main className="bg-ivory">
      <JsonLd
        data={[personJsonLd, breadcrumbJsonLd([{ name: "Who", path: "/who" }])]}
      />

      <PageHero
        eyebrow={<Eyebrow>01 · WHO</Eyebrow>}
        title="Kamla Besançon"
        subtitle="FOUNDER · CORPORATE & SECURITIES · M&A"
        intro={
          <p className="m-0">
            Kamla is a highly specialized corporate lawyer with a broad
            corporate and securities practice. She has a specific focus on
            cross-border (public and private) mergers and acquisitions, and
            regularly advises clients on joint ventures, corporate structuring,
            corporate governance and board room and shareholder dynamics.
          </p>
        }
        aside={
          <figure
            className="hero-panel m-0 min-w-0 max-w-[440px] flex-[1_1_340px]"
          >
            <div className="h-[22px] rounded-t-xl border-[1.5px] border-b-0 border-navy" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-b-xl bg-sand-deep">
              <Image
                src="/kamla_photo.jpg"
                alt="Kamla Besançon, founder of KB Legal"
                fill
                priority
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 100vw"
                className="object-cover object-[55%_center]"
              />
            </div>
            <figcaption className="mt-3.5 text-sm text-muted">
              Kamla Besançon, founder of KB Legal
            </figcaption>
          </figure>
        }
      >
        <div className="flex flex-wrap gap-4">
          <Link href={site.bookPath} className={`${buttonPrimary} px-7 py-4`}>
            <CalendarIcon size={18} strokeWidth={1.75} />
            Book a consultation
          </Link>
          <a
            href={site.founderLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonSecondary} px-[27px] py-[15px]`}
          >
            <LinkedInIcon size={18} strokeWidth={1.6} />
            Kamla on LinkedIn
          </a>
        </div>
      </PageHero>

      {/* Two worlds */}
      <section className="border-y border-line bg-sand">
        <div
          className={`${container} flex flex-wrap gap-x-[72px] gap-y-8 py-24`}
        >
          <h2
            data-reveal
            className={`${h2Class} min-w-0 flex-[1_1_380px] text-[clamp(30px,3.4vw,46px)] leading-[1.14]`}
          >
            An Amsterdam transactional lawyer who knows the local market.
          </h2>
          <div
            data-reveal
            style={delay(120)}
            className="flex min-w-0 flex-[1_1_480px] flex-col gap-5 text-body"
          >
            <p className="m-0">
              Kamla brings the expertise, quality and experience of an Amsterdam
              transactional lawyer, combined with an in-depth understanding of
              the local markets and their dynamics. She delivers quality at the
              highest end of the market with a pragmatic approach.
            </p>
            <p className="m-0">
              With dual degrees, qualifications in three jurisdictions and broad
              international experience, she communicates with and advises
              international clients at the level they are accustomed to in their
              own jurisdictions. At the same time, she understands local
              dynamics, which allows her to guide local clients through
              international transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section aria-labelledby="credentials-heading" className="bg-ivory">
        <div className={`${container} pt-24 pb-10`}>
          <div data-reveal className="mb-8">
            <Eyebrow>
              <span id="credentials-heading">CREDENTIALS</span>
            </Eyebrow>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
            {credentials.map((group, i) => (
              <FramedCard
                key={group.label}
                reveal
                style={delay(i * 90)}
                bodyClassName="gap-2.5 px-6 pt-6 pb-7"
              >
                <h3 className="m-0 font-mono text-xs font-normal tracking-[0.14em] text-muted">
                  {group.label}
                </h3>
                {group.items.map((item, j) => (
                  <div key={item.title} className={j > 0 ? "mt-2" : ""}>
                    <p className="m-0 font-serif text-[22px] leading-[1.3] text-navy">
                      {item.title}
                    </p>
                    {"detail" in item && item.detail ? (
                      <p className="m-0 mt-1 text-[15px] text-body">
                        {item.detail}
                      </p>
                    ) : null}
                  </div>
                ))}
              </FramedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Career */}
      <section aria-labelledby="career-heading" className="bg-ivory">
        <div className={`${container} pt-14 pb-[104px]`}>
          <div className="mb-12 flex flex-wrap gap-x-[72px] gap-y-6">
            <div data-reveal className="min-w-0 flex-[1_1_380px]">
              <Eyebrow className="mb-4">CAREER</Eyebrow>
              <h2 id="career-heading" className={h2Class}>
                Amsterdam and back again.
              </h2>
            </div>
            <div
              data-reveal
              style={delay(120)}
              className="flex min-w-0 flex-[1_1_480px] flex-col gap-4 text-body"
            >
              <p className="m-0">
                Kamla grew up in the Dutch Caribbean and began her career in
                1997 as a junior associate at local law firms. After completing
                her LLM at Columbia University and passing the New York bar, she
                joined Houthoff in Amsterdam, where she focused exclusively on
                cross-border M&amp;A and capital markets transactions.
              </p>
              <p className="m-0">
                In 2012 she returned to the Dutch Caribbean and joined VanEps
                Kunneman VanDoorne, where she was appointed corporate partner in
                2013. In 2018 she founded KB Legal.
              </p>
            </div>
          </div>

          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-y-4 border-navy p-0 sm:gap-y-0 sm:border-t-[1.5px]">
            {timeline.map((step, i) => (
              <li
                key={step.year}
                data-reveal
                style={delay(i * 90)}
                className="flex flex-col gap-2 border-t-[1.5px] border-navy pt-6 pr-6 pb-2 sm:border-t-0"
              >
                <span
                  aria-hidden="true"
                  className={`-mt-[30px] size-2.5 rounded-full border-[1.5px] border-navy ${
                    step.current ? "bg-sage" : "bg-ivory"
                  }`}
                />
                <span className="font-mono text-[22px] text-navy">
                  {step.year}
                </span>
                <span className="text-[15px] text-body">{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ClosingCta
        title="Work directly with Kamla."
        body="Every KB Legal matter is handled by Kamla personally, from the first call to closing."
      />
    </main>
  );
}
