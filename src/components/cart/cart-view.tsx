"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { OrderSummary } from "@/components/cart/order-summary";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { useCart } from "@/lib/store/cart-context";

export function CartView() {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your cart is empty"
        description="Explore the collection and add pieces you'll love. Your selections will appear here."
        action={{ label: "Shop the collection", href: "/shop" }}
      />
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h1 className="font-display text-2xl font-medium text-ink">Your cart</h1>
          <span className="text-sm text-muted">
            {items.reduce((n, l) => n + l.quantity, 0)} items
          </span>
        </div>
        <ul className="divide-y divide-line">
          {items.map((line) => (
            <CartLineItem key={line.id} line={line} />
          ))}
        </ul>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <OrderSummary
            subtotal={subtotal}
            action={
              <Button href="/checkout" className="w-full">
                Proceed to checkout
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      </aside>
    </div>
  );
}
