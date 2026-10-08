import Link from "next/link";
import { assetPath, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-border bg-card mt-20 border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetPath("/brand/logo-256.png")}
              alt={`Logo ${siteConfig.displayName}`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-[var(--radius-control)]"
            />
            <p className="text-foreground text-lg font-semibold tracking-tight">
              {siteConfig.displayName}
            </p>
          </div>
          <p className="text-muted-foreground mt-3 max-w-xs text-sm">{siteConfig.description}</p>
        </div>

        <nav aria-label="Navigasi footer">
          <p className="text-sm font-semibold">Navigasi</p>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
            <li>
              <Link href="/katalog" className="hover:text-accent transition-colors duration-150">
                Katalog
              </Link>
            </li>
            <li>
              <Link href="/tentang" className="hover:text-accent transition-colors duration-150">
                Tentang
              </Link>
            </li>
            <li>
              <Link href="/kontak" className="hover:text-accent transition-colors duration-150">
                Kontak
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold">Kontak</p>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
            <li>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors duration-150"
              >
                Instagram @{siteConfig.instagram}
              </a>
            </li>
            {siteConfig.address ? <li>{siteConfig.address}</li> : null}
            {siteConfig.email ? (
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-accent transition-colors duration-150"
                >
                  {siteConfig.email}
                </a>
              </li>
            ) : null}
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
