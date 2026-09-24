import type { Metadata } from "next";
import { Search } from "lucide-react";
import { Section } from "@/components/shared/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductGrid } from "@/components/product/product-grid";
import { SortSelect } from "@/components/shop/sort-select";
import { ProductFilters } from "@/components/shop/product-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { getProducts } from "@/lib/catalog/repository";
import { getFacets, priceRange, type SortOption } from "@/lib/catalog";
import { products as bundledProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Browse the complete NOVA collection — apparel, footwear, bags and accessories in premium natural materials.",
};

function asString(value: string | string[] | undefined): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const sp = await searchParams;
  const q = asString(sp.q);
  const sort: SortOption = (asString(sp.sort) as SortOption) ?? "featured";
  const color = asString(sp.color) ?? undefined;
  const size = asString(sp.size) ?? undefined;
  const price = asString(sp.price) ?? undefined;
  const inStock = sp.inStock === "1";
  const range = priceRange(price);

  const results = await getProducts({
    q,
    sort,
    color,
    size,
    inStock: inStock || undefined,
    minPrice: range.min,
    maxPrice: range.max,
  });
  const facets = getFacets(bundledProducts);

  return (
    <Section>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-[-0.02em] text-ink sm:text-4xl">
            {q ? `Results for “${q}”` : "Shop all"}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {results.length} {results.length === 1 ? "product" : "products"}
            {q ? " found" : ""}
          </p>
        </div>
        <SortSelect current={sort} />
      </div>

      <ProductFilters sizes={facets.sizes} colors={facets.colors} />

      {results.length > 0 ? (
        <ProductGrid products={results} className="mt-10" />
      ) : (
        <EmptyState
          icon={Search}
          title="No products found"
          description={
            q
              ? `Nothing matched “${q}”. Try a different search term or browse the full collection.`
              : "There are no products to show right now."
          }
          action={{ label: "View all products", href: "/shop" }}
        />
      )}
    </Section>
  );
}
