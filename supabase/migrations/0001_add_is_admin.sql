-- Add a minimal admin role flag to the NOVA profiles table.
--
-- Run this in the Supabase SQL editor (or via `supabase db push` / `db reset`).
-- Existing rows default to `false`, so no one becomes an admin automatically.
--
-- To promote your own account to admin afterwards:
--   insert into nova.profiles (id, is_admin)
--   values ('<YOUR_USER_UUID>', true)
--   on conflict (id) do update set is_admin = true;
-- (Find your UUID under Authentication → Users.)

alter table nova.profiles
  add column if not exists is_admin boolean not null default false;
