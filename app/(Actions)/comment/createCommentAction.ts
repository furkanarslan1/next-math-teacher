"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { success } from "zod";

export async function createCommentAction(formData: FormData) {
  const supabase = await createServerSupabase();

  //check of user auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "You must log in to post a comment" };

  const content = formData.get("content") as string;
  const rating = Number(formData.get("rating"));
  const course_id = formData.get("course_id") as string;

  const { error } = await supabase
    .from("comments")
    .insert([
      { content, rating, course_id, profile_id: user.id, is_approved: true },
    ]);

  if (error) return { error: "The comment could not be submitted." };
  revalidatePath(`/courses/[slug]`, "page");
  return { success: "Your comment has been received" };
}
