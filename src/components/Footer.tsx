import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-border bg-surface border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-primary text-lg font-bold tracking-tight">{siteConfig.name}</p>
          <p className="text-muted mt-3 max-w-xs text-sm">{siteConfig.description}</p>
        </div>

        <div>
          <p className="text-sm font-semibold">Navigasi</p>
          <ul className="text-muted mt-3 space-y-2 text-sm">
            <li>
              <Link href="/katalog" className="hover:text-foreground">
                Katalog
              </Link>
            </li>
            <li>
              <Link href="/tentang" className="hover:text-foreground">
                Tentang
              </Link>
            </li>
            <li>
              <Link href="/kontak" className="hover:text-foreground">
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Kontak</p>
          <ul className="text-muted mt-3 space-y-2 text-sm">
            <li>{siteConfig.address}</li>
            <li>{siteConfig.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="text-muted mx-auto w-full max-w-6xl px-6 py-4 text-sm">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
