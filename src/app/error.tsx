"use client";

import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-clay">
        <TriangleAlert aria-hidden className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-medium text-ink sm:text-4xl">
        Something went wrong.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        An unexpected error occurred while loading this page. Please try again.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button onClick={reset}>
          <RotateCcw aria-hidden className="h-4 w-4" />
          Try again
        </Button>
        <Button href="/" variant="outline">
          Back to home
        </Button>
      </div>
    </div>
  );
}
