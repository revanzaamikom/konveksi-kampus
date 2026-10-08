/**
 * Site-wide configuration — the single place for brand + contact facts.
 *
 * ⚠️ VERIFICATION STATUS (see CLIENT_DATA.md):
 *   - Instagram / Linktree (handle, tagline, est. 2012, WhatsApp 6288221729053): from the
 *     client's own public profiles — reasonably reliable.
 *   - WhatsApp alt (0813-6702-9003), website, address, email: from an OLD Facebook post and
 *     are UNVERIFIED. konveksikampus.com resolves but returns HTTP 403 (no live content),
 *     so it is NOT used as the canonical URL.
 *
 * Do not treat unverified values as fact. Confirm with the client before a production launch.
 */

/**
 * Canonical production URL. Left EMPTY until the client confirms the real domain.
 * Set via NEXT_PUBLIC_SITE_URL at build time (Netlify env) once known.
 *
 * When empty, Next.js resolves metadata (OG image, icons) as root-relative URLs, which is
 * correct and safe for the preview. No invented domain is committed.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const siteConfig = {
  name: "KonveksiKampus",
  shortName: "KonveksiKampus",
  displayName: "Konveksi Kampus",
  tagline: "Vendor Konveksi Yogyakarta",
  description:
    "Vendor konveksi Yogyakarta sejak 2012. Melayani pembuatan jaket, kaos, korsa, workshirt, wearpack, rompi, jas lab, dan jas almamater.",
  /** Empty until confirmed. See comment above. */
  url: siteUrl,
  locale: "id_ID",
  established: 2012, // from Instagram bio ("est. 2012")
  /**
   * Primary WhatsApp in international format without "+" or spaces.
   * Source: the client's Linktree (wa.me/6288221729053) — the most reliable public channel.
   */
  whatsappNumber: "6288221729053",
  /** UNVERIFIED — from an old Facebook post. Confirm before using. */
  whatsappNumberAlt: "6281367029003",
  instagram: "konveksikampus.yk",
  /** UNVERIFIED — do NOT assume a domain email exists. Placeholder, confirm with client. */
  email: "", // TODO(client): real email
  /** PARTIAL + UNVERIFIED — only "Jl. Betoro Raya No.1" was found. Confirm the full address. */
  address: "Yogyakarta", // TODO(client): full address
  socials: {
    instagram: "https://www.instagram.com/konveksikampus.yk/",
    linktree: "https://linktr.ee/konveksikampus.yk",
  },
} as const;

/** True when a canonical URL has been configured. */
export const hasCanonicalUrl = siteConfig.url.length > 0;

export type SiteConfig = typeof siteConfig;

/**
 * Base path the site is served from.
 *
 * Empty on Netlify / local dev (served from root). Set to "/konveksi-kampus" for the
 * GitHub Pages build, where the site lives under a repo subpath. Mirrors next.config.ts.
 */
export const basePath = process.env.GITHUB_PAGES === "true" ? "/konveksi-kampus" : "";

/**
 * Prefix a public asset path with the base path.
 *
 * Needed because next/image does NOT apply basePath when `unoptimized: true`
 * (static export), so `/images/...` must be resolved manually.
 */
export function assetPath(path: string): string {
  if (!path) return path;
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

/** Build a WhatsApp deep-link with a prefilled message. */
export function whatsappLink(message: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return `${base}?text=${encodeURIComponent(message)}`;
}
