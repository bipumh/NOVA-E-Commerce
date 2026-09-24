import type { Metadata } from "next";
import { ArrowRight, Globe, Leaf, ShieldCheck } from "lucide-react";
import { Section } from "@/components/shared/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Eyebrow } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ProductImage } from "@/components/ui/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "NOVA is a modern fashion house built on a simple belief — a wardrobe should be made from fewer, better things. Discover our story, philosophy and craft.",
  openGraph: {
    title: "About NOVA — Fewer, Better Things",
    description:
      "Founded in 2019, NOVA designs considered essentials in premium natural materials, made to be lived in for years.",
  },
};

const PHILOSOPHY_IMAGE = "1445205170230-053b83016050";

const values = [
  {
    icon: Leaf,
    title: "Responsible materials",
    text: "Traceable wool, silk, linen and full-grain leather, sourced with care and made to age beautifully.",
  },
  {
    icon: ShieldCheck,
    title: "Built to last",
    text: "Every piece is backed by a two-year craftsmanship guarantee — a promise we stand behind.",
  },
  {
    icon: Globe,
    title: "Considered production",
    text: "Small-batch production with ateliers we know by name, not factories we've never seen.",
  },
];

const stats = [
  { value: "2019", label: "Founded in New York" },
  { value: "40+", label: "Considered styles" },
  { value: "12", label: "Countries shipped" },
  { value: "2-yr", label: "Craftsmanship guarantee" },
];

export default function AboutPage() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <div className="mt-8 max-w-3xl">
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl md:text-6xl">
              Designed with intent.
              <br />
              Made to last.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-lg">
              NOVA was founded in 2019 on a simple belief: a wardrobe should be
              built from fewer, better things — not more of the same. We design
              considered essentials that earn their place, season after season.
            </p>
          </Reveal>
        </div>
      </Section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[60vw] lg:min-h-full">
            <div className="absolute inset-0">
              <ProductImage
                id={PHILOSOPHY_IMAGE}
                alt="The NOVA wardrobe — a considered edit of essential pieces"
                sizes="(min-width: 1024px) 50vw, 100vw"
                width={1200}
              />
            </div>
          </div>
          <div className="flex items-center px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-28">
            <div className="max-w-md">
              <Eyebrow>Our philosophy</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,3.6vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
                We don&apos;t chase seasons. We design a wardrobe.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
                Each NOVA piece is the result of a slow, deliberate process —
                from selecting the fibre to the final stitch. We would rather
                make one thing well than ten things quickly.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
                The result is clothing that feels effortless from the first
                wear, and only gets better with time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-line bg-surface p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-clay">
                <value.icon aria-hidden className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-medium text-ink">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line bg-paper">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="text-center">
        <div className="mx-auto max-w-xl">
          <Eyebrow className="justify-center">The collection</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-ink sm:text-4xl">
            Discover pieces made to be lived in.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
            Explore apparel, footwear, bags and accessories in premium natural
            materials — designed to last beyond the season.
          </p>
          <Button href="/shop" size="lg" className="mt-8">
            Shop the collection
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
