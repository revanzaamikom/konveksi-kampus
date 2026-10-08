import Link from "next/link";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export function Navbar() {
  return (
    <header className="border-border bg-background/90 sticky top-0 z-50 border-b backdrop-blur">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6"
      >
        <Link href="/" className="text-primary text-lg font-bold tracking-tight">
          {siteConfig.name}
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-muted hover:bg-surface hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
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
