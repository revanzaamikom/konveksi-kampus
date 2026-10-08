import Image from "next/image";
import { assetPath } from "@/lib/site";

interface ProductImageProps {
  src: string;
  alt: string;
  /** Parent element MUST be positioned (relative) — the image fills it. */
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Product image wrapper around next/image, using `fill`.
 *
 * next/image applies basePath automatically, which keeps GitHub Pages (subpath)
 * and Netlify (root) both working from the same source. Images are served
 * unoptimized because the site is a static export (see next.config.ts).
 */
export function ProductImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: ProductImageProps) {
  return (
    <Image
      src={assetPath(src)}
      alt={alt}
      fill
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
      className={className ?? "object-cover"}
    />
  );
}
