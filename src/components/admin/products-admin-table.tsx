"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { toggleStockAction } from "@/lib/admin/actions";
import { ProductEditDialog } from "@/components/admin/product-edit-dialog";
import { ProductCreateDialog } from "@/components/admin/product-create-dialog";
import type { Category, Product } from "@/types";

export function ProductsAdminTable({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const toggleStock = (product: Product) => {
    setError(null);
    startTransition(async () => {
      const result = await toggleStockAction(
        product.id,
        !product.inStock,
        product.stockQuantity ?? 0,
      );
      if (result.error) setError(result.error);
      else router.refresh();
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="font-display text-base font-medium text-ink">Products</h2>
        <Button size="sm" onClick={() => setCreating(true)}>
          <Plus aria-hidden className="h-4 w-4" />
          Add Product
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

      {products.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="text-sm font-medium text-ink">No products yet</p>
          <p className="mt-1 text-sm text-muted">
            Add your first product to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2 text-left text-xs uppercase tracking-wide text-dim">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Qty</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Rating</th>
                <th className="px-5 py-3 font-medium">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {products.map((product) => (
                <tr key={product.id} className="bg-surface">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="relative h-11 w-9 shrink-0 overflow-hidden rounded-md bg-surface-3">
                        <ProductImage
                          id={product.images[0] ?? ""}
                          alt=""
                          sizes="36px"
                          width={80}
                        />
                      </span>
                      <div>
                        <span className="block font-medium text-ink">{product.name}</span>
                        {product.isNew || product.isFeatured ? (
                          <span className="mt-1 flex items-center gap-1.5">
                            {product.isNew ? <Badge tone="accent">New</Badge> : null}
                            {product.isFeatured ? <Badge tone="soft">Featured</Badge> : null}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 capitalize text-muted">{product.category}</td>
                  <td className="px-5 py-3 text-ink">{formatPrice(product.price)}</td>
                  <td className="px-5 py-3 text-muted">
                    {product.stockQuantity ?? 0}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      type="button"
                      onClick={() => toggleStock(product)}
                      disabled={isPending}
                      aria-pressed={product.inStock}
                      aria-label={
                        product.inStock ? "Mark out of stock" : "Mark in stock"
                      }
                      className="inline-flex items-center gap-2.5"
                    >
                      <span
                        className={cn(
                          "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
                          product.inStock ? "bg-clay" : "bg-surface-3",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 transform rounded-full bg-paper shadow-sm transition-transform",
                            product.inStock ? "translate-x-[18px]" : "translate-x-0.5",
                          )}
                        />
                      </span>
                      <span className="text-xs font-medium text-muted">
                        {product.inStock ? "In stock" : "Out of stock"}
                      </span>
                    </button>
                  </td>
                  <td className="px-5 py-3 text-muted">
                    {product.rating.toFixed(1)} · {product.reviewCount}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      type="button"
                      onClick={() => setEditing(product)}
                      aria-label={`Edit ${product.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-dim transition-colors hover:text-clay"
                    >
                      <Pencil aria-hidden className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing ? (
        <ProductEditDialog
          product={editing}
          categories={categories}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            router.refresh();
          }}
        />
      ) : null}

      {creating ? (
        <ProductCreateDialog
          categories={categories}
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
