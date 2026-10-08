"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { assetPath, siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

/**
 * Header. Mobile-first (foundation §19).
 *
 * On small screens the wordmark text is hidden (logo only) and links use tighter padding,
 * so the bar always fits a 390px viewport. No JS required.
 */
export function Navbar() {
  const [hidden, setHidden] = useState(false);

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
        last = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-nav-hidden={hidden ? "true" : undefined}
      className="navbar-animated border-border bg-card/95 sticky top-0 z-50 border-b backdrop-blur-sm"
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

        <ul className="flex items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-muted-foreground hover:text-accent inline-flex min-h-11 items-center rounded-[var(--radius-control)] px-2.5 py-2 text-sm font-medium transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
