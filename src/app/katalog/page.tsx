import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getCategories } from "@/lib/content/categories";
import { getProducts } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description:
    "Jelajahi katalog KonveksiKampus: kaos, jaket, workshirt, wearpack, rompi, jas lab, dan jas almamater.",
};

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Katalog Produk</h1>
      <p className="text-muted mt-3 max-w-2xl">
        Pilih kategori untuk mempersempit pilihan, atau lihat seluruh produk yang tersedia.
      </p>

      {/* Category filter */}
      <nav aria-label="Filter kategori" className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/katalog"
          className="border-primary bg-primary text-primary-foreground rounded-full border px-4 py-2 text-sm font-medium"
        >
          Semua
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/kategori/${category.slug}`}
            className="border-border text-muted hover:bg-surface hover:text-foreground rounded-full border px-4 py-2 text-sm font-medium transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </nav>

      {/* Product grid */}
      {products.length > 0 ? (
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted mt-10">Belum ada produk untuk ditampilkan.</p>
      )}
    </main>
  );
}
