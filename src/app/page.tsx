import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { ValueProps } from "@/components/sections/value-props";
import { Editorial } from "@/components/sections/editorial";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductGrid } from "@/components/product/product-grid";
import { CategoryCard } from "@/components/product/category-card";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { getFeaturedProducts, getNewArrivals } from "@/data/products";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <>
      <Hero />
      <ValueProps />

      <Section>
        <SectionHeading
          eyebrow="Shop by category"
          title="The collection"
          description="Five considered categories, each built around enduring materials and clean, modern silhouettes."
          align="center"
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {categories.map((category, i) => (
            <CategoryCard key={category.slug} category={category} priority={i < 2} />
          ))}
          <Link
            href="/shop"
            className="group flex aspect-[3/4] flex-col items-start justify-between overflow-hidden rounded-lg bg-ink p-5"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-paper/60">
              Everything
            </span>
            <div className="flex w-full items-end justify-between">
              <h3 className="font-display text-2xl font-medium text-paper">Shop all</h3>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink transition-all duration-300 group-hover:rotate-45">
                <ArrowRight aria-hidden className="h-5 w-5" />
              </span>
            </div>
          </Link>
        </div>
      </Section>

      <Section className="border-t border-line bg-paper">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Featured" title="Editor's picks" />
          <Button href="/shop" variant="outline" className="shrink-0 self-start sm:self-auto">
            View all
          </Button>
        </div>
        <ProductGrid products={featured} className="mt-10" />
      </Section>

      <Editorial />

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Just in" title="New arrivals" />
          <Button
            href="/shop?sort=newest"
            variant="outline"
            className="shrink-0 self-start sm:self-auto"
          >
            View all
          </Button>
        </div>
        <ProductGrid products={newArrivals} className="mt-10" />
      </Section>
    </>
  );
}
