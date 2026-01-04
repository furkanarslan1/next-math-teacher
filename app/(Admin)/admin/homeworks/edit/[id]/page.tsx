import { createServerSupabase } from "@/lib/supabase/server";

import { notFound } from "next/navigation";
import HomeworkForm from "../../_components/HomeworkForm";

export default async function EditHomeworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  // 1. Ödevi ve Öğrenci listesini çek
  // 1. get homework and stdudents list
  const [hwRes, studentRes] = await Promise.all([
    supabase.from("homeworks").select("*").eq("id", id).single(),
    supabase
      .from("profiles")
      .select("id, full_name")
      .eq("role", "user")
      .order("full_name"),
  ]);

  if (!hwRes.data) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Edit Homework</h1>
      {/* Mevcut veriyi 'initialData' olarak gönderiyoruz */}
      <HomeworkForm students={studentRes.data || []} initialData={hwRes.data} />
    </div>
  );
}
