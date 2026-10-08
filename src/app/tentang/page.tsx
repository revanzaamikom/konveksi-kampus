import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig, whatsappLink } from "@/lib/site";
import { breadcrumbJsonLd, genPageMetadata } from "@/lib/seo";

export const metadata = genPageMetadata({
  title: "Tentang Konveksi Kampus",
  description:
    "Konveksi Kampus adalah vendor konveksi Yogyakarta sejak 2012 untuk organisasi, kampus, komunitas, perusahaan, dan kebutuhan seragam custom.",
  pageRoute: "/tentang",
});

const misi = [
  "Mengerjakan pesanan konveksi custom sesuai model, bahan, warna, dan ukuran yang diminta.",
  "Melayani kebutuhan seragam mahasiswa, organisasi kampus, komunitas, dan perusahaan.",
  "Mengikuti alur yang disepakati: konsultasi, spesifikasi, produksi, lalu pengiriman.",
  "Menyesuaikan desain dengan referensi atau desain yang Anda bawa.",
];

export default function AboutPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Beranda", route: "/" },
          { name: "Tentang Kami", route: "/tentang" },
        ])}
        scriptKey="breadcrumb-json-ld"
      />
      <Section className="py-14">
        <Reveal>
          <h1 className="text-primary text-3xl font-semibold tracking-tight">
            Tentang {siteConfig.name}
          </h1>

          <p className="text-muted-foreground mt-6 max-w-3xl text-lg">
            Kami memproduksi seragam dan apparel custom untuk mahasiswa, organisasi kampus,
            komunitas, dan perusahaan. Pesanan dikerjakan sesuai spesifikasi yang Anda tentukan,
            mulai dari model, bahan, dan warna sampai penempatan bordir atau sablon.
          </p>
          <a
            data-wa-cta
            href={whatsappLink(
              "Halo KonveksiKampus, saya ingin konsultasi pembuatan apparel custom.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wipe bg-primary text-primary-foreground mt-6 inline-flex min-h-12 items-center rounded-[var(--radius-control)] px-6 text-sm font-semibold transition-colors duration-150"
          >
            Konsultasi via WhatsApp
          </a>
        </Reveal>

        {/*
          Visi + Misi: two-column on desktop so the page rhythm differs from the single
          stacked column above (antislop R-05).
        */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal as="section">
            <h2 className="text-primary text-xl font-semibold tracking-tight">Visi</h2>
            <p className="text-muted-foreground mt-3">
              Menjadi vendor konveksi yang bisa diandalkan kampus dan organisasi di Yogyakarta,
              dengan hasil yang sesuai pesanan dan proses yang jelas.
            </p>
          </Reveal>

          <Reveal as="section" delay={120}>
            <h2 className="text-primary text-xl font-semibold tracking-tight">Misi</h2>
            <ul className="text-muted-foreground mt-4 space-y-3">
              {misi.map((item, index) => (
                <Reveal as="li" key={item} delay={Math.min(index, 4) * 70}>
                  <span className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="bg-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    <span>{item}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
