import type { ProductColor } from "@/types";

/**
 * Hand-written Supabase database types, mirroring `supabase/schema.sql`.
 *
 * These match the shape `supabase gen types typescript` would produce and are
 * used to type the browser/server/admin clients so `.select()` results are
 * strongly typed (no `any`).
 *
 * Note: `numeric` columns are returned as strings by PostgREST; the mapping
 * layer (`src/lib/catalog/mapping.ts`) converts them with `Number()`.
 */

export type CategoryRow = {
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  image: string | null;
  order: number;
  created_at: string;
};

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: string;
  compare_at_price: string | null;
  description: string | null;
  details: string[];
  images: string[];
  category: string | null;
  colors: ProductColor[] | null;
  sizes: string[];
  is_new: boolean;
  is_featured: boolean;
  rating: string;
  review_count: number;
  in_stock: boolean;
  stock_quantity: number;
  tags: string[];
  created_at: string;
};

export type ProfileRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  is_admin: boolean;
  created_at: string;
};

export type OrderRow = {
  id: string;
  user_id: string | null;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  payment_status: "pending" | "paid" | "failed";
  email: string;
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal: string;
  shipping_country: string;
  subtotal: string;
  shipping: string;
  total: string;
  created_at: string;
};

export type OrderItemRow = {
  id: string;
  order_id: string;
  product_id: string | null;
  name: string;
  price: string;
  size: string | null;
  color: string | null;
  quantity: number;
};

export type WishlistRow = {
  user_id: string;
  product_id: string;
  created_at: string;
};

// Insert shapes use `number` for `numeric` columns (what the client sends),
// whereas the `Row` shapes above use `string` (what PostgREST returns).
export type OrderInsert = {
  user_id: string | null;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  payment_status: "pending" | "paid" | "failed";
  email: string;
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal: string;
  shipping_country: string;
  subtotal: number;
  shipping: number;
  total: number;
};

export type OrderItemInsert = {
  order_id: string;
  product_id: string | null;
  name: string;
  price: number;
  size: string | null;
  color: string | null;
  quantity: number;
};

export type Database = {
  nova: {
    Tables: {
      categories: {
        Row: CategoryRow;
        Insert: Partial<CategoryRow>;
        Update: Partial<CategoryRow>;
        Relationships: [];
      };
      products: {
        Row: ProductRow;
        Insert: Partial<ProductRow>;
        Update: Partial<ProductRow>;
        Relationships: [];
      };
      profiles: {
        Row: ProfileRow;
        Insert: Partial<ProfileRow>;
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
      orders: {
        Row: OrderRow;
        Insert: OrderInsert;
        Update: Partial<OrderInsert>;
        Relationships: [];
      };
      order_items: {
        Row: OrderItemRow;
        Insert: OrderItemInsert;
        Update: Partial<OrderItemInsert>;
        Relationships: [];
      };
      wishlists: {
        Row: WishlistRow;
        Insert: Partial<WishlistRow>;
        Update: Partial<WishlistRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
