"use server";

import type { Product } from "@/types";
import { getCurrentUser, getSupabaseServer } from "@/lib/supabase/server";
import { mapProductRow } from "@/lib/catalog/mapping";

async function resolveProductId(slug: string): Promise<string | null> {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("products")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return data.id;
}

/**
 * Returns the authenticated user's wishlist as full products, most-recently
 * added first. Returns an empty list when not signed in or not configured.
 */
export async function getWishlist(): Promise<Product[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const supabase = await getSupabaseServer();
  if (!supabase) return [];

  const { data: rows, error } = await supabase
    .from("wishlists")
    .select("product_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error || !rows || rows.length === 0) return [];

  const ids = rows.map((row) => row.product_id);
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .in("id", ids);
  if (productsError || !products) return [];

  const order = new Map(rows.map((row, i) => [row.product_id, i]));
  return products
    .map(mapProductRow)
    .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
}

export async function addToWishlist(slug: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) return;

  const supabase = await getSupabaseServer();
  if (!supabase) return;

  const productId = await resolveProductId(slug);
  if (!productId) return;

  await supabase
    .from("wishlists")
    .upsert(
      { user_id: user.id, product_id: productId },
      { onConflict: "user_id,product_id" },
    );
}

export async function removeFromWishlist(slug: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) return;

  const supabase = await getSupabaseServer();
  if (!supabase) return;

  const productId = await resolveProductId(slug);
  if (!productId) return;

  await supabase
    .from("wishlists")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId);
}
