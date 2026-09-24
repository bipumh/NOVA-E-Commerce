-- NOVA — Supabase schema
-- Run this in the Supabase SQL editor, or `supabase db reset` with the CLI.
--
-- Data model notes:
--   * Product variants are denormalised onto `products` as `colors` (jsonb)
--     and `sizes` (text[]). Every colour is available in every size at a
--     single price, so a separate variants/SKU table would add complexity
--     without benefit.
--   * `numeric` columns are returned as strings by PostgREST/Supabase JS.
--     When live queries are added, read helpers will convert them with
--     `Number()` to match the application's `number` types.

create schema if not exists nova;

-- Categories ---------------------------------------------------------------
create table if not exists nova.categories (
  slug text primary key,
  name text not null,
  tagline text,
  description text,
  image text,
  "order" integer not null default 0,
  created_at timestamptz not null default now()
);

-- Products -----------------------------------------------------------------
create table if not exists nova.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand text not null default 'NOVA',
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  description text,
  details text[] not null default '{}',
  images text[] not null default '{}',
  category text references nova.categories (slug) on delete set null,
  colors jsonb not null default '[]',       -- [{ "name": "Ivory", "hex": "#f4f1ea" }, ...]
  sizes text[] not null default '{}',       -- ["XS", "S", "M", ...] or ["One size"]
  is_new boolean not null default false,
  is_featured boolean not null default false,
  rating numeric(2, 1) not null default 0,
  review_count integer not null default 0,
  in_stock boolean not null default true,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on nova.products (category);
create index if not exists products_featured_idx on nova.products (is_featured);

-- Profiles (one row per auth user) -----------------------------------------
create table if not exists nova.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Orders -------------------------------------------------------------------
create table if not exists nova.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  status text not null default 'Processing'
    check (status in ('Processing', 'Shipped', 'Delivered', 'Cancelled')),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'failed')),
  email text not null,
  shipping_name text not null,
  shipping_address text not null,
  shipping_city text not null,
  shipping_postal text not null,
  shipping_country text not null,
  subtotal numeric(10, 2) not null,
  shipping numeric(10, 2) not null,
  total numeric(10, 2) not null,
  created_at timestamptz not null default now()
);

create table if not exists nova.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references nova.orders (id) on delete cascade,
  product_id uuid references nova.products (id) on delete set null,
  name text not null,
  price numeric(10, 2) not null,
  size text,
  color text,
  quantity integer not null default 1
);

-- Wishlists ----------------------------------------------------------------
create table if not exists nova.wishlists (
  user_id uuid references auth.users (id) on delete cascade,
  product_id uuid references nova.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

-- Row Level Security -------------------------------------------------------
alter table nova.profiles enable row level security;
alter table nova.orders enable row level security;
alter table nova.order_items enable row level security;
alter table nova.wishlists enable row level security;

create policy "Public read" on nova.products for select using (true);
create policy "Public read" on nova.categories for select using (true);

create policy "Own profile" on nova.profiles
  for all using (auth.uid() = id);

create policy "Own orders" on nova.orders
  for select using (auth.uid() = user_id);

create policy "Own order items" on nova.order_items
  for select using (
    exists (select 1 from nova.orders o where o.id = order_items.order_id and o.user_id = auth.uid())
  );

create policy "Insert own orders" on nova.orders
  for insert with check (auth.uid() = user_id);

create policy "Insert own order items" on nova.order_items
  for insert with check (
    exists (select 1 from nova.orders o where o.id = order_items.order_id and o.user_id = auth.uid())
  );

create policy "Own wishlist" on nova.wishlists
  for all using (auth.uid() = user_id);
