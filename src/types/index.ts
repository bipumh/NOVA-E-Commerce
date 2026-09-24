export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  /** Optional original price, shown struck-through when present. */
  compareAtPrice?: number;
  description: string;
  details: string[];
  /** Unsplash photo ids, in presentation order. */
  images: string[];
  /** Slug of the owning category. */
  category: string;
  colors: ProductColor[];
  sizes: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  /** On-hand quantity (0 → out of stock). */
  stockQuantity?: number;
  tags: string[];
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Unsplash photo id for the category card. */
  image: string;
  /** Display order (from the `nova.categories.order` column). */
  order?: number;
};

export type CartItem = {
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

export type PaymentStatus = "pending" | "paid" | "failed";

export type Order = {
  id: string;
  placedAt: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentStatus: PaymentStatus;
  /** Customer email (exposed to admin only). */
  email?: string;
  items: {
    product: Pick<Product, "slug" | "name" | "price" | "images">;
    size: string;
    color: string;
    quantity: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingName?: string;
  shippingAddress?: string;
  shippingCity?: string;
  shippingPostal?: string;
  shippingCountry?: string;
};
