"use client";

import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { ProductImage } from "@/components/ui/image";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/shared/price";
import { useCart } from "@/lib/store/cart-context";
import { useWishlist } from "@/lib/store/wishlist-context";
import type { Product } from "@/types";

export function ProductCard({
  product,
  className,
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  const { has, toggle } = useWishlist();
  const { addItem, openCart } = useCart();
  const wished = has(product.slug);

  const quickAdd = () => {
    addItem(product, product.sizes[0] ?? "", product.colors[0]?.name ?? "");
    openCart();
  };

  return (
    <div className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-line/60 bg-surface-3 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-clay/40">
        <Link
          href={`/product/${product.slug}`}
          aria-label={product.name}
          className="block h-full w-full"
        >
          <ProductImage
            id={product.images[0]}
            alt={product.name}
            priority={priority}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {product.images[1] ? (
            <span
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            >
              <ProductImage
                id={product.images[1]}
                alt=""
                className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </span>
          ) : null}
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {!product.inStock ? <Badge tone="chip">Sold out</Badge> : null}
          {product.isNew ? <Badge tone="chip">New</Badge> : null}
          {product.compareAtPrice ? <Badge tone="accent">Sale</Badge> : null}
        </div>

        <button
          type="button"
          onClick={() => toggle(product)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-ink shadow-soft transition-all hover:scale-105 hover:text-clay"
        >
          <Heart
            aria-hidden
            className={cn("h-4 w-4 transition-colors", wished && "fill-clay text-clay")}
          />
        </button>

        {product.inStock ? (
          <button
            type="button"
            onClick={quickAdd}
            className="pointer-coarse:hidden absolute inset-x-3 bottom-3 flex h-11 translate-y-2 items-center justify-center gap-2 rounded-full bg-ink/90 text-sm font-medium text-paper opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-ink focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Plus aria-hidden className="h-4 w-4" />
            Add to cart
          </button>
        ) : null}
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-1">
        <Link
          href={`/product/${product.slug}`}
          className="text-sm font-medium leading-snug text-ink transition-colors hover:text-clay"
        >
          {product.name}
        </Link>
        <Price amount={product.price} compareAt={product.compareAtPrice} size="sm" />
      </div>
    </div>
  );
}
