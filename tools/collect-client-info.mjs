/**
 * KonveksiKampus — public-info collector (client data gathering).
 *
 * Gathers PUBLIC information about the Instagram account
 * https://www.instagram.com/konveksikampus.yk/ and the business:
 *   1. Firecrawl search + scrape for public text info (contact, services, location)
 *   2. Download the public profile picture / logo image
 *   3. Extract the dominant colour palette from that image
 *
 * Uses Firecrawl (key from .env.local, reused from the SCRAP project).
 * Read-only against other projects; writes only under tools/output/.
 *
 * Usage:
 *   node tools/collect-client-info.mjs
 *   node tools/collect-client-info.mjs --search-only
 *   node tools/collect-client-info.mjs --image-only
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const BASE = "https://api.firecrawl.dev/v2";
const OUT = resolve(root, "tools/output");
mkdirSync(OUT, { recursive: true });

// ---- load env.local --------------------------------------------------------
function loadEnv() {
  const p = resolve(root, ".env.local");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
loadEnv();

const KEY = process.env.FIRECRAWL_API_KEY || "";
if (!KEY.startsWith("fc-")) {
  console.error("FIRECRAWL_API_KEY tidak ditemukan / tidak valid di .env.local");
  process.exit(1);
}

const headers = { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fcPost(path, body, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${BASE}${path}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        json = { raw: text };
      }
      if (!res.ok) {
        console.error(`  ! ${path} HTTP ${res.status}:`, JSON.stringify(json).slice(0, 300));
        if (res.status === 429 && attempt < retries) {
          await sleep(20000);
          continue;
        }
        return { ok: false, status: res.status, data: json };
      }
      return { ok: true, status: res.status, data: json };
    } catch (e) {
      console.error(`  ! ${path} error:`, e.message);
      if (attempt < retries) await sleep(5000);
      else return { ok: false, error: e.message };
    }
  }
}

async function search(query, limit = 10) {
  console.log(`\n[search] ${query}`);
  const r = await fcPost("/search", { query, limit, sources: ["web"] });
  if (!r.ok) return [];
  const d = r.data?.data ?? r.data;
  const web = Array.isArray(d) ? d : (d?.web ?? []);
  console.log(`  → ${web.length} hasil`);
  return web.map((w) => ({
    title: w.title || w.metadata?.title || "",
    url: w.url || w.metadata?.sourceURL || "",
    description: w.description || w.metadata?.description || "",
  }));
}

async function scrape(url, formats = ["markdown"]) {
  console.log(`  [scrape] ${url}`);
  const r = await fcPost("/scrape", {
    url,
    formats,
    onlyMainContent: true,
  });
  if (!r.ok) return null;
  const d = r.data?.data ?? r.data;
  return {
    url,
    statusCode: d?.metadata?.statusCode ?? null,
    title: d?.metadata?.title ?? null,
    description: d?.metadata?.description ?? null,
    ogImage: d?.metadata?.ogImage ?? null,
    markdown: d?.markdown ?? "",
    html: d?.html ?? "",
  };
}

/** Download a public image URL to disk. Returns the saved path or null. */
async function downloadImage(url, filename) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; KonveksiKampusBot/1.0)" },
    });
    if (!res.ok) {
      console.error(`  ! image HTTP ${res.status} for ${url}`);
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = (url.match(/\.(png|jpe?g|webp)(\?|$)/i)?.[1] || "jpg").toLowerCase();
    const path = resolve(OUT, `${filename}.${ext}`);
    writeFileSync(path, buf);
    console.log(`  [img] saved ${path} (${(buf.length / 1024).toFixed(0)} KB)`);
    return path;
  } catch (e) {
    console.error(`  ! image error:`, e.message);
    return null;
  }
}

const args = new Set(process.argv.slice(2));
const searchOnly = args.has("--search-only");
const imageOnly = args.has("--image-only");

const QUERIES = [
  "konveksikampus.yk instagram",
  "Konveksi Kampus Yogyakarta konveksi",
  "konveksikampus.yk kontak whatsapp",
  "Konveksi Kampus Yogyakarta alamat",
  '"Konveksi Kampus" kaos jaket almamater',
];

const report = {
  generatedAt: new Date().toISOString(),
  target: "KonveksiKampus (konveksikampus.yk)",
  searches: [],
  pages: [],
  images: [],
};

// --- 1) discovery searches --------------------------------------------------
if (!imageOnly) {
  for (const q of QUERIES) {
    report.searches.push({ query: q, results: await search(q) });
    await sleep(7000);
  }
}

// --- 2) curated pages -------------------------------------------------------
const candidateUrls = new Set(["https://www.instagram.com/konveksikampus.yk/"]);
for (const s of report.searches) {
  for (const r of s.results) {
    if (!r.url) continue;
    if (/instagram\.com\/konveksikampus/i.test(r.url)) candidateUrls.add(r.url);
    if (/konveksikampus/i.test(r.url)) candidateUrls.add(r.url);
  }
}

const imageUrls = new Set();
if (!searchOnly) {
  for (const url of candidateUrls) {
    const page = await scrape(url, ["markdown", "html"]);
    if (page) {
      report.pages.push(page);
      if (page.ogImage) imageUrls.add(page.ogImage);
      // pull any igcdn / cdninstagram image links out of the html
      const matches = (page.html || "").match(/https:\/\/[^"'\s)]*cdninstagram[^"'\s)]*/g) || [];
      for (const m of matches.slice(0, 5)) imageUrls.add(m.replace(/&amp;/g, "&"));
    }
    await sleep(7000);
  }
}

// --- 3) download images -----------------------------------------------------
let i = 0;
for (const img of imageUrls) {
  const saved = await downloadImage(img, `profile-${i}`);
  report.images.push({ source: img, saved: saved ? saved.replace(root + "\\", "") : null });
  i++;
}

const outFile = resolve(OUT, "client-info-raw.json");
writeFileSync(outFile, JSON.stringify(report, null, 2), "utf8");

console.log(
  `\n✅ Selesai. ${report.searches.length} pencarian, ${report.pages.length} halaman, ${report.images.length} gambar.`,
);
console.log(`   → ${outFile}`);
