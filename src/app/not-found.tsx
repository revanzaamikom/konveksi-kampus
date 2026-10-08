import Link from "next/link";
import { Section } from "@/components/Section";
import { whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: false },
};

/**
 * Branded 404. Keeps the visitor on-site with two clear exits (catalog + WhatsApp)
 * instead of dropping them on Next's default page (STANDARD §52: "404 exists",
 * §35: no dead-end page).
 */
export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <Section className="py-20 sm:py-28">
        <p className="font-heading text-primary-text text-sm tracking-[0.2em] uppercase">404</p>
        <h1 className="text-display-sm text-foreground mt-3">Halaman tidak ditemukan</h1>
        <p className="text-muted-foreground mt-5 max-w-xl">
          Alamat yang Anda buka tidak tersedia atau sudah dipindahkan. Anda bisa kembali ke katalog,
          atau langsung konsultasikan kebutuhan Anda.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={whatsappLink(
              "Halo KonveksiKampus, saya ingin konsultasi pembuatan apparel custom.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wipe bg-primary text-primary-foreground inline-flex min-h-12 items-center justify-center rounded-[var(--radius-control)] px-6 text-sm font-semibold transition-colors duration-150"
          >
            Konsultasi via WhatsApp
          </a>
          <Link
            href="/katalog"
            className="border-border bg-card text-foreground hover:border-accent/60 hover:text-accent inline-flex min-h-12 items-center justify-center rounded-[var(--radius-control)] border px-6 text-sm font-semibold transition-colors duration-150"
          >
            Lihat Katalog
          </Link>
        </div>
      </Section>
    </main>
  );
}
