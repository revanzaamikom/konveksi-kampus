import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "btn-wipe inline-flex min-h-[54px] items-center justify-center rounded-[var(--radius-control)] px-8 text-[18px] leading-snug font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "border border-foreground/30 text-foreground hover:border-foreground",
};

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}

export function LinkButton({
  href,
  children,
  variant = "primary",
  external,
  className,
}: LinkButtonProps) {
  const resolved = [base, variants[variant], className].filter(Boolean).join(" ");
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={resolved}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={resolved}>
      {children}
    </Link>
  );
}
