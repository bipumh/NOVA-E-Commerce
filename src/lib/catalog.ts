import type { Product, ProductColor } from "@/types";

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating";

export type CatalogFilters = {
  q?: string;
  category?: string;
  sort?: SortOption;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
};

export type PriceOption = {
  key: string;
  label: string;
  min?: number;
  max?: number;
};

export const PRICE_OPTIONS: PriceOption[] = [
  { key: "under-200", label: "Under $200", max: 200 },
  { key: "200-400", label: "$200–$400", min: 200, max: 400 },
  { key: "over-400", label: "$400+", min: 400 },
];

export function priceRange(key?: string | null): { min?: number; max?: number } {
  const opt = PRICE_OPTIONS.find((o) => o.key === key);
  if (!opt) return {};
  return { min: opt.min, max: opt.max };
}

export function sortProducts(list: Product[], sort: SortOption): Product[] {
  const arr = [...list];
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "rating":
      return arr.sort((a, b) => b.rating - a.rating);
    case "newest":
      return arr.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
    default:
      return arr.sort((a, b) => Number(b.isFeatured ?? false) - Number(a.isFeatured ?? false));
  }
}

export function filterAndSortProducts(
  list: Product[],
  {
    q,
    category,
    sort = "featured",
    color,
    size,
    minPrice,
    maxPrice,
    inStock,
  }: CatalogFilters = {},
): Product[] {
  let result = list;

  if (category) {
    result = result.filter((p) => p.category === category);
  }

  if (color) {
    result = result.filter((p) => p.colors.some((c) => c.name === color));
  }

  if (size) {
    result = result.filter((p) => p.sizes.includes(size));
  }

  if (minPrice != null) {
    result = result.filter((p) => p.price >= minPrice);
  }

  if (maxPrice != null) {
    result = result.filter((p) => p.price <= maxPrice);
  }

  if (inStock) {
    result = result.filter((p) => p.inStock);
  }

  if (q) {
    const query = q.trim().toLowerCase();
    result = result.filter((p) =>
      [p.name, p.brand, p.category, p.description, ...p.tags, ...p.details]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }

  return sortProducts(result, sort);
}

export function getFacets(list: Product[]): {
  sizes: string[];
  colors: ProductColor[];
} {
  const sizeSet = new Set<string>();
  const colorMap = new Map<string, string>();
  for (const p of list) {
    for (const s of p.sizes) sizeSet.add(s);
    for (const c of p.colors) colorMap.set(c.name, c.hex);
  }
  return {
    sizes: Array.from(sizeSet),
    colors: Array.from(colorMap, ([name, hex]) => ({ name, hex })),
  };
}
