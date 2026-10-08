import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "KonveksiKampus adalah vendor konveksi untuk mahasiswa dan masyarakat umum dengan kualitas terbaik dan harga terjangkau.",
};

const misi = [
  "Menyediakan produk konveksi berkualitas tinggi dengan harga kompetitif.",
  "Melayani kebutuhan clothing mahasiswa, organisasi kampus, dan komunitas lokal.",
  "Menjaga komitmen terhadap ketetapan waktu, mutu dan kepuasan pelanggan.",
  "Terus berinovasi dalam desain dan produksi untuk mengikuti tren pasar.",
];

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Section className="py-14">
        <h1 className="text-primary text-3xl font-semibold tracking-tight">
          Tentang {siteConfig.name}
        </h1>

        <p className="text-muted-foreground mt-6 max-w-3xl text-lg">
          Kami adalah vendor konveksi yang menyediakan jasa pembuatan sandang untuk mahasiswa maupun
          masyarakat umum, dengan kualitas terbaik dan harga yang terjangkau bagi pelanggan kami.
        </p>

        {/*
          Visi + Misi: two-column on desktop so the page rhythm differs from the single
          stacked column above (antislop R-05).
        */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <section>
            <h2 className="text-primary text-xl font-semibold tracking-tight">Visi</h2>
            <p className="text-muted-foreground mt-3">
              Menjadi konveksi terpercaya dan terjangkau yang mampu memenuhi kebutuhan fashion
              dengan kualitas terbaik dan harga bersahabat.
            </p>
          </section>

          <section>
            <h2 className="text-primary text-xl font-semibold tracking-tight">Misi</h2>
            <ul className="text-muted-foreground mt-4 space-y-3">
              {misi.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="bg-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Section>
    </main>
  );
}
