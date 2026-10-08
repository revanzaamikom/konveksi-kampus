/**
 * SEO config + helpers — centralizes page metadata and JSON-LD.
 *
 * Follows the `seo-in-nextjs` skill pattern (defineSeoConfig → genPageMetadata →
 * JsonLdScript) but implemented on Next's own Metadata API, so no extra dependency
 * is needed (AGENTS.md §15 — dependency rule). Patterns referenced by that skill:
 * define-seo-config, gen-page-metadata, json-ld-script, json-ld-for-faq,
 * json-ld-for-breadcrumb.
 */

export interface SeoConfig {
  baseUrl: string;
  siteName: string;
  locale: string;
  defaultOgImg: string;
}

/**
 * Mirrors the skill's `defineSeoConfig`. baseUrl stays empty until the client confirms
 * a real domain (NEXT_PUBLIC_SITE_URL); absolute metadata URLs are only emitted then.
 */
export const seoConfig: SeoConfig = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  siteName: "Konveksi Kampus",
  locale: "id_ID",
  defaultOgImg: "/brand/og-image.jpg",
};

export const hasSeoBaseUrl = seoConfig.baseUrl.length > 0;

export interface PageMetadataInput {
  /** Page title without the site suffix. */
  title: string;
  description: string;
  /** Route path, e.g. "/katalog". Used for canonical + OG URL when a base URL exists. */
  pageRoute: string;
  /** OG image path. Defaults to the site OG image. */
  ogImg?: string;
}

/**
 * Mirrors the skill's `genPageMetadata`: title/template, description, canonical,
 * Open Graph and Twitter metadata. Canonical + absolute OG URLs are emitted only
 * when `baseUrl` is configured, so nothing invented is published.
 */
export function genPageMetadata({
  title,
  description,
  pageRoute,
  ogImg = seoConfig.defaultOgImg,
}: PageMetadataInput) {
  const fullTitle = `${title} | ${seoConfig.siteName}`;

  return {
    title,
    description,
    ...(hasSeoBaseUrl
      ? {
          alternates: { canonical: `${seoConfig.baseUrl}${pageRoute}` },
          openGraph: {
            type: "website" as const,
            locale: seoConfig.locale,
            siteName: seoConfig.siteName,
            title: fullTitle,
            description,
            url: `${seoConfig.baseUrl}${pageRoute}`,
            images: [{ url: ogImg, width: 1200, height: 630, alt: seoConfig.siteName }],
          },
          twitter: {
            card: "summary_large_image" as const,
            title: fullTitle,
            description,
            images: [ogImg],
          },
        }
      : {}),
  };
}

/** Shape for FAQ JSON-LD entries (mirrors the skill's JsonLdForFaq input). */
export interface FaqEntry {
  question: string;
  answer: string;
}

/** Mirrors the skill's JsonLdForFaq output: an FAQPage object per schema.org. */
export function faqJsonLd(faqs: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Shape for breadcrumb JSON-LD entries (mirrors the skill's JsonLdForBreadcrumb input). */
export interface BreadcrumbEntry {
  name: string;
  route: string;
}

/**
 * Mirrors the skill's JsonLdForBreadcrumb output. Relative routes stay relative when no
 * base URL exists (never invent a domain).
 */
export function breadcrumbJsonLd(items: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(hasSeoBaseUrl ? { item: `${seoConfig.baseUrl}${item.route}` } : {}),
    })),
  };
}
