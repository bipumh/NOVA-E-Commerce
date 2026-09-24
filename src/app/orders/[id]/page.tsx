import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/shared/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { OrderCard } from "@/components/account/order-card";
import { getOrders } from "@/lib/orders/queries";
import { getCurrentUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Order details",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({
  params,
}: PageProps<"/orders/[id]">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { id } = await params;
  const orders = await getOrders(user.id);
  const order = orders.find((o) => o.id === id);
  if (!order) notFound();

  return (
    <Section>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Orders", href: "/orders" },
          { label: `#${order.id.slice(0, 8).toUpperCase()}` },
        ]}
      />
      <Link
        href="/orders"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-clay"
      >
        <ArrowLeft aria-hidden className="h-4 w-4" />
        Back to orders
      </Link>
      <div className="mt-6">
        <OrderCard order={order} link={false} />
      </div>
    </Section>
  );
}
