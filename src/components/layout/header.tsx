"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchDialog } from "@/components/layout/search-dialog";
import { useCart } from "@/lib/store/cart-context";
import { useWishlist } from "@/lib/store/wishlist-context";
import { navLinks } from "@/data/site";

function IconButton({
  label,
  href,
  onClick,
  className,
  children,
  badge,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  badge?: number;
}) {
  const classes = cn(
    "relative inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-2 hover:text-clay",
    className,
  );
  const inner = (
    <>
      {children}
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-[10px] font-semibold leading-none text-paper">
          {badge}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-label={label} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const path = href.split("?")[0];
    if (path === "/shop" || path.startsWith("/category")) {
      return pathname.startsWith(path);
    }
    return pathname === path;
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300",
          scrolled ? "border-line/70 bg-ivory/95 shadow-soft" : "border-line/40 bg-ivory/80",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-12">
          <div className="flex items-center gap-7">
            <div className="flex items-center gap-3">
              <IconButton
                label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="lg:hidden"
              >
                <Menu aria-hidden className="h-5 w-5" />
              </IconButton>
              <Logo />
            </div>

            <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "link-underline text-sm font-medium transition-colors",
                      active ? "text-clay" : "text-ink/80 hover:text-clay",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton label="Search" onClick={() => setSearchOpen(true)}>
              <Search aria-hidden className="h-5 w-5" />
            </IconButton>
            <IconButton label="Account" href="/account" className="hidden sm:inline-flex">
              <User aria-hidden className="h-5 w-5" />
            </IconButton>
            <IconButton label="Wishlist" href="/wishlist" badge={wishlistCount}>
              <Heart aria-hidden className="h-5 w-5" />
            </IconButton>
            <IconButton label="Cart" href="/cart" badge={itemCount}>
              <ShoppingBag aria-hidden className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
