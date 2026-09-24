"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { shippingCost } from "@/components/cart/order-summary";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/store/cart-context";
import { useFocusTrap } from "@/lib/use-focus-trap";

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal } = useCart();
  const drawerRef = useRef<HTMLElement>(null);
  const shipping = shippingCost(subtotal);
  const total = subtotal + shipping;

  useFocusTrap(drawerRef, isOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden
          />
          <motion.aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="absolute inset-y-0 right-0 flex w-[min(92vw,26rem)] flex-col bg-ivory shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <h2 className="flex items-center gap-2 text-base font-medium text-ink">
                <ShoppingBag aria-hidden className="h-5 w-5" />
                Your cart
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                autoFocus
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-2"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-3 text-muted">
                  <ShoppingBag aria-hidden className="h-7 w-7" />
                </span>
                <p className="font-display text-xl font-medium text-ink">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted">
                  Explore the collection and add something you&apos;ll love.
                </p>
                <Button href="/shop" onClick={closeCart} className="mt-2">
                  Shop now
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                  {items.map((line) => (
                    <CartLineItem key={line.id} line={line} />
                  ))}
                </ul>

                <div className="border-t border-line p-5">
                  <dl className="space-y-2 text-sm">
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
                    <div className="flex items-center justify-between border-t border-line pt-2">
                      <dt className="text-base font-medium text-ink">Total</dt>
                      <dd className="text-base font-medium text-ink">{formatPrice(total)}</dd>
                    </div>
                  </dl>
                  <p className="mt-2 text-xs text-dim">Taxes calculated at checkout.</p>
                  <div className="mt-4 grid gap-2">
                    <Button href="/cart" onClick={closeCart} variant="outline">
                      View cart
                    </Button>
                    <Button href="/checkout" onClick={closeCart}>
                      Checkout
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </Button>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="link-underline mt-3 block text-center text-sm text-muted hover:text-ink"
                  >
                    Continue shopping
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
