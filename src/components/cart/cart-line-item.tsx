"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ProductImage } from "@/components/ui/image";
import { formatPrice } from "@/lib/format";
import { useCart, type CartLine } from "@/lib/store/cart-context";

export function CartLineItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, size, color, quantity } = line;

  return (
    <li className="flex gap-4 py-4">
      <Link
        href={`/product/${product.slug}`}
        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-3"
      >
        <ProductImage id={product.images[0]} alt={product.name} sizes="80px" width={200} />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${product.slug}`}
              className="block truncate text-sm font-medium text-ink hover:text-clay"
            >
              {product.name}
            </Link>
            {size || color ? (
              <p className="mt-0.5 text-xs text-dim">
                {[size, color].filter(Boolean).join(" · ")}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => removeItem(line.id)}
            aria-label={`Remove ${product.name}`}
            className="shrink-0 p-1 text-dim transition-colors hover:text-clay"
          >
            <Trash2 aria-hidden className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="inline-flex items-center rounded-full border border-line-strong">
            <button
              type="button"
              onClick={() => updateQuantity(line.id, quantity - 1)}
              aria-label="Decrease quantity"
              className="inline-flex h-8 w-8 items-center justify-center text-ink hover:text-clay"
            >
              <Minus aria-hidden className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-medium tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(line.id, Math.min(99, quantity + 1))}
              disabled={quantity >= 99}
              aria-label="Increase quantity"
              className="inline-flex h-8 w-8 items-center justify-center text-ink transition-colors hover:text-clay disabled:opacity-40"
            >
              <Plus aria-hidden className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="text-sm font-medium text-ink">
            {formatPrice(product.price * quantity)}
          </span>
        </div>
      </div>
    </li>
  );
}
