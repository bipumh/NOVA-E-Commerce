import { Section } from "@/components/shared/section";
import { ProductGridSkeleton } from "@/components/product/product-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Section>
      <div className="mb-6 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-10 w-56 max-w-full" />
        <Skeleton className="h-4 w-40" />
      </div>
      <ProductGridSkeleton />
    </Section>
  );
}
