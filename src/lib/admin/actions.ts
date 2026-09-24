"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, getProfile } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { Order, ProductColor } from "@/types";

export type ProductActionState = {
  error?: string;
  success?: boolean;
};

export type ImageActionState = {
  error?: string;
  success?: boolean;
  url?: string;
};

export type CategoryActionState = {
  error?: string;
  success?: boolean;
};

const BUCKET = "nova-product-images";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

async function requireAdmin(): Promise<string | null> {
  try {
    const user = await getCurrentUser();
    if (!user) return "You are not signed in.";
    const profile = await getProfile(user.id);
    if (!profile?.is_admin) return "You are not authorized.";
    return null;
  } catch (error) {
    console.error("Admin authorization check failed:", error);
    return "Unable to verify your account. Please try again.";
  }
}

function text(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function lines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function csv(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseColors(value: string): ProductColor[] {
  const colors: ProductColor[] = [];
  for (const line of lines(value)) {
    const [name, hex] = line.split(",").map((s) => s.trim());
    if (name && hex) colors.push({ name, hex });
  }
  return colors;
}

function parseColorsStrict(
  value: string,
): { colors: ProductColor[]; error?: string } {
  const colors: ProductColor[] = [];
  for (const line of lines(value)) {
    const parts = line.split(",").map((s) => s.trim());
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      return {
        colors: [],
        error: `Invalid color "${line}". Use the format name,#hex.`,
      };
    }
    if (!/^#[0-9a-fA-F]{3,8}$/.test(parts[1])) {
      return {
        colors: [],
        error: `Invalid color hex "${parts[1]}". Use #RRGGBB.`,
      };
    }
    colors.push({ name: parts[0], hex: parts[1] });
  }
  return { colors };
}

function isValidUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function isSupabaseStorageUrl(url: string): boolean {
  return url.includes(`/storage/v1/object/public/${BUCKET}/`);
}

function storagePathFromUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

function parseStockQuantity(value: string): { quantity: number; error?: string } {
  const raw = value.trim();
  if (raw === "") return { quantity: 0 };
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0) {
    return {
      quantity: 0,
      error: "Stock quantity must be a whole number of 0 or more.",
    };
  }
  return { quantity: n };
}

export async function updateProductAction(
  _prev: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const authError = await requireAdmin();
  if (authError) return { error: authError };

  const id = text(formData, "id");
  if (!id) return { error: "Missing product id." };

  const name = text(formData, "name");
  const slug = text(formData, "slug");
  const brand = text(formData, "brand");
  if (!name || !slug || !brand) {
    return { error: "Name, slug and brand are required." };
  }

  const price = Number(text(formData, "price"));
  if (!Number.isFinite(price) || price < 0) {
    return { error: "Enter a valid price." };
  }

  let compareAt: number | null = null;
  const compareAtRaw = text(formData, "compareAt");
  if (compareAtRaw) {
    const n = Number(compareAtRaw);
    if (!Number.isFinite(n) || n < 0) {
      return { error: "Enter a valid compare-at price." };
    }
    compareAt = n;
  }

  const stock = parseStockQuantity(text(formData, "stockQuantity"));
  if (stock.error) return { error: stock.error };

  const admin = (() => {
    try {
      return getSupabaseAdmin();
    } catch {
      return null;
    }
  })();
  if (!admin) {
    return { error: "Admin writes are not configured (missing service-role key)." };
  }

  try {
    const { error } = await admin
      .from("products")
      .update({
        name,
        slug,
        brand,
        price: String(price),
        compare_at_price: compareAt != null ? String(compareAt) : null,
        description: text(formData, "description"),
        details: lines(text(formData, "details")),
        category: text(formData, "category") || null,
        sizes: csv(text(formData, "sizes")),
        colors: parseColors(text(formData, "colors")),
        tags: csv(text(formData, "tags")),
        is_new: formData.get("isNew") === "on",
        is_featured: formData.get("isFeatured") === "on",
        stock_quantity: stock.quantity,
        in_stock: stock.quantity > 0,
      })
      .eq("id", id);

    if (error) return { error: error.message };

    return { success: true };
  } catch (error) {
    console.error("updateProductAction failed:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function toggleStockAction(
  id: string,
  inStock: boolean,
  stockQuantity: number,
): Promise<ProductActionState> {
  const authError = await requireAdmin();
  if (authError) return { error: authError };
  if (!id) return { error: "Missing product id." };

  const quantity = inStock ? (stockQuantity > 0 ? stockQuantity : 1) : 0;

  const admin = (() => {
    try {
      return getSupabaseAdmin();
    } catch {
      return null;
    }
  })();
  if (!admin) {
    return { error: "Admin writes are not configured (missing service-role key)." };
  }

  try {
    const { error } = await admin
      .from("products")
      .update({ in_stock: inStock, stock_quantity: quantity })
      .eq("id", id);

    if (error) return { error: error.message };

    return { success: true };
  } catch (error) {
    console.error("toggleStockAction failed:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function createProductAction(
  _prev: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const authError = await requireAdmin();
  if (authError) return { error: authError };

  const name = text(formData, "name");
  const slug = text(formData, "slug");
  if (!name || !slug) {
    return { error: "Name and slug are required." };
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return {
      error: "Slug may only contain lowercase letters, numbers and hyphens.",
    };
  }

  const brand = text(formData, "brand") || "NOVA";

  const price = Number(text(formData, "price"));
  if (!Number.isFinite(price) || price < 0) {
    return { error: "Enter a valid price." };
  }

  let compareAt: number | null = null;
  const compareAtRaw = text(formData, "compareAt");
  if (compareAtRaw) {
    const n = Number(compareAtRaw);
    if (!Number.isFinite(n) || n < 0) {
      return { error: "Enter a valid compare-at price." };
    }
    compareAt = n;
  }

  const colorsResult = parseColorsStrict(text(formData, "colors"));
  if (colorsResult.error) return { error: colorsResult.error };

  const stock = parseStockQuantity(text(formData, "stockQuantity"));
  if (stock.error) return { error: stock.error };

  const admin = (() => {
    try {
      return getSupabaseAdmin();
    } catch {
      return null;
    }
  })();
  if (!admin) {
    return { error: "Admin writes are not configured (missing service-role key)." };
  }

  try {
    const { error } = await admin.from("products").insert({
      slug,
      name,
      brand,
      price: String(price),
      compare_at_price: compareAt != null ? String(compareAt) : null,
      description: text(formData, "description"),
      details: lines(text(formData, "details")),
      images: [],
      category: text(formData, "category") || null,
      sizes: csv(text(formData, "sizes")),
      colors: colorsResult.colors,
      tags: csv(text(formData, "tags")),
      is_new: formData.get("isNew") === "on",
      is_featured: formData.get("isFeatured") === "on",
      stock_quantity: stock.quantity,
      in_stock: stock.quantity > 0,
      rating: "0",
      review_count: 0,
    });

    if (error) {
      if (error.code === "23505") {
        return { error: "A product with this slug already exists." };
      }
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("createProductAction failed:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function uploadProductImageAction(
  formData: FormData,
): Promise<ImageActionState> {
  const authError = await requireAdmin();
  if (authError) return { error: authError };

  const productId = text(formData, "productId");
  if (!isValidUuid(productId)) return { error: "Invalid product id." };

  const file = formData.get("image");
  if (!file || typeof file === "string") {
    return { error: "No image file provided." };
  }

  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return { error: "Unsupported file type. Use JPEG, PNG or WebP." };
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return { error: "Image must be 5 MB or smaller." };
  }

  const admin = (() => {
    try {
      return getSupabaseAdmin();
    } catch {
      return null;
    }
  })();
  if (!admin) {
    return { error: "Admin writes are not configured (missing service-role key)." };
  }

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
  const path = `products/${productId}/${filename}`;

  const { error: uploadError } = await admin.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (uploadError) return { error: "Upload failed. Please try again." };

  const publicUrl = admin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

  const { data: row, error: fetchError } = await admin
    .from("products")
    .select("images")
    .eq("id", productId)
    .single();
  if (fetchError || !row) return { error: "Product not found." };

  const images = [...(row.images ?? []), publicUrl];

  const { error: updateError } = await admin
    .from("products")
    .update({ images })
    .eq("id", productId);
  if (updateError) {
    await admin.storage.from(BUCKET).remove([path]);
    return { error: updateError.message };
  }

  revalidatePath("/admin");
  return { success: true, url: publicUrl };
}

export async function removeProductImageAction(
  productId: string,
  imageUrl: string,
): Promise<ImageActionState> {
  const authError = await requireAdmin();
  if (authError) return { error: authError };
  if (!isValidUuid(productId)) return { error: "Invalid product id." };
  if (!imageUrl) return { error: "Missing image URL." };

  const admin = (() => {
    try {
      return getSupabaseAdmin();
    } catch {
      return null;
    }
  })();
  if (!admin) {
    return { error: "Admin writes are not configured (missing service-role key)." };
  }

  const { data: row, error: fetchError } = await admin
    .from("products")
    .select("images")
    .eq("id", productId)
    .single();
  if (fetchError || !row) return { error: "Product not found." };

  const current = row.images ?? [];
  const next = current.filter((img) => img !== imageUrl);
  if (next.length === current.length) return { error: "Image not found." };

  const { error: updateError } = await admin
    .from("products")
    .update({ images: next })
    .eq("id", productId);
  if (updateError) return { error: updateError.message };

  if (isSupabaseStorageUrl(imageUrl)) {
    const path = storagePathFromUrl(imageUrl);
    if (path) await admin.storage.from(BUCKET).remove([path]);
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function setPrimaryImageAction(
  productId: string,
  imageUrl: string,
): Promise<ImageActionState> {
  const authError = await requireAdmin();
  if (authError) return { error: authError };
  if (!isValidUuid(productId)) return { error: "Invalid product id." };
  if (!imageUrl) return { error: "Missing image URL." };

  const admin = (() => {
    try {
      return getSupabaseAdmin();
    } catch {
      return null;
    }
  })();
  if (!admin) {
    return { error: "Admin writes are not configured (missing service-role key)." };
  }

  const { data: row, error: fetchError } = await admin
    .from("products")
    .select("images")
    .eq("id", productId)
    .single();
  if (fetchError || !row) return { error: "Product not found." };

  const current = row.images ?? [];
  if (!current.includes(imageUrl)) return { error: "Image not found." };

  const next = [imageUrl, ...current.filter((img) => img !== imageUrl)];

  const { error } = await admin
    .from("products")
    .update({ images: next })
    .eq("id", productId);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  return { success: true };
}

function parseOrder(value: string): { order: number; error?: string } {
  const raw = value.trim();
  if (raw === "") return { order: 0 };
  const n = Number(raw);
  if (!Number.isInteger(n)) {
    return { order: 0, error: "Display order must be a whole number." };
  }
  return { order: n };
}

export async function createCategoryAction(
  _prev: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  const authError = await requireAdmin();
  if (authError) return { error: authError };

  const name = text(formData, "name");
  const slug = text(formData, "slug");
  if (!name || !slug) return { error: "Name and slug are required." };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return {
      error: "Slug may only contain lowercase letters, numbers and hyphens.",
    };
  }

  const orderResult = parseOrder(text(formData, "order"));
  if (orderResult.error) return { error: orderResult.error };

  const admin = (() => {
    try {
      return getSupabaseAdmin();
    } catch {
      return null;
    }
  })();
  if (!admin) {
    return { error: "Admin writes are not configured (missing service-role key)." };
  }

  try {
    const { error } = await admin.from("categories").insert({
      slug,
      name,
      tagline: text(formData, "tagline") || null,
      description: text(formData, "description") || null,
      image: text(formData, "image") || null,
      order: orderResult.order,
    });

    if (error) {
      if (error.code === "23505") {
        return { error: "A category with this slug already exists." };
      }
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("createCategoryAction failed:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function updateCategoryAction(
  _prev: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  const authError = await requireAdmin();
  if (authError) return { error: authError };

  const originalSlug = text(formData, "originalSlug");
  if (!originalSlug) return { error: "Missing category slug." };

  const name = text(formData, "name");
  const slug = text(formData, "slug");
  if (!name || !slug) return { error: "Name and slug are required." };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return {
      error: "Slug may only contain lowercase letters, numbers and hyphens.",
    };
  }

  const orderResult = parseOrder(text(formData, "order"));
  if (orderResult.error) return { error: orderResult.error };

  const admin = (() => {
    try {
      return getSupabaseAdmin();
    } catch {
      return null;
    }
  })();
  if (!admin) {
    return { error: "Admin writes are not configured (missing service-role key)." };
  }

  try {
    if (slug !== originalSlug) {
      const { data: existing, error: dupError } = await admin
        .from("categories")
        .select("slug")
        .eq("slug", slug)
        .maybeSingle();
      if (dupError) return { error: dupError.message };
      if (existing) {
        return { error: "A category with this slug already exists." };
      }
    }

    const { error } = await admin
      .from("categories")
      .update({
        slug,
        name,
        tagline: text(formData, "tagline") || null,
        description: text(formData, "description") || null,
        image: text(formData, "image") || null,
        order: orderResult.order,
      })
      .eq("slug", originalSlug);

    if (error) {
      if (error.code === "23505") {
        return { error: "A category with this slug already exists." };
      }
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("updateCategoryAction failed:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function deleteCategoryAction(
  slug: string,
): Promise<CategoryActionState> {
  const authError = await requireAdmin();
  if (authError) return { error: authError };
  if (!slug) return { error: "Missing category slug." };

  const admin = (() => {
    try {
      return getSupabaseAdmin();
    } catch {
      return null;
    }
  })();
  if (!admin) {
    return { error: "Admin writes are not configured (missing service-role key)." };
  }

  try {
    const { count, error: countError } = await admin
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("category", slug);
    if (countError) return { error: countError.message };
    if (count && count > 0) {
      return {
        error:
          count === 1
            ? "This category is assigned to 1 product and cannot be deleted. Reassign that product first."
            : `This category is assigned to ${count} products and cannot be deleted. Reassign those products first.`,
      };
    }

    const { error } = await admin.from("categories").delete().eq("slug", slug);
    if (error) return { error: error.message };

    return { success: true };
  } catch (error) {
    console.error("deleteCategoryAction failed:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function moveCategoryAction(
  slug: string,
  direction: "up" | "down",
): Promise<CategoryActionState> {
  const authError = await requireAdmin();
  if (authError) return { error: authError };
  if (!slug) return { error: "Missing category slug." };

  const admin = (() => {
    try {
      return getSupabaseAdmin();
    } catch {
      return null;
    }
  })();
  if (!admin) {
    return { error: "Admin writes are not configured (missing service-role key)." };
  }

  try {
    const { data, error } = await admin
      .from("categories")
      .select("slug, order")
      .order("order", { ascending: true })
      .order("slug", { ascending: true });
    if (error || !data) {
      return { error: error?.message ?? "Unable to load categories." };
    }

    const index = data.findIndex((c) => c.slug === slug);
    if (index === -1) return { error: "Category not found." };

    const neighborIndex = direction === "up" ? index - 1 : index + 1;
    if (neighborIndex < 0 || neighborIndex >= data.length) {
      return { success: true };
    }

    const current = data[index];
    const neighbor = data[neighborIndex];

    const { error: firstError } = await admin
      .from("categories")
      .update({ order: neighbor.order })
      .eq("slug", current.slug);
    if (firstError) return { error: firstError.message };

    const { error: secondError } = await admin
      .from("categories")
      .update({ order: current.order })
      .eq("slug", neighbor.slug);
    if (secondError) return { error: secondError.message };

    return { success: true };
  } catch (error) {
    console.error("moveCategoryAction failed:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

const ORDER_STATUSES: Order["status"][] = [
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export async function updateOrderStatusAction(
  orderId: string,
  status: string,
): Promise<ProductActionState> {
  const authError = await requireAdmin();
  if (authError) return { error: authError };
  if (!orderId) return { error: "Missing order id." };

  if (!ORDER_STATUSES.includes(status as Order["status"])) {
    return { error: "Invalid order status." };
  }

  const admin = (() => {
    try {
      return getSupabaseAdmin();
    } catch {
      return null;
    }
  })();
  if (!admin) {
    return { error: "Admin writes are not configured (missing service-role key)." };
  }

  try {
    const { error } = await admin
      .from("orders")
      .update({ status: status as Order["status"] })
      .eq("id", orderId);
    if (error) return { error: error.message };

    return { success: true };
  } catch (error) {
    console.error("updateOrderStatusAction failed:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
