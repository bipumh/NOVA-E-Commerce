"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Lock, ShoppingBag } from "lucide-react";
import { Field, Input, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { OrderSummary, shippingCost } from "@/components/cart/order-summary";
import { ProductImage } from "@/components/ui/image";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/store/cart-context";
import { placeOrder } from "@/lib/orders/actions";

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postal: string;
  country: string;
};

const EMPTY: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postal: "",
  country: "United States",
};

export function CheckoutView() {
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const shipping = shippingCost(subtotal);
  const total = subtotal + shipping;

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.firstName.trim()) next.firstName = "First name is required";
    if (!form.lastName.trim()) next.lastName = "Last name is required";
    if (!form.address.trim()) next.address = "Address is required";
    if (!form.city.trim()) next.city = "City is required";
    if (!form.postal.trim()) next.postal = "Postal code is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setPending(true);
    setSubmitError(null);

    const result = await placeOrder({
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
      city: form.city,
      postal: form.postal,
      country: form.country,
      items: items.map((line) => ({
        slug: line.product.slug,
        size: line.size,
        color: line.color,
        quantity: line.quantity,
      })),
    });

    if (result.error || !result.url) {
      setPending(false);
      setSubmitError(
        result.error ?? "Could not place your order. Please try again.",
      );
      return;
    }

    setPending(false);
    clear();
    window.location.href = result.url;
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-3 text-muted">
          <ShoppingBag aria-hidden className="h-7 w-7" />
        </span>
        <h1 className="mt-6 font-display text-2xl font-medium text-ink">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-muted">
          Add a few pieces to your cart before checking out.
        </p>
        <Button href="/shop" className="mt-8">
          Shop now
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {submitError ? (
        <p
          role="alert"
          className="mb-6 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {submitError}
        </p>
      ) : null}

      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-10">
          <fieldset>
            <legend className="mb-4 flex items-center gap-2 font-display text-lg font-medium text-ink">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-medium text-paper">
                1
              </span>
              Contact
            </legend>
            <Field label="Email" htmlFor="email" error={errors.email} required>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </Field>
          </fieldset>

          <fieldset>
            <legend className="mb-4 flex items-center gap-2 font-display text-lg font-medium text-ink">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-medium text-paper">
                2
              </span>
              Shipping address
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" htmlFor="firstName" error={errors.firstName} required>
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                />
              </Field>
              <Field label="Last name" htmlFor="lastName" error={errors.lastName} required>
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                />
              </Field>
              <Field label="Address" htmlFor="address" error={errors.address} required className="sm:col-span-2">
                <Input
                  id="address"
                  autoComplete="street-address"
                  placeholder="Street address"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                />
              </Field>
              <Field label="City" htmlFor="city" error={errors.city} required>
                <Input
                  id="city"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                />
              </Field>
              <Field label="Postal code" htmlFor="postal" error={errors.postal} required>
                <Input
                  id="postal"
                  autoComplete="postal-code"
                  value={form.postal}
                  onChange={(e) => update("postal", e.target.value)}
                />
              </Field>
              <Field label="Country" htmlFor="country" required className="sm:col-span-2">
                <Select
                  id="country"
                  autoComplete="country-name"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Japan</option>
                </Select>
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-4 flex items-center gap-2 font-display text-lg font-medium text-ink">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-medium text-paper">
                3
              </span>
              Payment
            </legend>
            <div className="rounded-lg border border-line bg-surface p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-clay">
                  <Lock aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">Demo payment</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    No card details are required. This demo simulates a successful
                    payment when you place your order — no real charge will be made.
                  </p>
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-display text-lg font-medium text-ink">Your order</h2>
            <ul className="mt-4 max-h-72 space-y-4 overflow-y-auto pr-1">
              {items.map((line) => (
                <li key={line.id} className="flex gap-3">
                  <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md bg-surface-3">
                    <ProductImage id={line.product.images[0]} alt="" sizes="56px" width={120} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink">
                      {line.product.name}
                    </span>
                    <span className="block text-xs text-dim">
                      {[line.size, line.color].filter(Boolean).join(" · ")} · Qty {line.quantity}
                    </span>
                  </span>
                  <span className="text-sm text-ink">
                    {formatPrice(line.product.price * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-line pt-5">
              <OrderSummary subtotal={subtotal} />
              <Button type="submit" size="lg" className="mt-5 w-full" disabled={pending}>
                {pending ? (
                  <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                ) : (
                  <Lock aria-hidden className="h-4 w-4" />
                )}
                {pending ? "Placing order…" : `Place order · ${formatPrice(total)}`}
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}
