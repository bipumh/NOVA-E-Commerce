import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "women",
    name: "Women",
    tagline: "Fluid tailoring & soft tailoring",
    description:
      "Elegant, easy pieces cut from natural fibres — designed to move with you from morning to evening.",
    image: "1524504388940-b1c1722653e1",
  },
  {
    slug: "men",
    name: "Men",
    tagline: "Refined, uncomplicated staples",
    description:
      "A considered wardrobe of precise shirting, knitwear and tailoring in enduring materials.",
    image: "1488161628813-04466f872be2",
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "The finishing touch",
    description:
      "Quietly luxurious accessories — watches, eyewear and small leather goods that complete every look.",
    image: "1522312346375-d1a52e2b99b3",
  },
  {
    slug: "footwear",
    name: "Footwear",
    tagline: "Crafted for the everyday",
    description:
      "Minimal sneakers, loafers and boots in fine leather and suede, built on comfort-first lasts.",
    image: "1595950653106-6c9ebd614d3a",
  },
  {
    slug: "bags",
    name: "Bags",
    tagline: "Carry less, better",
    description:
      "Structured totes, crossbodies and weekenders in vegetable-tanned leather and hardwearing canvas.",
    image: "1591561954557-26941169b49e",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
