import type { ProcessStep } from "@/lib/content/types";

/**
 * Production process (foundation §13). The six steps are the general order flow;
 * adjust wording with the client if their process differs.
 */
export const processSteps: ProcessStep[] = [
  {
    id: "step-1",
    step: "01",
    title: "Konsultasi",
    description: "Sampaikan kebutuhan Anda — jenis produk, jumlah, dan referensi.",
    order: 1,
  },
  {
    id: "step-2",
    step: "02",
    title: "Tentukan Spesifikasi",
    description: "Kami bantu tentukan bahan, ukuran, warna, dan detail produksi.",
    order: 2,
  },
  {
    id: "step-3",
    step: "03",
    title: "Finalisasi Desain",
    description: "Desain dan penempatan bordir/sablon difinalkan sebelum produksi.",
    order: 3,
  },
  {
    id: "step-4",
    step: "04",
    title: "Produksi",
    description: "Pesanan dikerjakan sesuai spesifikasi yang telah disepakati.",
    order: 4,
  },
  {
    id: "step-5",
    step: "05",
    title: "Quality Control",
    description: "Pemeriksaan hasil sebelum dikirim untuk memastikan kualitas.",
    order: 5,
  },
  {
    id: "step-6",
    step: "06",
    title: "Pengiriman",
    description: "Pesanan dikemas dan dikirim sesuai kesepakatan.",
    order: 6,
  },
];
