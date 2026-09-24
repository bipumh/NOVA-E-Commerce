"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { img } from "@/lib/images";

const FALLBACK =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1250"><rect width="1000" height="1250" fill="#e6e0d7"/><text x="500" y="640" font-family="Georgia, serif" font-size="56" fill="#857e73" text-anchor="middle" letter-spacing="12">NOVA</text></svg>`,
  );

/**
 * Responsive product image with a graceful fallback.
 *
 * Renders a plain <img> (the app runs with `images.unoptimized`) sourced from
 * the Unsplash CDN via `img()`, and swaps to a neutral NOVA placeholder if a
 * remote asset ever fails to load.
 */
export function ProductImage({
  id,
  alt,
  className,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  width = 1000,
  priority = false,
}: {
  id: string;
  alt: string;
  className?: string;
  sizes?: string;
  width?: number;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed ? FALLBACK : img(id, { w: width })}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
