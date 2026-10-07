"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarIcon } from "./icons";

const navLinks = [
  { href: "#who", label: "WHO" },
  { href: "#what", label: "WHAT" },
  { href: "#why", label: "WHY" },
  { href: "#where", label: "WHERE" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-line bg-ivory/80 backdrop-blur-md"
          : "border-transparent bg-ivory"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-3">
        <Link href="/" aria-label="KB Legal home" className="flex items-center">
          <Image
            src="/kb-legal-logo-color.svg"
            alt="KB Legal"
            width={80}
            height={80}
            priority
            unoptimized
            className="block size-20"
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
            className="inline-flex items-center gap-2.5 rounded-md bg-navy px-[22px] py-3 text-[15px] font-medium text-white no-underline hover:text-white"
          >
            <CalendarIcon size={17} strokeWidth={1.75} />
            Book a consultation
          </a>
        </nav>
      </div>
    </header>
  );
}
