import type { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved NOVA pieces — all in one place.",
};

export default function WishlistPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <h1 className="mt-6 font-display text-3xl font-medium tracking-[-0.02em] text-ink sm:text-4xl">
        Wishlist
      </h1>
      <div className="mt-8">
        <WishlistView />
      </div>
    </Section>
  );
}
