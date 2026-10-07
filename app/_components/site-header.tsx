import Image from "next/image";
import Link from "next/link";
import { CalendarIcon } from "./icons";

const navLinks = [
  { href: "#who", label: "WHO" },
  { href: "#what", label: "WHAT" },
  { href: "#why", label: "WHY" },
  { href: "#where", label: "WHERE" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-ivory">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-3.5">
        <Link href="/" aria-label="KB Legal home" className="flex items-center">
          <Image
            src="/kb-legal-logo-color.svg"
            alt="KB Legal"
            width={76}
            height={76}
            priority
            unoptimized
            className="block size-[76px]"
          />
        </Link>
        <nav
          aria-label="Main"
          className="flex flex-wrap items-center gap-x-9 gap-y-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-3 font-mono text-sm tracking-[0.16em] text-ink no-underline"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            className="inline-flex items-center gap-2.5 rounded-[2px] bg-navy px-[22px] py-3 text-[15px] font-medium text-white no-underline hover:text-white"
          >
            <CalendarIcon size={17} />
            Book a consultation
          </a>
        </nav>
      </div>
    </header>
  );
}
