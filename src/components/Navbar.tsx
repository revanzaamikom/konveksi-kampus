"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
 * Industrial bar: logo + wordmark, nav links with an active indicator (accent
 * underline), and a WhatsApp CTA on desktop (mobile uses the sticky bar so the
 * two never double up). Hides on scroll-down, returns on scroll-up. On small
 * screens the wordmark text is hidden (logo only) so the bar always fits 390px.
 */
export function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      data-nav-hidden={hidden ? "true" : undefined}
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
          {/* Wordmark in the display face (reference uses a display-face brand). */}
          <span className="text-foreground font-heading hidden truncate text-xl tracking-wide uppercase min-[420px]:inline">
            {siteConfig.displayName}
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
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
                    {/* Active indicator: the one accent moment — a short accent
                        underline under the current page. */}
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

          {/* Desktop WhatsApp CTA — mobile relies on the sticky bar instead, so
              the two never appear together (no duplicate CTA intent). */}
          <a
            href={whatsappLink(navMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wipe bg-primary text-primary-foreground ml-1 hidden min-h-10 items-center rounded-[var(--radius-control)] px-5 text-sm font-semibold sm:inline-flex"
          >
            Konsultasi
          </a>
        </div>
      </nav>
    </header>
  );
}
