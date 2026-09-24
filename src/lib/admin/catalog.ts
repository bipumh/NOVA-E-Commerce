import "server-only";

import type { Category, Product } from "@/types";
import { getSupabaseServer } from "@/lib/supabase/server";
import { mapCategoryRow, mapProductRow } from "@/lib/catalog/mapping";

/**
 * Admin read helpers. These read the live Supabase tables directly (no bundled
 * fallback) so the admin panel always reflects the real catalog state.
 */
export async function getAdminProducts(): Promise<Product[]> {
  const client = await getSupabaseServer();
  if (!client) return [];

  const { data, error } = await client
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapProductRow);
}

export async function getAdminCategories(): Promise<Category[]> {
  const client = await getSupabaseServer();
  if (!client) return [];

  const { data, error } = await client
    .from("categories")
    .select("*")
    .order("order");

  if (error || !data) return [];
  return data.map(mapCategoryRow);
}
