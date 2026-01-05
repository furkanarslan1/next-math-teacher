// import { createServerSupabase } from "@/lib/supabase/server";
// import { ChevronRight, FileText, ArrowLeft, Star } from "lucide-react";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// export default async function CategoryTestsPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const supabase = await createServerSupabase();

//   // Kategoriyi ve içindeki testleri çekiyoruz
//   const { data: category } = await supabase
//     .from("test_categories")
//     .select(`*, tests (*)`)
//     .eq("id", id)
//     .single();

//   if (!category) return notFound();

//   return (
//     <div className="max-w-4xl mx-auto p-6 pt-28">
//       {/* Geri Dön Butonu */}
//       <Link
//         href="/solve"
//         className="flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-6 transition-colors font-bold text-sm"
//       >
//         <ArrowLeft size={18} /> BACK TO TOPICS
//       </Link>

//       <div className="bg-slate-900 rounded-[40px] p-10 text-white mb-10 shadow-xl relative overflow-hidden">
//         <div className="relative z-10">
//           <h1 className="text-4xl font-black mb-2 uppercase tracking-tight">
//             {category.title}
//           </h1>
//           <p className="text-blue-400 font-bold uppercase text-xs tracking-widest">
//             {category.tests?.length || 0} Tests Available in this topic
//           </p>
//         </div>
//         <FileText
//           size={180}
//           className="absolute -right-10 -bottom-10 text-white/5 rotate-12"
//         />
//       </div>

//       <div className="grid grid-cols-1 gap-4">
//         {category.tests?.map((test: any) => (
//           <Link
//             key={test.id}
//             href={`/solve/${test.id}`}
//             className="group flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 hover:border-blue-500 hover:shadow-lg transition-all"
//           >
//             <div className="flex items-center gap-5">
//               <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
//                 <Star size={24} />
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700">
//                   {test.title}
//                 </h3>
//                 <p className="text-sm text-slate-400 font-medium">
//                   Click to start the exam
//                 </p>
//               </div>
//             </div>
//             <div className="p-3 rounded-2xl bg-slate-50 text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
//               <ChevronRight size={24} />
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

import { createServerSupabase } from "@/lib/supabase/server";
import {
  ChevronRight,
  FileText,
  ArrowLeft,
  CheckCircle2,
  Circle,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryTestsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Kategoriyi ve testleri çek, aynı zamanda kullanıcının bu testlerdeki denemelerini çek
  const { data: category } = await supabase
    .from("test_categories")
    .select(
      `
      *,
      tests (
        *,
        questions (id),
        test_attempts!inner (*) 
      )
    `
    )
    .eq("id", id)
    .eq("tests.test_attempts.student_id", user?.id) // Sadece bu öğrencinin denemeleri
    .single();

  // Not: Yukarıdaki "inner join" bazen hiç çözülmemiş testleri getirmeyebilir.
  // Daha garanti bir yol için testleri ve denemeleri ayrı ayrı da kontrol edebiliriz:
  const { data: allTests } = await supabase
    .from("tests")
    .select(`*, questions(id)`)
    .eq("category_id", id);

  const { data: userAttempts } = await supabase
    .from("test_attempts")
    .select("test_id")
    .eq("student_id", user?.id);

  const completedTestIds = new Set(userAttempts?.map((a) => a.test_id));

  if (!allTests) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6 pt-28">
      {/* Üst Kısım Tasarımı */}
      <div className="grid grid-cols-1 gap-4">
        {allTests.map((test: any) => {
          const isCompleted = completedTestIds.has(test.id);

          return (
            <Link
              key={test.id}
              href={`/solve/${test.id}`}
              className={`group flex items-center justify-between p-6 rounded-3xl border transition-all ${
                isCompleted
                  ? "bg-green-50/50 border-green-100 shadow-sm"
                  : "bg-white border-slate-100 hover:border-blue-500 hover:shadow-lg"
              }`}
            >
              <div className="flex items-center gap-5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={28} />
                  ) : (
                    <FileText size={24} />
                  )}
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      isCompleted ? "text-green-800" : "text-slate-800"
                    }`}
                  >
                    {test.title}
                  </h3>
                  <p
                    className={`text-sm font-medium ${
                      isCompleted ? "text-green-600" : "text-slate-400"
                    }`}
                  >
                    {isCompleted
                      ? "Test Completed / Tamamlandı"
                      : "Click to start"}
                  </p>
                </div>
              </div>
              <div
                className={`p-3 rounded-2xl ${
                  isCompleted
                    ? "bg-green-100 text-green-600"
                    : "bg-slate-50 text-slate-300 group-hover:text-blue-600"
                }`}
              >
                <ChevronRight size={24} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
