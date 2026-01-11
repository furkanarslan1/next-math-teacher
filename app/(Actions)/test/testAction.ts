"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    } = supabase.storage.from("test-questions").getPublicUrl(fileName);

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

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized ");

  const title = formData.get("title") as string;

  // getAll() ile tüm seçili checkbox değerlerini dizi olarak alıyoruz
  // We get all selected checkbox values ​​as an array using getAll()
  const target_course_categories = formData.getAll(
    "target_course_categories"
  ) as string[];
  const target_grades_raw = formData.getAll("target_grades") as string[];

  // String dizisini sayı dizisine çeviriyoruz
  // Converting a string array to a number array
  const target_grades = target_grades_raw.map((g) => parseInt(g));

  const { error } = await supabase.from("test_categories").insert([
    {
      title,
      target_course_categories, // Örn: ['SBS', 'VIP']
      target_grades, // Örn: [8, 12]
      target_student_id: (formData.get("target_student_id") as string) || null,
    },
  ]);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/tests");
}

export async function createSubTestAction(formData: FormData) {
  const supabase = await createServerSupabase();

  const title = formData.get("title") as string;
  const category_id = formData.get("category_id") as string;

  const { error } = await supabase
    .from("tests")
    .insert([{ title, category_id }]);

  if (error) throw new Error(error.message);

  revalidatePath(`/admin/tests/${category_id}`);
}

export async function submitTestResultsAction(
  testId: string,
  userAnswers: { questionId: string; selectedAnswer: string }[]
) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("You must log in.");

  // Sonuçları test_attempts tablosuna ekle (UPSERT kullanıyoruz ki tekrar çözdüğünde güncellensin)
  // Add the results to the test_attempts table (we use UPSERT so that it is updated when it is solved again)

  const questionIds = userAnswers.map((ua) => ua.questionId);
  const { data: correctAnswers, error: fetchError } = await supabase
    .from("questions")
    .select("id,correct_answer")
    .in("id", questionIds);

  if (fetchError || !correctAnswers)
    throw new Error("Answer key could not be obtained.");
  const submissions = userAnswers.map((ua) => {
    const dbQuestion = correctAnswers.find((q) => q.id === ua.questionId);

    return {
      student_id: user.id,
      test_id: testId,
      question_id: ua.questionId,
      selected_answer: ua.selectedAnswer,
      is_correct: dbQuestion
        ? dbQuestion.correct_answer === ua.selectedAnswer
        : false,
    };
  });

  const { error: upsertError } = await supabase
    .from("test_attempts")
    .upsert(submissions, { onConflict: "student_id, question_id" });

  if (upsertError) throw new Error(upsertError.message);

  revalidatePath("/stats");
  // redirect("/stats");
}
