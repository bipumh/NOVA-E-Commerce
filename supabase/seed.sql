-- NOVA - seed catalog
-- =====================
-- Seeds the `categories` and `products` tables from the bundled demo catalog
-- (`src/data/products.ts` + `src/data/categories.ts`).
--
-- Safe to run repeatedly: `on conflict (slug) do nothing` means existing rows
-- are never overwritten or deleted. No `id` values are supplied, so products
-- get fresh UUIDs on insert.
--
-- How to run:
--   1. Apply `schema.sql` first.
--   2. Run this file in the Supabase SQL editor, or:
--        supabase db reset && psql "$SUPABASE_DB_URL" -f supabase/seed.sql
--      (with the CLI: `supabase db reset` runs `supabase/seed.sql` automatically
--       if it lives at the repo root of the supabase project.)

-- Categories
insert into nova.categories (slug, name, tagline, description, image, "order") values
  ('women', 'Women', 'Fluid tailoring & soft tailoring', 'Elegant, easy pieces cut from natural fibres - designed to move with you from morning to evening.', '1539109136881-3be0616acf4b', 0),
  ('men', 'Men', 'Refined, uncomplicated staples', 'A considered wardrobe of precise shirting, knitwear and tailoring in enduring materials.', '1520975954732-35dd22299614', 1),
  ('accessories', 'Accessories', 'The finishing touch', 'Quietly luxurious accessories - watches, eyewear and small leather goods that complete every look.', '1524592094714-0f0654e20314', 2),
  ('footwear', 'Footwear', 'Crafted for the everyday', 'Minimal sneakers, loafers and boots in fine leather and suede, built on comfort-first lasts.', '1516826957135-700dedea698c', 3),
  ('bags', 'Bags', 'Carry less, better', 'Structured totes, crossbodies and weekenders in vegetable-tanned leather and hardwearing canvas.', '1584917865442-de89df76afd3', 4)
on conflict (slug) do nothing;

-- Products
insert into nova.products
  (slug, name, brand, price, compare_at_price, description, details, images, category, colors, sizes, is_new, is_featured, rating, review_count, in_stock, tags)
values
  (
    'tailored-wool-overcoat', 'Tailored Wool Overcoat', 'NOVA', 495, 620,
    'A double-faced wool overcoat with a clean, unstructured shoulder and a fluid drape. Cut to layer over knitwear without bulk, finished with horn buttons and deep welt pockets.',
    ARRAY['100% double-faced virgin wool', 'Unstructured, relaxed shoulder', 'Horn button closure', 'Fully lined sleeves', 'Made in Portugal'],
    ARRAY['1539109136881-3be0616acf4b', '1544022613-e87ca75a784a'],
    'women',
    '[{"name":"Ivory","hex":"#f4f1ea"},{"name":"Stone","hex":"#d8d2c6"},{"name":"Ink","hex":"#1a1713"}]'::jsonb,
    ARRAY['XS','S','M','L','XL'], true, true, 4.8, 124, true,
    ARRAY['wool','outerwear','winter']
  ),
  (
    'silk-slip-dress', 'Silk Slip Dress', 'NOVA', 320, NULL,
    'A bias-cut slip dress in sandwashed mulberry silk with adjustable straps and a subtle cowl neck. Effortless on its own, equally at home under tailoring.',
    ARRAY['100% sandwashed mulberry silk', 'Bias cut for a fluid drape', 'Adjustable straps', 'Midi length'],
    ARRAY['1595777457583-95e059d581b8', '1509631179647-0177331693ae'],
    'women',
    '[{"name":"Ivory","hex":"#f4f1ea"},{"name":"Camel","hex":"#b98d5f"},{"name":"Clay","hex":"#9a5230"}]'::jsonb,
    ARRAY['XS','S','M','L','XL'], false, true, 4.7, 86, true,
    ARRAY['silk','dress','evening']
  ),
  (
    'relaxed-cotton-tee', 'Relaxed Cotton Tee', 'NOVA', 65, NULL,
    'The essential tee, cut from a substantial organic cotton jersey with a relaxed, boxy fit and a ribbed collar that keeps its shape wash after wash.',
    ARRAY['220gsm organic cotton jersey', 'Boxy, relaxed fit', 'Ribbed collar', 'Pre-shrunk'],
    ARRAY['1521572163474-6864f9cf17ab', '1503341504253-dff4815485f1'],
    'men',
    '[{"name":"Ivory","hex":"#f4f1ea"},{"name":"Stone","hex":"#d8d2c6"},{"name":"Ink","hex":"#1a1713"}]'::jsonb,
    ARRAY['XS','S','M','L','XL'], false, false, 4.6, 231, true,
    ARRAY['cotton','tee','essential']
  ),
  (
    'wide-leg-tailored-trouser', 'Wide-Leg Tailored Trouser', 'NOVA', 185, NULL,
    'A high-rise, wide-leg trouser with a pressed crease and a clean, floor-grazing silhouette. Tailored from a mid-weight wool blend with a soft, matte hand.',
    ARRAY['Wool-blend suiting', 'High-rise, wide leg', 'Pressed front crease', 'Side and back pockets'],
    ARRAY['1594633312681-425c7b97ccd1', '1541099649105-f69ad21f3246'],
    'women',
    '[{"name":"Ivory","hex":"#f4f1ea"},{"name":"Stone","hex":"#d8d2c6"},{"name":"Ink","hex":"#1a1713"}]'::jsonb,
    ARRAY['XS','S','M','L','XL'], false, false, 4.5, 67, true,
    ARRAY['trousers','tailoring']
  ),
  (
    'classic-oxford-shirt', 'Classic Oxford Shirt', 'NOVA', 150, NULL,
    'A button-down Oxford in crisp two-ply cotton with a tailored collar and single-needle stitching throughout. The shirt that anchors every wardrobe.',
    ARRAY['Two-ply cotton oxford', 'Button-down collar', 'Single-needle stitching', 'Mother-of-pearl buttons'],
    ARRAY['1520975954732-35dd22299614'],
    'men',
    '[{"name":"Ivory","hex":"#f4f1ea"},{"name":"Stone","hex":"#d8d2c6"},{"name":"Ink","hex":"#1a1713"}]'::jsonb,
    ARRAY['XS','S','M','L','XL'], false, false, 4.7, 154, true,
    ARRAY['shirting','cotton','essential']
  ),
  (
    'leather-bomber-jacket', 'Leather Bomber Jacket', 'NOVA', 480, 560,
    'A minimalist bomber in supple lambskin with a matte finish, ribbed cuffs and a clean, collarless profile. Softens beautifully with wear.',
    ARRAY['100% lambskin leather', 'Matte finish', 'Ribbed cuffs and hem', 'Two-way zip'],
    ARRAY['1551028719-00167b16eac5', '1591047139829-d91aecb6caea'],
    'men',
    '[{"name":"Ink","hex":"#1a1713"},{"name":"Camel","hex":"#b98d5f"}]'::jsonb,
    ARRAY['XS','S','M','L','XL'], true, false, 4.9, 58, true,
    ARRAY['leather','outerwear']
  ),
  (
    'minimal-leather-sneaker', 'Minimal Leather Sneaker', 'NOVA', 230, NULL,
    'A pared-back court sneaker in full-grain white leather on a tonal cup sole. Clean lines, no logos - designed to go with everything you own.',
    ARRAY['Full-grain leather upper', 'Tonal cup sole', 'Removable cushioned insole', 'Hand-finished edges'],
    ARRAY['1516826957135-700dedea698c', '1549298916-b41d501d3772'],
    'footwear',
    '[{"name":"Ivory","hex":"#f4f1ea"},{"name":"Stone","hex":"#d8d2c6"}]'::jsonb,
    ARRAY['6','7','8','9','10','11'], false, true, 4.8, 312, true,
    ARRAY['sneakers','leather']
  ),
  (
    'minimalist-leather-watch', 'Minimalist Leather Watch', 'NOVA', 340, NULL,
    'A 38mm timepiece with a clean, uncluttered dial, sapphire crystal and a quick-release Italian leather strap. Quietly precise.',
    ARRAY['38mm brushed steel case', 'Sapphire crystal', 'Italian leather strap', 'Japanese quartz movement', '3 ATM water resistance'],
    ARRAY['1524592094714-0f0654e20314', '1523170335258-f5ed11844a49'],
    'accessories',
    '[{"name":"Ink","hex":"#1a1713"},{"name":"Camel","hex":"#b98d5f"}]'::jsonb,
    ARRAY['One size'], false, true, 4.9, 203, true,
    ARRAY['watch','leather']
  ),
  (
    'structured-leather-tote', 'Structured Leather Tote', 'NOVA', 420, NULL,
    'A structured everyday tote in vegetable-tanned leather that develops a rich patina over time. Fits a 13-inch laptop with room to spare.',
    ARRAY['Vegetable-tanned leather', 'Fits 13-inch laptop', 'Interior zip pocket', 'Magnetic closure'],
    ARRAY['1584917865442-de89df76afd3', '1559563458-527698bf5295'],
    'bags',
    '[{"name":"Ink","hex":"#1a1713"},{"name":"Camel","hex":"#b98d5f"},{"name":"Clay","hex":"#9a5230"}]'::jsonb,
    ARRAY['One size'], true, true, 4.8, 97, true,
    ARRAY['leather','tote','work']
  ),
  (
    'acetate-sunglasses', 'Acetate Sunglasses', 'NOVA', 220, NULL,
    'A timeless square frame hand-polished from premium Italian acetate, fitted with scratch-resistant CR-39 lenses and full UV400 protection.',
    ARRAY['Italian Mazzucchelli acetate', 'CR-39 lenses, UV400', 'Five-barrel hinges', 'Includes case and cloth'],
    ARRAY['1511499767150-a48a237f0083', '1572635196237-14b3f281503f'],
    'accessories',
    '[{"name":"Ink","hex":"#1a1713"},{"name":"Camel","hex":"#b98d5f"}]'::jsonb,
    ARRAY['One size'], false, false, 4.6, 74, true,
    ARRAY['eyewear','acetate']
  ),
  (
    'chelsea-boot', 'Chelsea Boot', 'NOVA', 320, NULL,
    'A streamlined Chelsea boot in rich suede with elasticated side panels and a durable rubber sole. Pull-on ease with a tailored profile.',
    ARRAY['Suede upper', 'Elasticated side panels', 'Rubber lug sole', 'Blake stitched'],
    ARRAY['1543163521-1bf539c55dd2'],
    'footwear',
    '[{"name":"Ink","hex":"#1a1713"},{"name":"Camel","hex":"#b98d5f"}]'::jsonb,
    ARRAY['6','7','8','9','10','11'], false, false, 4.7, 88, true,
    ARRAY['boots','suede']
  ),
  (
    'crossbody-bag', 'Crossbody Bag', 'NOVA', 280, NULL,
    'A compact crossbody in smooth full-grain leather with an adjustable strap and just enough room for the essentials. Your everyday companion.',
    ARRAY['Full-grain leather', 'Adjustable strap', 'Interior card slots', 'Zip closure'],
    ARRAY['1548036328-c9fa89d128fa'],
    'bags',
    '[{"name":"Ink","hex":"#1a1713"},{"name":"Camel","hex":"#b98d5f"},{"name":"Clay","hex":"#9a5230"}]'::jsonb,
    ARRAY['One size'], false, false, 4.6, 61, true,
    ARRAY['leather','crossbody']
  ),
  (
    'linen-blazer', 'Linen Blazer', 'NOVA', 265, 330,
    'An unlined linen blazer with a relaxed notch lapel and patch pockets. Breathable, effortlessly smart, and made for warm-weather dressing.',
    ARRAY['100% European linen', 'Unlined, half-canvas', 'Patch pockets', 'Relaxed fit'],
    ARRAY['1515886657613-9f3515b0c78f', '1529139574466-a303027c1d8b'],
    'women',
    '[{"name":"Ivory","hex":"#f4f1ea"},{"name":"Stone","hex":"#d8d2c6"},{"name":"Camel","hex":"#b98d5f"}]'::jsonb,
    ARRAY['XS','S','M','L','XL'], false, false, 4.5, 49, true,
    ARRAY['linen','blazer']
  ),
  (
    'canvas-weekender', 'Canvas Weekender', 'NOVA', 260, NULL,
    'A spacious weekender in waxed canvas with leather handles and a detachable shoulder strap. Built for short trips and long weekends.',
    ARRAY['Waxed cotton canvas', 'Leather handles and trim', 'Detachable shoulder strap', 'Water-resistant'],
    ARRAY['1553062407-98eeb64c6a62'],
    'bags',
    '[{"name":"Stone","hex":"#d8d2c6"},{"name":"Camel","hex":"#b98d5f"}]'::jsonb,
    ARRAY['One size'], false, false, 4.7, 42, true,
    ARRAY['canvas','travel']
  ),
  (
    'ribbed-knit-dress', 'Ribbed Knit Dress', 'NOVA', 195, NULL,
    'A fitted ribbed-knit midi dress in a soft, breathable blend that holds its shape. Sleek on its own, layered under coats in colder months.',
    ARRAY['Ribbed cotton-cashmere blend', 'Fitted silhouette', 'Midi length', 'Four-way stretch'],
    ARRAY['1509631179647-0177331693ae', '1496747611176-843222e1e57c'],
    'women',
    '[{"name":"Ivory","hex":"#f4f1ea"},{"name":"Stone","hex":"#d8d2c6"},{"name":"Ink","hex":"#1a1713"}]'::jsonb,
    ARRAY['XS','S','M','L','XL'], false, false, 4.6, 53, true,
    ARRAY['knit','dress']
  ),
  (
    'merino-crewneck-sweater', 'Merino Crewneck Sweater', 'NOVA', 210, NULL,
    'A fine-gauge merino crewneck with a clean, regular fit and ribbed trims. Warm without weight, and naturally temperature-regulating.',
    ARRAY['Extra-fine merino wool', 'Regular fit', 'Ribbed trims', 'Fully fashioned'],
    ARRAY['1434389677669-e08b4cac3105'],
    'men',
    '[{"name":"Ivory","hex":"#f4f1ea"},{"name":"Stone","hex":"#d8d2c6"},{"name":"Ink","hex":"#1a1713"},{"name":"Clay","hex":"#9a5230"}]'::jsonb,
    ARRAY['XS','S','M','L','XL'], false, true, 4.7, 118, true,
    ARRAY['merino','knitwear']
  ),
  (
    'suede-loafers', 'Suede Loafers', 'NOVA', 290, NULL,
    'A relaxed penny loafer in brushed suede with a hand-stitched apron and a flexible leather sole. Smart enough for tailoring, easy enough for denim.',
    ARRAY['Brushed suede upper', 'Hand-stitched apron', 'Leather sole', 'Cushioned footbed'],
    ARRAY['1549298916-b41d501d3772'],
    'footwear',
    '[{"name":"Ink","hex":"#1a1713"},{"name":"Camel","hex":"#b98d5f"},{"name":"Clay","hex":"#9a5230"}]'::jsonb,
    ARRAY['6','7','8','9','10','11'], false, false, 4.6, 39, false,
    ARRAY['loafers','suede']
  ),
  (
    'cashmere-scarf', 'Cashmere Scarf', 'NOVA', 180, NULL,
    'A generously sized scarf in pure, softly brushed cashmere. Light enough to fold, warm enough to rely on through the coldest months.',
    ARRAY['100% pure cashmere', 'Brushed finish', 'Fringed ends', '70cm x 200cm'],
    ARRAY['1529139574466-a303027c1d8b'],
    'accessories',
    '[{"name":"Ivory","hex":"#f4f1ea"},{"name":"Stone","hex":"#d8d2c6"},{"name":"Camel","hex":"#b98d5f"},{"name":"Clay","hex":"#9a5230"}]'::jsonb,
    ARRAY['One size'], false, false, 4.8, 91, true,
    ARRAY['cashmere','scarf','winter']
  )
on conflict (slug) do nothing;
