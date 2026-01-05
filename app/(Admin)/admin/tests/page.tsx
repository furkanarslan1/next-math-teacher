import { createTestCategoryAction } from "@/app/(Actions)/test/testAction";
import { createServerSupabase } from "@/lib/supabase/server";
import {
  Plus,
  BookOpen,
  GraduationCap,
  ChevronRight,
  User,
  Tag,
  Layers,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default async function AdminTestsPage() {
  const supabase = await createServerSupabase();

  // Test konularını çekiyoruz
  // Fetching test categories
  const { data: testCategories } = await supabase
    .from("test_categories")
    .select("*")
    .order("created_at", { ascending: false });

  // Mevcut kurs kategorilerini çekiyoruz (SBS, VIP vb.)
  // Fetching available course categories
  const { data: availableCourses } = await supabase
    .from("categories")
    .select("id, name");

  // Öğrenci listesini çekiyoruz
  // Fetching student list
  const { data: students } = await supabase
    .from("profiles")
    .select("id, full_name")
    .eq("role", "user");

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase">
            Test Management / Test Yönetimi
          </h1>
          <p className="text-slate-500">
            Select criteria as you wish or leave blank. / Kriterleri istediğiniz
            gibi seçin veya boş bırakın.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* OLUŞTURMA FORMU / CREATION FORM */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl h-fit">
          <h3 className="font-bold text-slate-800 text-lg mb-6">
            Create Subject / Konu Oluştur
          </h3>

          <form action={createTestCategoryAction} className="space-y-5">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Subject Title
              </label>
              <input
                name="title"
                required
                className="w-full mt-1 p-4 border-2 border-slate-50 rounded-2xl bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all font-semibold"
                placeholder="Example: Square Roots"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase text-center">
                Targeting (Optional)
              </p>

              {/* KURS FİLTRESİ - ÇOKLU SEÇİM / COURSE FILTER - MULTI SELECT */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Tag size={12} /> Course Groups / Kurs Grupları
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                  {availableCourses?.map((course) => (
                    <label
                      key={course.id}
                      className="flex items-center gap-2 p-2 border rounded-xl bg-white hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        name="target_course_categories"
                        value={course.name}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600"
                      />
                      <span className="text-[11px] font-medium text-slate-700">
                        {course.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* SINIF FİLTRESİ - ÇOKLU SEÇİM / GRADE FILTER - MULTI SELECT */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <GraduationCap size={12} /> Grades / Sınıf Seviyeleri
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                    <label
                      key={g}
                      className="flex flex-col items-center gap-1 p-2 border rounded-xl bg-white hover:bg-purple-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        name="target_grades"
                        value={g}
                        className="w-4 h-4 rounded border-slate-300 text-purple-600"
                      />
                      <span className="text-[10px] font-bold">{g}. Grade</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ÖĞRENCİ FİLTRESİ / STUDENT FILTER */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                  <User size={12} /> Special Student
                </label>
                <select
                  name="target_student_id"
                  className="w-full mt-1 p-3 border rounded-xl bg-white outline-none text-sm font-medium"
                >
                  <option value="">Not selected </option>
                  {students?.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.full_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white p-5 rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg active:scale-95">
              SAVE TOPIC
            </button>
            <p className="text-[10px] text-slate-400 text-center italic">
              If none selected, it will be public.
            </p>
          </form>
        </div>

        {/* LİSTELEME / LISTING */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">
            Active Subjects
          </h3>
          {testCategories?.map((cat) => (
            <Link
              href={`/admin/tests/${cat.id}`}
              key={cat.id}
              className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[28px] hover:border-blue-500 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-5">
                <div className="p-4 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Layers size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    {cat.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {/* Genel Erişim Rozeti / Public Access Badge */}
                    {(!cat.target_course_categories ||
                      cat.target_course_categories.length === 0) &&
                      (!cat.target_grades || cat.target_grades.length === 0) &&
                      !cat.target_student_id && (
                        <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-lg uppercase flex items-center gap-1">
                          <Globe size={10} /> Public Access
                        </span>
                      )}

                    {/* Kurs Rozetleri / Course Badges */}
                    {cat.target_course_categories?.map((course: string) => (
                      <span
                        key={course}
                        className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-lg uppercase"
                      >
                        {course}
                      </span>
                    ))}

                    {/* Sınıf Rozetleri / Grade Badges */}
                    {cat.target_grades?.map((grade: number) => (
                      <span
                        key={grade}
                        className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-1 rounded-lg uppercase"
                      >
                        {grade}. Grade
                      </span>
                    ))}

                    {cat.target_student_id && (
                      <span className="text-[10px] font-bold bg-orange-50 text-orange-700 px-2 py-1 rounded-lg uppercase flex items-center gap-1">
                        <User size={10} /> Personal
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
