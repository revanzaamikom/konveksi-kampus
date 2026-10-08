import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImage } from "@/components/ProductImage";
import { getCategories } from "@/lib/content/categories";
import { getProductBySlug, getProducts } from "@/lib/content/products";
import { siteConfig, whatsappLink } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produk tidak ditemukan" };

  return {
    title: product.name,
    description: product.shortDescription ?? product.description,
    openGraph: {
      title: `${product.name} — ${siteConfig.name}`,
      description: product.shortDescription ?? product.description,
      images: product.images[0] ? [{ url: product.images[0].src }] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [product, categories] = await Promise.all([getProductBySlug(slug), getCategories()]);

  if (!product) notFound();

  const category = categories.find((item) => item.slug === product.categorySlug);
  const inquiryMessage = `Halo ${siteConfig.name}, saya tertarik dengan produk ${product.name}. Boleh minta informasi lebih lanjut?`;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-muted text-sm">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-foreground">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/katalog" className="hover:text-foreground">
              Katalog
            </Link>
          </li>
          {category ? (
            <>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/kategori/${category.slug}`} className="hover:text-foreground">
                  {category.name}
                </Link>
              </li>
            </>
          ) : null}
        </ol>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-4">
          {product.images.map((image, index) => (
            <figure
              key={image.src}
              className="border-border bg-surface overflow-hidden rounded-xl border"
            >
              <div className="relative aspect-[4/3]">
                <ProductImage
                  src={image.src}
                  alt={image.alt}
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {image.label ? (
                <figcaption className="text-muted px-4 py-2 text-sm">{image.label}</figcaption>
              ) : null}
            </figure>
          ))}
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {category ? (
            <Link
              href={`/kategori/${category.slug}`}
              className="text-primary text-sm font-semibold hover:underline"
            >
              {category.name}
            </Link>
          ) : null}
          <h1 className="mt-2 text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="text-muted mt-4">{product.description}</p>

          {product.material ? (
            <dl className="mt-6 text-sm">
              <dt className="font-semibold">Bahan</dt>
              <dd className="text-muted">{product.material}</dd>
            </dl>
          ) : null}

          {product.variants && product.variants.length > 0 ? (
            <div className="mt-6 space-y-3">
              {product.variants.map((variant) => (
                <div key={variant.name}>
                  <p className="text-sm font-semibold">{variant.name}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {variant.options.map((option) => (
                      <li
                        key={option}
                        className="border-border text-muted rounded-md border px-3 py-1 text-sm"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}

          <a
            href={whatsappLink(inquiryMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground mt-8 inline-flex h-12 items-center rounded-md px-6 text-sm font-semibold transition-opacity hover:opacity-90"
          >
            Pesan / Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
