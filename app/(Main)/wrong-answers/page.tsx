import { createServerSupabase } from "@/lib/supabase/server";
import { AlertCircle, RotateCcw, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function WrongAnswersPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Öğrencinin yanlış yaptığı soruları ve hangi teste/kategoriye ait olduklarını çekiyoruz
  // We record the questions the student answered incorrectly and the test/category they belong to.
  const { data: wrongs } = await supabase
    .from("test_attempts")
    .select(
      `
      id,
      is_correct,
      questions:question_id (
        id,
        question_text,
        tests:test_id (
          title,
          test_categories:category_id (title)
        )
      )
    `
    )
    .eq("student_id", user?.id)
    .eq("is_correct", false);

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
          <AlertCircle size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Things I Did Wrong
          </h1>
          <p className="text-slate-500">
            You can achieve success by learning from your mistakes.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {wrongs?.map((item: any) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-red-200 transition-all"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {item.questions.tests.test_categories.title}
                </span>
                <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {item.questions.tests.title}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 line-clamp-1">
                {item.questions.question_text}
              </h3>
            </div>

            <Link
              href={`/solve-again/${item.questions.id}`}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg active:scale-95"
            >
              <RotateCcw size={18} /> Solve Again
            </Link>
          </div>
        ))}

        {wrongs?.length === 0 && (
          <div className="text-center py-20 bg-green-50 rounded-3xl border-2 border-dashed border-green-200">
            <p className="text-green-600 font-bold text-lg">
              You're amazing! You haven't made a single mistake.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
