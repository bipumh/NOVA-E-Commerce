import { products } from "@/data/products";
import type { Order } from "@/types";

function line(
  slug: string,
  size: string,
  color: string,
  quantity: number,
): Order["items"][number] {
  const product = products.find((p) => p.slug === slug)!;
  return {
    product: {
      slug: product.slug,
      name: product.name,
      price: product.price,
      images: product.images,
    },
    size,
    color,
    quantity,
  };
}

function buildOrder(
  id: string,
  placedAt: string,
  status: Order["status"],
  paymentStatus: Order["paymentStatus"],
  items: Order["items"],
): Order {
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  return {
    id,
    placedAt,
    status,
    paymentStatus,
    items,
    subtotal,
    shipping: subtotal >= 150 ? 0 : 10,
    total: subtotal + (subtotal >= 150 ? 0 : 10),
  };
}

/**
 * Placeholder order history shown before a real order is placed (or before
 * Supabase auth is connected). Swapped out for the user's localStorage-backed
 * orders once they check out.
 */
export const sampleOrders: Order[] = [
  buildOrder("NOVA-2409182", "2026-09-12T09:24:00.000Z", "Delivered", "paid", [
    line("tailored-wool-overcoat", "M", "Camel", 1),
    line("cashmere-scarf", "One size", "Ivory", 1),
  ]),
  buildOrder("NOVA-2408714", "2026-08-27T16:02:00.000Z", "Delivered", "paid", [
    line("minimal-leather-sneaker", "9", "Ivory", 1),
    line("relaxed-cotton-tee", "L", "Ink", 2),
  ]),
  buildOrder("NOVA-2409431", "2026-09-18T11:47:00.000Z", "Processing", "pending", [
    line("structured-leather-tote", "One size", "Camel", 1),
  ]),
];
