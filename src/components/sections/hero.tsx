import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/image";
import { Eyebrow } from "@/components/shared/section-heading";
import { GradientWaves } from "@/components/shared/gradient-waves";
import { Reveal } from "@/components/shared/reveal";

const HERO_IMAGE = "1490481651871-ab68de25d43d";

export function Hero() {
  return (
    <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-[#0A0A09]">
      <div className="absolute inset-0">
        <ProductImage
          id={HERO_IMAGE}
          alt="The NOVA autumn collection, photographed in a softly lit studio"
          priority
          sizes="100vw"
          width={1800}
          className="opacity-60 hero-img"
        />
        <GradientWaves className="opacity-90" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-[-22%] left-[-12%] h-[34rem] w-[34rem] rounded-full bg-clay/10 blur-[110px]" />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-6 sm:px-8 sm:pb-20 lg:px-12">
        <div className="max-w-2xl">
          <Reveal direction="up">
            <Eyebrow>The new collection</Eyebrow>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h1 className="mt-5 bg-gradient-to-b from-[#e9d3a3] to-[#b78e55] bg-clip-text font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.03em] text-transparent">
              Considered essentials,
              <br />
              made to last.
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
              Thoughtfully designed apparel, footwear and accessories in premium
              natural materials — built for the everyday, and made to be lived in
              for years.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/shop" size="lg" variant="white">
                Shop the collection
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
              <Button href="/shop?sort=newest" size="lg" variant="light">
                New arrivals
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
