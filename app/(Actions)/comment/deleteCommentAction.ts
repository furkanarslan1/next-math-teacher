"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteCommentAction(commentId: string) {
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    return { error: "An error occurred while deleting the comment." };
  }

  revalidatePath("/admin/comments");
  return { success: "The comment has been successfully deleted." };
}
