"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  updateCategoryAction,
  type CategoryActionState,
} from "@/lib/admin/actions";
import type { Category } from "@/types";

export function CategoryEditDialog({
  category,
  onClose,
  onSaved,
}: {
  category: Category;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [state, formAction, pending] = useActionState<
    CategoryActionState,
    FormData
  >(updateCategoryAction, {});
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
          aria-label={`Edit ${category.name}`}
          className="absolute left-1/2 top-1/2 flex max-h-[90vh] w-[min(94vw,38rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-lift"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
            <h3 className="font-display text-lg font-medium text-ink">Edit category</h3>
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
            <input type="hidden" name="originalSlug" value={category.slug} />

            {state.error ? (
              <p
                role="alert"
                className="mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {state.error}
              </p>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" htmlFor="cat-name" required>
                <Input id="cat-name" name="name" defaultValue={category.name} required />
              </Field>
              <Field
                label="Slug"
                htmlFor="cat-slug"
                required
                hint="Lowercase, URL-safe (e.g. new-arrivals)"
              >
                <Input id="cat-slug" name="slug" defaultValue={category.slug} required />
              </Field>
              <Field label="Tagline" htmlFor="cat-tagline">
                <Input id="cat-tagline" name="tagline" defaultValue={category.tagline} />
              </Field>
              <Field
                label="Display order"
                htmlFor="cat-order"
                hint="Lower numbers appear first"
              >
                <Input
                  id="cat-order"
                  name="order"
                  inputMode="numeric"
                  defaultValue={String(category.order ?? 0)}
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field
                label="Image"
                htmlFor="cat-image"
                hint="Unsplash photo id or full image URL"
              >
                <Input id="cat-image" name="image" defaultValue={category.image} />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Description" htmlFor="cat-description">
                <Textarea
                  id="cat-description"
                  name="description"
                  rows={3}
                  defaultValue={category.description}
                />
              </Field>
            </div>

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
