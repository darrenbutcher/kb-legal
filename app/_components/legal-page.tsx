import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "../_lib/site";
import { TextLinkArrow, Eyebrow, container } from "./ui";

export type LegalSection = { id: string; title: string; body: ReactNode };

const updated = new Date(`${site.legalUpdated}T12:00:00Z`);

// Shared layout for the disclaimer and privacy policy: page header with the
// revision date, a sticky table of contents on wide screens, and a single
// readable text column.
export function LegalPage({
  title,
  intro,
  sections,
  related,
}: {
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
  related: { href: string; label: string };
}) {
  return (
    <>
      <section className="border-b border-line bg-ivory">
        <div className={`${container} pt-14 pb-16 md:pt-16 md:pb-20`}>
          <div className="hero-fade mb-7">
            <Eyebrow>LEGAL</Eyebrow>
          </div>
          <h1 className="hero-fade m-0 font-serif text-[clamp(42px,5.4vw,72px)] leading-[1.06] font-medium tracking-[-0.02em] text-navy">
            {title}
          </h1>
          <p className="hero-fade m-0 mt-5 font-mono text-[13px] tracking-[0.14em] text-muted">
            LAST UPDATED{" "}
            <time dateTime={site.legalUpdated}>
              {updated
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                })
                .toUpperCase()}
            </time>
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div
          className={`${container} grid gap-x-16 gap-y-10 py-16 md:grid-cols-[220px_minmax(0,1fr)] md:py-20`}
        >
          <nav aria-label="On this page" className="hidden md:block">
            <div className="sticky top-32">
              <p className="m-0 mb-4 font-mono text-xs tracking-[0.16em] text-muted">
                ON THIS PAGE
              </p>
              <ol className="m-0 flex list-none flex-col gap-1 border-l border-line p-0">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[15px] leading-snug text-body no-underline transition-colors duration-200 hover:border-sage hover:text-navy"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="max-w-[720px] text-body">
            <div className="text-[19px] leading-[1.7]">{intro}</div>
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-heading`}
                className="mt-12 border-t border-line pt-10"
              >
                <h2
                  id={`${s.id}-heading`}
                  className="m-0 mb-4 font-serif text-[clamp(24px,2.4vw,30px)] leading-[1.2] font-medium text-navy"
                >
                  {s.title}
                </h2>
                <div className="legal-body flex flex-col gap-4 leading-[1.7]">
                  {s.body}
                </div>
              </section>
            ))}

            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-xl border border-line bg-white p-7">
              <p className="m-0 text-base">
                Questions? Email{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
              <Link
                href={related.href}
                className="group inline-flex items-center gap-1.5 border-b border-current pb-0.5 text-base font-medium no-underline"
              >
                {related.label}
                <TextLinkArrow />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
