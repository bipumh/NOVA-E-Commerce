"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  if (subscribed) {
    return (
      <div className="flex items-center gap-3 rounded-full border border-line bg-surface px-5 py-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-clay">
          <Check aria-hidden className="h-4 w-4" />
        </span>
        <p className="text-sm text-ink">Thanks — you&apos;re on the list.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 md:items-center">
      <div>
        <h3 className="font-display text-lg font-medium text-ink">Join the NOVA list</h3>
        <p className="mt-1 text-sm text-muted">
          New arrivals, editorial stories and private sales — a few emails a month.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 w-full rounded-full border border-line-strong bg-surface px-5 text-sm text-ink placeholder:text-faint focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay text-charcoal transition-colors hover:bg-clay-dark"
        >
          <ArrowRight aria-hidden className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
