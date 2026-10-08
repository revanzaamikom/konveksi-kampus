import type { Product } from "@/lib/content/types";

/**
 * Raw product records (content files, foundation §8/§21).
 *
 * Grouped from the client's real product photos (front/back = gallery, colours = variants).
 * Field values are only filled from the real assets — no invented materials, prices,
 * minimum order, or production times (foundation §22).
 *
 * NOTE: UI must not import this file directly; read via `src/lib/content/products.ts`.
 */
export const products: Product[] = [
  {
    id: "prd-korsa-perminyakan",
    slug: "korsa-perminyakan",
    name: "Korsa Perminyakan",
    categorySlug: "korsa",
    shortDescription: "Kemeja korsa lengan panjang dengan bordir nama dan identitas jurusan.",
    description:
      "Korsa lengan panjang dengan dua kantong dada berpentil, epaulet bahu, dan bordir nama serta identitas jurusan. Cocok untuk kegiatan kampus, himpunan, maupun komunitas.",
    character: "Rapi dipakai untuk kegiatan resmi maupun harian.",
    customization: ["Bordir nama & NIM", "Bordir emblem jurusan", "Kombinasi warna"],
    images: [
      {
        src: "/images/products/korsa-perminyakan-upnvyk-front.webp",
        alt: "Korsa perminyakan tampak depan dengan bordir nama di dada",
        label: "Depan",
      },
      {
        src: "/images/products/korsa-perminyakan-upnvyk-back.webp",
        alt: "Korsa perminyakan tampak belakang dengan bordir nama jurusan",
        label: "Belakang",
      },
    ],
    variants: [{ name: "Ukuran", options: ["S", "M", "L", "XL", "XXL"] }],
    status: "published",
    featured: true,
    order: 1,
  },
  {
    id: "prd-jacket-lapangan",
    slug: "jacket-lapangan",
    name: "Jacket Lapangan",
    categorySlug: "jaket",
    shortDescription: "Jaket lapangan berhood dengan striping reflektif dan bordir logo.",
    description:
      "Jaket lapangan berhood dengan zipper penuh dan striping reflektif pada bagian dada serta lengan. Dilengkapi bordir logo dan teks koordinat pada sisi depan.",
    character: "Jaket lapangan berhood yang fungsional untuk kegiatan outdoor.",
    customization: ["Bordir logo", "Striping reflektif", "Kombinasi warna"],
    images: [
      {
        src: "/images/products/jacket-lapangan.webp",
        alt: "Jacket lapangan berhood oranye dan biru dengan striping reflektif",
      },
    ],
    variants: [{ name: "Ukuran", options: ["M", "L", "XL", "XXL"] }],
    status: "published",
    featured: true,
    order: 2,
  },
  {
    id: "prd-jacket-lapangan-kombinasi-saku",
    slug: "jacket-lapangan-kombinasi-saku",
    name: "Jacket Lapangan Kombinasi Saku",
    categorySlug: "jaket",
    shortDescription: "Jaket outdoor berhood dengan kombinasi banyak saku berzipper.",
    description:
      "Jaket outdoor berhood dengan plaket setengah zipper, dua saku dada berzipper beserta flap, dan saku besar di bagian bawah. Dilengkapi tali drawstring yang dapat diatur.",
    character: "Jacket lapangan dengan saku banyak, praktis untuk mobilitas.",
    customization: ["Bordir logo", "Pilihan warna"],
    colors: ["Biru", "Merah"],
    images: [
      {
        src: "/images/products/jacket-lapangan-kombinasi-saku-blue.webp",
        alt: "Jacket lapangan kombinasi saku warna biru",
        label: "Biru",
      },
      {
        src: "/images/products/jacket-lapangan-kombinasi-saku-red.webp",
        alt: "Jacket lapangan kombinasi saku warna merah",
        label: "Merah",
      },
    ],
    variants: [
      { name: "Warna", options: ["Biru", "Merah"] },
      { name: "Ukuran", options: ["M", "L", "XL", "XXL"] },
    ],
    status: "published",
    order: 3,
  },
  {
    id: "prd-jacket-varsity",
    slug: "jacket-varsity",
    name: "Jacket Varsity",
    categorySlug: "jaket",
    shortDescription: "Jaket varsity dengan rib pada kerah, manset, dan pinggang.",
    description:
      "Jaket varsity dengan kombinasi warna pada badan dan lengan, serta rib bergaris pada kerah, manset, dan pinggang. Bordir nama dan identitas dapat disesuaikan.",
    character: "Jaket kampus atau komunitas dengan kombinasi klasik varsity.",
    customization: ["Bordir nama & emblem", "Kombinasi warna", "Aplikasi"],
    images: [
      {
        src: "/images/products/jacket-varsity.webp",
        alt: "Jacket varsity navy dengan lengan putih dan rib bergaris",
      },
    ],
    variants: [{ name: "Ukuran", options: ["S", "M", "L", "XL", "XXL"] }],
    status: "published",
    order: 4,
  },
  {
    id: "prd-workshirt-karya-agung",
    slug: "workshirt-karya-agung",
    name: "Workshirt Karya Agung",
    categorySlug: "workshirt",
    shortDescription: "Kemeja kerja lengan pendek dengan kombinasi panel dan bordir identitas.",
    description:
      "Kemeja kerja lengan pendek dengan kombinasi panel warna dan striping, serta bordir logo dan identitas pada bagian belakang. Tersedia dua pilihan desain.",
    character: "Kemeja kerja yang membawa identitas perusahaan di lapangan.",
    customization: ["Bordir logo & slogan", "Kombinasi panel warna"],
    images: [
      {
        src: "/images/products/workshirt-karya-agung-01.webp",
        alt: "Workshirt Karya Agung desain pertama dengan panel beige dan striping oranye",
        label: "Desain 1",
      },
      {
        src: "/images/products/workshirt-karya-agung-02.webp",
        alt: "Workshirt Karya Agung desain kedua dengan bordir logo di dada",
        label: "Desain 2",
      },
    ],
    variants: [{ name: "Ukuran", options: ["S", "M", "L", "XL", "XXL"] }],
    status: "published",
    order: 5,
  },
  {
    id: "prd-workshirt-agribusiness",
    slug: "workshirt-agribusiness",
    name: "Workshirt Agribusiness",
    categorySlug: "workshirt",
    shortDescription: "Kemeja kerja lengan pendek dengan bordir slogan pada bagian belakang.",
    description:
      "Kemeja kerja lengan pendek berwarna terang dengan kerah standar, dua kantong dada, dan epaulet bahu. Bordir slogan dan identitas pada bagian belakang.",
    character: "Kemeja kerja instansi/organisasi.",
    customization: ["Bordir slogan & emblem"],
    images: [
      {
        src: "/images/products/workshirt-agribusiness-instiper.webp",
        alt: "Workshirt Agribusiness biru muda dengan bordir slogan di belakang",
      },
    ],
    variants: [{ name: "Ukuran", options: ["S", "M", "L", "XL", "XXL"] }],
    status: "published",
    order: 6,
  },
  {
    id: "prd-wearpack-variasi-lengan",
    slug: "wearpack-variasi-lengan",
    name: "Wearpack Variasi Lengan",
    categorySlug: "wearpack",
    shortDescription: "Wearpack lengan panjang dengan kombinasi warna dan striping reflektif.",
    description:
      "Wearpack lengan panjang dengan kombinasi warna, epaulet bahu, dan striping reflektif pada bagian belakang. Dilengkapi saku dada berpentil dan penutup zipper.",
    character: "Wearpack kerja untuk perlindungan dan identitas di lapangan.",
    customization: ["Bordir nama & logo", "Pilihan warna", "Striping reflektif"],
    colors: ["Abu Terang", "Cokelat"],
    images: [
      {
        src: "/images/products/wearpack-variasi-lengan-white-front.webp",
        alt: "Wearpack variasi lengan kombinasi abu terang tampak depan",
        label: "Abu Terang",
      },
      {
        src: "/images/products/wearpack-variasi-lengan-brown-front.webp",
        alt: "Wearpack variasi lengan warna cokelat tampak depan",
        label: "Cokelat",
      },
      {
        src: "/images/products/wearpack-variasi-lengan-brown-back.webp",
        alt: "Wearpack variasi lengan warna cokelat tampak belakang",
        label: "Cokelat - Belakang",
      },
    ],
    variants: [
      { name: "Warna", options: ["Abu Terang", "Cokelat"] },
      { name: "Ukuran", options: ["M", "L", "XL", "XXL"] },
    ],
    status: "published",
    featured: true,
    order: 7,
  },
  {
    id: "prd-kaos-kerah-bordir",
    slug: "kaos-kerah-bordir",
    name: "Kaos Kerah Bordir",
    categorySlug: "polo",
    shortDescription: "Kaos kerah (polo) dengan bordir logo dan identitas instansi.",
    description:
      "Kaos kerah lengan pendek dengan kerah standar dan plaket dua kancing. Bordir logo dan identitas instansi di bagian dada. Tersedia berbagai pilihan warna.",
    character: "Polo instansi atau komunitas, rapi dan nyaman untuk kegiatan harian.",
    customization: ["Bordir logo dada", "Bordir nama/belakang", "Pilihan warna"],
    colors: ["Kuning", "Biru Tua", "Oranye"],
    images: [
      {
        src: "/images/products/kaos-kerah-bordir-geomatics-engineering-upnvyk.webp",
        alt: "Kaos kerah kuning dengan bordir logo di dada",
        label: "Geomatics Engineering",
      },
      {
        src: "/images/products/kaos-kerah-bordir-petroleum-engineering-upnvyk.webp",
        alt: "Kaos kerah biru tua dengan bordir emblem di dada",
        label: "Petroleum Engineering",
      },
      {
        src: "/images/products/kaos-kerah-bordir-teknik-geologi-itny.webp",
        alt: "Kaos kerah oranye dengan bordir teks di bagian belakang",
        label: "Teknik Geologi",
      },
    ],
    variants: [
      { name: "Warna", options: ["Kuning", "Biru Tua", "Oranye"] },
      { name: "Ukuran", options: ["S", "M", "L", "XL", "XXL"] },
    ],
    status: "published",
    order: 8,
  },
  {
    id: "prd-rompi-bordir",
    slug: "rompi-bordir",
    name: "Rompi Bordir",
    categorySlug: "rompi",
    shortDescription: "Rompi serbaguna dengan banyak saku dan bordir identitas.",
    description:
      "Rompi dengan zipper depan, beberapa saku berflap, dan bordir identitas pada bagian dada. Cocok untuk kegiatan lapangan, organisasi, maupun komunitas.",
    character: "Rompi serbaguna untuk panitia & kegiatan lapangan.",
    customization: ["Bordir logo & nama", "Pilihan warna", "Saku tambahan"],
    colors: ["Beige", "Abu"],
    images: [
      {
        src: "/images/products/rompi-bordir-beige-front.webp",
        alt: "Rompi bordir warna beige dengan saku serbaguna",
        label: "Beige",
      },
      {
        src: "/images/products/rompi-bordir-gray-front.webp",
        alt: "Rompi bordir warna abu dengan saku berzipper",
        label: "Abu",
      },
    ],
    variants: [
      { name: "Warna", options: ["Beige", "Abu"] },
      { name: "Ukuran", options: ["M", "L", "XL", "XXL"] },
    ],
    status: "published",
    order: 9,
  },
  {
    id: "prd-jas-lab",
    slug: "jas-lab",
    name: "Jas Lab",
    categorySlug: "jas-lab",
    shortDescription: "Jas laboratorium putih dengan bordir nama instansi.",
    description:
      "Jas laboratorium lengan panjang berwarna putih dengan kerah notch, kancing depan, dan kantong dada serta saku bawah. Bordir nama instansi dapat disesuaikan.",
    character: "Jas laboratorium untuk praktikum dan instansi.",
    customization: ["Bordir nama & instansi"],
    images: [
      {
        src: "/images/products/jas-lab-front.webp",
        alt: "Jas laboratorium putih tampak depan dengan bordir nama instansi",
        label: "Depan",
      },
      {
        src: "/images/products/jas-lab-back.webp",
        alt: "Jas laboratorium putih tampak belakang",
        label: "Belakang",
      },
    ],
    variants: [{ name: "Ukuran", options: ["S", "M", "L", "XL", "XXL"] }],
    status: "published",
    order: 10,
  },
  {
    id: "prd-jas-almamater",
    slug: "jas-almamater",
    name: "Jas Almamater",
    categorySlug: "almamater",
    shortDescription: "Jas almamater dengan bordir emblem pada bagian dada.",
    description:
      "Jas almamater dengan kancing depan, kerah notch, dan saku berflap. Bordir emblem pada bagian dada dan dapat disesuaikan dengan identitas kampus.",
    character: "Jas almamater kampus & sekolah.",
    customization: ["Bordir emblem", "Pilihan warna almamater"],
    images: [
      {
        src: "/images/products/jas-almamater-front.webp",
        alt: "Jas almamater merah tampak depan dengan bordir emblem",
        label: "Depan",
      },
      {
        src: "/images/products/jas-almamater-back.webp",
        alt: "Jas almamater merah tampak belakang",
        label: "Belakang",
      },
    ],
    variants: [{ name: "Ukuran", options: ["S", "M", "L", "XL", "XXL"] }],
    status: "published",
    order: 11,
  },
];
