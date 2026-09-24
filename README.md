# NOVA

A premium, minimalist fashion & lifestyle storefront. NOVA is a portfolio-quality
e-commerce experience built to look and feel like a real commercial product —
not a tutorial project.

## Overview

An editorial, minimal visual identity: sharp serif display type, a warm ivory
and ink palette with a single clay accent, generous whitespace, and restrained
motion. The storefront is fully responsive, with mobile treated as first-class.

### Tech stack

- **Next.js 16** (App Router, TypeScript, typed routes)
- **Tailwind CSS v4** (design tokens via `@theme`)
- **Framer Motion** (reveals, drawers, reduced-motion aware)
- **Lucide React** (icons)
- **Supabase + PostgreSQL** (schema ready; storefront runs on bundled data)

## Pages

- `/` — Editorial home (hero, categories, featured, new arrivals, brand story)
- `/shop` — Full catalog with search and sorting
- `/category/[slug]` — Category collection pages
- `/product/[slug]` — Product detail with gallery, size/colour selection
- `/cart` & `/wishlist` — Persistent, localStorage-backed
- `/checkout` — Multi-step form with confirmation
- `/account` & `/orders` — Account dashboard and order history
- `/login` & `/signup` — Authentication (Supabase-ready)
- `/admin` — Store dashboard (overview, products, orders)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & quality

```bash
npm run lint
npm run build
npm run start
```

## Data

The catalog lives in `src/data/` (`site.ts`, `categories.ts`, `products.ts`,
`orders.ts`) so the UI can be fully designed before a database is connected.
Photography is resolved through `img()` in `src/lib/images.ts`. Cart and
wishlist persist to `localStorage`; orders persist to a lightweight local store.

When Supabase credentials are present (`NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY`), admin, auth and order persistence switch over
to PostgreSQL. See `supabase/SETUP.md`.

## Accessibility & SEO

Semantic landmarks, labelled forms, visible focus states, keyboard-navigable
menus and drawers, reduced-motion support, descriptive alt text, per-page
metadata and a sitemap.

> **Note:** Products, prices, photography, reviews and order history are
> realistic demo values for this showcase. Forms simulate submission and store
> no data server-side. Replace with real NOVA details before going to
> production.
