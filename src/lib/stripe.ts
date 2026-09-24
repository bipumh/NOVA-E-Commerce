import "server-only";

import Stripe from "stripe";

/**
 * Lazily-created Stripe client. Returns `null` when no secret key is set so the
 * storefront keeps working without Stripe configured.
 */
export function getStripe(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  return new Stripe(secretKey);
}
