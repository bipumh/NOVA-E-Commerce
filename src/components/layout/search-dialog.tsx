"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { ProductImage } from "@/components/ui/image";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useFocusTrap } from "@/lib/use-focus-trap";

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, open);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        setQuery("");
        inputRef.current?.focus();
      }, 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) =>
        [p.name, p.brand, p.category, p.description, ...p.tags, ...p.details]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 5);
  }, [query]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            className="absolute inset-x-0 top-0 mx-auto w-full max-w-2xl px-4 pt-[12vh]"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
              <div className="flex items-center gap-3 border-b border-line px-5">
                <Search aria-hidden className="h-5 w-5 shrink-0 text-dim" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories, materials…"
                  className="h-16 w-full bg-transparent text-base text-ink placeholder:text-faint focus:outline-none"
                  aria-label="Search products"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close search"
                  className="rounded-full p-2 text-dim transition-colors hover:text-ink"
                >
                  <X aria-hidden className="h-5 w-5" />
                </button>
              </div>

              {results.length > 0 ? (
                <ul className="max-h-[52vh] overflow-y-auto p-2">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-surface-2"
                      >
                        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-3">
                          <ProductImage
                            id={product.images[0]}
                            alt={product.name}
                            sizes="56px"
                            width={200}
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-ink">
                            {product.name}
                          </span>
                          <span className="block text-xs capitalize text-dim">
                            {product.category}
                          </span>
                        </span>
                        <span className="text-sm font-medium text-ink">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="border-t border-line pt-2">
                    <Link
                      href={`/shop?q=${encodeURIComponent(query.trim())}`}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-clay transition-colors hover:bg-surface-2"
                    >
                      View all results for &ldquo;{query.trim()}&rdquo;
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </li>
                </ul>
              ) : (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-dim">
                    {query.trim()
                      ? `No results for “${query.trim()}”. Try “cashmere”, “leather” or “women”.`
                      : "Start typing to search the collection."}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
