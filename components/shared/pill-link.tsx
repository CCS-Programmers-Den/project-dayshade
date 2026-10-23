import Link from "next/link";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary: "bg-pd-green font-bold text-pd-black hover:bg-pd-bone",
  secondary: "border border-white/25 font-semibold text-pd-bone hover:border-pd-bone",
};

type PillLinkProps = {
  href: string;
  variant?: keyof typeof VARIANTS;
  className?: string;
  children: React.ReactNode;
};

export function PillLink({ href, variant = "primary", className, children }: PillLinkProps) {
  const classes = cn(
    "inline-flex h-14 items-center rounded-full px-8 text-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pd-green",
    VARIANTS[variant],
    className
  );
  // Anchors and external links skip client-side routing.
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
