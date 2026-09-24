import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Heart,
  LayoutDashboard,
  LogOut,
  Package,
  PackageOpen,
  User,
} from "lucide-react";
import { Section } from "@/components/shared/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { OrderCard } from "@/components/account/order-card";
import { ProfileForm } from "@/components/account/profile-form";
import { Button } from "@/components/ui/button";
import { getOrders } from "@/lib/orders/queries";
import { getCurrentUser, getProfile } from "@/lib/supabase/server";
import { logoutAction } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ACCOUNT_CARDS = [
  { icon: Package, title: "Orders", text: "Track and review purchases", href: "/orders" },
  { icon: Heart, title: "Wishlist", text: "Items you've saved for later", href: "/wishlist" },
];

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const profile = await getProfile(user.id);
  const metaName = user.user_metadata?.full_name;
  const displayName =
    profile?.full_name ?? (typeof metaName === "string" ? metaName : null);

  const orders = await getOrders(user.id);
  const latestOrder = orders[0] ?? null;

  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account" }]} />

      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
            <User aria-hidden className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-medium text-ink">
              Welcome back{displayName ? `, ${displayName}` : ""}
            </h1>
            <p className="text-sm text-muted">{user.email ?? ""}</p>
          </div>
        </div>
        <form action={logoutAction}>
          <Button type="submit" variant="outline" size="sm">
            <LogOut aria-hidden className="h-4 w-4" />
            Sign out
          </Button>
        </form>
      </div>

      <div className="mt-10 max-w-md">
        <h2 className="font-display text-lg font-medium text-ink">Profile</h2>
        <p className="mt-1 text-sm text-muted">Update your display name.</p>
        <div className="mt-4 rounded-2xl border border-line bg-surface p-5">
          <ProfileForm initialName={displayName ?? ""} />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ACCOUNT_CARDS.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group rounded-2xl border border-line bg-surface p-5 transition-all hover:border-ink hover:shadow-soft"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-clay">
              <card.icon aria-hidden className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-base font-medium text-ink">{card.title}</h2>
            <p className="mt-1 text-sm text-muted">{card.text}</p>
          </Link>
        ))}
        {profile?.is_admin ? (
          <Link
            href="/admin"
            className="group rounded-2xl border border-line bg-surface p-5 transition-all hover:border-ink hover:shadow-soft"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-clay">
              <LayoutDashboard aria-hidden className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-base font-medium text-ink">Admin Dashboard</h2>
            <p className="mt-1 text-sm text-muted">
              Manage products, orders and inventory.
            </p>
          </Link>
        ) : null}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-medium text-ink">Recent order</h2>
          <Link
            href="/orders"
            className="link-underline text-sm font-medium text-clay hover:text-clay-dark"
          >
            View all orders
          </Link>
        </div>
        <div className="mt-4">
          {latestOrder ? (
            <OrderCard order={latestOrder} />
          ) : (
            <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-10 text-center">
              <PackageOpen aria-hidden className="mx-auto h-6 w-6 text-dim" />
              <p className="mt-3 text-sm font-medium text-ink">No orders yet</p>
              <p className="mt-1 text-sm text-muted">
                Your orders will appear here once you place one.
              </p>
              <Button href="/shop" variant="outline" size="sm" className="mt-4">
                Start shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
