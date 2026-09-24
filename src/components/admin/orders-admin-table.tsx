"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/ui/image";
import { updateOrderStatusAction } from "@/lib/admin/actions";
import { formatDate, formatPrice } from "@/lib/format";
import type { Order } from "@/types";

const STATUS_OPTIONS: Order["status"][] = [
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const STATUS_TONE: Record<
  Order["status"],
  "neutral" | "accent" | "soft" | "outline"
> = {
  Processing: "accent",
  Shipped: "soft",
  Delivered: "neutral",
  Cancelled: "outline",
};

const PAYMENT_STATUS_LABEL: Record<Order["paymentStatus"], string> = {
  pending: "Payment pending",
  paid: "Paid",
  failed: "Payment failed",
};

const PAYMENT_STATUS_TONE: Record<
  Order["paymentStatus"],
  "neutral" | "success" | "danger"
> = {
  pending: "neutral",
  paid: "success",
  failed: "danger",
};

export function OrdersAdminTable({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [detail, setDetail] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const updateStatus = (order: Order, status: Order["status"]) => {
    if (status === order.status) return;
    setError(null);
    startTransition(async () => {
      const result = await updateOrderStatusAction(order.id, status);
      if (result.error) setError(result.error);
      else router.refresh();
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="font-display text-base font-medium text-ink">Orders</h2>
        <span className="text-sm text-muted">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </span>
      </div>

      {error ? (
        <p
          role="alert"
          className="mx-5 mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </p>
      ) : null}

      {orders.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="text-sm font-medium text-ink">No orders yet</p>
          <p className="mt-1 text-sm text-muted">
            Orders will appear here once customers check out.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2 text-left text-xs uppercase tracking-wide text-dim">
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Items</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Payment</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {orders.map((order) => {
                const itemCount = order.items.reduce(
                  (n, i) => n + i.quantity,
                  0,
                );
                return (
                  <tr key={order.id} className="bg-surface">
                    <td className="px-5 py-3">
                      <span className="block font-medium text-ink">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                      <span className="block text-xs text-dim">
                        {formatDate(order.placedAt)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="block text-ink">
                        {order.shippingName || "—"}
                      </span>
                      <span className="block text-xs text-dim">
                        {order.email || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted">{itemCount}</td>
                    <td className="px-5 py-3 text-ink">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={PAYMENT_STATUS_TONE[order.paymentStatus]}>
                        {PAYMENT_STATUS_LABEL[order.paymentStatus]}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order, e.target.value as Order["status"])
                        }
                        disabled={isPending}
                        aria-label={`Status for order #${order.id
                          .slice(0, 8)
                          .toUpperCase()}`}
                        className="inline-flex h-8 rounded-lg border border-line-strong bg-surface px-2 text-sm text-ink transition-colors focus:border-ink focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        type="button"
                        onClick={() => setDetail(order)}
                        aria-label={`View order #${order.id
                          .slice(0, 8)
                          .toUpperCase()}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-dim transition-colors hover:text-clay"
                      >
                        <Eye aria-hidden className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {detail ? (
        <OrderDetailDialog order={detail} onClose={() => setDetail(null)} />
      ) : null}
    </div>
  );
}

function OrderDetailDialog({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const orderRef = order.id.slice(0, 8).toUpperCase();
  const address = [
    order.shippingAddress,
    [order.shippingCity, order.shippingPostal].filter(Boolean).join(" "),
    order.shippingCountry,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden
        />
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Order #${orderRef}`}
          className="absolute left-1/2 top-1/2 flex max-h-[90vh] w-[min(94vw,40rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-lift"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
            <div>
              <h3 className="font-display text-lg font-medium text-ink">
                Order #{orderRef}
              </h3>
              <p className="text-xs text-dim">
                Placed {formatDate(order.placedAt)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-dim transition-colors hover:text-ink"
            >
              <X aria-hidden className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto px-5 py-5">
            <div className="flex flex-wrap gap-2">
              <Badge tone={STATUS_TONE[order.status]}>{order.status}</Badge>
              <Badge tone={PAYMENT_STATUS_TONE[order.paymentStatus]}>
                {PAYMENT_STATUS_LABEL[order.paymentStatus]}
              </Badge>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-medium uppercase tracking-wide text-dim">
                Customer
              </h4>
              <p className="mt-1 text-sm text-ink">{order.email || "—"}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-medium uppercase tracking-wide text-dim">
                Shipping to
              </h4>
              <p className="mt-1 text-sm text-ink">
                {order.shippingName || "—"}
              </p>
              <p className="mt-1 text-sm text-muted">{address || "—"}</p>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-medium uppercase tracking-wide text-dim">
                Items
              </h4>
              <ul className="mt-2 divide-y divide-line">
                {order.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 py-3">
                    <span className="relative h-14 w-12 shrink-0 overflow-hidden rounded-md bg-surface-3">
                      <ProductImage
                        id={item.product.images[0] ?? ""}
                        alt=""
                        sizes="48px"
                        width={100}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">
                        {item.product.name}
                      </span>
                      <span className="block text-xs text-dim">
                        {[item.size, item.color].filter(Boolean).join(" · ") ||
                          "—"}{" "}
                        · Qty {item.quantity}
                      </span>
                    </span>
                    <span className="text-sm text-ink">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="text-ink">{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="text-ink">
                  {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-2">
                <dt className="font-medium text-ink">Total</dt>
                <dd className="font-medium text-ink">
                  {formatPrice(order.total)}
                </dd>
              </div>
            </dl>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
