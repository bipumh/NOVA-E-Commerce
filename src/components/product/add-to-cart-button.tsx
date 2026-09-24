"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store/cart-context";
import type { Product } from "@/types";

export function AddToCartButton({
  product,
  selectedSize,
  selectedColor,
  quantity = 1,
  sizeSelected = true,
  className,
}: {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity?: number;
  sizeSelected?: boolean;
  className?: string;
}) {
  const { addItem, openCart } = useCart();
  const soldOut = !product.inStock;
  const disabled = soldOut || !sizeSelected;

  return (
    <Button
      type="button"
      size="lg"
      disabled={disabled}
      className={className}
      onClick={() => {
        addItem(product, selectedSize, selectedColor, quantity);
        openCart();
      }}
    >
      <ShoppingBag aria-hidden className="h-4 w-4" />
      {soldOut ? "Sold out" : "Add to cart"}
    </Button>
  );
}
