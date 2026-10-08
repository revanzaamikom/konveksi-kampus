import type { Metadata } from "next";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi KonveksiKampus untuk konsultasi dan pemesanan produk konveksi.",
};

const askMessage =
  "Halo KonveksiKampus, saya ingin berkonsultasi mengenai kebutuhan konveksi saya.";

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Kontak</h1>
      <p className="text-muted mt-3 max-w-2xl">
        Punya pertanyaan atau ingin memesan? Hubungi kami melalui WhatsApp untuk respons tercepat.
      </p>

      <dl className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="border-border rounded-lg border p-5">
          <dt className="text-muted text-sm font-semibold">Alamat</dt>
          <dd className="mt-1">{siteConfig.address}</dd>
        </div>
        <div className="border-border rounded-lg border p-5">
          <dt className="text-muted text-sm font-semibold">Email</dt>
          <dd className="mt-1">
            <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
              {siteConfig.email}
            </a>
          </dd>
        </div>
      </dl>

      <a
        href={whatsappLink(askMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary text-primary-foreground mt-8 inline-flex h-12 items-center rounded-md px-6 text-sm font-semibold transition-opacity hover:opacity-90"
      >
        Hubungi via WhatsApp
      </a>
    </main>
  );
}
