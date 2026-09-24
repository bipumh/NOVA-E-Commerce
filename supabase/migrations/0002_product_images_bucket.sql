-- Public bucket for NOVA product images.
-- Run in the Supabase SQL editor (or via `supabase db push` / `db reset`).
-- Safe to run more than once.
insert into storage.buckets (id, name, public)
values ('nova-product-images', 'nova-product-images', true)
on conflict (id) do nothing;
