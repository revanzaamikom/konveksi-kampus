import Link from "next/link";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FaqList } from "@/components/FaqList";
import { LinkButton } from "@/components/LinkButton";
import { MaterialsList } from "@/components/MaterialsList";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { ProcessList } from "@/components/ProcessList";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Section } from "@/components/Section";
import { getCategories } from "@/lib/content/categories";
import { getProducts } from "@/lib/content/products";
import {
  getClients,
  getFaqItems,
  getMaterials,
  getPortfolio,
  getProcessSteps,
  getTestimonials,
} from "@/lib/content/site-content";
import { siteConfig, whatsappLink } from "@/lib/site";

/**
 * Home page (foundation §6). The section order follows the customer journey
 * (TRUST → UNDERSTANDING → DESIRE → ACTION, §3/§5). Sections that depend on data the
 * client has not provided (testimonials, clients) are omitted rather than faked (§22).
 */

const heroMessage = `Halo ${siteConfig.displayName}, saya ingin konsultasi pembuatan apparel custom.`;

// Value proposition points — true for this business, no invented numbers (foundation §22).
const valuePoints = [
  {
    title: "Custom sesuai kebutuhan",
    body: "Model, bahan, warna, ukuran, dan penempatan bordir/sablon menyesuaikan kebutuhan Anda.",
  },
  {
    title: "Melayani kampus & instansi",
    body: "Pengalaman mengerjakan kebutuhan jurusan, organisasi, komunitas, hingga perusahaan.",
  },
  {
    title: "Bisa dari desain sendiri atau referensi",
    body: "Belum punya desain? Kami bantu arahkan. Sudah punya? Kami sesuaikan ke produksi.",
  },
];

// Customization options (foundation §12) — general capabilities, not product-specific claims.
const customOptions = [
  "Model",
  "Warna",
  "Ukuran",
  "Kerah",
  "Kantong",
  "Bordir",
  "Sablon",
  "Emblem",
  "Nama",
  "Kombinasi warna",
];

export default async function Home() {
  const [
    categories,
    featured,
    portfolio,
    materials,
    processSteps,
    faqItems,
    testimonials,
    clients,
  ] = await Promise.all([
    getCategories(),
    getProducts({ featured: true }),
    getPortfolio(),
    getMaterials(),
    getProcessSteps(),
    getFaqItems(),
    getTestimonials(),
    getClients(),
  ]);

  return (
    <main className="flex flex-1 flex-col">
      {/* 1. HERO — editorial fashion composition (reference: Modevo).
          Giant Anton headline in clean space, over an asymmetric 3-up grid of the client's
          real product photos. Palette stays the client's own (charcoal + red + yellow). */}
      <section className="relative overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 lg:pt-16">
          {/* Giant editorial headline — in its own space (not overlapping the photos). */}
          <h1 className="text-display text-foreground max-w-5xl">
            Konveksi Custom untuk Seragam &amp; Apparel
          </h1>
        </div>

        {/* Image grid — three equal plates, aligned (heights match by fixed aspect). */}
        <div className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            <div className="bg-specimen border-plate-border relative aspect-[3/4] overflow-hidden rounded-[2px] border">
              <ProductImage
                src="/images/products/jacket-lapangan.webp"
                alt="Jaket lapangan berhood dengan striping reflektif"
                priority
                sizes="33vw"
              />
            </div>
            <div className="bg-specimen border-plate-border relative aspect-[3/4] overflow-hidden rounded-[2px] border">
              <ProductImage
                src="/images/products/korsa-perminyakan-upnvyk-front.webp"
                alt="Korsa perminyakan dengan bordir nama dan identitas jurusan"
                priority
                sizes="33vw"
              />
            </div>
            <div className="bg-specimen border-plate-border relative aspect-[3/4] overflow-hidden rounded-[2px] border">
              <ProductImage
                src="/images/products/jas-almamater-front.webp"
                alt="Jas almamater dengan bordir emblem pada bagian dada"
                priority
                sizes="33vw"
              />
            </div>
          </div>
        </div>

        {/* Value line + actions, in generous whitespace. */}
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-muted-foreground max-w-xl text-lg">
              Produksi PDH, PDL, korsa, jaket, polo, kaos, almamater, dan wearpack untuk organisasi,
              kampus, komunitas, dan perusahaan — vendor konveksi Yogyakarta sejak 2012.
            </p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href={whatsappLink(heroMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground hover:bg-primary-hover inline-flex min-h-12 items-center rounded-[var(--radius-control)] px-7 text-sm font-semibold transition-colors duration-200"
              >
                Konsultasi via WhatsApp
              </a>
              <LinkButton href="/katalog" variant="secondary">
                Lihat Katalog
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES — image-forward, wide margins */}
      <Section className="pt-20 pb-24 sm:pt-28">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-display-sm text-foreground">Kategori</h2>
          <Link
            href="/katalog"
            className="text-accent shrink-0 text-sm font-medium underline-offset-4 hover:underline"
          >
            Semua produk
          </Link>
        </div>
        <div className="mt-12">
          <CategoryGrid categories={categories} />
        </div>
      </Section>

      {/* 3. VALUE PROPOSITION — clean editorial columns, no boxes, no forced numerals */}
      <Section className="pb-24">
        <div className="border-border grid gap-10 border-t pt-14 sm:grid-cols-3 sm:gap-12">
          {valuePoints.map((point) => (
            <div key={point.title}>
              <h3 className="text-foreground font-heading text-2xl tracking-wide uppercase">
                {point.title}
              </h3>
              <p className="text-muted-foreground mt-3">{point.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. FEATURED PRODUCTS */}
      {featured.length > 0 ? (
        <Section className="pb-24">
          <h2 className="text-display-sm text-foreground">Produk Unggulan</h2>
          <ul className="mt-12 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 5. PORTFOLIO / RECENT PRODUCTION (sales asset) */}
      {portfolio.length > 0 ? (
        <Section className="pb-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-display-sm text-foreground max-w-xl">Hasil Produksi</h2>
            <p className="text-muted-foreground max-w-md text-sm">
              Sebagian karya yang telah kami kerjakan — dari korsa jurusan hingga wearpack lapangan.
            </p>
          </div>
          <div className="mt-12">
            <PortfolioGrid items={portfolio.slice(0, 6)} />
          </div>
        </Section>
      ) : null}

      {/* 6. EDITORIAL STATEMENT — a large-scale pause between image sections (pacing). */}
      <section className="border-border bg-card border-y">
        <div className="mx-auto w-full max-w-4xl px-4 py-24 sm:px-6 sm:py-32">
          <p className="text-display-sm text-foreground text-balance">
            Dibuat sesuai kebutuhan Anda — bukan template yang sama untuk semua.
          </p>
          <p className="text-muted-foreground mt-8 max-w-2xl">
            Setiap pesanan dikerjakan dari spesifikasi yang disepakati: bahan, ukuran, warna, dan
            penempatan bordir atau sablon.
          </p>
        </div>
      </section>

      {/* 7. CUSTOMIZATION — full-bleed feel, large type list (no boxes) */}
      <Section className="pb-24">
        <h2 className="text-display-sm text-foreground max-w-3xl">Bisa Dikustomisasi</h2>
        <p className="text-muted-foreground mt-5 max-w-2xl">
          Anda tidak sekadar memilih template. Sesuaikan detail berikut dengan kebutuhan Anda.
        </p>
        <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {customOptions.map((option) => (
            <li
              key={option}
              className="text-foreground font-heading text-xl tracking-wide uppercase"
            >
              {option}
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. MATERIALS */}
      {materials.length > 0 ? (
        <Section className="pb-24">
          <h2 className="text-display-sm text-foreground">Bahan</h2>
          <p className="text-muted-foreground mt-5 max-w-2xl">
            Kami bantu rekomendasikan bahan sesuai penggunaan dan kebutuhan Anda.
          </p>
          <div className="mt-10">
            <MaterialsList materials={materials} />
          </div>
        </Section>
      ) : null}

      {/* 8. PRODUCTION PROCESS */}
      {processSteps.length > 0 ? (
        <Section className="pb-24">
          <h2 className="text-display-sm text-foreground">Alur Pemesanan</h2>
          <p className="text-muted-foreground mt-5 max-w-2xl">
            Dari konsultasi hingga pengiriman — begini prosesnya.
          </p>
          <div className="mt-10">
            <ProcessList steps={processSteps} />
          </div>
        </Section>
      ) : null}

      {/* 9. CLIENT / SOCIAL PROOF — only when real data exists (foundation §10/§22). */}
      {clients.length > 0 ? (
        <Section className="pb-24">
          <h2 className="text-display-sm text-foreground">Dipercaya Oleh</h2>
          <ul className="mt-10 flex flex-wrap items-center gap-10">
            {clients.map((client) => (
              <li key={client.id} className="text-muted-foreground font-medium">
                {client.name}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 10. TESTIMONIALS — only when real testimonials exist (foundation §10/§22). */}
      {testimonials.length > 0 ? (
        <Section className="pb-24">
          <h2 className="text-display-sm text-foreground">Testimoni</h2>
          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <li key={item.id}>
                <blockquote className="text-foreground text-lg">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                {item.author ? (
                  <p className="text-muted-foreground mt-4 text-sm">
                    {item.author}
                    {item.role ? `, ${item.role}` : ""}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 11. FAQ */}
      {faqItems.length > 0 ? (
        <Section className="pb-24">
          <h2 className="text-display-sm text-foreground">Pertanyaan Umum</h2>
          <div className="mt-10 max-w-3xl">
            <FaqList items={faqItems} />
          </div>
        </Section>
      ) : null}

      {/* 12. FINAL CTA — the page's one drenched colour block (foundation §15). */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <h2 className="text-display-sm max-w-4xl">
            Mulai dari mana? Kirim detail kebutuhan Anda.
          </h2>
          <p className="mt-6 max-w-xl text-lg opacity-85">
            Sampaikan jenis produk, jumlah, dan deadline. Kami bantu dari penentuan spesifikasi
            hingga produksi.
          </p>
          <a
            href={whatsappLink(
              "Halo KonveksiKampus, saya ingin konsultasi pembuatan apparel custom. Jenis produk: ... Jumlah: ... Deadline: ...",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background text-foreground hover:bg-muted mt-9 inline-flex min-h-12 items-center rounded-[var(--radius-control)] px-7 text-sm font-semibold transition-colors duration-200"
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
