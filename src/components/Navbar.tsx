import Link from "next/link";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export function Navbar() {
  return (
    <header className="border-border bg-card sticky top-0 z-50 border-b">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          href="/"
          className="text-primary text-lg font-semibold tracking-tight"
          aria-label={`${siteConfig.name} — beranda`}
        >
          {siteConfig.name}
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
