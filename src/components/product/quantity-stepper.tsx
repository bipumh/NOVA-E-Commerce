"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex h-14 items-center rounded-full border border-line-strong">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="inline-flex h-full w-12 items-center justify-center rounded-l-full text-ink transition-colors hover:text-clay disabled:opacity-40"
      >
        <Minus aria-hidden className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="inline-flex h-full w-12 items-center justify-center rounded-r-full text-ink transition-colors hover:text-clay disabled:opacity-40"
      >
        <Plus aria-hidden className="h-4 w-4" />
      </button>
    </div>
  );
}
