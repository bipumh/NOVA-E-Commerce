import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductImage } from "@/components/ui/image";
import type { Category } from "@/types";

export function CategoryCard({
  category,
  priority = false,
}: {
  category: Category;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative block overflow-hidden rounded-lg bg-surface-3"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <ProductImage
          id={category.image}
          alt={category.name}
          priority={priority}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/80">
            {category.tagline}
          </p>
          <h3 className="mt-1 font-display text-2xl font-medium text-ink">
            {category.name}
          </h3>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink transition-all duration-300 group-hover:rotate-45">
          <ArrowUpRight aria-hidden className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
