import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { getCategories } from "@/lib/content/categories";
import { getProductBySlug, getProducts } from "@/lib/content/products";
import { siteConfig, whatsappLink } from "@/lib/site";
import { breadcrumbJsonLd, genPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produk tidak ditemukan" };

  return genPageMetadata({
    title: `${product.name} — Custom Konveksi Jogja`,
    description: product.shortDescription ?? product.description,
    pageRoute: `/katalog/${product.slug}`,
    ogImg: product.images[0]?.src,
  });
}

function productJsonLd(product: {
  name: string;
  description: string;
  images: { src: string; alt: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} — Custom Konveksi Jogja`,
    description: product.description,
    ...(product.images[0] ? { image: [product.images[0].src] } : {}),
    brand: { "@type": "Brand", name: siteConfig.displayName },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [product, categories] = await Promise.all([getProductBySlug(slug), getCategories()]);

  if (!product) notFound();

  const category = categories.find((item) => item.slug === product.categorySlug);

  // Lead-qualification message (foundation §16): prompt the customer to include the
  // details the sales team needs, without making the flow complicated.
  const inquiryMessage = [
    `Halo ${siteConfig.displayName}, saya ingin konsultasi pembuatan ${product.name}.`,
    "",
    "Jenis produk: ",
    "Jumlah: ",
    "Deadline: ",
    "Desain/referensi: (sudah ada / belum)",
  ].join("\n");

  const breadcrumbs = [
    { name: "Beranda", route: "/" },
    { name: "Katalog", route: "/katalog" },
    ...(category ? [{ name: category.name, route: `/kategori/${category.slug}` }] : []),
    { name: product.name, route: `/katalog/${product.slug}` },
  ];

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={productJsonLd(product)} scriptKey="product-json-ld" />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} scriptKey="breadcrumb-json-ld" />
      <Section className="py-10">
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
            {category ? (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/kategori/${category.slug}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              </>
            ) : null}
          </ol>
        </nav>

        <div className="mt-7 grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div className="space-y-4">
            {product.images.map((image, index) => (
              <Reveal key={image.src} clip delay={Math.min(index, 3) * 110}>
                <figure className="border-border bg-card overflow-hidden rounded-[var(--radius-surface)] border">
                  <div className="bg-muted relative aspect-[4/3]">
                    <ProductImage
                      src={image.src}
                      alt={image.alt}
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {image.label ? (
                    <figcaption className="text-muted-foreground border-border border-t px-4 py-2 text-sm">
                      {image.label}
                    </figcaption>
                  ) : null}
                </figure>
              </Reveal>
            ))}
          </div>

          {/* Info */}
          <Reveal delay={110}>
            <div className="lg:sticky lg:top-24 lg:self-start">
              {category ? (
                <Link
                  href={`/kategori/${category.slug}`}
                  className="text-accent text-sm font-semibold underline-offset-4 hover:underline"
                >
                  {category.name}
                </Link>
              ) : null}
              <h1 className="text-foreground mt-2 text-3xl font-semibold tracking-tight">
                {product.name}
              </h1>
              <p className="text-muted-foreground mt-4">{product.description}</p>

              {product.character ? (
                <p className="text-muted-foreground mt-3 text-sm italic">{product.character}</p>
              ) : null}

              {/* Specs — only rows with real data are rendered (foundation §22). */}
              <dl className="border-border mt-6 space-y-4 border-t pt-5 text-sm">
                {product.materials && product.materials.length > 0 ? (
                  <div>
                    <dt className="font-semibold">Pilihan bahan</dt>
                    <dd className="text-muted-foreground mt-1">{product.materials.join(", ")}</dd>
                  </div>
                ) : null}

                {product.colors && product.colors.length > 0 ? (
                  <div>
                    <dt className="font-semibold">Pilihan warna</dt>
                    <dd className="text-muted-foreground mt-1">{product.colors.join(", ")}</dd>
                  </div>
                ) : null}

                {product.customization && product.customization.length > 0 ? (
                  <div>
                    <dt className="font-semibold">Customization</dt>
                    <dd className="mt-2">
                      <ul className="flex flex-wrap gap-2">
                        {product.customization.map((item) => (
                          <li
                            key={item}
                            className="border-border bg-card text-muted-foreground rounded-[var(--radius-control)] border px-3 py-1"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ) : null}

                {product.minimumOrder ? (
                  <div>
                    <dt className="font-semibold">Minimum order</dt>
                    <dd className="text-muted-foreground mt-1">{product.minimumOrder}</dd>
                  </div>
                ) : null}

                {product.productionEstimate ? (
                  <div>
                    <dt className="font-semibold">Estimasi produksi</dt>
                    <dd className="text-muted-foreground mt-1">{product.productionEstimate}</dd>
                  </div>
                ) : null}

                {product.priceHint ? (
                  <div>
                    <dt className="font-semibold">Harga</dt>
                    <dd className="text-muted-foreground mt-1">{product.priceHint}</dd>
                  </div>
                ) : null}
              </dl>

              {product.variants && product.variants.length > 0 ? (
                <div className="border-border mt-6 space-y-4 border-t pt-5">
                  {product.variants.map((variant) => (
                    <div key={variant.name}>
                      <p className="text-sm font-semibold">{variant.name}</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {variant.options.map((option) => (
                          <li
                            key={option}
                            className="border-border bg-card text-muted-foreground rounded-[var(--radius-control)] border px-3 py-1 text-sm"
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* No confirmed price → route to quotation (foundation §8). */}
              <p className="text-muted-foreground mt-6 text-sm">
                Harga menyesuaikan spesifikasi. Hubungi kami untuk quotation.
              </p>

              <a
                href={whatsappLink(inquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wipe bg-primary text-primary-foreground mt-4 inline-flex min-h-12 items-center rounded-[var(--radius-control)] px-6 text-sm font-semibold transition-colors duration-150"
              >
                Konsultasi via WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
