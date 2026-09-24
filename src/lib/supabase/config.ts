/**
 * Supabase configuration, read from environment variables.
 *
 * `NEXT_PUBLIC_*` values are safe to expose to the browser. The service-role
 * key is intentionally NOT read here — it lives in `admin.ts` and must never
 * use a `NEXT_PUBLIC_` prefix (Next strips non-prefixed vars from client code).
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when the minimum public credentials are present. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
