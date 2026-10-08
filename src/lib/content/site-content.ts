import { clients as rawClients } from "@/data/clients";
import { faqItems as rawFaq } from "@/data/faq";
import { materials as rawMaterials } from "@/data/materials";
import { portfolioItems as rawPortfolio } from "@/data/portfolio";
import { processSteps as rawProcess } from "@/data/process";
import { testimonials as rawTestimonials } from "@/data/testimonials";
import type {
  Client,
  FaqItem,
  Material,
  PortfolioItem,
  ProcessStep,
  Testimonial,
} from "@/lib/content/types";

/**
 * Content-layer for the trust & conversion entities (foundation §9–§14, §21).
 *
 * The ONLY module the UI may use to read these. In the Business phase the bodies are
 * replaced with DB queries; the signatures stay identical (ADR-002).
 */

// --- Portfolio ---------------------------------------------------------------
export async function getPortfolio(): Promise<PortfolioItem[]> {
  return rawPortfolio
    .filter((item) => item.status === "published")
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioItem | null> {
  return rawPortfolio.find((item) => item.slug === slug && item.status === "published") ?? null;
}

// --- Testimonials ------------------------------------------------------------
export async function getTestimonials(): Promise<Testimonial[]> {
  return rawTestimonials
    .filter((item) => item.status === "published")
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

// --- Clients -----------------------------------------------------------------
export async function getClients(): Promise<Client[]> {
  return [...rawClients].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

// --- Materials ---------------------------------------------------------------
export async function getMaterials(): Promise<Material[]> {
  return rawMaterials
    .filter((item) => item.status === "published")
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

// --- FAQ ---------------------------------------------------------------------
export async function getFaqItems(): Promise<FaqItem[]> {
  return [...rawFaq].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

// --- Process -----------------------------------------------------------------
export async function getProcessSteps(): Promise<ProcessStep[]> {
  return [...rawProcess].sort((a, b) => a.order - b.order);
}
