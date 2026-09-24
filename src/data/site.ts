export type SocialLink = {
  label: string;
  href: string;
  icon: "instagram" | "pinterest" | "tiktok";
};

export type NavLink = {
  label: string;
  href: string;
};

/**
 * Site-wide configuration.
 *
 * NOTE: Contact details, addresses and social handles below are realistic demo
 * values for this showcase. Replace them with real NOVA details before launch.
 */
export const site = {
  name: "NOVA",
  legalName: "NOVA Studio Ltd.",
  tagline: "Considered essentials for everyday living.",
  description:
    "NOVA is a modern fashion and lifestyle house — thoughtfully designed apparel, footwear and accessories in premium natural materials, made to be lived in for years.",
  shortDescription:
    "Modern apparel, footwear and accessories in premium natural materials.",
  foundedYear: 2019,
  url: "https://nova-studio.com",
  city: "New York",
  country: "USA",
  email: "hello@nova-studio.com",
  emailHref: "mailto:hello@nova-studio.com",
  socials: [
    { label: "Instagram", href: "https://instagram.com/nova", icon: "instagram" },
    { label: "Pinterest", href: "https://pinterest.com/nova", icon: "pinterest" },
    { label: "TikTok", href: "https://tiktok.com/@nova", icon: "tiktok" },
  ] as SocialLink[],
  announcement: {
    text: "Complimentary shipping on orders over $150",
    href: "/shop",
    label: "Shop new arrivals",
  },
  support: {
    shippingNote: "Complimentary shipping on orders over $150",
    returnNote: "Free returns within 30 days",
    warrantyNote: "Two-year craftsmanship guarantee",
  },
} as const;

export const navLinks: NavLink[] = [
  { label: "New", href: "/shop?sort=newest" },
  { label: "Women", href: "/category/women" },
  { label: "Men", href: "/category/men" },
  { label: "Accessories", href: "/category/accessories" },
  { label: "Footwear", href: "/category/footwear" },
  { label: "Bags", href: "/category/bags" },
];

export const navPrimaryCta = {
  label: "Shop All",
  href: "/shop",
};

export const footerLinks: NavLink[] = [
  { label: "Shop All", href: "/shop" },
  { label: "Women", href: "/category/women" },
  { label: "Men", href: "/category/men" },
  { label: "Accessories", href: "/category/accessories" },
  { label: "Footwear", href: "/category/footwear" },
  { label: "Bags", href: "/category/bags" },
];

export const accountLinks: NavLink[] = [
  { label: "Account", href: "/account" },
  { label: "Orders", href: "/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
];

export const companyLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const supportLinks: NavLink[] = [
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
