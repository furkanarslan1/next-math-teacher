import { createServerSupabase } from "@/lib/supabase/server";
import { AlertCircle, RotateCcw, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function WrongAnswersPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: wrongs } = await supabase
    .from("test_attempts")
    .select(
      `
      id,
      questions:question_id (
        id,
        test_id,
        tests:test_id (
          id,
          title,
          test_categories:category_id (title)
        )
      )
    `
    )
    .eq("student_id", user?.id)
    .eq("is_correct", false);

  // Yanlışları Test ID'sine göre grupla
  const groupedWrongs = wrongs?.reduce((acc: any, curr: any) => {
    const testId = curr.questions.tests.id;
    if (!acc[testId]) {
      acc[testId] = {
        title: curr.questions.tests.title,
        category: curr.questions.tests.test_categories.title,
        count: 0,
        testId: testId,
      };
    }
    acc[testId].count += 1;
    return acc;
  }, {});

  const testList = Object.values(groupedWrongs || {});

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-red-600 text-white rounded-[24px] shadow-lg shadow-red-200">
          <AlertCircle size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
            Mistake Library
          </h1>
          <p className="text-slate-500 font-medium">
            Review and fix your errors by topic.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {testList.map((test: any) => (
          <div
            key={test.testId}
            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-500 transition-all"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-red-500">
                <BookOpen size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {test.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  {test.title}
                </h3>
                <p className="text-sm font-bold text-red-500 uppercase tracking-tighter">
                  {test.count} WRONG ANSWERS TO FIX
                </p>
              </div>
            </div>

            {/* Burası önemli: Sadece bu testin yanlışlarını çözmeye gönderiyoruz */}
            <Link
              href={`/solve/${test.testId}?mode=fix`}
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl"
            >
              <RotateCcw size={20} /> Solve Errors
            </Link>
          </div>
        ))}

        {testList.length === 0 && (
          <div className="text-center py-24 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChevronRight size={40} className="rotate-90" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Perfect Score!</h3>
            <p className="text-slate-400">
              You don't have any mistakes to review right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
