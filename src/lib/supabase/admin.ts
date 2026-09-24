import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { supabaseUrl } from "./config";

/**
 * Privileged server-only client using the service-role key.
 *
 * Bypasses Row Level Security — use only in trusted server code (server actions,
 * route handlers) for admin/order operations. The `server-only` import makes
 * importing this module from a Client Component a build-time error, and the key
 * itself is read from `SUPABASE_SERVICE_ROLE_KEY` (never `NEXT_PUBLIC_`), so it
 * can never be shipped to the browser.
 */
export function getSupabaseAdmin(): SupabaseClient<Database, "nova"> {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Supabase admin client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  return createClient<Database, "nova">(supabaseUrl, serviceRoleKey, {
    db: { schema: "nova" },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
