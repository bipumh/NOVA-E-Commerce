"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/lib/use-local-storage";
import type { Product } from "@/types";

export type CartLine = {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  addItem: (
    product: Product,
    size: string,
    color: string,
    quantity?: number,
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "nova:cart";
const EMPTY: CartLine[] = [];

const CartContext = createContext<CartContextValue | null>(null);

function makeLineId(product: Product, size: string, color: string): string {
  return [product.id, size, color].filter(Boolean).join("::");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartLine[]>(STORAGE_KEY, EMPTY);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback(
    (product: Product, size: string, color: string, quantity = 1) => {
      const id = makeLineId(product, size, color);
      setItems((prev) => {
        const existing = prev.find((l) => l.id === id);
        if (existing) {
          return prev.map((l) =>
            l.id === id ? { ...l, quantity: l.quantity + quantity } : l,
          );
        }
        return [...prev, { id, product, size, color, quantity }];
      });
    },
    [setItems],
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((l) => l.id !== id));
    },
    [setItems],
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      setItems((prev) =>
        quantity <= 0
          ? prev.filter((l) => l.id !== id)
          : prev.map((l) => (l.id === id ? { ...l, quantity } : l)),
      );
    },
    [setItems],
  );

  const clear = useCallback(() => setItems(EMPTY), [setItems]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const itemCount = useMemo(
    () => items.reduce((sum, l) => sum + l.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      openCart,
      closeCart,
    }),
    [items, itemCount, subtotal, isOpen, addItem, removeItem, updateQuantity, clear, openCart, closeCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
