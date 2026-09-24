"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  createProductAction,
  type ProductActionState,
} from "@/lib/admin/actions";
import type { Category } from "@/types";

export function ProductCreateDialog({
  categories,
  onClose,
  onSaved,
}: {
  categories: Category[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [state, formAction, pending] = useActionState<
    ProductActionState,
    FormData
  >(createProductAction, {});
  const didSave = useRef(false);

  useEffect(() => {
    if (state.success && !didSave.current) {
      didSave.current = true;
      onSaved();
    }
  }, [state.success, onSaved]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80]"
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
          aria-label="Add product"
          className="absolute left-1/2 top-1/2 flex max-h-[90vh] w-[min(94vw,38rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-lift"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
            <h3 className="font-display text-lg font-medium text-ink">Add product</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-dim transition-colors hover:text-ink"
            >
              <X aria-hidden className="h-5 w-5" />
            </button>
          </div>

          <form action={formAction} className="overflow-y-auto px-5 py-5">
            {state.error ? (
              <p
                role="alert"
                className="mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {state.error}
              </p>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" htmlFor="c-name" required>
                <Input id="c-name" name="name" required />
              </Field>
              <Field label="Slug" htmlFor="c-slug" required>
                <Input id="c-slug" name="slug" required />
              </Field>
              <Field label="Brand" htmlFor="c-brand" required>
                <Input id="c-brand" name="brand" defaultValue="NOVA" required />
              </Field>
              <Field label="Category" htmlFor="c-category">
                <Select id="c-category" name="category" defaultValue="">
                  <option value="">None</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Price" htmlFor="c-price" required>
                <Input id="c-price" name="price" inputMode="decimal" required />
              </Field>
              <Field label="Compare-at price" htmlFor="c-compare">
                <Input
                  id="c-compare"
                  name="compareAt"
                  inputMode="decimal"
                  placeholder="Optional"
                />
              </Field>
              <Field label="Stock quantity" htmlFor="c-stock" hint="0 = out of stock">
                <Input
                  id="c-stock"
                  name="stockQuantity"
                  inputMode="numeric"
                  defaultValue="0"
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Description" htmlFor="c-description">
                <Textarea id="c-description" name="description" rows={3} />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Details" htmlFor="c-details" hint="One per line">
                <Textarea id="c-details" name="details" rows={4} />
              </Field>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Sizes" htmlFor="c-sizes" hint="Comma-separated">
                <Input id="c-sizes" name="sizes" />
              </Field>
              <Field label="Tags" htmlFor="c-tags" hint="Comma-separated">
                <Input id="c-tags" name="tags" />
              </Field>
            </div>

            <div className="mt-4">
              <Field
                label="Colors"
                htmlFor="c-colors"
                hint="One per line as name,#hex (e.g. Ivory,#f4f1ea)"
              >
                <Textarea id="c-colors" name="colors" rows={3} />
              </Field>
            </div>

            <div className="mt-5 flex flex-wrap gap-5">
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  name="isNew"
                  className="h-4 w-4 rounded border-line-strong"
                />
                New
              </label>
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  name="isFeatured"
                  className="h-4 w-4 rounded border-line-strong"
                />
                Featured
              </label>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? "Creating…" : "Create product"}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
