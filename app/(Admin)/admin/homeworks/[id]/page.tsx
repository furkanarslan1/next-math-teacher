import { createServerSupabase } from "@/lib/supabase/server";
import {
  UserCheck,
  Clock,
  ArrowLeft,
  GraduationCap,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function HomeworkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  // 1. Ödevi ve bu ödevi tamamlayan öğrencilerin profil bilgilerini çek
  // 1. Retrieve the assignment and the profile information of the students who completed it.
  const { data: homework } = await supabase
    .from("homeworks")
    .select(
      `
      *,
      submissions:homework_submissions (
        created_at,
        profiles:student_id (
          full_name,
          grade,
          city,
          avatar_url
        )
      )
    `
    )
    .eq("id", id)
    .single();

  if (!homework) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link
        href="/admin/homeworks"
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Back to List
      </Link>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden mb-8">
        <div className="p-8 border-b bg-slate-50/50">
          <h1 className="text-3xl font-bold text-slate-900">
            {homework.title}
          </h1>
          <p className="text-slate-500 mt-2">{homework.description}</p>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
              <UserCheck className="text-green-600" /> Completing Students
              <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {homework.submissions.length} Student
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homework.submissions.map((sub: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded-2xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden border">
                  {sub.profiles.avatar_url ? (
                    <img
                      src={sub.profiles.avatar_url}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    sub.profiles.full_name[0]
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">
                    {sub.profiles.full_name}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
                    <span className="flex items-center gap-1">
                      <GraduationCap size={12} /> {sub.profiles.grade}. Sınıf
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {sub.profiles.city}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Completion
                  </p>
                  <p className="text-xs font-bold text-slate-600 mt-0.5">
                    {new Date(sub.created_at).toLocaleDateString("tr-TR")}
                  </p>
                </div>
              </div>
            ))}

            {homework.submissions.length === 0 && (
              <div className="col-span-full py-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed">
                <p className="text-slate-400 font-medium">
                  No student has completed the assignment yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
