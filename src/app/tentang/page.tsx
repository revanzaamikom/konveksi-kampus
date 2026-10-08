import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, genPageMetadata } from "@/lib/seo";

export const metadata = genPageMetadata({
  title: "Tentang Konveksi Kampus",
  description:
    "Konveksi Kampus adalah vendor konveksi Yogyakarta sejak 2012 untuk organisasi, kampus, komunitas, perusahaan, dan kebutuhan seragam custom.",
  pageRoute: "/tentang",
});

const misi = [
  "Menyediakan produk konveksi berkualitas tinggi dengan harga kompetitif.",
  "Melayani kebutuhan clothing mahasiswa, organisasi kampus, dan komunitas lokal.",
  "Menjaga komitmen terhadap ketetapan waktu, mutu dan kepuasan pelanggan.",
  "Terus berinovasi dalam desain dan produksi untuk mengikuti tren pasar.",
];

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
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
            Kami adalah vendor konveksi yang menyediakan jasa pembuatan sandang untuk mahasiswa
            maupun masyarakat umum, dengan kualitas terbaik dan harga yang terjangkau bagi pelanggan
            kami.
          </p>
        </Reveal>

        {/*
          Visi + Misi: two-column on desktop so the page rhythm differs from the single
          stacked column above (antislop R-05).
        */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal as="section">
            <h2 className="text-primary text-xl font-semibold tracking-tight">Visi</h2>
            <p className="text-muted-foreground mt-3">
              Menjadi konveksi terpercaya dan terjangkau yang mampu memenuhi kebutuhan fashion
              dengan kualitas terbaik dan harga bersahabat.
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
