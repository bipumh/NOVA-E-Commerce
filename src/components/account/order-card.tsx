import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/ui/image";
import { formatDate, formatPrice } from "@/lib/format";
import type { Order } from "@/types";

const STATUS_TONE: Record<Order["status"], "neutral" | "accent" | "soft" | "outline"> = {
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

export function OrderCard({
  order,
  link = true,
}: {
  order: Order;
  link?: boolean;
}) {
  const orderRef = order.id.slice(0, 8).toUpperCase();
  const shippingLine = [
    order.shippingName,
    order.shippingAddress,
    [order.shippingCity, order.shippingPostal].filter(Boolean).join(" "),
    order.shippingCountry,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="rounded-2xl border border-line bg-surface">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          {link ? (
            <Link
              href={`/orders/${order.id}`}
              className="text-sm font-medium text-ink transition-colors hover:text-clay"
            >
              #{orderRef}
            </Link>
          ) : (
            <p className="text-sm font-medium text-ink">#{orderRef}</p>
          )}
          <p className="mt-0.5 text-xs text-dim">Placed {formatDate(order.placedAt)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-dim">
            Status
          </span>
          <Badge tone={STATUS_TONE[order.status]}>{order.status}</Badge>
          <span className="ml-2 text-[11px] font-medium uppercase tracking-[0.12em] text-dim">
            Payment
          </span>
          <Badge tone={PAYMENT_STATUS_TONE[order.paymentStatus]}>
            {PAYMENT_STATUS_LABEL[order.paymentStatus]}
          </Badge>
        </div>
      </header>

      <ul className="divide-y divide-line px-5">
        {order.items.map((item, i) => (
          <li key={i} className="flex items-center gap-3 py-3">
            <span className="relative h-14 w-12 shrink-0 overflow-hidden rounded-md bg-surface-3">
              <ProductImage id={item.product.images[0]} alt="" sizes="48px" width={100} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-ink">
                {item.product.name}
              </span>
              <span className="block text-xs text-dim">
                {[item.size, item.color].filter(Boolean).join(" · ")} · Qty {item.quantity}
              </span>
            </span>
            <span className="text-sm text-ink">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <footer className="border-t border-line px-5 py-4">
        <dl className="space-y-1.5 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="text-ink">{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted">Shipping</dt>
            <dd className="text-ink">{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-line pt-2">
            <dt className="font-medium text-ink">Total</dt>
            <dd className="font-medium text-ink">{formatPrice(order.total)}</dd>
          </div>
        </dl>
        {shippingLine ? (
          <p className="mt-3 text-xs text-dim">
            <span className="text-faint">Ship to · </span>
            {shippingLine}
          </p>
        ) : null}
      </footer>
    </article>
  );
}
