"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Trash2, Upload } from "lucide-react";
import { ProductImage } from "@/components/ui/image";
import {
  removeProductImageAction,
  setPrimaryImageAction,
  uploadProductImageAction,
} from "@/lib/admin/actions";

export function ProductImageManager({
  productId,
  images,
}: {
  productId: string;
  images: string[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<string[]>(images);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("image", file);
      const result = await uploadProductImageAction(formData);
      if (result.error) {
        setError(result.error);
        return;
      }
      if (result.url) setItems((prev) => [...prev, result.url as string]);
      router.refresh();
    } finally {
      setUploading(false);
    }
  };

  const remove = async (url: string) => {
    setError(null);
    const result = await removeProductImageAction(productId, url);
    if (result.error) {
      setError(result.error);
      return;
    }
    setItems((prev) => prev.filter((img) => img !== url));
    router.refresh();
  };

  const setPrimary = async (url: string) => {
    setError(null);
    const result = await setPrimaryImageAction(productId, url);
    if (result.error) {
      setError(result.error);
      return;
    }
    setItems((prev) => [url, ...prev.filter((img) => img !== url)]);
    router.refresh();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    e.target.value = "";
  };

  return (
    <div className="mt-6 border-t border-line pt-5">
      <h4 className="text-sm font-medium text-ink">Images</h4>
      <p className="mt-1 text-xs text-dim">
        The first image is the primary product image.
      </p>

      {error ? (
        <p
          role="alert"
          className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300"
        >
          {error}
        </p>
      ) : null}

      {items.length > 0 ? (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {items.map((img, i) => (
            <div
              key={img}
              className="relative aspect-[3/4] overflow-hidden rounded-lg border border-line bg-surface-3"
            >
              <ProductImage id={img} alt="" sizes="120px" width={240} />
              {i === 0 ? (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-clay px-2 py-0.5 text-[10px] font-semibold text-paper">
                  Primary
                </span>
              ) : null}
              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-3 bg-black/50 py-1.5">
                {i !== 0 ? (
                  <button
                    type="button"
                    onClick={() => setPrimary(img)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-paper transition-colors hover:text-clay"
                  >
                    <Star aria-hidden className="h-3 w-3" />
                    Primary
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => remove(img)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-paper transition-colors hover:text-red-300"
                >
                  <Trash2 aria-hidden className="h-3 w-3" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">No images yet.</p>
      )}

      <div className="mt-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay disabled:opacity-50"
        >
          <Upload aria-hidden className="h-4 w-4" />
          {uploading ? "Uploading…" : "Upload image"}
        </button>
        <p className="mt-2 text-xs text-dim">JPEG, PNG or WebP · up to 5 MB</p>
      </div>
    </div>
  );
}
