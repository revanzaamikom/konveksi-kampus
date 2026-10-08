import Link from "next/link";
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
      {/* Hero */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            {siteConfig.name}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Konveksi untuk mahasiswa, organisasi kampus, dan masyarakat umum.
          </h1>
          <p className="text-muted mt-6 max-w-2xl text-lg">
            Melayani pembuatan kaos, jaket, workshirt, rompi, jas, dan wearpack dengan kualitas
            terbaik dan harga yang terjangkau.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/katalog"
              className="bg-primary text-primary-foreground inline-flex h-11 items-center rounded-md px-6 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              Lihat Katalog
            </Link>
            <Link
              href="/kontak"
              className="border-border hover:bg-background inline-flex h-11 items-center rounded-md border px-6 text-sm font-semibold transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Kategori Produk</h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/kategori/${category.slug}`}
                className="border-border hover:bg-surface block rounded-lg border p-4 transition-colors"
              >
                <span className="font-medium">{category.name}</span>
                {category.description ? (
                  <span className="text-muted mt-1 block text-sm">{category.description}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured products */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">Produk Unggulan</h2>
            <Link href="/katalog" className="text-primary text-sm font-medium hover:underline">
              Lihat semua
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <li key={product.id}>
                <Link href={`/katalog/${product.slug}`} className="group block">
                  <div className="border-border bg-background aspect-[4/3] overflow-hidden rounded-lg border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.images[0]?.src}
                      alt={product.images[0]?.alt ?? product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <h3 className="mt-3 font-medium">{product.name}</h3>
                  {product.shortDescription ? (
                    <p className="text-muted mt-1 text-sm">{product.shortDescription}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="bg-primary text-primary-foreground rounded-xl px-8 py-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Punya kebutuhan seragam atau merchandise?
          </h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">
            Konsultasikan kebutuhan Anda. Kami siap membantu dari desain hingga produksi.
          </p>
          <Link
            href="/kontak"
            className="bg-background text-foreground mt-6 inline-flex h-11 items-center rounded-md px-6 text-sm font-semibold transition-opacity hover:opacity-90"
          >
            Konsultasi Sekarang
          </Link>
        </div>
      </section>
    </main>
  );
}
