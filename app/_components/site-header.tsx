"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { nav, site } from "../_lib/site";
import { CalendarIcon, MailIcon, PhoneIcon } from "./icons";
import { KbLogo } from "./kb-logo";

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [scrolled, setScrolled] = useState(false);
  const [swinging, setSwinging] = useState(false);
  const pointerOnLogo = useRef(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMenuLink = useRef<HTMLAnchorElement>(null);
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const menuOpen = menuOpenOn === pathname;

  const startSwing = () => {
    pointerOnLogo.current = true;
    setSwinging(true);
  };
  // Let the beam finish its current cycle and come to rest level.
  const releaseSwing = () => {
    pointerOnLogo.current = false;
  };

  const closeMenu = (returnFocus = false) => {
    setMenuOpenOn(null);
    if (returnFocus) menuButton.current?.focus();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open: Escape closes it, the page behind stays
  // put, and focus starts on the first link.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpenOn(null);
        menuButton.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) setMenuOpenOn(null);
    };
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    firstMenuLink.current?.focus();
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? `border-line ${menuOpen ? "bg-ivory" : "bg-ivory/80 backdrop-blur-md"}`
          : "border-transparent bg-ivory"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-x-8 px-6 py-3">
        <Link
          href="/"
          aria-label="KB Legal home"
          className="flex items-center rounded-md"
          onMouseEnter={startSwing}
          onMouseLeave={releaseSwing}
          onFocus={startSwing}
          onBlur={releaseSwing}
        >
          <KbLogo
            className="block size-14 lg:size-20"
            swinging={swinging}
            onSwingCycle={() => {
              if (!pointerOnLogo.current) setSwinging(false);
            }}
          />
        </Link>

        {/* Desktop */}
        <nav aria-label="Main" className="hidden items-center gap-x-9 lg:flex">
          {nav.map((link) => {
            const active = isActive(link.href);
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

        {/* Mobile menu button: two bars that cross into an X */}
        <button
          ref={menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => (menuOpen ? closeMenu() : setMenuOpenOn(pathname))}
          className="relative -mr-2 flex size-11 cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-navy transition-colors duration-300 hover:bg-navy/5 focus-visible:ring-[3px] focus-visible:ring-sage/60 focus-visible:outline-none lg:hidden"
        >
          <span
            aria-hidden="true"
            className={`absolute h-[1.5px] w-6 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.24,1)] ${
              menuOpen ? "rotate-45" : "-translate-y-[4px]"
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute h-[1.5px] w-6 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.24,1)] ${
              menuOpen ? "-rotate-45" : "translate-y-[4px]"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`absolute inset-x-0 top-full h-dvh lg:hidden ${
          menuOpen ? "" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => closeMenu()}
          className={`absolute inset-0 cursor-default border-none bg-navy-deep/30 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          id={menuId}
          aria-label="Main"
          inert={!menuOpen}
          className={`relative max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-line bg-ivory shadow-[0_24px_40px_-28px_rgb(18_26_61/0.5)] transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,0.61,0.24,1)] motion-reduce:transition-none ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-[1240px] px-6 pt-2 pb-8">
            <ul className="m-0 list-none p-0">
              {nav.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="border-b border-line">
                    <Link
                      ref={i === 0 ? firstMenuLink : undefined}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => closeMenu()}
                      className="flex items-center justify-between py-[18px] font-mono text-[15px] tracking-[0.16em] text-ink no-underline"
                    >
                      <span
                        className={`border-b-2 pb-1 ${
                          active
                            ? "border-sage font-medium text-navy"
                            : "border-transparent"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href={site.bookPath}
              onClick={() => closeMenu()}
              className="mt-7 flex h-[52px] items-center justify-center gap-2.5 rounded-md bg-navy text-base font-medium text-white no-underline transition-colors duration-300 hover:bg-navy-deep hover:text-white"
            >
              <CalendarIcon size={18} strokeWidth={1.75} />
              Book a consultation
            </Link>

            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-1">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 py-2 text-[15px] text-navy no-underline"
              >
                <PhoneIcon size={16} strokeWidth={1.75} />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 py-2 text-[15px] text-navy no-underline"
              >
                <MailIcon size={16} strokeWidth={1.75} />
                Email us
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
