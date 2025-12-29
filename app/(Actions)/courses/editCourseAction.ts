"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function editCourseAction(formData: FormData, courseId: string) {
  const supabase = await createServerSupabase();

  // 1. Temel Verileri Al
  //get data
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const short_description = formData.get("short_description") as string;
  const discount_percentage = Number(formData.get("discount_percentage") || 0);
  const is_active = formData.get("is_active") === "true";
  const category_id = formData.get("category_id") as string;

  // JSON string olarak gelen özellikleri diziye geri çevir
  // Convert JSON string properties back to an array
  const features = JSON.parse((formData.get("features") as string) || "[]");

  const file = formData.get("image") as File;
  let image_url = formData.get("current_image_url") as string;

  // 2. Resim Yükleme Kontrolü
  // 2. Image Upload Control
  if (file && file.size > 0) {
    const fileName = `${crypto.randomUUID()}.${file.name.split(".").pop()}`;
    const { error: uploadError } = await supabase.storage
      .from("course-images")
      .upload(fileName, file);

    if (!uploadError) {
      const { data } = supabase.storage
        .from("course-images")
        .getPublicUrl(fileName);
      image_url = data.publicUrl;
    }
  }

  // 3. Ana Kurs Bilgilerini Güncelle
  // 3. Update Main Course Information
  const { error: courseError } = await supabase
    .from("courses")
    .update({
      title,
      slug,
      price,
      description,
      short_description,
      discount_percentage,
      image_url,
      is_active,
    })
    .eq("id", courseId);

  if (courseError)
    return { error: "Course update error: " + courseError.message };

  // 4. Kategori İlişkisini Güncelle (Eskiyi sil, yeniyi ekle)
  // 4. Update Category Relationship (Delete the old one, add the new one)
  await supabase.from("course_categories").delete().eq("course_id", courseId);
  if (category_id && category_id !== "none") {
    await supabase
      .from("course_categories")
      .insert([{ course_id: courseId, category_id: category_id }]);
  }

  // 5. Özellikleri Güncelle (Eskileri sil, yenileri ekle)
  // 5. Update Features (Delete old ones, add new ones)
  await supabase.from("course_features").delete().eq("course_id", courseId);
  if (features.length > 0) {
    const featureRows = features.map((f: string) => ({
      course_id: courseId,
      feature: f,
    }));
    await supabase.from("course_features").insert(featureRows);
  }

  revalidatePath("/admin/courses");
  revalidatePath(`/admin/courses/edit/${courseId}`);

  return { success: true };
}
