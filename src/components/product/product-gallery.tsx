"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { ProductImage } from "@/components/ui/image";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const list = images.length > 0 ? images : [""];

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-surface-3">
        <ProductImage
          id={list[active]}
          alt={name}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          width={1200}
        />
      </div>

      {list.length > 1 ? (
        <div className="mt-3 flex gap-2.5">
          {list.map((id, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={active === i}
              className={cn(
                "relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-md border bg-surface-3 transition-colors",
                active === i ? "border-ink" : "border-transparent hover:border-line-strong",
              )}
            >
              <ProductImage id={id} alt="" sizes="80px" width={160} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
