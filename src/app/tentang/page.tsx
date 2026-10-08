import type { Metadata } from "next";
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
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Tentang {siteConfig.name}</h1>

      <p className="text-muted mt-6 text-lg">
        Kami adalah vendor Konveksi yang menyediakan jasa pembuatan sandang untuk mahasiswa maupun
        masyarakat umum yang menggunakan kualitas yang terbaik dan harga yang sangat terjangkau bagi
        pelanggan kami.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Visi</h2>
        <p className="text-muted mt-3">
          Menjadi konveksi terpercaya dan terjangkau yang mampu memenuhi kebutuhan fashion dengan
          kualitas terbaik dan harga bersahabat.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Misi</h2>
        <ul className="text-muted mt-4 space-y-3">
          {misi.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
