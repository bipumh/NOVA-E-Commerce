# NOVA — Supabase setup

The storefront runs fully on bundled placeholder data (`src/data/`) while no
Supabase credentials are present, so `npm run dev` works out of the box.

## 1. Create the project

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/schema.sql` in the SQL editor (or `supabase db reset`).
3. Run `supabase/seed.sql` to load the demo catalog (5 categories, 18 products).
   It is idempotent — safe to run repeatedly.
4. (Later phases) enable Email auth under Auth → Providers for `/login` and
   `/signup`.

## 2. Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

| Variable | Scope | Required | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | public | yes | Project URL (safe for the browser) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | yes | Anon key (safe for the browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | no (later) | Bypasses RLS for admin/order operations |

> Never add a `NEXT_PUBLIC_` prefix to the service-role key. It is read only in
> `src/lib/supabase/admin.ts`, which is marked `server-only` and cannot be
> imported from client code.

## 3. Client structure

| File | Use | Returns `null` when unconfigured |
| --- | --- | --- |
| `src/lib/supabase/config.ts` | Shared env vars + `isSupabaseConfigured` | — |
| `src/lib/supabase/client.ts` | Browser client (`createBrowserClient`) | yes |
| `src/lib/supabase/server.ts` | Server client (`createServerClient` + cookies) | yes |
| `src/lib/supabase/admin.ts` | Service-role client (`server-only`) | throws if key missing |

The storefront keeps using bundled data as its fallback until live queries are
introduced in a later phase.

## 4. Data-access layer

The storefront reads products and categories through `src/lib/catalog/`:

| Function | Source |
| --- | --- |
| `getProducts({ q, category, sort })` | Supabase, falling back to bundled data |
| `getProductBySlug(slug)` | Supabase `.maybeSingle()`, falling back to bundled data |
| `getCategories()` / `getCategoryBySlug(slug)` | Supabase, falling back to bundled data |
| `getRelatedProducts(slug, category)` | Supabase, falling back to bundled data |

Each function uses Supabase when configured and reachable, and falls back to
`src/data/` when credentials are missing, the query errors, or the table is
empty — so the storefront never breaks without a backend. Rows are mapped into
the app's `Product`/`Category` types in `src/lib/catalog/mapping.ts`.
