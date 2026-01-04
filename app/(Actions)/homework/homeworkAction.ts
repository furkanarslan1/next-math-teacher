"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createHomeworkAction(formData: FormData) {
  const supabase = await createServerSupabase();

  //get form datas
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const short_note = formData.get("short_note") as string;
  const google_form_url = formData.get("google_form_url") as string;
  const target_type = formData.get("target_type") as string;
  const target_grade = formData.get("target_grade") as string;
  const target_student_id = formData.get("target_student_id") as string;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("homeworks").insert([
    {
      title,
      description,
      short_note,
      google_form_url,
      target_grade,
      target_type,
      target_student_id,
      created_by: user?.id,
    },
  ]);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/homeworks");
  return { success: true };
}

export async function deleteHomeworkAction(id: string) {
  const supabase = await createServerSupabase();

  const { error } = await supabase.from("homeworks").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/homeworks");
  return { success: true };
}

export async function updateHomeworkAction(id: string, formData: FormData) {
  const supabase = await createServerSupabase();

  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    short_note: formData.get("short_note") as string,
    google_form_url: formData.get("google_form_url") as string,
    target_type: formData.get("target_type") as string,
    target_grade: formData.get("target_grade")
      ? parseInt(formData.get("target_grade") as string)
      : null,
    target_student_id: (formData.get("target_student_id") as string) || null,
  };

  const { error } = await supabase.from("homeworks").update(data).eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/homeworks");
  return { success: true };
}

export async function toggleHomeworkStatus(
  homeworkId: string,
  isCompleted: boolean
) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("You must log in.");

  if (isCompleted) {
    // Tamamlandı olarak işaretle (Kayıt ekle)
    // Mark as completed (Add record)
    await supabase.from("homework_submissions").insert({
      homework_id: homeworkId,
      student_id: user.id,
    });
  } else {
    // İşareti kaldır (Kaydı sil)
    // Remove the mark (Delete the record)
    await supabase
      .from("homework_submissions")
      .delete()
      .eq("homework_id", homeworkId)
      .eq("student_id", user.id);
  }

  revalidatePath("/homeworks");
}
