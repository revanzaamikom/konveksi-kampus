import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { getCategories, getCategoryBySlug } from "@/lib/content/categories";
import { getProducts } from "@/lib/content/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Kategori tidak ditemukan" };

  return {
    title: category.name,
    description: category.description ?? `Produk kategori ${category.name} dari KonveksiKampus.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [category, products, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getProducts({ category: slug }),
    getCategories(),
  ]);

  if (!category) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <Section className="py-12">
        <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/katalog" className="hover:text-foreground transition-colors">
                Katalog
              </Link>
            </li>
          </ol>
        </nav>

        <h1 className="text-primary mt-5 text-3xl font-semibold tracking-tight">{category.name}</h1>
        {category.description ? (
          <p className="text-muted-foreground mt-3 max-w-2xl">{category.description}</p>
        ) : null}

        <nav aria-label="Filter kategori" className="mt-7 flex flex-wrap gap-2">
          <Link
            href="/katalog"
            className="border-border bg-card text-muted-foreground hover:border-accent/60 hover:text-accent inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors duration-150"
          >
            Semua
          </Link>
          {categories.map((item) => {
            const active = item.slug === slug;
            return (
              <Link
                key={item.id}
                href={`/kategori/${item.slug}`}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "bg-primary text-primary-foreground inline-flex min-h-11 items-center rounded-full px-5 text-sm font-medium"
                    : "border-border bg-card text-muted-foreground hover:border-accent/60 hover:text-accent inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors duration-150"
                }
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {products.length > 0 ? (
          <ul className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground mt-9">Belum ada produk pada kategori ini.</p>
        )}
      </Section>
    </main>
  );
}
