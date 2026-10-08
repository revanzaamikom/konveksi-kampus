/**
 * Site-wide configuration — the single place for brand + contact facts.
 *
 * Values marked TODO are placeholders: the client has not yet provided them.
 * Do not invent contact details (see AGENTS.md §7).
 */

export const siteConfig = {
  name: "KonveksiKampus",
  shortName: "KonveksiKampus",
  tagline: "Konveksi Kampus",
  description:
    "Vendor konveksi untuk mahasiswa dan masyarakat umum. Melayani pembuatan kaos, jaket, workshirt, rompi, jas, dan wearpack dengan kualitas terbaik dan harga terjangkau.",
  url: "https://konveksikampus.example", // TODO: real domain
  locale: "id_ID",
  /**
   * WhatsApp number in international format without "+" or spaces.
   * TODO: confirm with client. Placeholder left intentionally obvious.
   */
  whatsappNumber: "6280000000000", // TODO: real WhatsApp number
  email: "halo@konveksikampus.example", // TODO: real email
  address: "Yogyakarta, Indonesia", // TODO: confirm with client
  socials: {
    instagram: "", // TODO: confirm with client
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Build a WhatsApp deep-link with a prefilled message. */
export function whatsappLink(message: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return `${base}?text=${encodeURIComponent(message)}`;
}
