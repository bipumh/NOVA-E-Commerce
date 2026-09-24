import "server-only";

import type { Order } from "@/types";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Reads every order (all customers) straight from the live `nova.orders` table
 * using the service-role client, which bypasses the "Own orders" RLS policy.
 * No bundled `sampleOrders` fallback — the admin panel always reflects real
 * checkout state.
 */
export async function getAdminOrders(): Promise<Order[]> {
  const admin = (() => {
    try {
      return getSupabaseAdmin();
    } catch {
      return null;
    }
  })();
  if (!admin) return [];

  const { data: orders, error } = await admin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !orders || orders.length === 0) return [];

  const orderIds = orders.map((order) => order.id);

  const { data: items, error: itemsError } = await admin
    .from("order_items")
    .select("*")
    .in("order_id", orderIds);
  if (itemsError) return [];

  const itemRows = items ?? [];
  const productIds = Array.from(
    new Set(
      itemRows
        .map((item) => item.product_id)
        .filter((id): id is string => id !== null),
    ),
  );

  const productsById = new Map<string, { slug: string; images: string[] }>();
  if (productIds.length > 0) {
    const { data: products, error: productsError } = await admin
      .from("products")
      .select("id, slug, images")
      .in("id", productIds);
    if (!productsError && products) {
      for (const product of products) {
        productsById.set(product.id, {
          slug: product.slug,
          images: product.images,
        });
      }
    }
  }

  const itemsByOrder = new Map<string, typeof itemRows>();
  for (const item of itemRows) {
    const list = itemsByOrder.get(item.order_id) ?? [];
    list.push(item);
    itemsByOrder.set(item.order_id, list);
  }

  return orders.map((order) => {
    const rows = itemsByOrder.get(order.id) ?? [];
    return {
      id: order.id,
      placedAt: order.created_at,
      status: order.status,
      paymentStatus: order.payment_status,
      email: order.email,
      items: rows.map((item) => {
        const product = item.product_id
          ? productsById.get(item.product_id)
          : undefined;
        return {
          product: {
            slug: product?.slug ?? "",
            name: item.name,
            price: Number(item.price),
            images: product?.images ?? [],
          },
          size: item.size ?? "",
          color: item.color ?? "",
          quantity: item.quantity,
        };
      }),
      subtotal: Number(order.subtotal),
      shipping: Number(order.shipping),
      total: Number(order.total),
      shippingName: order.shipping_name,
      shippingAddress: order.shipping_address,
      shippingCity: order.shipping_city,
      shippingPostal: order.shipping_postal,
      shippingCountry: order.shipping_country,
    };
  });
}
