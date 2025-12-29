"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function popularCourseAction(
  courseId: string,
  isCurrentlyPopular: boolean
) {
  const supabase = await createServerSupabase();

  if (!isCurrentlyPopular) {
    // 1. Mevcut popüler kurs sayısını kontrol et
    // 1. Check the number of currently popular courses.
    const { count, error: countError } = await supabase
      .from("popular_courses")
      .select("*", { count: "exact", head: true });

    if (count !== null && count >= 4) {
      return {
        error:
          "You can select a maximum of 4 popular courses. Please remove one from the list first.",
      };
    }

    // 2. Sayı 4'ten azsa ekle
    // Add if the second number is less than 4
    const { error: insertError } = await supabase
      .from("popular_courses")
      .insert([{ course_id: courseId }]);

    if (insertError) return { error: insertError.message };
  } else {
    // 3. Zaten popülerse listeden çıkar
    // 3. Remove from the list if it's already popular.
    const { error: deleteError } = await supabase
      .from("popular_courses")
      .delete()
      .eq("course_id", courseId);

    if (deleteError) return { error: deleteError.message };
  }

  revalidatePath("/admin/popular");
  revalidatePath("/");
  return { success: true };
}
