"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, getSupabaseServer } from "@/lib/supabase/server";

export type ProfileState = {
  error?: string;
  success?: boolean;
};

export async function updateProfileName(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Please enter a name." };

  const user = await getCurrentUser();
  if (!user) return { error: "You are not signed in." };

  const supabase = await getSupabaseServer();
  if (!supabase) return { error: "Authentication is not configured." };

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, full_name: name }, { onConflict: "id" });

  if (error) return { error: error.message };

  revalidatePath("/account");
  return { success: true };
}
