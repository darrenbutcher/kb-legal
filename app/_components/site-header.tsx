"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "../_lib/site";
import { CalendarIcon } from "./icons";
import { KbLogo } from "./kb-logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`relative z-50 md:sticky md:top-0 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-line bg-ivory/80 backdrop-blur-md"
          : "border-transparent bg-ivory"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-3">
        <Link
          href="/"
          aria-label="KB Legal home"
          className="kb-logo-link flex items-center rounded-md"
        >
          <KbLogo className="block size-20" />
        </Link>
        <nav
          aria-label="Main"
          className="flex flex-wrap items-center gap-x-9 gap-y-2"
        >
          {nav.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 pt-3 pb-2.5 font-mono text-sm tracking-[0.16em] no-underline transition-colors duration-300 ${
                  active
                    ? "border-sage font-medium text-navy"
                    : "border-transparent text-ink hover:border-sage/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={site.bookPath}
            className="inline-flex items-center gap-2.5 rounded-md bg-navy px-[22px] py-3 text-[15px] font-medium text-white no-underline transition-colors duration-300 hover:bg-navy-deep hover:text-white"
          >
            <CalendarIcon size={17} strokeWidth={1.75} />
            Book a consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
