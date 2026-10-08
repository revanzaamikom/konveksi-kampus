import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { getCategories } from "@/lib/content/categories";
import { getProducts } from "@/lib/content/products";
import { whatsappLink } from "@/lib/site";
import { breadcrumbJsonLd, genPageMetadata } from "@/lib/seo";

export const metadata = genPageMetadata({
  title: "Katalog Produk Konveksi Jogja",
  description:
    "Jelajahi katalog Konveksi Kampus: korsa, jaket lapangan, workshirt, wearpack, rompi, jas lab, jas almamater, PDH, PDL, polo, dan kaos custom.",
  pageRoute: "/katalog",
});

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Beranda", route: "/" },
          { name: "Katalog", route: "/katalog" },
        ])}
        scriptKey="breadcrumb-json-ld"
      />
      <Section className="py-12">
        <Reveal variant="left" trigger="eager">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight">Katalog Produk</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Pilih kategori untuk mempersempit pilihan, atau jelajahi seluruh produk yang tersedia.
          </p>
          <a
            data-wa-cta
            href={whatsappLink(
              "Halo KonveksiKampus, saya ingin konsultasi pembuatan apparel custom.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wipe bg-primary text-primary-foreground mt-5 inline-flex min-h-12 items-center rounded-[var(--radius-control)] px-6 text-sm font-semibold transition-colors duration-150"
          >
            Konsultasi via WhatsApp
          </a>
        </Reveal>

        {/* Filter chips — wrap, never clip (UX: Chip Collection Reflow). */}
        <Reveal delay={120} trigger="eager">
          <nav aria-label="Filter kategori" className="mt-7 flex flex-wrap gap-2">
            <Link
              href="/katalog"
              aria-current="page"
              className="bg-primary text-primary-foreground inline-flex min-h-11 items-center rounded-full px-5 text-sm font-medium"
            >
              Semua
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/kategori/${category.slug}`}
                className="border-border bg-card text-muted-foreground hover:border-accent/60 hover:text-accent inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors duration-150"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </Reveal>

        {products.length > 0 ? (
          <>
            <h2 className="sr-only">Semua produk</h2>
            <ul className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <Reveal as="li" key={product.id} clip once delay={(index % 3) * 100}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </ul>
          </>
        ) : (
          <div className="border-border bg-card mt-9 rounded-[var(--radius-surface)] border p-6 sm:p-8">
            <p className="text-foreground font-medium">Belum ada produk untuk ditampilkan.</p>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm">
              Punya kebutuhan custom? Konsultasikan model yang Anda inginkan, kami bantu dari
              penentuan spesifikasi hingga produksi.
            </p>
            <a
              data-wa-cta
              href={whatsappLink(
                "Halo KonveksiKampus, saya ingin konsultasi pembuatan apparel custom.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wipe bg-primary text-primary-foreground mt-5 inline-flex min-h-12 items-center rounded-[var(--radius-control)] px-6 text-sm font-semibold transition-colors duration-150"
            >
              Konsultasi via WhatsApp
            </a>
          </div>
        )}
      </Section>
    </main>
  );
}
