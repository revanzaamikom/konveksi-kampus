import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig, whatsappLink } from "@/lib/site";
import { breadcrumbJsonLd, genPageMetadata } from "@/lib/seo";

export const metadata = genPageMetadata({
  title: "Kontak & Konsultasi Konveksi",
  description:
    "Hubungi Konveksi Kampus via WhatsApp atau Instagram untuk konsultasi PDH, PDL, korsa, jaket, polo, kaos, almamater, rompi, wearpack, dan jas lab custom.",
  pageRoute: "/kontak",
});

const askMessage =
  "Halo KonveksiKampus, saya ingin berkonsultasi mengenai kebutuhan konveksi saya.";

export default function ContactPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Beranda", route: "/" },
          { name: "Kontak", route: "/kontak" },
        ])}
        scriptKey="breadcrumb-json-ld"
      />
      <Section className="py-14">
        <Reveal>
          <div className="max-w-3xl">
            <h1 className="text-foreground text-3xl font-semibold tracking-tight">Kontak</h1>
            <p className="text-muted-foreground mt-3">
              Punya pertanyaan atau ingin memesan? Hubungi kami melalui WhatsApp atau Instagram.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={90}>
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
          </Reveal>

          <Reveal delay={180}>
            <div className="border-border bg-card rounded-[var(--radius-surface)] border p-5">
              <p className="text-muted-foreground text-sm font-semibold">Instagram</p>
              <p className="mt-1">
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  @{siteConfig.instagram}
                </a>
              </p>
            </div>
          </Reveal>

          {siteConfig.address ? (
            <Reveal delay={270}>
              <div className="border-border bg-card rounded-[var(--radius-surface)] border p-5">
                <p className="text-muted-foreground text-sm font-semibold">Lokasi</p>
                <p className="mt-1">{siteConfig.address}</p>
              </div>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={120}>
          <a
            data-wa-cta
            href={whatsappLink(askMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wipe bg-primary text-primary-foreground mt-9 inline-flex min-h-12 items-center rounded-[var(--radius-control)] px-6 text-sm font-semibold transition-colors duration-150"
          >
            Konsultasi via WhatsApp
          </a>
        </Reveal>
      </Section>
    </main>
  );
}
