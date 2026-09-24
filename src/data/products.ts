import type { Product } from "@/types";

const NEUTRALS = [
  { name: "Ivory", hex: "#f4f1ea" },
  { name: "Stone", hex: "#d8d2c6" },
  { name: "Ink", hex: "#1a1713" },
  { name: "Camel", hex: "#b98d5f" },
  { name: "Clay", hex: "#9a5230" },
];

const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL"];
const FOOTWEAR_SIZES = ["6", "7", "8", "9", "10", "11"];
const ONE_SIZE = ["One size"];

/**
 * Placeholder catalog.
 *
 * This data stands in for the PostgreSQL `products` table so the storefront can
 * be designed and tested end-to-end before Supabase is connected. Each product
 * references Unsplash photo ids resolved through `img()`.
 */
export const products: Product[] = [
  {
    id: "p-1001",
    slug: "tailored-wool-overcoat",
    name: "Tailored Wool Overcoat",
    brand: "NOVA",
    price: 495,
    compareAtPrice: 620,
    description:
      "A double-faced wool overcoat with a clean, unstructured shoulder and a fluid drape. Cut to layer over knitwear without bulk, finished with horn buttons and deep welt pockets.",
    details: [
      "100% double-faced virgin wool",
      "Unstructured, relaxed shoulder",
      "Horn button closure",
      "Fully lined sleeves",
      "Made in Portugal",
    ],
    images: ["1539109136881-3be0616acf4b", "1544022613-e87ca75a784a"],
    category: "women",
    colors: NEUTRALS.slice(0, 3),
    sizes: CLOTHING_SIZES,
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    tags: ["wool", "outerwear", "winter"],
  },
  {
    id: "p-1002",
    slug: "silk-slip-dress",
    name: "Silk Slip Dress",
    brand: "NOVA",
    price: 320,
    description:
      "A bias-cut slip dress in sandwashed mulberry silk with adjustable straps and a subtle cowl neck. Effortless on its own, equally at home under tailoring.",
    details: [
      "100% sandwashed mulberry silk",
      "Bias cut for a fluid drape",
      "Adjustable straps",
      "Midi length",
    ],
    images: ["1595777457583-95e059d581b8", "1509631179647-0177331693ae"],
    category: "women",
    colors: [NEUTRALS[0], NEUTRALS[3], NEUTRALS[4]],
    sizes: CLOTHING_SIZES,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 86,
    inStock: true,
    tags: ["silk", "dress", "evening"],
  },
  {
    id: "p-1003",
    slug: "relaxed-cotton-tee",
    name: "Relaxed Cotton Tee",
    brand: "NOVA",
    price: 65,
    description:
      "The essential tee, cut from a substantial organic cotton jersey with a relaxed, boxy fit and a ribbed collar that keeps its shape wash after wash.",
    details: [
      "220gsm organic cotton jersey",
      "Boxy, relaxed fit",
      "Ribbed collar",
      "Pre-shrunk",
    ],
    images: ["1521572163474-6864f9cf17ab"],
    category: "men",
    colors: NEUTRALS.slice(0, 3),
    sizes: CLOTHING_SIZES,
    rating: 4.6,
    reviewCount: 231,
    inStock: true,
    tags: ["cotton", "tee", "essential"],
  },
  {
    id: "p-1004",
    slug: "wide-leg-tailored-trouser",
    name: "Wide-Leg Tailored Trouser",
    brand: "NOVA",
    price: 185,
    description:
      "A high-rise, wide-leg trouser with a pressed crease and a clean, floor-grazing silhouette. Tailored from a mid-weight wool blend with a soft, matte hand.",
    details: [
      "Wool-blend suiting",
      "High-rise, wide leg",
      "Pressed front crease",
      "Side and back pockets",
    ],
    images: ["https://images.pexels.com/photos/36611867/pexels-photo-36611867.jpeg", "1541099649105-f69ad21f3246"],
    category: "women",
    colors: [NEUTRALS[0], NEUTRALS[1], NEUTRALS[2]],
    sizes: CLOTHING_SIZES,
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
    tags: ["trousers", "tailoring"],
  },
  {
    id: "p-1005",
    slug: "classic-oxford-shirt",
    name: "Classic Oxford Shirt",
    brand: "NOVA",
    price: 150,
    description:
      "A button-down Oxford in crisp two-ply cotton with a tailored collar and single-needle stitching throughout. The shirt that anchors every wardrobe.",
    details: [
      "Two-ply cotton oxford",
      "Button-down collar",
      "Single-needle stitching",
      "Mother-of-pearl buttons",
    ],
    images: ["1520975954732-35dd22299614"],
    category: "men",
    colors: [NEUTRALS[0], NEUTRALS[1], NEUTRALS[2]],
    sizes: CLOTHING_SIZES,
    rating: 4.7,
    reviewCount: 154,
    inStock: true,
    tags: ["shirting", "cotton", "essential"],
  },
  {
    id: "p-1006",
    slug: "leather-bomber-jacket",
    name: "Leather Bomber Jacket",
    brand: "NOVA",
    price: 480,
    compareAtPrice: 560,
    description:
      "A minimalist bomber in supple lambskin with a matte finish, ribbed cuffs and a clean, collarless profile. Softens beautifully with wear.",
    details: [
      "100% lambskin leather",
      "Matte finish",
      "Ribbed cuffs and hem",
      "Two-way zip",
    ],
    images: ["1551028719-00167b16eac5", "1591047139829-d91aecb6caea"],
    category: "men",
    colors: [NEUTRALS[2], NEUTRALS[3]],
    sizes: CLOTHING_SIZES,
    isNew: true,
    rating: 4.9,
    reviewCount: 58,
    inStock: true,
    tags: ["leather", "outerwear"],
  },
  {
    id: "p-1007",
    slug: "minimal-leather-sneaker",
    name: "Minimal Leather Sneaker",
    brand: "NOVA",
    price: 230,
    description:
      "A pared-back court sneaker in full-grain white leather on a tonal cup sole. Clean lines, no logos — designed to go with everything you own.",
    details: [
      "Full-grain leather upper",
      "Tonal cup sole",
      "Removable cushioned insole",
      "Hand-finished edges",
    ],
    images: ["1516826957135-700dedea698c"],
    category: "footwear",
    colors: [NEUTRALS[0], NEUTRALS[1]],
    sizes: FOOTWEAR_SIZES,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    tags: ["sneakers", "leather"],
  },
  {
    id: "p-1008",
    slug: "minimalist-leather-watch",
    name: "Minimalist Leather Watch",
    brand: "NOVA",
    price: 340,
    description:
      "A 38mm timepiece with a clean, uncluttered dial, sapphire crystal and a quick-release Italian leather strap. Quietly precise.",
    details: [
      "38mm brushed steel case",
      "Sapphire crystal",
      "Italian leather strap",
      "Japanese quartz movement",
      "3 ATM water resistance",
    ],
    images: ["1524592094714-0f0654e20314", "1523170335258-f5ed11844a49"],
    category: "accessories",
    colors: [NEUTRALS[2], NEUTRALS[3]],
    sizes: ONE_SIZE,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    tags: ["watch", "leather"],
  },
  {
    id: "p-1009",
    slug: "structured-leather-tote",
    name: "Structured Leather Tote",
    brand: "NOVA",
    price: 420,
    description:
      "A structured everyday tote in vegetable-tanned leather that develops a rich patina over time. Fits a 13-inch laptop with room to spare.",
    details: [
      "Vegetable-tanned leather",
      "Fits 13-inch laptop",
      "Interior zip pocket",
      "Magnetic closure",
    ],
    images: ["1584917865442-de89df76afd3", "1559563458-527698bf5295"],
    category: "bags",
    colors: [NEUTRALS[2], NEUTRALS[3], NEUTRALS[4]],
    sizes: ONE_SIZE,
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 97,
    inStock: true,
    tags: ["leather", "tote", "work"],
  },
  {
    id: "p-1010",
    slug: "acetate-sunglasses",
    name: "Acetate Sunglasses",
    brand: "NOVA",
    price: 220,
    description:
      "A timeless square frame hand-polished from premium Italian acetate, fitted with scratch-resistant CR-39 lenses and full UV400 protection.",
    details: [
      "Italian Mazzucchelli acetate",
      "CR-39 lenses, UV400",
      "Five-barrel hinges",
      "Includes case and cloth",
    ],
    images: ["1511499767150-a48a237f0083", "1572635196237-14b3f281503f"],
    category: "accessories",
    colors: [NEUTRALS[2], NEUTRALS[3]],
    sizes: ONE_SIZE,
    rating: 4.6,
    reviewCount: 74,
    inStock: true,
    tags: ["eyewear", "acetate"],
  },
  {
    id: "p-1011",
    slug: "chelsea-boot",
    name: "Chelsea Boot",
    brand: "NOVA",
    price: 320,
    description:
      "A streamlined Chelsea boot in rich suede with elasticated side panels and a durable rubber sole. Pull-on ease with a tailored profile.",
    details: [
      "Suede upper",
      "Elasticated side panels",
      "Rubber lug sole",
      "Blake stitched",
    ],
    images: ["https://images.pexels.com/photos/26856060/pexels-photo-26856060.jpeg"],
    category: "footwear",
    colors: [NEUTRALS[2], NEUTRALS[3]],
    sizes: FOOTWEAR_SIZES,
    rating: 4.7,
    reviewCount: 88,
    inStock: true,
    tags: ["boots", "suede"],
  },
  {
    id: "p-1012",
    slug: "crossbody-bag",
    name: "Crossbody Bag",
    brand: "NOVA",
    price: 280,
    description:
      "A compact crossbody in smooth full-grain leather with an adjustable strap and just enough room for the essentials. Your everyday companion.",
    details: [
      "Full-grain leather",
      "Adjustable strap",
      "Interior card slots",
      "Zip closure",
    ],
    images: ["https://images.pexels.com/photos/27204286/pexels-photo-27204286.jpeg"],
    category: "bags",
    colors: [NEUTRALS[2], NEUTRALS[3], NEUTRALS[4]],
    sizes: ONE_SIZE,
    rating: 4.6,
    reviewCount: 61,
    inStock: true,
    tags: ["leather", "crossbody"],
  },
  {
    id: "p-1013",
    slug: "linen-blazer",
    name: "Linen Blazer",
    brand: "NOVA",
    price: 265,
    compareAtPrice: 330,
    description:
      "An unlined linen blazer with a relaxed notch lapel and patch pockets. Breathable, effortlessly smart, and made for warm-weather dressing.",
    details: [
      "100% European linen",
      "Unlined, half-canvas",
      "Patch pockets",
      "Relaxed fit",
    ],
    images: ["1515886657613-9f3515b0c78f"],
    category: "women",
    colors: [NEUTRALS[0], NEUTRALS[1], NEUTRALS[3]],
    sizes: CLOTHING_SIZES,
    rating: 4.5,
    reviewCount: 49,
    inStock: true,
    tags: ["linen", "blazer"],
  },
  {
    id: "p-1014",
    slug: "canvas-weekender",
    name: "Canvas Weekender",
    brand: "NOVA",
    price: 260,
    description:
      "A spacious weekender in waxed canvas with leather handles and a detachable shoulder strap. Built for short trips and long weekends.",
    details: [
      "Waxed cotton canvas",
      "Leather handles and trim",
      "Detachable shoulder strap",
      "Water-resistant",
    ],
    images: ["1553062407-98eeb64c6a62"],
    category: "bags",
    colors: [NEUTRALS[1], NEUTRALS[3]],
    sizes: ONE_SIZE,
    rating: 4.7,
    reviewCount: 42,
    inStock: true,
    tags: ["canvas", "travel"],
  },
  {
    id: "p-1015",
    slug: "ribbed-knit-dress",
    name: "Ribbed Knit Dress",
    brand: "NOVA",
    price: 195,
    description:
      "A fitted ribbed-knit midi dress in a soft, breathable blend that holds its shape. Sleek on its own, layered under coats in colder months.",
    details: [
      "Ribbed cotton-cashmere blend",
      "Fitted silhouette",
      "Midi length",
      "Four-way stretch",
    ],
    images: ["https://images.pexels.com/photos/17849359/pexels-photo-17849359.jpeg"],
    category: "women",
    colors: [NEUTRALS[0], NEUTRALS[1], NEUTRALS[2]],
    sizes: CLOTHING_SIZES,
    rating: 4.6,
    reviewCount: 53,
    inStock: true,
    tags: ["knit", "dress"],
  },
  {
    id: "p-1016",
    slug: "merino-crewneck-sweater",
    name: "Merino Crewneck Sweater",
    brand: "NOVA",
    price: 210,
    description:
      "A fine-gauge merino crewneck with a clean, regular fit and ribbed trims. Warm without weight, and naturally temperature-regulating.",
    details: [
      "Extra-fine merino wool",
      "Regular fit",
      "Ribbed trims",
      "Fully fashioned",
    ],
    images: ["1576566588028-4147f3842f27", "1617137968427-85924c800a22"],
    category: "men",
    colors: [NEUTRALS[0], NEUTRALS[1], NEUTRALS[2], NEUTRALS[4]],
    sizes: CLOTHING_SIZES,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 118,
    inStock: true,
    tags: ["merino", "knitwear"],
  },
  {
    id: "p-1017",
    slug: "suede-loafers",
    name: "Suede Loafers",
    brand: "NOVA",
    price: 290,
    description:
      "A relaxed penny loafer in brushed suede with a hand-stitched apron and a flexible leather sole. Smart enough for tailoring, easy enough for denim.",
    details: [
      "Brushed suede upper",
      "Hand-stitched apron",
      "Leather sole",
      "Cushioned footbed",
    ],
    images: ["1614252235316-8c857d38b5f4", "1520639888713-7851133b1ed0"],
    category: "footwear",
    colors: [NEUTRALS[2], NEUTRALS[3], NEUTRALS[4]],
    sizes: FOOTWEAR_SIZES,
    rating: 4.6,
    reviewCount: 39,
    inStock: false,
    tags: ["loafers", "suede"],
  },
  {
    id: "p-1018",
    slug: "cashmere-scarf",
    name: "Cashmere Scarf",
    brand: "NOVA",
    price: 180,
    description:
      "A generously sized scarf in pure, softly brushed cashmere. Light enough to fold, warm enough to rely on through the coldest months.",
    details: [
      "100% pure cashmere",
      "Brushed finish",
      "Fringed ends",
      "70cm × 200cm",
    ],
    images: ["https://images.pexels.com/photos/37840923/pexels-photo-37840923.jpeg"],
    category: "accessories",
    colors: [NEUTRALS[0], NEUTRALS[1], NEUTRALS[3], NEUTRALS[4]],
    sizes: ONE_SIZE,
    rating: 4.8,
    reviewCount: 91,
    inStock: true,
    tags: ["cashmere", "scarf", "winter"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, limit);
}
