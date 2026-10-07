import Image from "next/image";
import Link from "next/link";
import { site } from "../_lib/site";
import {
  CalendarIcon,
  ClockIcon,
  MailIcon,
  PersonIcon,
  PhoneIcon,
  PinIcon,
} from "./icons";

const eyebrow =
  "font-mono text-xs tracking-[0.16em] text-mist-dim";
const footerLink = "py-1 text-white no-underline hover:text-white";
const contactLink =
  "inline-flex items-center gap-3 py-[5px] text-white no-underline hover:text-white";
const sageIcon = "shrink-0 text-sage";

export function SiteFooter() {
  return (
    <footer className="kb-footer text-mist">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-14 px-6 pt-[72px] pb-12">
        <div className="flex flex-wrap items-start justify-between gap-x-16 gap-y-10 border-b border-white/12 pb-14">
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-5">
            <Link
              href="/"
              aria-label="KB Legal home"
              className="inline-flex w-24"
            >
              <Image
                src="/kb-legal-logo-white.svg"
                alt="KB Legal"
                width={104}
                height={104}
                unoptimized
                className="block size-[104px] max-w-none"
              />
            </Link>
            <span className="max-w-[340px] font-serif text-lg leading-normal italic text-white">
              Highly specialized corporate legal support in the Dutch
              Caribbean.
            </span>
          </div>

          <div className="flex min-w-0 max-w-[560px] flex-[1_1_460px] flex-col gap-2.5">
            <p className="m-0 font-mono text-xs tracking-[0.16em] text-sage">
              NEWSLETTER
            </p>
            <h3 className="m-0 font-serif text-[28px] leading-[1.2] font-medium text-white">
              Corporate Briefings
            </h3>
            <p className="m-0 mb-2.5 text-base">
              Occasional updates on corporate law and transactions in the Dutch
              Caribbean, written for boards, shareholders and their advisors.
            </p>
            {/* TODO: connect to a newsletter provider. */}
            <form className="flex flex-col gap-2">
              <label htmlFor="nl-email" className="text-sm text-white">
                Email address
              </label>
              <div className="flex flex-wrap gap-2.5">
                <input
                  id="nl-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@company.com"
                  className="h-[52px] min-w-0 flex-[1_1_220px] rounded-[2px] border border-white/32 bg-white/4 px-4 font-sans text-base text-white placeholder:text-white/50"
                />
                <button
                  type="submit"
                  className="h-[52px] cursor-pointer rounded-[2px] border-none bg-sand px-7 font-sans text-base font-medium text-navy-deep"
                >
                  Subscribe
                </button>
              </div>
              <span className="text-[13px] text-mist-dim">
                You can unsubscribe at any time.
              </span>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10">
          <nav aria-label="Footer" className="flex flex-col gap-1.5">
            <span className={`${eyebrow} mb-2`}>NAVIGATE</span>
            <a href="#who" className={footerLink}>
              WHO
            </a>
            <a href="#what" className={footerLink}>
              WHAT
            </a>
            <a href="#experience" className={footerLink}>
              Experience
            </a>
            <a href="#why" className={footerLink}>
              WHY
            </a>
            <a href="#where" className={footerLink}>
              WHERE
            </a>
          </nav>

          <div className="flex flex-col gap-3.5">
            <span className={eyebrow}>OFFICE</span>
            <address className="flex items-start gap-3 not-italic">
              <PinIcon size={20} strokeWidth={1.5} className={`${sageIcon} mt-[3px]`} />
              <div className="flex flex-col text-white">
                <span>{site.address.street}</span>
                <span>
                  {site.address.city}, {site.address.country}
                </span>
              </div>
            </address>
            <div className="flex items-start gap-3">
              <ClockIcon size={20} strokeWidth={1.5} className={`${sageIcon} mt-[3px]`} />
              <div className="flex flex-col">
                <span className="text-white">Monday – Friday</span>
                <span>9:00 am – 6:00 pm</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className={`${eyebrow} mb-2`}>CONTACT</span>
            <a href="#book" className={contactLink}>
              <CalendarIcon size={20} strokeWidth={1.5} className={sageIcon} />
              Book a consultation
            </a>
            <a href={site.phoneHref} className={contactLink}>
              <PhoneIcon size={20} strokeWidth={1.5} className={sageIcon} />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className={contactLink}>
              <MailIcon size={20} strokeWidth={1.5} className={sageIcon} />
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={contactLink}
            >
              <span
                aria-hidden="true"
                className="inline-flex size-5 items-center justify-center rounded-[3px] border-[1.5px] border-sage"
              >
                <PersonIcon size={12} strokeWidth={2.2} className={sageIcon} />
              </span>
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-white/12 pt-7 text-[13px] text-mist-dim">
          <span>
            The content of this website is for general information only and
            does not constitute legal advice.
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2026 KB Legal. All rights reserved.</span>
            <a href="#" className="text-mist hover:text-white">
              Disclaimer
            </a>
            <a href="#" className="text-mist hover:text-white">
              Privacy
            </a>
            <span>
              Design &amp; development by{" "}
              <a
                href="https://boltmode.co"
                target="_blank"
                rel="noopener"
                className="text-white hover:text-white"
              >
                Boltmode Labs
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
