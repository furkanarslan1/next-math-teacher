import { createServerSupabase } from "@/lib/supabase/server";
import {
  Trash2,
  Plus,
  Link as LinkIcon,
  Users,
  User,
  GraduationCap,
  Calendar,
  Edit2,
} from "lucide-react";
import Link from "next/link";
import DeleteHomeworkButton from "./_components/DeleteHomeworkButton";

export default async function AdminHomeworksPage() {
  const supabase = await createServerSupabase();

  // Ödevleri ve eğer öğrenciye özelse öğrenci ismini çekiyoruz
  // We extract the assignments and, if it's student-specific, the student's name.
  const { data: homeworks } = await supabase
    .from("homeworks")
    .select(
      `
      *,
      profiles:target_student_id (full_name)
    `
    )
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Homework Management
          </h1>
          <p className="text-slate-500">
            You can track all submitted assignments here.
          </p>
        </div>
        <Link
          href="/admin/homeworks/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold transition-all shadow-lg"
        >
          <Plus size={20} /> Add New Homework
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {homeworks?.map((hw) => (
          <div
            key={hw.id}
            className="bg-white border rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5
                  ${
                    hw.target_type === "all"
                      ? "bg-green-100 text-green-700"
                      : hw.target_type === "grade"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {hw.target_type === "all" && <Users size={12} />}
                  {hw.target_type === "grade" && <GraduationCap size={12} />}
                  {hw.target_type === "student" && <User size={12} />}
                  {hw.target_type === "all"
                    ? "ALL SCHOOL"
                    : hw.target_type === "grade"
                    ? `${hw.target_grade}. Class`
                    : hw.profiles?.full_name}
                </span>
                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Calendar size={12} />{" "}
                  {new Date(hw.created_at).toLocaleDateString("tr-TR")}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">{hw.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-1 mt-1">
                {hw.short_note || hw.description}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
              {hw.google_form_url && (
                <a
                  href={hw.google_form_url}
                  target="_blank"
                  className="p-3 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                  title="Form Linki"
                >
                  <LinkIcon size={20} />
                </a>
              )}

              <DeleteHomeworkButton id={hw.id} />
              <Link
                href={`/admin/homeworks/edit/${hw.id}`}
                className="p-3 text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
              >
                <Edit2 size={20} />
              </Link>
            </div>
          </div>
        ))}

        {homeworks?.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">
            <p className="text-slate-400 font-medium">
              No assignments have been created yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
