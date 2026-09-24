"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Heart, ShoppingBag, User, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { accountLinks, navLinks } from "@/data/site";
import { useFocusTrap } from "@/lib/use-focus-trap";

export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const menuRef = useRef<HTMLElement>(null);

  useFocusTrap(menuRef, open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 right-0 flex w-[min(84vw,22rem)] flex-col bg-ivory shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                autoFocus
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const active = pathname.startsWith(link.href.split("?")[0]);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={
                          "block rounded-lg px-3 py-3 font-display text-2xl tracking-tight transition-colors " +
                          (active ? "text-clay" : "text-ink hover:text-clay")
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 border-t border-line pt-6">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-dim">
                  Account
                </p>
                <ul className="space-y-1">
                  {accountLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="grid grid-cols-3 gap-2 border-t border-line p-5">
              {[
                { label: "Account", href: "/account", icon: User },
                { label: "Wishlist", href: "/wishlist", icon: Heart },
                { label: "Cart", href: "/cart", icon: ShoppingBag },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-line bg-surface px-2 py-3 text-xs font-medium text-muted transition-colors hover:text-ink"
                >
                  <item.icon aria-hidden className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
