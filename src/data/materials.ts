import type { Material } from "@/lib/content/types";

/**
 * Materials (foundation §11).
 *
 * Only NAMES are listed, from the project foundation (which the client provided).
 * Specs (thickness, texture, benefits) are intentionally LEFT EMPTY until the client
 * confirms them (foundation §22: do not invent technical specs).
 *
 * The UI must not render empty spec rows.
 */
export const materials: Material[] = [
  {
    id: "mat-american-drill",
    slug: "american-drill",
    name: "American Drill",
    status: "published",
    order: 1,
  },
  {
    id: "mat-nagata-drill",
    slug: "nagata-drill",
    name: "Nagata Drill",
    status: "published",
    order: 2,
  },
  {
    id: "mat-japan-drill",
    slug: "japan-drill",
    name: "Japan Drill",
    status: "published",
    order: 3,
  },
  {
    id: "mat-ripstop",
    slug: "ripstop",
    name: "Ripstop",
    status: "published",
    order: 4,
  },
];
