import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageOpen } from "lucide-react";
import { Section } from "@/components/shared/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductGrid } from "@/components/product/product-grid";
import { SortSelect } from "@/components/shop/sort-select";
import { ProductFilters } from "@/components/shop/product-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { getCategoryBySlug, getProducts } from "@/lib/catalog/repository";
import { getFacets, priceRange, type SortOption } from "@/lib/catalog";
import { products as bundledProducts } from "@/data/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

function asString(value: string | string[] | undefined): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const sort: SortOption = (asString(sp.sort) as SortOption) ?? "featured";
  const color = asString(sp.color) ?? undefined;
  const size = asString(sp.size) ?? undefined;
  const price = asString(sp.price) ?? undefined;
  const inStock = sp.inStock === "1";
  const range = priceRange(price);

  const results = await getProducts({
    category: slug,
    sort,
    color,
    size,
    inStock: inStock || undefined,
    minPrice: range.min,
    maxPrice: range.max,
  });
  const facets = getFacets(bundledProducts.filter((p) => p.category === slug));

  return (
    <Section>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: category.name },
        ]}
      />

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-clay">
            {category.tagline}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-[-0.02em] text-ink sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
            {category.description}
          </p>
        </div>
        <SortSelect current={sort} />
      </div>

      <ProductFilters sizes={facets.sizes} colors={facets.colors} />

      {results.length > 0 ? (
        <ProductGrid products={results} className="mt-10" />
      ) : (
        <EmptyState
          icon={PackageOpen}
          title="Nothing here yet"
          description="This category is being restocked. Check back soon, or explore the rest of the collection."
          action={{ label: "Shop all", href: "/shop" }}
        />
      )}
    </Section>
  );
}
