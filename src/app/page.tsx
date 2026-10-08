import Link from "next/link";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FaqList } from "@/components/FaqList";
import { Magnetic } from "@/components/Magnetic";
import { LinkButton } from "@/components/LinkButton";
import { Marquee } from "@/components/Marquee";
import { MaskReveal } from "@/components/MaskReveal";
import { MaterialsList } from "@/components/MaterialsList";
import { ProcessList } from "@/components/ProcessList";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Parallax } from "@/components/Parallax";
import { PortfolioGridRevealed } from "@/components/PortfolioGridRevealed";
import { Reveal } from "@/components/Reveal";
import { Scrub } from "@/components/Scrub";
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
import { breadcrumbJsonLd, faqJsonLd, genPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata = genPageMetadata({
  title: "Konveksi Jogja Custom: Jaket, Kaos, Korsa, PDH & Apparel",
  description:
    "Konveksi Kampus: vendor konveksi Yogyakarta sejak 2012. Produksi custom PDH, PDL, korsa, jaket, polo, kaos, almamater, rompi, wearpack, dan jas lab.",
  pageRoute: "/",
});

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
    <main id="main" className="flex flex-1 flex-col">
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Beranda", route: "/" }])}
        scriptKey="breadcrumb-json-ld"
      />
      {/* 1. HERO — komposisi collection 2 kolom ala referensi:
          kiri gambar client (rounded 20px) + kartu abs; kanan judul Anton besar yang
          overlap ke kiri + subkopi + CTA pill. Palet tetap milik client. */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:gap-12 lg:py-24">
          {/* Desktop (lg+): two grid children = plate (col 1) + text (col 2), exactly
              as before — Parallax on the plate. Mobile/tablet (<lg): one column, the
              text child overlays the plate on a scrim so the whole hero (headline +
              copy + CTAs) fits one viewport without scrolling. */}
          <Parallax speed={-0.12} className="col-start-1 row-start-1">
            <Reveal clip trigger="eager">
              <div className="bg-specimen border-plate-border relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] border lg:aspect-[3/4]">
                <ProductImage
                  src="/brand/hero-flatlay.webp"
                  alt="Beragam produk konveksi custom Konveksi Kampus: jaket, kaos, polo, dan korsa"
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                {/* Scrim: strong at the bottom (behind the overlaid text/CTAs),
                    fading up. Mobile only — desktop uses the two-column layout. */}
                <div
                  aria-hidden="true"
                  className="from-background via-background/75 absolute inset-0 bg-gradient-to-t to-transparent lg:hidden"
                />
              </div>
            </Reveal>
          </Parallax>

          {/* Same grid cell as the plate on mobile (grid stacking → overlay on the
              photo, text pinned to the bottom). Desktop: its own column. */}
          <div className="col-start-1 row-start-1 self-end p-6 sm:p-8 lg:col-start-2 lg:row-start-1 lg:self-center lg:p-0">
            <h1 className="text-foreground text-display-sm sm:text-display lg:text-display relative z-10">
              <MaskReveal delay={80}>Konveksi Custom</MaskReveal>
              <MaskReveal delay={220}>Seragam &amp; Apparel</MaskReveal>
            </h1>
            <Reveal delay={260}>
              <p className="text-muted-foreground mt-4 max-w-xl text-base text-balance sm:text-lg lg:mt-6">
                PDH, PDL, korsa, jaket, polo, kaos, almamater, dan wearpack untuk organisasi,
                kampus, komunitas, dan perusahaan. Vendor konveksi Yogyakarta sejak 2012.
              </p>
            </Reveal>
            <Reveal delay={380}>
              <div
                data-wa-cta
                className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-8"
              >
                <Magnetic>
                  <a
                    href={whatsappLink(heroMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-wipe bg-primary text-primary-foreground inline-flex min-h-[54px] w-full items-center justify-center rounded-[var(--radius-control)] px-8 text-[18px] leading-snug font-medium transition-colors duration-200 sm:w-auto"
                  >
                    Konsultasi via WhatsApp
                  </a>
                </Magnetic>
                <LinkButton
                  href="/katalog"
                  variant="secondary"
                  className="w-full justify-center sm:w-auto"
                >
                  Lihat Katalog
                </LinkButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MARQUEE strip gaya referensi: jenis produk berjalan. */}
      <Marquee>
        {[
          "PDH",
          "PDL",
          "Korsa",
          "Jaket",
          "Polo",
          "Kaos",
          "Almamater",
          "Rompi",
          "Wearpack",
          "Jas Lab",
        ].map((item) => (
          <span
            key={item}
            className="font-heading text-foreground mx-8 text-2xl tracking-wide uppercase"
          >
            {item}
            <span className="text-accent ml-8" aria-hidden="true">
              •
            </span>
          </span>
        ))}
      </Marquee>

      {/* 1B. MODEVO STRIP — 3 plates parallax lawan arah + display text overlap.
          Cermin home-hero Modevo: grid 3 kolom, tengah turun 100px, judul Anton
          menimpa batas bawah kartu. Aset foto client sendiri. */}
      <section className="relative overflow-hidden pb-16" aria-label="Koleksi unggulan">
        <div className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:pt-24">
          {/* Depth stack: centre plate is wider (less crop on the landscape photo),
              scaled up, raised (z-10) and overlapped slightly onto its neighbours so
              it reads as the front layer. Neighbours sit smaller and slightly behind. */}
          <div className="grid grid-cols-3 items-start gap-4 sm:gap-6 lg:grid-cols-[1fr_1.3fr_1fr] lg:gap-8">
            <Scrub mode="parallax" amount={0.9}>
              <Reveal clip trigger="eager" className="origin-center scale-[0.97]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)]">
                  <ProductImage
                    src="/images/products/jacket-lapangan.webp"
                    alt="Jaket lapangan custom dengan striping reflektif"
                    sizes="(max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </Reveal>
            </Scrub>
            <Scrub
              mode="parallax"
              amount={-1.1}
              className="relative z-10 -mx-4 mt-10 sm:-mx-8 lg:-mx-14 lg:mt-24"
            >
              <div className="rounded-[var(--radius-media)] shadow-[0_40px_90px_-24px_rgba(0,0,0,0.95)]">
                <Reveal
                  clip
                  delay={120}
                  trigger="eager"
                  className="block origin-center scale-[1.04] sm:scale-105 lg:scale-110"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] ring-1 ring-white/20">
                    <ProductImage
                      src="/images/products/korsa-perminyakan-upnvyk-front.webp"
                      alt="Korsa perminyakan dengan bordir nama jurusan"
                      sizes="(max-width: 1024px) 40vw, 30vw"
                    />
                  </div>
                </Reveal>
              </div>
            </Scrub>
            <Scrub mode="parallax" amount={0.7}>
              <Reveal clip delay={220} trigger="eager" className="origin-center scale-[0.97]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)]">
                  <ProductImage
                    src="/images/products/jas-almamater-front.webp"
                    alt="Jas almamater dengan bordir emblem dada"
                    sizes="(max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </Reveal>
            </Scrub>
          </div>
          <div className="relative z-10 mt-4 sm:-mt-6 lg:-mt-8">
            <Scrub
              as="h2"
              mode="slide"
              from={-36}
              to={36}
              className="text-display text-foreground text-left"
            >
              <MaskReveal scroll delay={80}>
                Seragam Custom
              </MaskReveal>
            </Scrub>
            <Scrub
              as="p"
              mode="slide"
              from={36}
              to={-36}
              className="text-display text-foreground text-right"
            >
              <MaskReveal scroll delay={220}>
                Koleksi Kampus
              </MaskReveal>
            </Scrub>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES — image-forward, wide margins */}
      <Section className="pt-20 pb-24 sm:pt-28">
        <Reveal variant="left">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-display-sm text-foreground">Kategori</h2>
            <Link
              href="/katalog"
              className="text-accent shrink-0 text-sm font-medium underline-offset-4 hover:underline"
            >
              Semua produk
            </Link>
          </div>
        </Reveal>
        <div className="mt-12">
          <CategoryGrid categories={categories} />
        </div>
      </Section>

      {/* 3. VALUE PROPOSITION — clean editorial columns, no boxes, no forced numerals */}
      <Section className="pb-24">
        <div className="border-border grid gap-10 border-t pt-14 sm:grid-cols-3 sm:gap-12">
          {valuePoints.map((point, index) => (
            <Reveal
              key={point.title}
              once
              delay={index * 120}
              variant={index === 0 ? "left" : index === 2 ? "right" : "up"}
            >
              <h3 className="text-foreground font-heading text-2xl tracking-wide uppercase">
                {point.title}
              </h3>
              <p className="text-muted-foreground mt-3">{point.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. FEATURED PRODUCTS */}
      {featured.length > 0 ? (
        <Section className="pb-24">
          <Reveal variant="right">
            <h2 className="text-display-sm text-foreground">Produk Unggulan</h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, index) => (
              <li key={product.id}>
                <Reveal clip once delay={(index % 3) * 120}>
                  <ProductCard product={product} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 5. PORTFOLIO / RECENT PRODUCTION (sales asset) */}
      {portfolio.length > 0 ? (
        <Section className="pb-24">
          <Reveal variant="left">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-display-sm text-foreground max-w-xl">Hasil Produksi</h2>
              <p className="text-muted-foreground max-w-md text-sm">
                Sebagian karya yang telah kami kerjakan, dari korsa jurusan hingga wearpack
                lapangan.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <PortfolioGridRevealed items={portfolio.slice(0, 6)} />
          </div>
        </Section>
      ) : null}

      {/* 6. EDITORIAL STATEMENT — a large-scale pause between image sections (pacing). */}
      <section className="border-border bg-card overflow-hidden border-y">
        <div className="mx-auto w-full max-w-4xl px-4 py-24 sm:px-6 sm:py-32">
          <Scrub mode="rise" amount={0.08}>
            <p className="text-display-sm text-foreground text-balance">
              Setiap pesanan dikerjakan dari spesifikasi yang Anda tentukan sendiri.
            </p>
          </Scrub>
          <Scrub mode="rise" amount={0.05}>
            <p className="text-muted-foreground mt-8 max-w-2xl">
              Setiap pesanan dikerjakan dari spesifikasi yang disepakati: bahan, ukuran, warna, dan
              penempatan bordir atau sablon.
            </p>
          </Scrub>
        </div>
      </section>

      {/* 7. CUSTOMIZATION — full-bleed feel, large type list (no boxes) */}
      <Section className="pb-24">
        <Reveal variant="right">
          <h2 className="text-display-sm text-foreground max-w-3xl">Bisa Dikustomisasi</h2>
        </Reveal>
        <Reveal delay={110} variant="left">
          <p className="text-muted-foreground mt-5 max-w-2xl">
            Sesuaikan detail berikut dengan kebutuhan Anda, dari model sampai penempatan bordir.
          </p>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {customOptions.map((option, i) => (
            <Reveal
              as="li"
              key={option}
              once
              delay={(i % 5) * 70}
              variant={i % 2 === 0 ? "left" : "right"}
            >
              <span className="custom-item text-foreground font-heading text-xl tracking-wide uppercase">
                {option}
              </span>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 7. MATERIALS */}
      {materials.length > 0 ? (
        <Section className="pb-24">
          <Reveal variant="scale">
            <h2 className="text-display-sm text-foreground">Bahan</h2>
            <p className="text-muted-foreground mt-5 max-w-2xl">
              Kami bantu rekomendasikan bahan sesuai penggunaan dan kebutuhan Anda.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <MaterialsList materials={materials} />
            </div>
          </Reveal>
        </Section>
      ) : null}

      {/* 8. PRODUCTION PROCESS */}
      {processSteps.length > 0 ? (
        <Section className="pb-24">
          <Reveal variant="left">
            <h2 className="text-display-sm text-foreground">Alur Pemesanan</h2>
            <p className="text-muted-foreground mt-5 max-w-2xl">
              Dari konsultasi sampai pengiriman, begini prosesnya.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <ProcessList steps={processSteps} />
            </div>
          </Reveal>
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
          <Reveal variant="right">
            <h2 className="text-display-sm text-foreground">Pertanyaan Umum</h2>
          </Reveal>
          <Reveal delay={110}>
            <div className="mt-10 max-w-3xl">
              <JsonLd data={faqJsonLd(faqItems)} scriptKey="faq-json-ld" />
              <FaqList items={faqItems} />
            </div>
          </Reveal>
        </Section>
      ) : null}

      {/* 12. FINAL CTA — the page's one drenched colour block (foundation §15). */}
      <section className="bg-primary text-primary-foreground overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal variant="scale">
            <h2 className="text-display-sm max-w-4xl">
              Mulai dari mana? Kirim detail kebutuhan Anda.
            </h2>
            <p className="mt-6 max-w-xl text-lg opacity-85">
              Sampaikan jenis produk, jumlah, dan deadline. Kami bantu dari penentuan spesifikasi
              hingga produksi.
            </p>
          </Reveal>
          <Reveal delay={130}>
            <a
              data-wa-cta
              href={whatsappLink(
                "Halo KonveksiKampus, saya ingin konsultasi pembuatan apparel custom. Jenis produk: ... Jumlah: ... Deadline: ...",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background text-foreground hover:bg-muted mt-9 inline-flex min-h-12 items-center rounded-[var(--radius-control)] px-7 text-sm font-semibold transition-colors duration-200"
            >
              Konsultasi via WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
