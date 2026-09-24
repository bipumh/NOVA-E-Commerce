"use client";

import { cn } from "@/lib/cn";

export function SizeSelector({
  sizes,
  value,
  onChange,
}: {
  sizes: string[];
  value: string;
  onChange: (size: string) => void;
}) {
  if (sizes.length === 1 && sizes[0] === "One size") {
    return <p className="text-sm text-muted">One size</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const selected = size === value;
        return (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            aria-pressed={selected}
            className={cn(
              "inline-flex h-11 min-w-11 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors",
              selected
                ? "border-ink bg-ink text-paper"
                : "border-line-strong bg-surface text-ink hover:border-ink",
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
