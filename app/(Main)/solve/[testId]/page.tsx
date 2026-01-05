import { createServerSupabase } from "@/lib/supabase/server";
import TestWizard from "@/components/test/TestWizard";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ testId: string }>;
  searchParams: Promise<{ mode?: string }>;
}

export default async function SolveTestPage({
  params,
  searchParams,
}: PageProps) {
  // 1. Parametreleri al
  const { testId } = await params;
  const { mode } = await searchParams;
  const isFixMode = mode === "fix";

  const supabase = await createServerSupabase();

  // 2. Kullanıcı bilgisini al (Yanlışları süzmek için lazım)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return notFound();

  // 3. Test başlık verisini çek
  const { data: test, error: testError } = await supabase
    .from("tests")
    .select("*")
    .eq("id", testId)
    .single();

  if (testError || !test) return notFound();

  let finalQuestions = [];

  if (isFixMode) {
    // --- HATA DÜZELTME MODU ---
    // Önce bu testteki yanlış yapılan soru ID'lerini bulalım
    const { data: wrongAttempts } = await supabase
      .from("test_attempts")
      .select("question_id")
      .eq("student_id", user.id)
      .eq("test_id", testId)
      .eq("is_correct", false);

    const wrongQuestionIds = wrongAttempts?.map((a) => a.question_id) || [];

    if (wrongQuestionIds.length > 0) {
      const { data: qData } = await supabase
        .from("questions")
        .select("*")
        .in("id", wrongQuestionIds)
        .order("id");
      finalQuestions = qData || [];
    }
  } else {
    // --- NORMAL MOD ---
    const { data: qData } = await supabase
      .from("questions")
      .select("*")
      .eq("test_id", testId)
      .order("id");
    finalQuestions = qData || [];
  }

  // --- HATA KONTROLLERİ ---
  if (!finalQuestions || finalQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-10 rounded-[32px] shadow-xl border text-center max-w-md">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            ✨
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            {isFixMode ? "No mistakes left!" : "No questions found!"}
          </h2>
          <p className="text-slate-500 mb-6">
            {isFixMode
              ? "You've corrected all your mistakes in this test. Great job!"
              : "There are no questions added to this test yet."}
          </p>
          <a
            href="/solve"
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold inline-block"
          >
            Go Back
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      {/* Sayfa başlığına "Fix Mode" ibaresi ekleyebiliriz */}
      {isFixMode && (
        <div className="max-w-4xl mx-auto mb-4 px-6">
          <div className="bg-red-50 border border-red-100 p-3 rounded-2xl flex items-center gap-3 text-red-700 font-bold text-sm">
            <span className="animate-pulse w-2 h-2 bg-red-600 rounded-full" />
            MISTAKE REVIEW MODE: You are only solving the questions you got
            wrong.
          </div>
        </div>
      )}

      <TestWizard
        test={test}
        questions={finalQuestions}
        isFixMode={isFixMode}
      />
    </div>
  );
}
