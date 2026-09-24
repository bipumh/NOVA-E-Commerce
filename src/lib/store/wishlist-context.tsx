"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/lib/use-local-storage";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/lib/wishlist/actions";
import type { Product } from "@/types";

type WishlistContextValue = {
  items: Product[];
  count: number;
  has: (slug: string) => boolean;
  toggle: (product: Product) => void;
  remove: (slug: string) => void;
};

const STORAGE_KEY = "nova:wishlist";
const EMPTY: Product[] = [];

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  // Local (unauthenticated) wishlist — persisted to localStorage.
  const [localItems, setLocalItems] = useLocalStorage<Product[]>(STORAGE_KEY, EMPTY);
  // Server (authenticated) wishlist — loaded from Supabase.
  const [serverItems, setServerItems] = useState<Product[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Track auth state so the wishlist can switch between local and server storage.
  useEffect(() => {
    const client = getSupabaseBrowser();
    if (!client) return;

    let active = true;

    client.auth.getSession().then(({ data }) => {
      if (active) setUserId(data.session?.user.id ?? null);
    });

    const { data: subscription } = client.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user.id ?? null);
      },
    );

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  // When signed in, load the server wishlist (replacing the local view).
  useEffect(() => {
    if (!userId) return;

    let active = true;
    getWishlist()
      .then((items) => {
        if (active) setServerItems(items);
      })
      .catch(() => {
        /* leave the wishlist as-is on failure */
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const items = userId ? serverItems : localItems;

  const has = useCallback(
    (slug: string) => items.some((p) => p.slug === slug),
    [items],
  );

  const toggle = useCallback(
    (product: Product) => {
      if (userId) {
        const exists = serverItems.some((p) => p.slug === product.slug);
        setServerItems((prev) =>
          exists
            ? prev.filter((p) => p.slug !== product.slug)
            : [...prev, product],
        );
        if (exists) void removeFromWishlist(product.slug);
        else void addToWishlist(product.slug);
      } else {
        setLocalItems((prev) =>
          prev.some((p) => p.slug === product.slug)
            ? prev.filter((p) => p.slug !== product.slug)
            : [...prev, product],
        );
      }
    },
    [userId, serverItems, setLocalItems],
  );

  const remove = useCallback(
    (slug: string) => {
      if (userId) {
        setServerItems((prev) => prev.filter((p) => p.slug !== slug));
        void removeFromWishlist(slug);
      } else {
        setLocalItems((prev) => prev.filter((p) => p.slug !== slug));
      }
    },
    [userId, setLocalItems],
  );

  const count = items.length;

  const value = useMemo<WishlistContextValue>(
    () => ({ items, count, has, toggle, remove }),
    [items, count, has, toggle, remove],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
