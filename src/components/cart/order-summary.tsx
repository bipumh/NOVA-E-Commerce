"use client";

import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/format";

export function shippingCost(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= 150 ? 0 : 10;
}

export function OrderSummary({
  subtotal,
  className,
  action,
}: {
  subtotal: number;
  className?: string;
  action?: React.ReactNode;
}) {
  const shipping = shippingCost(subtotal);
  const total = subtotal + shipping;

  return (
    <div className={className}>
      <h2 className="font-display text-lg font-medium text-ink">Order summary</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="font-medium text-ink">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted">Shipping</dt>
          <dd className="font-medium text-ink">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </dd>
        </div>
        {shipping > 0 ? (
          <p className="rounded-lg bg-primary-soft px-3 py-2 text-xs text-primary">
            Spend {formatPrice(150 - subtotal)} more for complimentary shipping.
          </p>
        ) : null}
        <div className="flex items-center justify-between border-t border-line pt-3">
          <dt className="text-base font-medium text-ink">Total</dt>
          <dd className="text-base font-medium text-ink">{formatPrice(total)}</dd>
        </div>
      </dl>
      {action ? (
        <div className="mt-5">{action}</div>
      ) : (
        <p className="mt-4 flex items-center gap-2 text-xs text-dim">
          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
          Taxes calculated at checkout
        </p>
      )}
    </div>
  );
}
