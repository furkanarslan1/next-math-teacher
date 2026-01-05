import { createTestCategoryAction } from "@/app/(Actions)/test/testAction";
import { createServerSupabase } from "@/lib/supabase/server";
import { Plus, BookOpen, GraduationCap, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function AdminTestsPage() {
  const supabase = await createServerSupabase();
  const { data: categories } = await supabase
    .from("test_categories")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Test and Exam Management
          </h1>
          <p className="text-slate-500">Manage topics and tests from here.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KATEGORİ EKLEME FORMU */}
        {/* CATEGORY ADDITION FORM */}
        <div className="bg-white p-6 rounded-3xl border shadow-sm h-fit">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Plus size={18} className="text-blue-600" /> Add New Topic
          </h3>
          <form action={createTestCategoryAction} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400">
                TOPIC HEADING
              </label>
              <input
                name="title"
                required
                className="w-full p-3 border rounded-xl bg-slate-50"
                placeholder="Example: Square Roots"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400">GRADE</label>
              <select
                name="target_grade"
                className="w-full p-3 border rounded-xl bg-slate-50"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>
                    {g}. Grade
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400">
                BRANCH / CATEGORY
              </label>
              <select
                name="course_category"
                className="w-full p-3 border rounded-xl bg-slate-50"
              >
                <option value="logarithm">Logarithm</option>
                <option value="square root">Square root</option>
                <option value="integral">Integral</option>
              </select>
            </div>
            <button className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
              Create
            </button>
          </form>
        </div>

        {/* LİSTELEME */}
        {/* LISTING */}
        <div className="lg:col-span-2 space-y-4">
          {categories?.map((cat) => (
            <Link
              href={`/admin/tests/${cat.id}`}
              key={cat.id}
              className="flex items-center justify-between p-6 bg-white border rounded-3xl hover:border-blue-500 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-800">
                    {cat.title}
                  </h3>
                  <div className="flex gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                      <GraduationCap size={14} /> {cat.target_grade}. Grade
                    </span>
                    <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded-lg">
                      {cat.course_category}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-blue-500" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
