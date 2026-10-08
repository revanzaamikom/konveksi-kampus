import type { Category } from "@/lib/content/types";

/**
 * Raw category records (Standard content files).
 * Derived from the client's real product assets — see PRD.md §13.
 *
 * NOTE: UI must not import this file directly; read via `src/lib/content/categories.ts`.
 */
export const categories: Category[] = [
  {
    id: "cat-jaket",
    slug: "jaket",
    name: "Jaket",
    description: "Jaket lapangan, varsity, dan jaket kerja dengan opsi bordir.",
    order: 1,
  },
  {
    id: "cat-workshirt",
    slug: "workshirt",
    name: "Workshirt",
    description: "Kemeja kerja lapangan untuk instansi, organisasi, dan perusahaan.",
    order: 2,
  },
  {
    id: "cat-wearpack",
    slug: "wearpack",
    name: "Wearpack",
    description: "Wearpack/coverall untuk kebutuhan kerja dan kegiatan lapangan.",
    order: 3,
  },
  {
    id: "cat-kaos-kerah",
    slug: "kaos-kerah",
    name: "Kaos Kerah",
    description: "Kaos kerah (polo) dengan bordir logo dan identitas.",
    order: 4,
  },
  {
    id: "cat-korsa",
    slug: "korsa",
    name: "Korsa",
    description: "Kemeja korsa untuk jurusan, himpunan, dan kegiatan kampus.",
    order: 5,
  },
  {
    id: "cat-rompi",
    slug: "rompi",
    name: "Rompi",
    description: "Rompi bordir serbaguna untuk kegiatan dan organisasi.",
    order: 6,
  },
  {
    id: "cat-jas",
    slug: "jas",
    name: "Jas",
    description: "Jas laboratorium dan jas almamater.",
    order: 7,
  },
];
