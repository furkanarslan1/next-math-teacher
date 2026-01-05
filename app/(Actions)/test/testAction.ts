"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addQuestionAction(formData: FormData, testId: string) {
  const supabase = await createServerSupabase();

  const questionText = formData.get("question_text") as string;
  const optionA = formData.get("option_a") as string;
  const optionB = formData.get("option_b") as string;
  const optionC = formData.get("option_c") as string;
  const optionD = formData.get("option_d") as string;
  const correctAnswer = formData.get("correct_answer") as string;
  const imageFile = formData.get("question_image") as File;

  let imageUrl = null;

  // Eğer resim seçilmişse yükle
  // Upload if image is selected
  if (imageFile && imageFile.size > 0) {
    const fileName = `${testId}/${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("test-questions")
      .upload(fileName, imageFile);

    if (uploadError) throw new Error("Image not upload");

    const {
      data: { publicUrl },
    } = supabase.storage.from("text-questions").getPublicUrl(fileName);

    imageUrl = publicUrl;
  }

  const { error } = await supabase.from("questions").insert([
    {
      test_id: testId,
      question_text: questionText,
      image_url: imageUrl,
      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,
      correct_answer: correctAnswer,
    },
  ]);

  if (error) throw new Error(error.message);

  revalidatePath(`/admin/tests/${testId}`);
}

export async function createTestCategoryAction(formData: FormData) {
  const supabase = await createServerSupabase();

  const title = formData.get("title") as string;
  const target_grade = parseInt(formData.get("target_grade") as string);
  const course_category = formData.get("course_category") as string;

  const { error } = await supabase
    .from("test_categories")
    .insert([{ title, target_grade, course_category }]);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/tests");
}
