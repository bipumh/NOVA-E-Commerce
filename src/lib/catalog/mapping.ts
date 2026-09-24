import type { Category, Product } from "@/types";
import type { CategoryRow, ProductRow } from "@/types/database";

/**
 * Converts Supabase rows (snake_case, `numeric`-as-string) into the
 * application's domain types. These helpers keep the presentation layer free
 * of any knowledge of the database shape.
 */
export function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    price: Number(row.price),
    compareAtPrice:
      row.compare_at_price != null ? Number(row.compare_at_price) : undefined,
    description: row.description ?? "",
    details: row.details ?? [],
    images: row.images ?? [],
    category: row.category ?? "",
    colors: row.colors ?? [],
    sizes: row.sizes ?? [],
    isNew: row.is_new || undefined,
    isFeatured: row.is_featured || undefined,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    inStock: row.in_stock,
    stockQuantity: row.stock_quantity,
    tags: row.tags ?? [],
  };
}

export function mapCategoryRow(row: CategoryRow): Category {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    image: row.image ?? "",
    order: row.order,
  };
}
