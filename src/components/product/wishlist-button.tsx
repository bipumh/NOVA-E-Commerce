"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";
import { useWishlist } from "@/lib/store/wishlist-context";
import type { Product } from "@/types";

export function WishlistButton({
  product,
  className,
  variant = "outline",
}: {
  product: Product;
  className?: string;
  variant?: "icon" | "outline";
}) {
  const { has, toggle } = useWishlist();
  const active = has(product.slug);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => toggle(product)}
        aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={active}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-clay hover:text-clay",
          active && "border-clay bg-clay text-paper hover:text-paper",
          className,
        )}
      >
        <Heart aria-hidden className={cn("h-5 w-5", active && "fill-current")} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(product)}
      aria-pressed={active}
      className={cn(
        "inline-flex h-14 items-center justify-center gap-2 rounded-full border border-line-strong px-7 text-sm font-medium transition-colors hover:border-clay hover:text-clay",
        active && "border-clay text-clay",
        className,
      )}
    >
      <Heart aria-hidden className={cn("h-4 w-4", active && "fill-current")} />
      {active ? "Saved" : "Save"}
    </button>
  );
}
