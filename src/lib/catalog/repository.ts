import { cache } from "react";
import type { Category, Product } from "@/types";
import { getSupabaseServer } from "@/lib/supabase/server";
import { filterAndSortProducts, type CatalogFilters } from "@/lib/catalog";
import { mapCategoryRow, mapProductRow } from "./mapping";
import {
  categories as bundledCategories,
  getCategory as getBundledCategory,
} from "@/data/categories";
import {
  getProduct as getBundledProduct,
  getRelatedProducts as getBundledRelatedProducts,
  products as bundledProducts,
} from "@/data/products";

type ProductOptions = CatalogFilters;

/**
 * Reads products from Supabase when available. Returns `null` when Supabase is
 * not configured, the query errors, or the table is empty — signalling the
 * caller to use the bundled fallback catalog instead.
 */
async function queryProducts(category?: string): Promise<Product[] | null> {
  const client = await getSupabaseServer();
  if (!client) return null;

  try {
    let query = client.from("products").select("*");
    if (category) query = query.eq("category", category);
    const { data, error } = await query;
    if (error) return null;
    if (!data || data.length === 0) return null;
    return data.map(mapProductRow);
  } catch {
    return null;
  }
}

export const getCategories = cache(async (): Promise<Category[]> => {
  const client = await getSupabaseServer();
  if (client) {
    try {
      const { data, error } = await client
        .from("categories")
        .select("*")
        .order("order");
      if (!error && data && data.length > 0) {
        return data.map(mapCategoryRow);
      }
    } catch {
      // fall back below
    }
  }
  return bundledCategories;
});

export const getCategoryBySlug = cache(
  async (slug: string): Promise<Category | null> => {
    const client = await getSupabaseServer();
    if (client) {
      try {
        const { data, error } = await client
          .from("categories")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();
        if (!error && data) return mapCategoryRow(data);
      } catch {
        // fall back below
      }
    }
    return getBundledCategory(slug) ?? null;
  },
);

export const getProducts = cache(
  async (options: ProductOptions = {}): Promise<Product[]> => {
    const fromSupabase = await queryProducts(options.category);
    const list = fromSupabase ?? bundledProducts;
    return filterAndSortProducts(list, options);
  },
);

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | null> => {
    const client = await getSupabaseServer();
    if (client) {
      try {
        const { data, error } = await client
          .from("products")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();
        if (!error && data) return mapProductRow(data);
      } catch {
        // fall back below
      }
    }
    return getBundledProduct(slug) ?? null;
  },
);

export const getRelatedProducts = cache(
  async (slug: string, category: string, limit = 4): Promise<Product[]> => {
    const same = await queryProducts(category);
    if (same) {
      const related = same.filter((p) => p.slug !== slug);
      if (related.length >= limit) return related.slice(0, limit);

      const all = await queryProducts();
      if (all) {
        const rest = all.filter(
          (p) => p.slug !== slug && p.category !== category,
        );
        return [...related, ...rest].slice(0, limit);
      }
      return related;
    }

    const product = getBundledProduct(slug);
    return product ? getBundledRelatedProducts(product, limit) : [];
  },
);
