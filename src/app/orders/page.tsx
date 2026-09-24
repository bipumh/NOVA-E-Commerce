import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PackageOpen } from "lucide-react";
import { Section } from "@/components/shared/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { OrderCard } from "@/components/account/order-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getOrders } from "@/lib/orders/queries";
import { getCurrentUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OrdersPage({
  searchParams,
}: PageProps<"/orders">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const sp = await searchParams;
  const isDemoPayment = sp.payment === "demo";
  const orderId = typeof sp.order === "string" ? sp.order : undefined;
  const orderRef = orderId ? orderId.slice(0, 8).toUpperCase() : null;
  const orders = await getOrders(user.id);

  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Orders" }]} />
      <h1 className="mt-6 font-display text-3xl font-medium tracking-[-0.02em] text-ink sm:text-4xl">
        Your orders
      </h1>
      {orderRef ? (
        <div
          role="status"
          className="mt-4 rounded-lg border border-clay bg-primary-soft px-4 py-3"
        >
          <p className="text-sm font-medium text-primary">Order confirmed</p>
          <p className="mt-1 text-sm text-ink">
            Order number: <span className="font-medium">#{orderRef}</span>
          </p>
          {isDemoPayment ? (
            <p className="mt-2 text-xs text-muted">
              This was a simulated payment for demonstration only — no real charge
              was made.
            </p>
          ) : null}
        </div>
      ) : isDemoPayment ? (
        <div
          role="status"
          className="mt-4 rounded-lg border border-clay bg-primary-soft px-4 py-3"
        >
          <p className="text-sm font-medium text-primary">Demo payment successful</p>
          <p className="mt-1 text-xs text-muted">
            This was a simulated payment for demonstration only — no real charge
            was made.
          </p>
        </div>
      ) : null}
      <div className="mt-8">
        {orders.length === 0 ? (
          <EmptyState
            icon={PackageOpen}
            title="No orders yet"
            description="When you place an order, it will appear here so you can track its progress."
            action={{ label: "Start shopping", href: "/shop" }}
          />
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
