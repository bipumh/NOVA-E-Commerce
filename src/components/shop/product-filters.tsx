"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { PRICE_OPTIONS } from "@/lib/catalog";
import type { ProductColor } from "@/types";

export function ProductFilters({
  sizes,
  colors,
}: {
  sizes: string[];
  colors: ProductColor[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const price = searchParams.get("price");
  const inStock = searchParams.get("inStock") === "1";

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const clearAll = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    for (const key of ["color", "size", "price", "inStock"]) params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  const activeCount = [color, size, price, inStock].filter(Boolean).length;
  const priceLabel = PRICE_OPTIONS.find((o) => o.key === price)?.label;

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay"
        >
          <SlidersHorizontal aria-hidden className="h-4 w-4" />
          Filters
          {activeCount > 0 ? (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1.5 text-[10px] font-semibold leading-none text-paper">
              {activeCount}
            </span>
          ) : null}
        </button>

        {color ? <Chip label={color} onRemove={() => setParam("color", null)} /> : null}
        {size ? <Chip label={`Size ${size}`} onRemove={() => setParam("size", null)} /> : null}
        {price ? <Chip label={priceLabel ?? price} onRemove={() => setParam("price", null)} /> : null}
        {inStock ? <Chip label="In stock" onRemove={() => setParam("inStock", null)} /> : null}

        {activeCount > 0 ? (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-clay"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              className="absolute inset-y-0 right-0 flex w-[min(84vw,22rem)] flex-col bg-ivory shadow-lift"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-16 items-center justify-between border-b border-line px-5">
                <span className="font-display text-lg font-medium text-ink">Filters</span>
                <div className="flex items-center gap-2">
                  {activeCount > 0 ? (
                    <button
                      type="button"
                      onClick={clearAll}
                      className="text-xs font-medium text-muted transition-colors hover:text-clay"
                    >
                      Clear all
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close filters"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink"
                  >
                    <X aria-hidden className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6">
                {/* Colour */}
                <section className="border-b border-line pb-6">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">Colour</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {colors.map((c) => {
                      const active = color === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setParam("color", active ? null : c.name)}
                          aria-pressed={active}
                          aria-label={c.name}
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                            active ? "border-clay" : "border-line-strong hover:border-clay",
                          )}
                        >
                          <span
                            className="h-6 w-6 rounded-full border border-line"
                            style={{ backgroundColor: c.hex }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Size */}
                <section className="border-b border-line py-6">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">Size</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {sizes.map((s) => {
                      const active = size === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setParam("size", active ? null : s)}
                          aria-pressed={active}
                          className={cn(
                            "inline-flex h-10 min-w-11 items-center justify-center rounded-full border px-3 text-sm font-medium transition-colors",
                            active
                              ? "border-clay bg-clay text-paper"
                              : "border-line-strong text-ink hover:border-clay hover:text-clay",
                          )}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Price */}
                <section className="border-b border-line py-6">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">Price</h3>
                  <div className="mt-4 space-y-2">
                    {PRICE_OPTIONS.map((o) => {
                      const active = price === o.key;
                      return (
                        <button
                          key={o.key}
                          type="button"
                          onClick={() => setParam("price", active ? null : o.key)}
                          aria-pressed={active}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                            active ? "text-clay" : "text-muted hover:text-ink",
                          )}
                        >
                          <span className={cn("h-2 w-2 rounded-full", active ? "bg-clay" : "bg-line-strong")} />
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Availability */}
                <section className="pt-6">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">Availability</h3>
                  <button
                    type="button"
                    onClick={() => setParam("inStock", inStock ? null : "1")}
                    aria-pressed={inStock}
                    className="mt-4 flex w-full items-center justify-between text-sm font-medium text-ink"
                  >
                    <span>In stock only</span>
                    <span
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-colors",
                        inStock ? "bg-clay" : "bg-surface-3",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all",
                          inStock ? "left-[22px]" : "left-0.5",
                        )}
                      />
                    </span>
                  </button>
                </section>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-sm font-medium text-ink">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="text-dim transition-colors hover:text-clay"
      >
        <X aria-hidden className="h-3.5 w-3.5" />
      </button>
    </span>
  );
}
