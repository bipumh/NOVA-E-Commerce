"use client";

import { Heart } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { EmptyState } from "@/components/shared/empty-state";
import { useWishlist } from "@/lib/store/wishlist-context";

export function WishlistView() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Your wishlist is empty"
        description="Tap the heart on any product to save it here for later."
        action={{ label: "Discover products", href: "/shop" }}
      />
    );
  }

  return (
    <div>
      <p className="mb-8 text-sm text-muted">
        {items.length} {items.length === 1 ? "item" : "items"} saved
      </p>
      <ProductGrid products={items} />
    </div>
  );
}
