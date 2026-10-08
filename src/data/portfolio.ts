import type { PortfolioItem } from "@/lib/content/types";

/**
 * Portfolio (foundation §9) — a sales asset, not just a gallery.
 *
 * Built from the client's REAL production photos. Client/institution names are only shown
 * where they are already public on the product photos (foundation §9 permits showing client
 * when allowed). Where the client name should not be public, it is left undefined.
 *
 * Do NOT add quantity, material, or result fields unless confirmed (foundation §22).
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "pf-korsa-perminyakan",
    slug: "korsa-perminyakan-upnvyk",
    title: "Korsa Perminyakan",
    productType: "Korsa",
    clientCategory: "Jurusan Kampus",
    customization: ["Bordir nama & NIM", "Bordir jurusan", "Emblem lengan"],
    images: [
      {
        src: "/images/products/korsa-perminyakan-upnvyk-front.webp",
        alt: "Korsa perminyakan jurusan dengan bordir nama, tampak depan",
        label: "Depan",
      },
      {
        src: "/images/products/korsa-perminyakan-upnvyk-back.webp",
        alt: "Korsa perminyakan dengan bordir nama jurusan, tampak belakang",
        label: "Belakang",
      },
    ],
    status: "published",
    order: 1,
  },
  {
    id: "pf-jacket-varsity",
    slug: "jacket-varsity-aiche",
    title: "Jacket Varsity Organisasi",
    productType: "Jaket",
    clientCategory: "Organisasi Mahasiswa",
    customization: ["Bordir nama organisasi", "Bordir emblem", "Rib kombinasi"],
    images: [
      {
        src: "/images/products/jacket-varsity.webp",
        alt: "Jacket varsity dengan bordir nama organisasi di bagian belakang",
      },
    ],
    status: "published",
    order: 2,
  },
  {
    id: "pf-jacket-lapangan",
    slug: "jacket-lapangan",
    title: "Jacket Lapangan",
    productType: "Jaket Lapangan",
    clientCategory: "Kegiatan Lapangan",
    customization: ["Bordir logo", "Striping reflektif"],
    images: [
      {
        src: "/images/products/jacket-lapangan.webp",
        alt: "Jacket lapangan berhood dengan striping reflektif",
      },
    ],
    status: "published",
    order: 3,
  },
  {
    id: "pf-wearpack-geologi",
    slug: "wearpack-pemetaan-geologi",
    title: "Wearpack Pemetaan Geologi",
    productType: "Wearpack",
    clientCategory: "Kegiatan Kampus",
    customization: ["Bordir nama kegiatan", "Striping reflektif", "Saku belakang"],
    images: [
      {
        src: "/images/products/wearpack-variasi-lengan-brown-front.webp",
        alt: "Wearpack kegiatan dengan bordir nama dan striping reflektif",
        label: "Cokelat",
      },
      {
        src: "/images/products/wearpack-variasi-lengan-white-front.webp",
        alt: "Wearpack kombinasi abu dengan bordir identitas",
        label: "Abu Terang",
      },
    ],
    status: "published",
    order: 4,
  },
  {
    id: "pf-jas-lab",
    slug: "jas-lab-teknik-kimia",
    title: "Jas Laboratorium",
    productType: "Jas Lab",
    clientCategory: "Laboratorium / Instansi",
    customization: ["Bordir nama instansi"],
    images: [
      {
        src: "/images/products/jas-lab-front.webp",
        alt: "Jas laboratorium dengan bordir nama instansi",
      },
    ],
    status: "published",
    order: 5,
  },
  {
    id: "pf-jas-almamater",
    slug: "jas-almamater",
    title: "Jas Almamater",
    productType: "Almamater",
    clientCategory: "Kampus",
    customization: ["Bordir emblem"],
    images: [
      {
        src: "/images/products/jas-almamater-front.webp",
        alt: "Jas almamater dengan bordir emblem pada bagian dada",
      },
    ],
    status: "published",
    order: 6,
  },
  {
    id: "pf-workshirt-agribusiness",
    slug: "workshirt-agribusiness",
    title: "Workshirt Instansi",
    productType: "Workshirt",
    clientCategory: "Instansi / Program Studi",
    customization: ["Bordir slogan & emblem", "Panel warna"],
    images: [
      {
        src: "/images/products/workshirt-agribusiness-instiper.webp",
        alt: "Workshirt instansi dengan bordir slogan di bagian belakang",
      },
    ],
    status: "published",
    order: 7,
  },
  {
    id: "pf-workshirt-karya-agung",
    slug: "workshirt-perusahaan",
    title: "Workshirt Perusahaan",
    productType: "Workshirt",
    clientCategory: "Perusahaan",
    customization: ["Bordir logo & slogan", "Combine panel"],
    images: [
      {
        src: "/images/products/workshirt-karya-agung-01.webp",
        alt: "Workshirt perusahaan dengan panel warna dan bordir identitas",
      },
    ],
    status: "published",
    order: 8,
  },
];
