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
      {/* 1. HERO — editorial split (WHAT / WHO / VALUE / ACTION, foundation §7).
          Real flat-lay product photography (the client's own garments). No invented stats. */}
      <section className="border-border relative overflow-hidden border-b">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <h1 className="text-display text-foreground">
              Konveksi Custom untuk Seragam &amp; Apparel
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg">
              Produksi apparel custom untuk organisasi, kampus, komunitas, dan kebutuhan profesional
              — vendor konveksi Yogyakarta sejak 2012.
            </p>
            <p className="font-spec text-muted-foreground mt-5 text-sm">
              PDH · PDL · Korsa · Jaket · Polo · Kaos · Almamater · Wearpack
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink(heroMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground hover:bg-primary-hover inline-flex min-h-12 items-center rounded-[var(--radius-control)] px-6 text-sm font-semibold transition-colors duration-150"
              >
                Konsultasi via WhatsApp
              </a>
              <LinkButton href="/katalog" variant="secondary">
                Lihat Katalog
              </LinkButton>
            </div>
          </div>

          {/* Double-bezel framed image — premium container (high-end-visual-design §4A). */}
          <div className="border-border bg-card rounded-[1.6rem] border p-2">
            <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-[1.2rem]">
              <ProductImage
                src="/brand/hero-flatlay.webp"
                alt="Beragam produk konveksi custom Konveksi Kampus — jaket, kaos, polo, dan korsa"
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES */}
      <Section className="py-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">Kategori Produk</h2>
          <Link
            href="/katalog"
            className="text-accent text-sm font-medium underline-offset-4 hover:underline"
          >
            Semua produk
          </Link>
        </div>
        <div className="mt-6">
          <CategoryGrid categories={categories} />
        </div>
      </Section>

      {/* 3. VALUE PROPOSITION / WHY US */}
      <Section className="pb-14">
        <h2 className="text-foreground text-2xl font-semibold tracking-tight">
          Kenapa {siteConfig.displayName}
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-3">
          {valuePoints.map((point) => (
            <li
              key={point.title}
              className="border-border bg-card rounded-[var(--radius-surface)] border p-5"
            >
              <h3 className="text-foreground font-medium">{point.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{point.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. FEATURED PRODUCTS */}
      {featured.length > 0 ? (
        <Section className="pb-14">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">Produk Unggulan</h2>
          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <Section className="pb-14">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">Hasil Produksi</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Sebagian karya yang telah kami kerjakan — dari korsa jurusan hingga wearpack lapangan.
          </p>
          <div className="mt-6">
            <PortfolioGrid items={portfolio.slice(0, 6)} />
          </div>
        </Section>
      ) : null}

      {/* 6. CUSTOMIZATION CAPABILITY */}
      <Section className="pb-14">
        <h2 className="text-foreground text-2xl font-semibold tracking-tight">
          Bisa Dikustomisasi
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Anda tidak sekadar memilih template. Sesuaikan detail berikut dengan kebutuhan Anda.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {customOptions.map((option) => (
            <li
              key={option}
              className="border-border bg-card text-muted-foreground rounded-full border px-4 py-2 text-sm"
            >
              {option}
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. MATERIALS */}
      {materials.length > 0 ? (
        <Section className="pb-14">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">Pilihan Bahan</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Kami bantu rekomendasikan bahan sesuai penggunaan dan kebutuhan Anda.
          </p>
          <div className="mt-6">
            <MaterialsList materials={materials} />
          </div>
        </Section>
      ) : null}

      {/* 8. PRODUCTION PROCESS */}
      {processSteps.length > 0 ? (
        <Section className="pb-14">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">Alur Pemesanan</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Dari konsultasi hingga pengiriman — begini prosesnya.
          </p>
          <div className="mt-6">
            <ProcessList steps={processSteps} />
          </div>
        </Section>
      ) : null}

      {/* 9. CLIENT / SOCIAL PROOF — only when real data exists (foundation §10/§22). */}
      {clients.length > 0 ? (
        <Section className="pb-14">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">Dipercaya Oleh</h2>
          <ul className="mt-6 flex flex-wrap items-center gap-8">
            {clients.map((client) => (
              <li key={client.id} className="text-muted-foreground text-sm font-medium">
                {client.name}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 10. TESTIMONIALS — only when real testimonials exist (foundation §10/§22). */}
      {testimonials.length > 0 ? (
        <Section className="pb-14">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">Testimoni</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <li
                key={item.id}
                className="border-border bg-card rounded-[var(--radius-surface)] border p-5"
              >
                <blockquote className="text-muted-foreground text-sm">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                {item.author ? (
                  <p className="text-foreground mt-3 text-sm font-medium">
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
        <Section className="pb-14">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">Pertanyaan Umum</h2>
          <div className="mt-6 max-w-3xl">
            <FaqList items={faqItems} />
          </div>
        </Section>
      ) : null}

      {/* 12. FINAL CTA — one deliberate accent block (foundation §15). */}
      <Section className="pb-20">
        <div className="bg-primary text-primary-foreground rounded-[var(--radius-surface)] px-6 py-12 sm:px-12">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight">
            Mulai dari mana? Cukup kirim detail kebutuhan Anda.
          </h2>
          <p className="mt-3 max-w-xl opacity-80">
            Sampaikan jenis produk, jumlah, dan deadline. Kami bantu dari penentuan spesifikasi
            hingga produksi.
          </p>
          <a
            href={whatsappLink(
              "Halo KonveksiKampus, saya ingin konsultasi pembuatan apparel custom. Jenis produk: ... Jumlah: ... Deadline: ...",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background text-foreground hover:bg-muted mt-7 inline-flex min-h-11 items-center rounded-[var(--radius-control)] px-6 text-sm font-semibold transition-colors duration-150"
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      </Section>
    </main>
  );
}
