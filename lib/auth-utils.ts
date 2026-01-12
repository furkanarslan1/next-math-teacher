import { createServerSupabase } from "./supabase/server";

//for only admin
export async function validateAdmin() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    throw new Error("Unauthorized: Only admins can perform this action.");
  }
  return { supabase, user };
}

//for both admin and students
export async function validateUser() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You must be logged in to perform this aciton.");
  }
  return { supabase, user };
}
