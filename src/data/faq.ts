import type { FaqItem } from "@/lib/content/types";

/**
 * FAQ (foundation §14) — written to answer customer objections.
 *
 * IMPORTANT (foundation §22): answers must not invent facts such as minimum order,
 * production time, price, or shipping policy. Where the client has not confirmed a value,
 * the answer routes the customer to consultation instead of stating a number.
 */
export const faqItems: FaqItem[] = [
  {
    id: "faq-custom-desain",
    question: "Apakah bisa custom desain?",
    answer:
      "Bisa. Kami mengerjakan pesanan custom sesuai kebutuhan Anda — model, warna, ukuran, hingga penempatan bordir atau sablon.",
    order: 1,
  },
  {
    id: "faq-desain-sendiri",
    question: "Apakah bisa menggunakan desain sendiri?",
    answer:
      "Bisa. Anda dapat mengirimkan desain yang sudah jadi, dan kami sesuaikan dengan spesifikasi produksi.",
    order: 2,
  },
  {
    id: "faq-belum-punya-desain",
    question: "Bagaimana jika saya belum memiliki desain?",
    answer:
      "Tidak masalah. Cukup sampaikan jenis pakaian dan referensi yang Anda suka, kami bantu arahkan detail desainnya saat konsultasi.",
    order: 3,
  },
  {
    id: "faq-jenis-produk",
    question: "Produk apa saja yang bisa dibuat?",
    answer:
      "Antara lain PDH, PDL, korsa, polo, kaos, jaket, almamater, rompi, wearpack, dan jas lab. Untuk produk lain, silakan tanyakan.",
    order: 4,
  },
  {
    id: "faq-minimum-order",
    question: "Berapa minimum order?",
    answer:
      "Jumlah minimum tergantung jenis produk. Silakan hubungi kami melalui WhatsApp untuk informasi jumlah minimum yang berlaku.",
    order: 5,
  },
  {
    id: "faq-lama-produksi",
    question: "Berapa lama waktu produksi?",
    answer:
      "Waktu produksi menyesuaikan jumlah dan tingkat kesulitan pesanan. Estimasi akan kami sampaikan saat konsultasi.",
    order: 6,
  },
  {
    id: "faq-custom-ukuran",
    question: "Apakah bisa custom ukuran?",
    answer: "Bisa. Kami melayani ukuran standar maupun permintaan ukuran khusus.",
    order: 7,
  },
  {
    id: "faq-bordir",
    question: "Apakah bisa bordir?",
    answer: "Bisa. Bordir tersedia untuk logo, nama, maupun emblem instansi.",
    order: 8,
  },
  {
    id: "faq-sablon",
    question: "Apakah bisa sablon?",
    answer: "Bisa. Sablon dapat disesuaikan dengan desain dan jenis bahan yang dipilih.",
    order: 9,
  },
  {
    id: "faq-sample",
    question: "Apakah bisa membuat sample?",
    answer:
      "Untuk permintaan sample, silakan konsultasikan terlebih dahulu agar kami jelaskan opsi yang tersedia.",
    order: 10,
  },
  {
    id: "faq-kirim-luar-kota",
    question: "Apakah bisa dikirim ke luar kota?",
    answer: "Bisa. Pengiriman luar kota dapat kami atur sesuai kesepakatan.",
    order: 11,
  },
  {
    id: "faq-quotation",
    question: "Bagaimana cara mendapatkan quotation?",
    answer:
      "Kirimkan detail kebutuhan Anda — jenis produk, jumlah, dan deadline — melalui WhatsApp. Kami akan berikan penawaran.",
    order: 12,
  },
  {
    id: "faq-tentukan-bahan",
    question: "Bagaimana cara menentukan bahan?",
    answer:
      "Kami bantu rekomendasikan bahan sesuai penggunaan dan budget Anda. Silakan tanyakan saat konsultasi.",
    order: 13,
  },
];
