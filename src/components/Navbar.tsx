"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { assetPath, siteConfig, whatsappLink } from "@/lib/site";

const navLinks = [
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

const navMessage = `Halo ${siteConfig.displayName}, saya ingin konsultasi pembuatan apparel custom.`;

/**
 * Header. Mobile-first (foundation §19).
 *
 * Desktop (>= md): logo + wordmark, inline nav links with an active indicator
 * (accent underline), and a WhatsApp CTA.
 * Mobile (< md): logo + a labelled hamburger that opens a dropdown panel holding
 * the same links and the WhatsApp CTA (so the bar never crams three links plus a
 * button into a narrow row, and the CTA never doubles with the sticky bar).
 *
 * Hides on scroll-down, returns on scroll-up.
 */
export function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setHidden(y > 200 && y > last);
        setScrolled(y > 8);
        last = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the route changes.
  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      const raf = requestAnimationFrame(() => setOpen(false));
      return () => cancelAnimationFrame(raf);
    }
  }, [pathname]);

  // While the mobile menu is open: lock scroll, close on Escape, close on
  // click outside the header. Keyboard users keep focus in the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      ref={headerRef}
      data-nav-hidden={hidden && !open ? "true" : undefined}
      className={`navbar-animated sticky top-0 z-50 border-b backdrop-blur-sm transition-colors duration-300 ${
        scrolled ? "border-border bg-background/90" : "border-border/40 bg-background/70"
      }`}
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-2 px-4 sm:px-6"
      >
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5"
          aria-label={`${siteConfig.displayName}, beranda`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath("/brand/logo-256.png")}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-[var(--radius-control)]"
          />
          <span className="text-foreground font-heading truncate text-xl tracking-wide uppercase">
            {siteConfig.displayName}
          </span>
        </Link>

        {/* Desktop: inline links + CTA */}
        <div className="hidden items-center gap-1 md:flex md:gap-2">
          <ul className="flex items-center gap-0.5 sm:gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex min-h-11 items-center rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                      active ? "text-foreground" : "text-foreground/70 hover:text-accent"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`bg-accent absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={whatsappLink(navMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wipe bg-primary text-primary-foreground ml-1 hidden min-h-10 items-center rounded-[var(--radius-control)] px-5 text-sm font-semibold sm:inline-flex"
          >
            Konsultasi
          </a>
        </div>

        {/* Mobile: labelled hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="text-foreground inline-flex min-h-11 items-center gap-2.5 md:hidden"
        >
          <span className="type-overline hidden min-[380px]:inline">Menu</span>
          <span aria-hidden="true" className="relative flex h-5 w-6 flex-col justify-between">
            <span
              className={`bg-foreground h-0.5 w-full origin-center rounded-full transition-transform duration-300 ${
                open ? "translate-y-[9px] rotate-45" : ""
              }`}
            />
            <span
              className={`bg-foreground h-0.5 w-full rounded-full transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`bg-foreground h-0.5 w-full origin-center rounded-full transition-transform duration-300 ${
                open ? "-translate-y-[9px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile dropdown panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-border bg-background border-t md:hidden"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="border-border/60 border-b last:border-b-0">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-14 items-center justify-between gap-4 text-lg font-medium ${
                      active ? "text-accent" : "text-foreground"
                    }`}
                  >
                    <span className="font-heading tracking-wide uppercase">{link.label}</span>
                    <span aria-hidden="true" className="text-accent text-base">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={whatsappLink(navMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wipe bg-primary text-primary-foreground mt-4 flex min-h-12 w-full items-center justify-center rounded-[var(--radius-control)] text-sm font-semibold"
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
