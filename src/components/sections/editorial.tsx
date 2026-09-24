import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/image";
import { Eyebrow } from "@/components/shared/section-heading";

const EDITORIAL_IMAGE = "1558769132-cb1aea458c5e";

export function Editorial() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[60vw] lg:min-h-full">
          <div className="absolute inset-0">
            <ProductImage
              id={EDITORIAL_IMAGE}
              alt="The NOVA design philosophy — quiet luxury in natural materials"
              sizes="(min-width: 1024px) 50vw, 100vw"
              width={1200}
            />
          </div>
        </div>

        <div className="flex items-center px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-28">
          <div className="max-w-md">
            <Eyebrow>Our philosophy</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3.6vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
              Fewer, better things.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
              We design a considered wardrobe rather than chase seasons. Every
              NOVA piece is cut from responsibly sourced wool, silk, linen and
              full-grain leather — materials that age beautifully and only get
              better with wear.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
              No loud logos, no disposable trends. Just quiet, enduring design
              that earns its place in your wardrobe.
            </p>
            <Button href="/shop" variant="outline" className="mt-8">
              Explore the collection
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
