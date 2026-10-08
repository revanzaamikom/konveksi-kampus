import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi KonveksiKampus untuk konsultasi dan pemesanan produk konveksi.",
};

const askMessage =
  "Halo KonveksiKampus, saya ingin berkonsultasi mengenai kebutuhan konveksi saya.";

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Section className="py-14">
        <div className="max-w-3xl">
          <h1 className="text-primary text-3xl font-semibold tracking-tight">Kontak</h1>
          <p className="text-muted-foreground mt-3">
            Punya pertanyaan atau ingin memesan? Kirimkan detail kebutuhan Anda — jumlah, bahan, dan
            desain — agar kami dapat menghitungnya dengan tepat.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border-border bg-card rounded-[var(--radius-surface)] border p-5">
            <p className="text-muted-foreground text-sm font-semibold">Alamat</p>
            <p className="mt-1">{siteConfig.address}</p>
          </div>
          <div className="border-border bg-card rounded-[var(--radius-surface)] border p-5">
            <p className="text-muted-foreground text-sm font-semibold">Email</p>
            <p className="mt-1">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
          <div className="border-border bg-card rounded-[var(--radius-surface)] border p-5">
            <p className="text-muted-foreground text-sm font-semibold">WhatsApp</p>
            <p className="mt-1">
              <a
                href={whatsappLink(askMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                Chat sekarang
              </a>
            </p>
          </div>
        </div>

        <a
          href={whatsappLink(askMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground hover:bg-accent mt-9 inline-flex min-h-12 items-center rounded-[var(--radius-control)] px-6 text-sm font-semibold transition-colors duration-150"
        >
          Konsultasi via WhatsApp
        </a>
      </Section>
    </main>
  );
}
