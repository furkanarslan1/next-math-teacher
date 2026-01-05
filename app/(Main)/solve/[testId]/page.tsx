// import { createServerSupabase } from "@/lib/supabase/server";
// import TestWizard from "@/components/test/TestWizard";
// import { notFound } from "next/navigation";

// export default async function SolveTestPage({
//   params,
// }: {
//   params: Promise<{ testId: string }>;
// }) {
//   const { testId } = await params;
//   const supabase = await createServerSupabase();

//   const { data: test, error: testError } = await supabase
//     .from("tests")
//     .select("*")
//     .eq("id", testId)
//     .single();
//   const { data: questions, error: qError } = await supabase
//     .from("questions")
//     .select("*")
//     .eq("test_id", testId)
//     .order("id");

//   if (testError || qError) {
//     console.error("Supabase Hatası:", testError || qError);
//   }

//   if (!test || !questions) return notFound();

//   return (
//     <div className="min-h-screen bg-slate-50 pt-24">
//       <TestWizard test={test} questions={questions} />
//     </div>
//   );
// }

import { createServerSupabase } from "@/lib/supabase/server";
import TestWizard from "@/components/test/TestWizard";

export default async function SolveTestPage({ params }: { params: any }) {
  const { testId } = await params;
  const supabase = await createServerSupabase();

  // 1. Test verisini çek
  const { data: test, error: testError } = await supabase
    .from("tests")
    .select("*")
    .eq("id", testId)
    .single();

  // 2. Soruları çek
  const { data: questions, error: qError } = await supabase
    .from("questions")
    .select("*")
    .eq("test_id", testId);

  // --- DEBUG EKRANI ---
  if (testError)
    return (
      <div className="p-20 text-red-500 font-bold">
        Veritabanı Hatası (Test): {testError.message}
      </div>
    );
  if (!test)
    return (
      <div className="p-20 text-orange-500 font-bold">
        Hata: Bu ID ile bir test bulunamadı ({testId})
      </div>
    );
  if (qError)
    return (
      <div className="p-20 text-red-500 font-bold">
        Veritabanı Hatası (Sorular): {qError.message}
      </div>
    );
  if (!questions || questions.length === 0)
    return (
      <div className="p-20 text-blue-500 font-bold">
        Hata: Test bulundu ama içinde soru yok!
      </div>
    );
  // --------------------

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <TestWizard test={test} questions={questions} />
    </div>
  );
}
