"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  updateProductAction,
  type ProductActionState,
} from "@/lib/admin/actions";
import { ProductImageManager } from "@/components/admin/product-image-manager";
import type { Category, Product } from "@/types";

function colorsToText(colors: Product["colors"]): string {
  return colors.map((c) => `${c.name},${c.hex}`).join("\n");
}

export function ProductEditDialog({
  product,
  categories,
  onClose,
  onSaved,
}: {
  product: Product;
  categories: Category[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [state, formAction, pending] = useActionState<
    ProductActionState,
    FormData
  >(updateProductAction, {});
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
          aria-label={`Edit ${product.name}`}
          className="absolute left-1/2 top-1/2 flex max-h-[90vh] w-[min(94vw,38rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-lift"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
            <h3 className="font-display text-lg font-medium text-ink">Edit product</h3>
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
            <input type="hidden" name="id" value={product.id} />

            {state.error ? (
              <p
                role="alert"
                className="mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {state.error}
              </p>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" htmlFor="p-name" required>
                <Input id="p-name" name="name" defaultValue={product.name} required />
              </Field>
              <Field label="Slug" htmlFor="p-slug" required>
                <Input id="p-slug" name="slug" defaultValue={product.slug} required />
              </Field>
              <Field label="Brand" htmlFor="p-brand" required>
                <Input id="p-brand" name="brand" defaultValue={product.brand} required />
              </Field>
              <Field label="Category" htmlFor="p-category">
                <Select id="p-category" name="category" defaultValue={product.category}>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Price" htmlFor="p-price" required>
                <Input
                  id="p-price"
                  name="price"
                  inputMode="decimal"
                  defaultValue={String(product.price)}
                  required
                />
              </Field>
              <Field label="Compare-at price" htmlFor="p-compare">
                <Input
                  id="p-compare"
                  name="compareAt"
                  inputMode="decimal"
                  defaultValue={
                    product.compareAtPrice ? String(product.compareAtPrice) : ""
                  }
                  placeholder="Optional"
                />
              </Field>
              <Field label="Stock quantity" htmlFor="p-stock" hint="0 = out of stock">
                <Input
                  id="p-stock"
                  name="stockQuantity"
                  inputMode="numeric"
                  defaultValue={String(product.stockQuantity ?? 0)}
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Description" htmlFor="p-description">
                <Textarea
                  id="p-description"
                  name="description"
                  rows={3}
                  defaultValue={product.description}
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Details" htmlFor="p-details" hint="One per line">
                <Textarea
                  id="p-details"
                  name="details"
                  rows={4}
                  defaultValue={product.details.join("\n")}
                />
              </Field>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Sizes" htmlFor="p-sizes" hint="Comma-separated">
                <Input
                  id="p-sizes"
                  name="sizes"
                  defaultValue={product.sizes.join(", ")}
                />
              </Field>
              <Field label="Tags" htmlFor="p-tags" hint="Comma-separated">
                <Input id="p-tags" name="tags" defaultValue={product.tags.join(", ")} />
              </Field>
            </div>

            <div className="mt-4">
              <Field
                label="Colors"
                htmlFor="p-colors"
                hint="One per line as name,#hex (e.g. Ivory,#f4f1ea)"
              >
                <Textarea
                  id="p-colors"
                  name="colors"
                  rows={4}
                  defaultValue={colorsToText(product.colors)}
                />
              </Field>
            </div>

            <div className="mt-5 flex flex-wrap gap-5">
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  name="isNew"
                  defaultChecked={product.isNew}
                  className="h-4 w-4 rounded border-line-strong"
                />
                New
              </label>
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  name="isFeatured"
                  defaultChecked={product.isFeatured}
                  className="h-4 w-4 rounded border-line-strong"
                />
                Featured
              </label>
            </div>

            <ProductImageManager productId={product.id} images={product.images} />

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
