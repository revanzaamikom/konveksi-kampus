import Link from "next/link";
import { LinkButton } from "@/components/LinkButton";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Section } from "@/components/Section";
import { getCategories } from "@/lib/content/categories";
import { getProducts } from "@/lib/content/products";
import { siteConfig } from "@/lib/site";

export default async function Home() {
  const [featured, categories] = await Promise.all([
    getProducts({ featured: true }),
    getCategories(),
  ]);

  return (
    <main className="flex flex-1 flex-col">
      {/*
        Hero — asymmetric (copy left, product photography right).
        No eyebrow pill: the headline carries the message (antislop: eyebrow badge above H1).
      */}
      <section className="border-border bg-card border-b">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <h1 className="text-primary text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Konveksi untuk kampus, organisasi, dan perusahaan.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg">
              Kami memproduksi korsa, jaket lapangan, workshirt, wearpack, rompi, jas lab, dan
              almamater — dengan material yang tepat dan bordir sesuai identitas Anda.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/katalog">Lihat Katalog</LinkButton>
              <LinkButton href="/kontak" variant="secondary">
                Konsultasi Kebutuhan
              </LinkButton>
            </div>
          </div>

          <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-[var(--radius-surface)]">
            <ProductImage
              src="/images/products/korsa-perminyakan-upnvyk-front.webp"
              alt="Korsa perminyakan lengan panjang dengan bordir nama dan identitas jurusan"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* Categories — a link list, not the default identical card grid. */}
      <Section className="py-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-primary text-2xl font-semibold tracking-tight">Kategori Produk</h2>
          <Link
            href="/katalog"
            className="text-accent text-sm font-medium underline-offset-4 hover:underline"
          >
            Semua produk
          </Link>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/kategori/${category.slug}`}
                className="border-border bg-card text-foreground hover:border-accent/60 hover:text-accent inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors duration-150"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Featured products — real products only. */}
      <Section className="pb-16">
        <h2 className="text-primary text-2xl font-semibold tracking-tight">Produk Unggulan</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Sebagian karya yang telah kami kerjakan untuk jurusan, organisasi, dan instansi.
        </p>
        {featured.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      {/* CTA — one deliberate accent block, not repeated decoration. */}
      <Section className="pb-4">
        <div className="bg-primary text-primary-foreground rounded-[var(--radius-surface)] px-6 py-12 sm:px-12">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight">
            Konsultasikan kebutuhan seragam atau merchandise Anda.
          </h2>
          <p className="mt-3 max-w-xl opacity-80">
            Sampaikan jumlah, bahan, dan desain yang diinginkan. Kami bantu dari perhitungan hingga
            produksi.
          </p>
          <Link
            href="/kontak"
            className="bg-background text-foreground hover:bg-muted mt-7 inline-flex min-h-11 items-center rounded-[var(--radius-control)] px-6 text-sm font-semibold transition-colors duration-150"
          >
            Hubungi {siteConfig.name}
          </Link>
        </div>
      </Section>
    </main>
  );
}
