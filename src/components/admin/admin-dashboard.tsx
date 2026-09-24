"use client";

import { useState } from "react";
import {
  ClipboardList,
  LayoutDashboard,
  Package,
  Tags,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatPrice } from "@/lib/format";
import { ProductsAdminTable } from "@/components/admin/products-admin-table";
import { CategoriesAdminTable } from "@/components/admin/categories-admin-table";
import { OrdersAdminTable } from "@/components/admin/orders-admin-table";
import { products as bundledProducts } from "@/data/products";
import type { Category, Order, Product } from "@/types";

type Tab = "overview" | "products" | "categories" | "orders";

const TABS: { id: Tab; label: string; icon: typeof Package }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "categories", label: "Categories", icon: Tags },
  { id: "orders", label: "Orders", icon: ClipboardList },
];

const ORDER_TONE: Record<Order["status"], "neutral" | "accent" | "soft" | "outline"> = {
  Processing: "accent",
  Shipped: "soft",
  Delivered: "neutral",
  Cancelled: "outline",
};

export function AdminDashboard({
  products,
  categories,
  orders,
}: {
  products: Product[];
  categories: Category[];
  orders: Order[];
}) {
  const [tab, setTab] = useState<Tab>("overview");

  const inStock = bundledProducts.filter((p) => p.inStock).length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "Total revenue", value: formatPrice(revenue), icon: Wallet, delta: "+12.4%" },
    { label: "Orders", value: String(orders.length), icon: ClipboardList, delta: "+3 this week" },
    { label: "Products", value: String(bundledProducts.length), icon: Package, delta: `${inStock} in stock` },
    { label: "Avg. order value", value: formatPrice(orders.length ? revenue / orders.length : 0), icon: TrendingUp, delta: "trailing 30 days" },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-[-0.02em] text-ink">
            Store admin
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage products, orders and inventory.
          </p>
        </div>
        <nav className="flex gap-1 rounded-full border border-line bg-surface p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                tab === t.id ? "bg-ink text-paper" : "text-muted hover:text-ink",
              )}
            >
              <t.icon aria-hidden className="h-4 w-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {tab === "overview" ? (
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-line bg-surface p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-clay">
                  <stat.icon aria-hidden className="h-5 w-5" />
                </span>
                <p className="mt-4 text-2xl font-medium tabular-nums text-ink">{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="mt-1 text-xs text-dim">{stat.delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-medium text-ink">Recent orders</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-line">
              <OrdersTable orders={orders.slice(0, 5)} />
            </div>
          </div>
        </div>
      ) : null}

      {tab === "products" ? (
        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <ProductsAdminTable products={products} categories={categories} />
        </div>
      ) : null}

      {tab === "categories" ? (
        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <CategoriesAdminTable categories={categories} />
        </div>
      ) : null}

      {tab === "orders" ? (
        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <OrdersAdminTable orders={orders} />
        </div>
      ) : null}
    </div>
  );
}

function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-line bg-surface-2 text-left text-xs uppercase tracking-wide text-dim">
            <th className="px-5 py-3 font-medium">Order</th>
            <th className="px-5 py-3 font-medium">Date</th>
            <th className="px-5 py-3 font-medium">Items</th>
            <th className="px-5 py-3 font-medium">Total</th>
            <th className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {orders.map((order) => (
            <tr key={order.id} className="bg-surface">
              <td className="px-5 py-3 font-medium text-ink">{order.id}</td>
              <td className="px-5 py-3 text-muted">{formatDate(order.placedAt)}</td>
              <td className="px-5 py-3 text-muted">
                {order.items.reduce((n, i) => n + i.quantity, 0)}
              </td>
              <td className="px-5 py-3 text-ink">{formatPrice(order.total)}</td>
              <td className="px-5 py-3">
                <Badge tone={ORDER_TONE[order.status]}>{order.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
