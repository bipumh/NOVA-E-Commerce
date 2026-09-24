import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-3 text-muted">
        <ShoppingBag aria-hidden className="h-7 w-7" />
      </span>
      <p className="mt-6 font-display text-6xl font-medium text-clay sm:text-7xl">404</p>
      <h1 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
        This page is out of stock.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        We couldn&apos;t find what you were looking for. It may have moved — or perhaps it
        was never in the collection.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button href="/">
          Back to home
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Button>
        <Button href="/shop" variant="outline">
          Browse the collection
        </Button>
      </div>
    </Container>
  );
}
