import { createServerSupabase } from "@/lib/supabase/server";

export async function getStudentStats() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Tüm denemeleri çekiyoruz
  // We are shooting all the tests
  const { data: attempts } = await supabase
    .from("test_attempts")
    .select(
      `
      is_correct,
      questions (
        tests (
          category_id,
          test_categories (title)
        )
      )
    `
    )
    .eq("student_id", user.id);

  if (!attempts) return null;

  const totalQuestions = attempts.length;
  const correctAnswers = attempts.filter((a) => a.is_correct).length;
  const accuracy =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  // Kategori bazlı gruplama
  const categoryStats: Record<string, { correct: number; total: number }> = {};

  attempts.forEach((att: any) => {
    const catTitle = att.questions.tests.test_categories.title;
    if (!categoryStats[catTitle]) {
      categoryStats[catTitle] = { correct: 0, total: 0 };
    }
    categoryStats[catTitle].total++;
    if (att.is_correct) categoryStats[catTitle].correct++;
  });

  return {
    totalQuestions,
    correctAnswers,
    accuracy,
    categoryStats,
  };
}
