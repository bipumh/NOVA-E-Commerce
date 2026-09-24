import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Section } from "@/components/shared/section";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getCurrentUser, getProfile } from "@/lib/supabase/server";
import { getAdminCategories, getAdminProducts } from "@/lib/admin/catalog";
import { getAdminOrders } from "@/lib/admin/orders";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const profile = await getProfile(user.id);
  if (!profile?.is_admin) redirect("/account");

  const products = await getAdminProducts();
  const categories = await getAdminCategories();
  const orders = await getAdminOrders();

  return (
    <Section>
      <AdminDashboard
        products={products}
        categories={categories}
        orders={orders}
      />
    </Section>
  );
}
