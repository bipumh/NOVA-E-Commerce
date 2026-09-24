import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/lib/store/cart-context";
import { WishlistProvider } from "@/lib/store/wishlist-context";
import { site } from "@/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "NOVA — Modern Fashion & Lifestyle",
    template: "%s · NOVA",
  },
  description: site.description,
  keywords: [
    "modern fashion",
    "premium apparel",
    "minimal clothing",
    "leather goods",
    "footwear",
    "accessories",
    "NOVA",
    "sustainable fashion",
    "womenswear",
    "menswear",
  ],
  authors: [{ name: site.legalName }],
  creator: site.name,
  publisher: site.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "NOVA — Modern Fashion & Lifestyle",
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA — Modern Fashion & Lifestyle",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "shopping",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MotionConfig reducedMotion="user">
          <WishlistProvider>
            <CartProvider>
              <AnnouncementBar />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
            </CartProvider>
          </WishlistProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
