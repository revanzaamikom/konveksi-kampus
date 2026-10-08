import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] px-6 text-sm font-semibold transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-accent",
  secondary: "border-border text-foreground hover:bg-muted border",
};

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
}

export function LinkButton({ href, children, variant = "primary", external }: LinkButtonProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${variants[variant]}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
