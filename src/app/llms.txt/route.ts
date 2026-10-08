import { getCategories } from "@/lib/content/categories";
import { getProducts } from "@/lib/content/products";
import { getFaqItems, getMaterials } from "@/lib/content/site-content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Machine-readable site summary for AI assistants (skill: llms-txt-generator).
 * Static text route so it is published by the static export.
 */
export async function GET() {
  const [categories, products, faqs, materials] = await Promise.all([
    getCategories(),
    getProducts(),
    getFaqItems(),
    getMaterials(),
  ]);

  const lines = [
    `# ${siteConfig.displayName}`,
    ``,
    `> ${siteConfig.description}`,
    ``,
    `Lokasi: ${siteConfig.address}. Berdiri sejak ${siteConfig.established}.`,
    `Kontak utama: WhatsApp ${siteConfig.whatsappNumber} (format internasional, tanpa +).`,
    `Instagram: ${siteConfig.socials.instagram}`,
    ``,
    `## Kategori Produk`,
    ``,
    ...categories.flatMap((c) => [
      `- ${c.name}${c.forWhom ? ` — untuk ${c.forWhom}` : ""}${
        c.description ? `: ${c.description}` : ""
      }`,
    ]),
    ``,
    `## Produk`,
    ``,
    ...products.flatMap((p) => [
      `- ${p.name}: ${p.shortDescription ?? p.description}`,
      ...(p.customization?.length ? [`  Kustomisasi: ${p.customization.join(", ")}`] : []),
      ...(p.colors?.length ? [`  Warna: ${p.colors.join(", ")}`] : []),
    ]),
    ...(materials.length ? [``, `## Bahan`, ``, ...materials.map((m) => `- ${m.name}`)] : []),
    ``,
    `## Pertanyaan Umum`,
    ``,
    ...faqs.flatMap((f) => [`### ${f.question}`, ``, f.answer, ``]),
    ``,
    `## Cara Memesan`,
    ``,
    `Hubungi via WhatsApp dengan detail: jenis produk, jumlah, deadline, dan status desain/referensi.`,
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
