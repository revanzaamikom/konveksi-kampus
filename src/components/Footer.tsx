import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-border bg-card mt-20 border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="text-primary text-lg font-semibold tracking-tight">{siteConfig.name}</p>
          <p className="text-muted-foreground mt-3 max-w-xs text-sm">{siteConfig.description}</p>
        </div>

        <nav aria-label="Navigasi footer">
          <p className="text-sm font-semibold">Navigasi</p>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
            <li>
              <Link href="/katalog" className="hover:text-foreground transition-colors">
                Katalog
              </Link>
            </li>
            <li>
              <Link href="/tentang" className="hover:text-foreground transition-colors">
                Tentang
              </Link>
            </li>
            <li>
              <Link href="/kontak" className="hover:text-foreground transition-colors">
                Kontak
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold">Kontak</p>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
            <li>{siteConfig.address}</li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-foreground transition-colors"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="text-muted-foreground mx-auto w-full max-w-6xl px-4 py-5 text-sm sm:px-6">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
