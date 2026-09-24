const UNSPLASH_BASE = "https://images.unsplash.com/photo-";

type ImageOptions = {
  /** Intrinsic width to request from the CDN. */
  w?: number;
  /** Optional fixed height (useful for banners/OG crops). */
  h?: number;
  /** JPEG/AVIF quality, 1–100. */
  q?: number;
  /** Crop strategy used by the CDN. */
  crop?: "entropy" | "edges" | "faces" | "top" | "bottom" | "left" | "right";
};

/**
 * Builds an optimised Unsplash CDN URL for a given photo id.
 *
 * Keeping photography addresses in a single helper means the whole catalog can
 * be repointed at a CMS or a self-hosted image pipeline without touching the UI.
 */
export function img(
  id: string,
  { w = 1200, h, q = 80, crop = "entropy" }: ImageOptions = {},
): string {
  // Full remote URLs (e.g. Pexels) are passed through with sizing params.
  if (id.startsWith("http")) {
    const params = new URLSearchParams({
      auto: "compress",
      cs: "tinysrgb",
      w: String(w),
    });
    if (h) params.set("h", String(h));
    return `${id}?${params.toString()}`;
  }

  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    crop,
    w: String(w),
    q: String(q),
  });

  if (h) params.set("h", String(h));

  return `${UNSPLASH_BASE}${id}?${params.toString()}`;
}
