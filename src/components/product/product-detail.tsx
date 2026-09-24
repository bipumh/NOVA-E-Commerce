"use client";

import { useState } from "react";
import { ChevronDown, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import type { Product } from "@/types";
import { ProductGallery } from "@/components/product/product-gallery";
import { ColorSwatch } from "@/components/product/color-swatch";
import { SizeSelector } from "@/components/product/size-selector";
import { QuantityStepper } from "@/components/product/quantity-stepper";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { WishlistButton } from "@/components/product/wishlist-button";
import { SizeGuide } from "@/components/product/size-guide";
import { Price } from "@/components/shared/price";
import { Rating } from "@/components/shared/rating";
import { Badge } from "@/components/ui/badge";
import { site } from "@/data/site";

export function ProductDetail({ product }: { product: Product }) {
  const isOneSize = product.sizes.length === 1 && product.sizes[0] === "One size";
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState(isOneSize ? (product.sizes[0] ?? "") : "");
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const sizeRequired = !isOneSize;

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <ProductGallery images={product.images} name={product.name} />

      <div className="lg:py-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-dim">
            {product.brand}
          </span>
          {!product.inStock ? <Badge tone="outline">Sold out</Badge> : null}
          {product.isNew ? <Badge tone="neutral">New</Badge> : null}
          {product.compareAtPrice ? <Badge tone="accent">Sale</Badge> : null}
        </div>

        <h1 className="mt-3 font-display text-3xl font-medium leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-3">
          <Rating value={product.rating} count={product.reviewCount} />
        </div>

        <div className="mt-5">
          <Price
            amount={product.price}
            compareAt={product.compareAtPrice}
            size="lg"
          />
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-muted">
          {product.description}
        </p>

        <div className="mt-8 space-y-7">
          {product.colors.length > 1 ? (
            <div>
              <p className="mb-3 text-sm font-medium text-ink">
                Colour — <span className="text-muted">{color}</span>
              </p>
              <ColorSwatch colors={product.colors} value={color} onChange={setColor} />
            </div>
          ) : null}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-ink">Size</p>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="text-xs font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-clay"
              >
                Size guide
              </button>
            </div>
            <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
            {sizeRequired && !size ? (
              <p className="mt-2 text-xs text-clay">Select a size</p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <AddToCartButton
              product={product}
              selectedSize={size}
              selectedColor={color}
              quantity={quantity}
              sizeSelected={!!size}
              className="flex-1 min-w-48"
            />
          </div>

          <div className="flex items-center gap-3">
            <WishlistButton product={product} />
            <p className="text-xs text-dim">Free returns within 30 days</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 rounded-lg border border-line bg-surface p-4 sm:grid-cols-3 sm:p-5">
          <TrustItem icon={Truck} label={site.support.shippingNote} />
          <TrustItem icon={RotateCcw} label={site.support.returnNote} />
          <TrustItem icon={ShieldCheck} label={site.support.warrantyNote} />
        </div>

        <div className="mt-8 border-t border-line">
          <Accordion title="Details & materials">
            <ul className="space-y-2">
              {product.details.map((detail) => (
                <li key={detail} className="flex gap-2 text-sm text-muted">
                  <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-clay" />
                  {detail}
                </li>
              ))}
            </ul>
          </Accordion>
          <Accordion title="Shipping & returns">
            <p className="text-sm leading-relaxed text-muted">
              Orders are dispatched within 1–2 business days. {site.support.shippingNote.toLowerCase()},
              and {site.support.returnNote.toLowerCase()}. Returns are accepted in original condition.
            </p>
          </Accordion>
        </div>
      </div>
      <SizeGuide open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}

function TrustItem({
  icon: Icon,
  label,
}: {
  icon: typeof Truck;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon aria-hidden className="h-5 w-5 shrink-0 text-clay" />
      <span className="text-xs leading-snug text-muted">{label}</span>
    </div>
  );
}

function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium text-ink">
        {title}
        <ChevronDown
          aria-hidden
          className="h-4 w-4 text-dim transition-transform duration-300 group-open:rotate-180"
        />
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}
