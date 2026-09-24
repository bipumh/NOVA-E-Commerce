import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Database, ProfileRow } from "@/types/database";
import { supabaseAnonKey, supabaseUrl } from "./config";

/**
 * Server client for Server Components, Route Handlers and Server Actions.
 *
 * Reads and writes the auth session cookies so authenticated requests work on
 * the server. Returns `null` when Supabase is not configured.
 */
export async function getSupabaseServer(): Promise<SupabaseClient<Database, "nova"> | null> {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const cookieStore = await cookies();

  return createServerClient<Database, "nova">(supabaseUrl, supabaseAnonKey, {
    db: { schema: "nova" },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component. This is safe to ignore when a
          // middleware is refreshing user sessions.
        }
      },
    },
  });
}

/**
 * Returns the currently authenticated user, or `null` when there is no active
 * session or Supabase is not configured.
 */
export async function getCurrentUser(): Promise<User | null> {
  const client = await getSupabaseServer();
  if (!client) return null;
  const {
    data: { user },
  } = await client.auth.getUser();
  return user;
}

/**
 * Returns the authenticated user's profile row, or `null` when no profile row
 * exists yet or Supabase is not configured.
 */
export async function getProfile(userId: string): Promise<ProfileRow | null> {
  const client = await getSupabaseServer();
  if (!client) return null;
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return data;
}
