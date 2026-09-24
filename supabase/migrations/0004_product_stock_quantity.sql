-- Add stock quantity tracking to products.
--
-- `stock_quantity` is the source of truth for inventory. `in_stock` is kept as
-- a denormalised compatibility flag derived from it (0 → out of stock, > 0 →
-- in stock). Existing products already marked in stock are backfilled with a
-- non-zero quantity so they don't suddenly read as out of stock.
--
-- Run in the Supabase SQL editor (or via `supabase db push` / `db reset`).
-- Safe to run more than once.

alter table nova.products
  add column if not exists stock_quantity integer not null default 0;

update nova.products
  set stock_quantity = 10
  where in_stock = true
    and stock_quantity = 0;
