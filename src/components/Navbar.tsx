import Link from "next/link";
import { assetPath, siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export function Navbar() {
  return (
    <header className="border-border bg-card/95 sticky top-0 z-50 border-b backdrop-blur-sm">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${siteConfig.displayName} — beranda`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath("/brand/logo-256.png")}
            alt={`Logo ${siteConfig.displayName}`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-[var(--radius-control)]"
          />
          <span className="text-foreground text-lg font-semibold tracking-tight">
            {siteConfig.displayName}
          </span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex min-h-11 items-center rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium transition-colors duration-150"
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
