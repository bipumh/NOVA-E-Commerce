import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Section } from "@/components/shared/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CheckoutView } from "@/components/checkout/checkout-view";
import { getCurrentUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  searchParams,
}: PageProps<"/checkout">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const sp = await searchParams;
  const cancelled = sp.cancelled === "true";

  return (
    <Section>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />
      <h1 className="mt-6 font-display text-3xl font-medium tracking-[-0.02em] text-ink sm:text-4xl">
        Checkout
      </h1>
      {cancelled ? (
        <p className="mt-4 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-muted">
          Payment was cancelled. Your order is still pending — you can try again
          below.
        </p>
      ) : null}
      <div className="mt-8">
        <CheckoutView />
      </div>
    </Section>
  );
}
