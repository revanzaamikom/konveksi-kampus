import type { Category } from "@/lib/content/types";

/**
 * Raw category records (content files, foundation §8/§21).
 * Cover images use real client product photos where available. PDH/PDL and Kaos have no
 * dedicated photo yet — left without an image rather than faking one (foundation §22).
 *
 * NOTE: UI must not import this file directly; read via `src/lib/content/categories.ts`.
 */
export const categories: Category[] = [
  {
    id: "cat-pdh-pdl",
    slug: "pdh-pdl",
    name: "PDH & PDL",
    description: "Pakaian dinas harian dan lapangan untuk instansi, perusahaan, dan organisasi.",
    forWhom: "Perusahaan, instansi, dan organisasi",
    order: 1,
  },
  {
    id: "cat-jaket",
    slug: "jaket",
    name: "Jaket",
    description: "Jaket lapangan, varsity, dan jaket komunitas dengan opsi bordir.",
    forWhom: "Organisasi, komunitas, dan perusahaan",
    image: "/images/products/jacket-lapangan.webp",
    order: 2,
  },
  {
    id: "cat-korsa",
    slug: "korsa",
    name: "Korsa",
    description: "Kemeja korsa untuk jurusan, himpunan, dan kegiatan kampus.",
    forWhom: "Jurusan, himpunan, dan organisasi kampus",
    image: "/images/products/korsa-perminyakan-upnvyk-front.webp",
    order: 3,
  },
  {
    id: "cat-workshirt",
    slug: "workshirt",
    name: "Workshirt",
    description: "Kemeja kerja lapangan untuk instansi, organisasi, dan perusahaan.",
    forWhom: "Perusahaan dan pekerjaan lapangan",
    image: "/images/products/workshirt-agribusiness-instiper.webp",
    order: 4,
  },
  {
    id: "cat-wearpack",
    slug: "wearpack",
    name: "Wearpack",
    description: "Wearpack / coverall untuk kebutuhan kerja dan kegiatan lapangan.",
    forWhom: "Perusahaan, proyek, dan kegiatan lapangan",
    image: "/images/products/wearpack-variasi-lengan-brown-front.webp",
    order: 5,
  },
  {
    id: "cat-polo",
    slug: "polo",
    name: "Polo",
    description: "Kaos kerah (polo) dengan bordir logo dan identitas instansi.",
    forWhom: "Instansi, komunitas, dan event",
    image: "/images/products/kaos-kerah-bordir-geomatics-engineering-upnvyk.webp",
    order: 6,
  },
  {
    id: "cat-kaos",
    slug: "kaos",
    name: "Kaos",
    description: "Kaos satuan, komunitas, dan angkatan dengan sablon atau bordir.",
    forWhom: "Komunitas, angkatan, dan event",
    order: 7,
  },
  {
    id: "cat-almamater",
    slug: "almamater",
    name: "Almamater",
    description: "Jas almamater kampus dan sekolah dengan bordir emblem.",
    forWhom: "Kampus dan sekolah",
    image: "/images/products/jas-almamater-front.webp",
    order: 8,
  },
  {
    id: "cat-rompi",
    slug: "rompi",
    name: "Rompi",
    description: "Rompi bordir serbaguna untuk kegiatan, organisasi, dan lapangan.",
    forWhom: "Organisasi, panitia, dan kegiatan lapangan",
    image: "/images/products/rompi-bordir-beige-front.webp",
    order: 9,
  },
  {
    id: "cat-jas-lab",
    slug: "jas-lab",
    name: "Jas Lab",
    description: "Jas laboratorium dengan bordir nama instansi.",
    forWhom: "Laboratorium, kampus, dan instansi",
    image: "/images/products/jas-lab-front.webp",
    order: 10,
  },
];
