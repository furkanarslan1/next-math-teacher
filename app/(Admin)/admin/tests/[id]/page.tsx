import { createSubTestAction } from "@/app/(Actions)/test/testAction";
import { createServerSupabase } from "@/lib/supabase/server";
import { Plus, ListChecks, FileText, Trash2, HelpCircle } from "lucide-react";
import AddQuestionForm from "../_components/addQuestionForm";
import Link from "next/link";

export default async function CategoryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ testId?: string }>;
}) {
  const { id } = await params;
  // searchParams'ı await ederek içindeki testId'yi alıyoruz
  // We retrieve the testId from searchParams by awaiting it.
  const { testId: selectedTestId } = await searchParams;

  const supabase = await createServerSupabase();

  const { data: category } = await supabase
    .from("test_categories")
    .select(`*, tests (*, questions (id))`)
    .eq("id", id)
    .single();

  // URL'de seçili olan testi bul, yoksa ilk testi varsayılan yap
  // Find the selected test in the URL, otherwise set the first test as the default.
  const currentTest =
    category?.tests?.find((t: any) => t.id === selectedTestId) ||
    category?.tests?.[0];

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24">
      {/* HEADER SECTION */}
      <div className="mb-8 p-8 bg-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-2">
            {category.course_category} / {category.target_grade}. Grade
          </p>
          <h1 className="text-4xl font-black">{category.title}</h1>
        </div>
        <div className="absolute right-5 bottom-5 text-white/5">
          <ListChecks size={200} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SOL PANEL: TEST LİSTESİ */}
        {/* LEFT PANEL: TEST LIST */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-800">
              <Plus size={18} className="text-blue-600" /> Add New Test
            </h3>
            <form action={createSubTestAction} className="flex gap-2">
              <input name="category_id" type="hidden" value={id} />
              <input
                name="title"
                required
                className="flex-1 p-2 border rounded-xl bg-slate-50 text-sm"
                placeholder="Example: Test 1"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all text-sm">
                Add
              </button>
            </form>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest px-2">
              Available Tests
            </h3>
            {/* LINKLER BURADA OLMALI / LINKS SHOULD BE HERE */}
            {category.tests?.map((test: any) => {
              const isSelected = currentTest?.id === test.id;
              return (
                <Link
                  key={test.id}
                  href={`?testId=${test.id}`}
                  className={`p-4 border rounded-2xl flex items-center justify-between transition-all group ${
                    isSelected
                      ? "bg-blue-50 border-blue-500 shadow-sm"
                      : "bg-white border-slate-100 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4
                        className={`font-bold ${
                          isSelected ? "text-blue-900" : "text-slate-800"
                        }`}
                      >
                        {test.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {test.questions?.length || 0} Questions
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: ADD QUESTION FORM */}
        <div className="lg:col-span-2 space-y-6">
          {currentTest ? (
            <>
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3">
                <HelpCircle className="text-blue-600" />
                <p className="text-sm font-medium text-blue-800">
                  You are adding questions for{" "}
                  <strong>{currentTest.title}</strong>
                </p>
              </div>
              {/* key ekleyerek test değişince formun sıfırlanmasını sağlıyoruz */}
              {/* By adding a key, we ensure the form resets when the test changes */}
              <AddQuestionForm testId={currentTest.id} key={currentTest.id} />
            </>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed rounded-3xl p-20 text-center">
              <p className="text-slate-400">
                To add questions, first create a test from the left side.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
