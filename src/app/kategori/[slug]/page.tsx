import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { getCategories, getCategoryBySlug } from "@/lib/content/categories";
import { getProducts } from "@/lib/content/products";
import { whatsappLink } from "@/lib/site";
import { breadcrumbJsonLd, genPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Kategori tidak ditemukan" };

  return genPageMetadata({
    title: `Konveksi ${category.name} Custom Jogja`,
    description:
      category.description ??
      `Koleksi ${category.name} custom dari Konveksi Kampus: PDH, PDL, korsa, jaket, polo, kaos, almamater, rompi, wearpack, dan jas lab.`,
    pageRoute: `/kategori/${category.slug}`,
  });
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
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Beranda", route: "/" },
          { name: "Katalog", route: "/katalog" },
          { name: category.name, route: `/kategori/${category.slug}` },
        ])}
        scriptKey="breadcrumb-json-ld"
      />
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

        <h1 className="text-foreground mt-5 text-3xl font-semibold tracking-tight">
          {category.name}
        </h1>
        {category.description ? (
          <p className="text-muted-foreground mt-3 max-w-2xl">{category.description}</p>
        ) : null}

        <Reveal trigger="eager">
          <a
            data-wa-cta
            href={whatsappLink(
              `Halo KonveksiKampus, saya ingin konsultasi pembuatan ${category.name} custom.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wipe bg-primary text-primary-foreground mt-5 inline-flex min-h-12 items-center rounded-[var(--radius-control)] px-6 text-sm font-semibold transition-colors duration-150"
          >
            Konsultasi via WhatsApp
          </a>
        </Reveal>

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
          <>
            <h2 className="sr-only">Produk {category.name}</h2>
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
            <p className="text-foreground font-medium">
              Belum ada produk yang ditampilkan dalam kategori {category.name}.
            </p>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm">
              Punya kebutuhan custom? Konsultasikan model yang Anda inginkan, kami bantu dari
              penentuan spesifikasi hingga produksi.
            </p>
            <a
              data-wa-cta
              href={whatsappLink(
                `Halo KonveksiKampus, saya ingin konsultasi pembuatan ${category.name} custom.`,
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
