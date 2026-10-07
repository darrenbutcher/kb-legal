import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { site } from "../_lib/site";
import { ArrowRightIcon, CalendarIcon, MailIcon } from "./icons";

export const container = "mx-auto max-w-[1240px] px-6";

export const buttonPrimary =
  "inline-flex items-center justify-center gap-2.5 rounded-md bg-navy text-base font-medium text-white no-underline transition-colors duration-300 hover:bg-navy-deep hover:text-white";
export const buttonSecondary =
  "inline-flex items-center justify-center gap-2.5 rounded-md border border-navy bg-transparent text-base font-medium text-navy no-underline transition-colors duration-300 hover:bg-navy/5 hover:text-navy";
export const textLink =
  "group inline-flex items-center gap-1.5 border-b border-current pt-2.5 pb-0.5 text-base font-medium no-underline";

export const h2Class =
  "m-0 font-serif text-[clamp(30px,3.2vw,42px)] leading-[1.15] font-medium tracking-[-0.01em] text-navy";

export function delay(ms: number) {
  return { "--delay": `${ms}ms` } as CSSProperties;
}

export function Rule({ className = "" }: { className?: string }) {
  return <span className={`inline-block h-0.5 w-7 bg-sage ${className}`} />;
}

export function Eyebrow({
  children,
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "div";
}) {
  return (
    <Tag
      className={`m-0 flex items-center gap-3 font-mono text-[13px] tracking-[0.16em] text-muted ${className}`}
    >
      <Rule className="reveal-rule" />
      {children}
    </Tag>
  );
}

export function TextLinkArrow() {
  return (
    <ArrowRightIcon
      size={16}
      strokeWidth={1.75}
      className="transition-transform group-hover:translate-x-0.5"
    />
  );
}

// The logo's open-topped frame, reused as a card motif: a navy outline cap
// over a white body.
export function FramedCard({
  children,
  className = "",
  bodyClassName = "",
  capClassName = "h-4",
  lift = true,
  style,
  reveal = false,
}: {
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  capClassName?: string;
  lift?: boolean;
  style?: CSSProperties;
  reveal?: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${className}`}
      style={style}
      data-reveal={reveal || undefined}
    >
      <div className={`flex grow flex-col rounded-lg ${lift ? "lift" : ""}`}>
        <div
          className={`${capClassName} rounded-t-lg border-[1.5px] border-b-0 border-navy`}
        />
        <div
          className={`flex grow flex-col rounded-b-lg border border-t-0 border-line bg-white ${bodyClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  intro,
  children,
  aside,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="bg-ivory">
      <div
        className={`${container} flex flex-wrap items-center gap-x-[72px] gap-y-14 pt-14 pb-20 md:pt-16 md:pb-24`}
      >
        <div className="min-w-0 flex-[999_1_540px]">
          <div className="hero-fade mb-7">{eyebrow}</div>
          <h1
            className="hero-fade m-0 max-w-[1000px] font-serif text-[clamp(42px,5.4vw,76px)] leading-[1.06] font-medium tracking-[-0.02em] text-navy"
            style={delay(120)}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className="hero-fade m-0 mt-5 font-mono text-sm tracking-[0.1em] text-body"
              style={delay(180)}
            >
              {subtitle}
            </p>
          ) : null}
          {intro ? (
            <div
              className="hero-fade mt-8 max-w-[680px] text-[19px] leading-[1.7] text-body"
              style={delay(260)}
            >
              {intro}
            </div>
          ) : null}
          {children ? (
            <div className="hero-fade mt-11" style={delay(380)}>
              {children}
            </div>
          ) : null}
        </div>
        {aside}
      </div>
    </section>
  );
}

export function ClosingCta({
  title,
  body,
}: {
  title: ReactNode;
  body?: ReactNode;
}) {
  return (
    <section
      aria-label="Book a consultation"
      className="border-t border-line-cta bg-sand-deep"
    >
      <div
        className={`${container} flex flex-wrap items-end justify-between gap-x-16 gap-y-10 py-[88px]`}
      >
        <div data-reveal className="min-w-0 max-w-[720px] flex-[999_1_520px]">
          <h2 className="m-0 font-serif text-[clamp(34px,4vw,52px)] leading-[1.08] font-medium tracking-[-0.01em] text-navy">
            {title}
          </h2>
          {body ? <p className="m-0 mt-4 text-lg text-body">{body}</p> : null}
        </div>
        <div
          data-reveal
          className="flex flex-[1_1_300px] flex-col gap-3"
          style={delay(150)}
        >
          <Link
            href={site.bookPath}
            className={`${buttonPrimary} px-7 py-[18px]`}
          >
            <CalendarIcon size={18} strokeWidth={1.75} />
            Book a consultation
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center justify-center gap-2 py-3 text-[15px] text-navy no-underline"
          >
            <MailIcon size={17} strokeWidth={1.75} />
            Or send an email
          </a>
        </div>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
