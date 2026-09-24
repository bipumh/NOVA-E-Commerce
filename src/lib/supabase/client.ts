import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { supabaseAnonKey, supabaseUrl } from "./config";

let browserClient: SupabaseClient<Database, "nova"> | null = null;

/**
 * Lazily-created browser client for Client Components.
 *
 * Returns `null` when Supabase is not configured so the storefront continues to
 * run on its bundled placeholder catalog.
 */
export function getSupabaseBrowser(): SupabaseClient<Database, "nova"> | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (!browserClient) {
    browserClient = createBrowserClient<Database, "nova">(supabaseUrl, supabaseAnonKey, {
      db: { schema: "nova" },
    });
  }
  return browserClient;
}
