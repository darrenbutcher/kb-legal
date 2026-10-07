import type { Metadata } from "next";
import { ArrowRightIcon } from "../_components/icons";
import {
  ClosingCta,
  Eyebrow,
  FramedCard,
  JsonLd,
  PageHero,
  container,
  delay,
  h2Class,
} from "../_components/ui";
import { breadcrumbJsonLd, pageMetadata } from "../_lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Why a Boutique Corporate Law Firm",
  description:
    "Partner-only, no layers, lean by design: KB Legal provides the quality and responsiveness of a large top-tier firm with the attention of a boutique, at manageable rates.",
  path: "/why",
});

const pillars = [
  {
    title: "Partner only.",
    body: "Each client deals with a partner only, so that level of experience and expertise is dedicated to the client throughout the process.",
  },
  {
    title: "No layers.",
    body: "Because we do not work with associates, we do not need time to delegate, review, correct and send out. Advice is prompt, thorough and pragmatic.",
  },
  {
    title: "Lean by design.",
    body: "We have limited infrastructure, bureaucracy and overhead. That makes the model more efficient, and lets us give our clients more value for money.",
  },
];

const largeFirmSteps = [
  "Partner",
  "Delegate to associate",
  "Review",
  "Correct",
  "Send out",
];

export default function WhyPage() {
  return (
    <main className="bg-ivory">
      <JsonLd data={breadcrumbJsonLd([{ name: "Why", path: "/why" }])} />

      <PageHero
        eyebrow={<Eyebrow>WHY</Eyebrow>}
        title={
          <>
            The quality of a large firm.{" "}
            <em className="font-normal italic">The attention of a boutique.</em>
          </>
        }
        intro={
          <p className="m-0">
            There is extensive pressure on the legal industry to provide
            quality, pragmatic, innovative and cost-efficient legal advice.
            Where the name and prestige of a firm used to come first, the focus
            has shifted to value for money. KB Legal is proud to provide the
            quality and responsiveness of larger top-tier firms, at manageable
            rates.
          </p>
        }
      />

      {/* The model */}
      <section
        aria-labelledby="model-heading"
        className="border-y border-line bg-sand"
      >
        <div className={`${container} py-24`}>
          <div data-reveal className="mb-8">
            <Eyebrow>
              <span id="model-heading">THE MODEL</span>
            </Eyebrow>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {pillars.map((p, i) => (
              <FramedCard
                key={p.title}
                reveal
                style={delay(i * 90)}
                bodyClassName="gap-3.5 px-7 pt-7 pb-[34px]"
              >
                <span className="font-mono text-[13px] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="m-0 font-serif text-[30px] leading-[1.2] font-medium text-navy">
                  {p.title}
                </h3>
                <p className="m-0 text-base text-body">{p.body}</p>
              </FramedCard>
            ))}
          </div>
        </div>
      </section>

      {/* How advice reaches you */}
      <section aria-labelledby="flow-heading" className="bg-ivory">
        <div className={`${container} py-[104px]`}>
          <div data-reveal>
            <Eyebrow className="mb-4">HOW ADVICE REACHES YOU</Eyebrow>
            <h2 id="flow-heading" className={`${h2Class} mb-12`}>
              Fewer hands. Faster answers.
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            <FlowRow label="A TYPICAL LARGE FIRM" steps={largeFirmSteps} />
            <FlowRow label="KB LEGAL" steps={["Partner"]} highlight />
          </div>
        </div>
      </section>

      {/* Statement */}
      <section aria-label="Statement" className="border-t border-line bg-sand">
        <div data-reveal className={`${container} py-28 text-center`}>
          <span className="reveal-rule mb-8 inline-block h-0.5 w-10 bg-sage" />
          <p className="m-0 mx-auto max-w-[960px] font-serif text-[clamp(36px,4.6vw,64px)] leading-[1.12] tracking-[-0.015em] text-navy">
            Bigger may be good, but we believe{" "}
            <em className="italic">smarter is better.</em>
          </p>
        </div>
      </section>

      <ClosingCta title="See the difference for yourself." />
    </main>
  );
}

function FlowRow({
  label,
  steps,
  highlight = false,
}: {
  label: string;
  steps: string[];
  highlight?: boolean;
}) {
  return (
    <div
      data-reveal
      style={highlight ? delay(150) : undefined}
      className={`flex flex-wrap items-center gap-x-6 gap-y-4 rounded-xl bg-white p-7 ${
        highlight ? "border-[1.5px] border-navy" : "border border-line"
      }`}
    >
      <span
        className={`flex-[0_0_180px] font-mono text-xs tracking-[0.14em] ${
          highlight ? "font-medium text-navy" : "text-muted"
        }`}
      >
        {label}
      </span>
      <ol
        aria-label={`${label.toLowerCase()} process`}
        className="m-0 flex flex-[1_1_600px] list-none flex-wrap items-center gap-2.5 p-0"
      >
        {[...steps, "You"].map((step, i, all) => {
          const isYou = i === all.length - 1;
          return (
            <li key={step} className="flex items-center gap-2.5">
              <span
                className={`rounded-md px-4 py-2.5 text-[15px] ${
                  isYou
                    ? "bg-sand-deep text-ink"
                    : highlight
                      ? "bg-navy font-medium text-white"
                      : "border border-[#cfd2dd] text-body"
                }`}
              >
                {step}
              </span>
              {isYou ? null : (
                <ArrowRightIcon
                  size={16}
                  strokeWidth={1.5}
                  className={highlight ? "text-navy" : "text-[#8a8ea3]"}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
