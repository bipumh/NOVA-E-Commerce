-- Allow category slug renames to cascade to products.
--
-- `nova.products.category` references `nova.categories(slug)` with `on delete
-- set null`, but has no `on update` action (Postgres defaults to NO ACTION),
-- which would make renaming a category that has products fail. This migration
-- adds `on update cascade` so the admin can rename a category and products
-- automatically follow. `on delete set null` is preserved unchanged.
--
-- Run in the Supabase SQL editor (or via `supabase db push` / `db reset`).
-- Safe to run more than once.

alter table nova.products
  drop constraint if exists products_category_fkey;

alter table nova.products
  add constraint products_category_fkey
  foreign key (category) references nova.categories (slug)
  on update cascade
  on delete set null;
