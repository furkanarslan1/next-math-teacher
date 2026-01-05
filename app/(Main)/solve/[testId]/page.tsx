import { createServerSupabase } from "@/lib/supabase/server";
import TestWizard from "@/components/test/TestWizard";
import { notFound } from "next/navigation";

export default async function SolveTestPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = await params;
  const supabase = await createServerSupabase();

  const { data: test } = await supabase
    .from("tests")
    .select("*")
    .eq("id", testId)
    .single();
  const { data: questions } = await supabase
    .from("questions")
    .select("*")
    .eq("test_id", testId)
    .order("id");

  if (!test || !questions) return notFound();

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <TestWizard test={test} questions={questions} />
    </div>
  );
}
