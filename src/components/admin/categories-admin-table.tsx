"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { ProductImage } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import {
  deleteCategoryAction,
  moveCategoryAction,
} from "@/lib/admin/actions";
import { CategoryCreateDialog } from "@/components/admin/category-create-dialog";
import { CategoryEditDialog } from "@/components/admin/category-edit-dialog";
import type { Category } from "@/types";

export function CategoriesAdminTable({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const nextOrder =
    categories.reduce((max, c) => Math.max(max, c.order ?? 0), 0) + 1;

  const move = (category: Category, direction: "up" | "down") => {
    setError(null);
    startTransition(async () => {
      const result = await moveCategoryAction(category.slug, direction);
      if (result.error) setError(result.error);
      else router.refresh();
    });
  };

  const remove = (category: Category) => {
    if (!window.confirm(`Delete "${category.name}"?`)) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteCategoryAction(category.slug);
      if (result.error) setError(result.error);
      else router.refresh();
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="font-display text-base font-medium text-ink">Categories</h2>
        <Button size="sm" onClick={() => setCreating(true)}>
          <Plus aria-hidden className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {error ? (
        <p
          role="alert"
          className="mx-5 mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </p>
      ) : null}

      {categories.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="text-sm font-medium text-ink">No categories yet</p>
          <p className="mt-1 text-sm text-muted">
            Add your first category to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2 text-left text-xs uppercase tracking-wide text-dim">
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Slug</th>
                <th className="px-5 py-3 font-medium">Tagline</th>
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {categories.map((category) => (
                <tr key={category.slug} className="bg-surface">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-surface-3">
                        <ProductImage
                          id={category.image}
                          alt=""
                          sizes="44px"
                          width={88}
                        />
                      </span>
                      <span className="font-medium text-ink">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted">{category.slug}</td>
                  <td className="px-5 py-3 text-muted">{category.tagline}</td>
                  <td className="px-5 py-3 text-muted">{category.order ?? 0}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => move(category, "up")}
                        disabled={isPending}
                        aria-label={`Move ${category.name} up`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-dim transition-colors hover:text-ink disabled:opacity-40"
                      >
                        <ArrowUp aria-hidden className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(category, "down")}
                        disabled={isPending}
                        aria-label={`Move ${category.name} down`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-dim transition-colors hover:text-ink disabled:opacity-40"
                      >
                        <ArrowDown aria-hidden className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditing(category)}
                        aria-label={`Edit ${category.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-dim transition-colors hover:text-clay"
                      >
                        <Pencil aria-hidden className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(category)}
                        aria-label={`Delete ${category.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-dim transition-colors hover:text-red-300"
                      >
                        <Trash2 aria-hidden className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing ? (
        <CategoryEditDialog
          category={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            router.refresh();
          }}
        />
      ) : null}

      {creating ? (
        <CategoryCreateDialog
          nextOrder={nextOrder}
          onClose={() => setCreating(false)}
          onSaved={() => {
            setCreating(false);
            router.refresh();
          }}
        />
      ) : null}
    </div>
  );
}
