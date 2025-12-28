"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { success } from "zod";

export async function deleteCourseAction(courseId: string) {
  const supabase = await createServerSupabase();

  // 1. To get the course (Find the image URL)
  // 1. Kursun bilgilerini al (Resim URL'sini bulmak için)
  const { data: course } = await supabase
    .from("courses")
    .select("image_url")
    .eq("id", courseId)
    .single();

  // 2. If there are images, delete them from Storage.
  // 2. Eğer resim varsa Storage'dan sil
  if (course?.image_url) {
    const fileName = course.image_url.split("/").pop(); // take the file name from URL
    if (fileName) {
      await supabase.storage.from("course-images").remove([fileName]);
    }
  }

  //delete course

  const { error } = await supabase.from("courses").delete().eq("id", courseId);

  if (error) {
    return {
      error: "An error occurred while deleting the course:" + error.message,
    };
  }

  revalidatePath("/admin/courses");
  return { success: true };
}
