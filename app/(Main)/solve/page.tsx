import { createServerSupabase } from "@/lib/supabase/server";
import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SolvePage() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("grade, category")
    .eq("id", user.id)
    .single();

  // Kategorileri ve altındaki testleri çekiyoruz
  //  We are pulling the categories and the tests under them.
  const { data: categories } = await supabase
    .from("test_categories")
    .select(`*, tests (id)`)
    .or(
      `target_student_id.eq.${
        user.id
      }, and(target_grades.is.null, target_course_categories.is.null), target_grades.cs.{${
        profile?.grade || 0
      }}, target_course_categories.cs.{"${profile?.category || ""}"}`
    )
    .order("created_at", { ascending: false });

  // ÖNEMLİ: Öğrencinin çözdüğü TÜM testlerin ID'lerini çekiyoruz
  //  IMPORTANT: We extract the IDs of ALL the tests the student has completed.
  const { data: attempts } = await supabase
    .from("test_attempts")
    .select("test_id")
    .eq("student_id", user.id);

  // Çözülen test ID'lerini bir "Set" (benzersiz liste) içine alıyoruz ki hızlıca kontrol edebilelim
  // We put the solved test IDs into a "Set" (unique list) so we can quickly check them.
  const completedTestIds = new Set(attempts?.map((a) => a.test_id));

  return (
    <div className="max-w-5xl mx-auto p-6 pt-28">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-2">
          Exam Center
        </h1>
        <p className="text-slate-500 font-medium">
          Select a topic and start practicing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories?.map((category) => {
          // İLERLEME HESAPLAMA
          // PROGRESS CALCULATION
          const totalTests = category.tests?.length || 0;
          // Bu kategorideki testlerden kaç tanesi 'completedTestIds' içinde var?
          // How many of the tests in this category are included in 'completedTestIds'?
          const completedCount =
            category.tests?.filter((t: any) => completedTestIds.has(t.id))
              .length || 0;
          // Yüzde hesapla
          // Calculate percentage
          const progressPercent =
            totalTests > 0
              ? Math.round((completedCount / totalTests) * 100)
              : 0;

          return (
            <Link
              key={category.id}
              href={`/solve/category/${category.id}`}
              className="group bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all relative overflow-hidden flex flex-col justify-between min-h-55"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <BookOpen size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-1 uppercase tracking-tighter">
                  {category.title}
                </h2>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">
                  {totalTests} Sub-tests
                </p>
              </div>

              {/* PROGRESS BAR (İLERLEME ÇUBUĞU) */}
              <div className="mt-auto relative z-10">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Progress
                  </span>
                  <span className="text-sm font-black text-blue-600">
                    {completedCount} / {totalTests}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-50">
                  <div
                    className="bg-blue-600 h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <ChevronRight
                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-100 group-hover:text-blue-600 group-hover:translate-x-2 transition-all opacity-0 group-hover:opacity-100"
                size={32}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
