import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Custom NOVA wordmark — a tight, high-contrast fashion-serif mark. Bold
 * vertical stems are paired with thin diagonals, crossbars and small serifs,
 * with a condensed oval O and a sharp V. Filled with a subtle champagne-gold
 * gradient so it reads slightly dimensional against matte black.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 168 66"
      className={className}
      aria-hidden="true"
      fill="url(#nova-gold)"
    >
      <defs>
        <linearGradient id="nova-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6d0a0" />
          <stop offset="0.55" stopColor="#c9a86a" />
          <stop offset="1" stopColor="#a8864c" />
        </linearGradient>
      </defs>
      {/* N */}
      <path d="M2 6 H12 V60 H2 Z" />
      <path d="M24 6 H34 V60 H24 Z" />
      <path d="M10.5 6.3 L13.5 5.7 L25.5 59.7 L22.5 60.3 Z" />
      <path d="M0 6 H14 V9 H0 Z" />
      <path d="M0 57 H14 V60 H0 Z" />
      <path d="M22 6 H36 V9 H22 Z" />
      <path d="M22 57 H36 V60 H22 Z" />
      {/* O */}
      <ellipse
        cx="62"
        cy="33"
        rx="12"
        ry="23"
        fill="none"
        stroke="url(#nova-gold)"
        strokeWidth="10"
      />
      {/* V */}
      <path d="M88 6 L102 60 L116 6 L106 6 L102 60 L98 6 Z" />
      <path d="M86 6 H100 V9 H86 Z" />
      <path d="M104 6 H118 V9 H104 Z" />
      {/* A */}
      <path d="M126 60 L136 60 L145 6 Z" />
      <path d="M164 60 L154 60 L145 6 Z" />
      <path d="M139 38 H151 V41 H139 Z" />
      <path d="M124 57 H138 V60 H124 Z" />
      <path d="M151 57 H165 V60 H151 Z" />
      <path d="M141 4 H149 V7 H141 Z" />
    </svg>
  );
}

export function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="NOVA — home"
      className={cn("inline-block select-none", className)}
    >
      <Wordmark className="h-7 sm:h-8" />
    </Link>
  );
}
