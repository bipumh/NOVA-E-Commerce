"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ProductColor } from "@/types";

export function ColorSwatch({
  colors,
  value,
  onChange,
}: {
  colors: ProductColor[];
  value: string;
  onChange: (name: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {colors.map((color) => {
        const selected = color.name === value;
        return (
          <button
            key={color.name}
            type="button"
            onClick={() => onChange(color.name)}
            aria-label={`Colour: ${color.name}`}
            aria-pressed={selected}
            title={color.name}
            className={cn(
              "relative inline-flex h-7 w-7 items-center justify-center rounded-full border transition-all",
              selected
                ? "border-ink ring-1 ring-ink ring-offset-2 ring-offset-paper"
                : "border-line-strong hover:border-ink",
            )}
          >
            <span
              className="h-5 w-5 rounded-full"
              style={{ backgroundColor: color.hex }}
            />
            {selected ? (
              <Check
                aria-hidden
                className={cn(
                  "absolute h-3.5 w-3.5",
                  color.name === "Ivory" ? "text-ink" : "text-white",
                )}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
