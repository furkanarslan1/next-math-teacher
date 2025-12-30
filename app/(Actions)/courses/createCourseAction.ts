"use server";

import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createCourseAction(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  // 1. FormData'dan verileri çekiyoruz
  // 1. We are retrieving data from FormData
  const file = formData.get("image") as File;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const short_description = formData.get("short_description") as string;
  const discount_percentage = Number(formData.get("discount_percentage"));
  const is_active = formData.get("is_active") === "true";
  const category_id = formData.get("category_id") as string;

  const features = JSON.parse(
    (formData.get("features") as string) || "[]"
  ) as string[];

  let image_url = "";

  // 2. Resim Yükleme (Storage)
  // 2. Image Upload (Storage)
  if (file && file.size > 0) {
    const fileName = `${crypto.randomUUID()}.${file.name.split(".").pop()}`;
    const { error: uploadError } = await supabase.storage
      .from("course-images")
      .upload(fileName, file);

    if (uploadError)
      return { error: "Image could not be loaded: " + uploadError.message };

    const { data } = supabase.storage
      .from("course-images")
      .getPublicUrl(fileName);
    image_url = data.publicUrl;
  }

  // 3. Kursu Oluştur ve Tüm Verileri Kaydet
  // 3. Create Course and Save All Data
  const { data: newCourse, error: courseError } = await supabase
    .from("courses")
    .insert([
      {
        title,
        slug,
        price,
        description,
        short_description,
        discount_percentage,
        image_url,
        is_active,
        features: features,
      },
    ])
    .select()
    .single();

  if (courseError)
    return { error: "Course could not be created: " + courseError.message };

  // 4. Kategori İlişkisini Kur
  // Establish Category 4 Relationship
  if (category_id && category_id !== "none" && newCourse) {
    await supabase
      .from("course_categories")
      .insert([{ course_id: newCourse.id, category_id: category_id }]);
  }

  revalidatePath("/admin/courses");
  return { success: true };
}
