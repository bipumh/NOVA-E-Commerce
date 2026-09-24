import type { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review the items in your NOVA shopping cart.",
};

export default function CartPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <div className="mt-6">
        <CartView />
      </div>
    </Section>
  );
}
