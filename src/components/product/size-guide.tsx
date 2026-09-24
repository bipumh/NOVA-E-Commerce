"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const CLOTHING_SIZES = [
  { size: "XS", chest: '32–34"', waist: '26–28"' },
  { size: "S", chest: '34–36"', waist: '28–30"' },
  { size: "M", chest: '36–38"', waist: '30–32"' },
  { size: "L", chest: '38–40"', waist: '32–34"' },
  { size: "XL", chest: '40–42"', waist: '34–36"' },
];

const SHOE_SIZES = [
  { us: "6", eu: "39" },
  { us: "7", eu: "40" },
  { us: "8", eu: "41" },
  { us: "9", eu: "42" },
  { us: "10", eu: "43" },
  { us: "11", eu: "44" },
];

export function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
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
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Size guide"
            className="absolute left-1/2 top-1/2 flex max-h-[90vh] w-[min(92vw,26rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-lift"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
              <h3 className="font-display text-lg font-medium text-ink">Size guide</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close size guide"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-dim transition-colors hover:text-ink"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5">
              <section className="pb-6">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">Clothing</h4>
                <table className="mt-3 w-full text-sm">
                  <thead>
                    <tr className="border-b border-line text-left text-dim">
                      <th className="pb-2 font-medium">Size</th>
                      <th className="pb-2 font-medium">Chest</th>
                      <th className="pb-2 font-medium">Waist</th>
                    </tr>
                  </thead>
                  <tbody className="text-ink">
                    {CLOTHING_SIZES.map((row) => (
                      <tr key={row.size} className="border-b border-line last:border-0">
                        <td className="py-2 font-medium">{row.size}</td>
                        <td className="py-2">{row.chest}</td>
                        <td className="py-2">{row.waist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section className="pb-6">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">Shoes</h4>
                <table className="mt-3 w-full text-sm">
                  <thead>
                    <tr className="border-b border-line text-left text-dim">
                      <th className="pb-2 font-medium">US</th>
                      <th className="pb-2 font-medium">EU</th>
                    </tr>
                  </thead>
                  <tbody className="text-ink">
                    {SHOE_SIZES.map((row) => (
                      <tr key={row.us} className="border-b border-line last:border-0">
                        <td className="py-2 font-medium">{row.us}</td>
                        <td className="py-2">{row.eu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">One size</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  One-size pieces are designed to fit most — no size selection is required.
                </p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
