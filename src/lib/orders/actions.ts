"use server";

import { headers } from "next/headers";
import type Stripe from "stripe";
import { getCurrentUser, getSupabaseServer } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type OrderItemInput = {
  slug: string;
  size: string;
  color: string;
  quantity: number;
};

export type OrderInput = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  items: OrderItemInput[];
};

export type OrderResult = {
  error?: string;
  orderId?: string;
};

const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_FEE = 10;

export async function createOrder(input: OrderInput): Promise<OrderResult> {
  const user = await getCurrentUser();
  if (!user) return { error: "Please sign in to place your order." };

  const supabase = await getSupabaseServer();
  if (!supabase) return { error: "Orders are unavailable right now." };

  const email = input.email.trim();
  const shippingName =
    `${input.firstName.trim()} ${input.lastName.trim()}`.trim();

  if (
    !email ||
    !input.firstName.trim() ||
    !input.lastName.trim() ||
    !input.address.trim() ||
    !input.city.trim() ||
    !input.postal.trim()
  ) {
    return { error: "Please complete all required shipping fields." };
  }

  if (!Array.isArray(input.items) || input.items.length === 0) {
    return { error: "Your cart is empty." };
  }

  // Fetch current prices server-side — never trust prices from the browser.
  const slugs = input.items.map((item) => item.slug);
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, slug, name, price")
    .in("slug", slugs);
  if (productsError || !products) {
    return { error: "Unable to load product information." };
  }

  const bySlug = new Map(products.map((p) => [p.slug, p]));

  let subtotal = 0;
  const orderItems: {
    product_id: string;
    name: string;
    price: number;
    size: string | null;
    color: string | null;
    quantity: number;
  }[] = [];

  for (const item of input.items) {
    const product = bySlug.get(item.slug);
    if (!product) return { error: "One or more items are no longer available." };

    const price = Number(product.price);
    const quantity = Math.max(1, Math.min(99, Math.floor(item.quantity) || 1));
    subtotal += price * quantity;

    orderItems.push({
      product_id: product.id,
      name: product.name,
      price,
      size: item.size || null,
      color: item.color || null,
      quantity,
    });
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      status: "Processing",
      payment_status: "pending",
      email,
      shipping_name: shippingName,
      shipping_address: input.address.trim(),
      shipping_city: input.city.trim(),
      shipping_postal: input.postal.trim(),
      shipping_country: input.country.trim(),
      subtotal,
      shipping,
      total,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return { error: "Could not place your order. Please try again." };
  }

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems.map((item) => ({ ...item, order_id: order.id })));

  if (itemsError) {
    await supabase.from("orders").delete().eq("id", order.id);
    return { error: "Could not place your order. Please try again." };
  }

  return { orderId: order.id };
}

export type CheckoutSessionResult = {
  error?: string;
  url?: string;
};

export async function createCheckoutSession(
  orderId: string,
): Promise<CheckoutSessionResult> {
  const user = await getCurrentUser();
  if (!user) return { error: "Please sign in to continue." };

  const stripe = getStripe();
  if (!stripe) return { error: "Payments are not configured." };

  const supabase = await getSupabaseServer();
  if (!supabase) return { error: "Orders are unavailable right now." };

  // Verify the order belongs to the authenticated user.
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id, shipping")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (orderError || !order) return { error: "Order not found." };

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("name, price, quantity")
    .eq("order_id", orderId);
  if (itemsError || !items || items.length === 0) {
    return { error: "Order has no items." };
  }

  // Build line items from server-side order data (never from the browser).
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
    (item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity,
    }),
  );

  const shippingAmount = Number(order.shipping);
  if (shippingAmount > 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Shipping" },
        unit_amount: Math.round(shippingAmount * 100),
      },
      quantity: 1,
    });
  }

  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const origin = `${protocol}://${host}`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin}/orders`,
    cancel_url: `${origin}/checkout?cancelled=true`,
    metadata: { order_id: orderId },
  });

  if (!session.url) return { error: "Could not start the payment." };

  return { url: session.url };
}

export type PlaceOrderResult = {
  error?: string;
  url?: string;
  orderId?: string;
};

/**
 * Places an order and returns the URL to redirect the customer to.
 *
 * - Demo mode (`DEMO_PAYMENT_MODE=true`): simulates a successful payment on the
 *   server (marks the order `paid`) and returns the /orders page.
 * - Otherwise: creates a real Stripe Checkout Session and returns its URL.
 *
 * The demo branch is decided server-side from the environment variable only —
 * it can never be enabled or triggered from the browser.
 */
export async function placeOrder(input: OrderInput): Promise<PlaceOrderResult> {
  const order = await createOrder(input);
  if (order.error || !order.orderId) {
    return { error: order.error ?? "Could not create your order." };
  }

  if (process.env.DEMO_PAYMENT_MODE === "true") {
    const paid = await completeDemoPayment(order.orderId);
    if (!paid) return { error: "Could not complete the demo payment." };
    return { url: `/orders?payment=demo&order=${order.orderId}`, orderId: order.orderId };
  }

  const session = await createCheckoutSession(order.orderId);
  if (session.error || !session.url) {
    return { error: session.error ?? "Could not start the payment." };
  }
  return { url: session.url, orderId: order.orderId };
}

/**
 * Marks the signed-in user's order as paid via the service-role client (which
 * bypasses RLS, exactly as the Stripe webhook does). Ownership is re-verified
 * before the update so a user can only complete their own order.
 */
async function completeDemoPayment(orderId: string): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  try {
    const admin = getSupabaseAdmin();
    const { error } = await admin
      .from("orders")
      .update({ payment_status: "paid" })
      .eq("id", orderId)
      .eq("user_id", user.id);
    return !error;
  } catch {
    return false;
  }
}
