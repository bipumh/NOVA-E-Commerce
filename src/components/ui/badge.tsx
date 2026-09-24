import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em]",
  {
    variants: {
      tone: {
        neutral: "bg-surface-3 text-muted",
        accent: "bg-clay text-paper",
        soft: "bg-primary-soft text-primary",
        outline: "border border-line-strong text-muted",
        chip: "bg-paper text-ink shadow-soft",
        success: "bg-emerald-500/15 text-emerald-300",
        danger: "bg-red-500/15 text-red-300",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export function Badge({
  tone,
  className,
  children,
}: VariantProps<typeof badgeVariants> & {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn(badgeVariants({ tone }), className)}>{children}</span>
  );
}
