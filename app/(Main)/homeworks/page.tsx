import { createServerSupabase } from "@/lib/supabase/server";
import { CheckCircle2, Circle, Clock, ExternalLink } from "lucide-react";
import HomeworkStatusButton from "./_components/HomeworkStatusButton";

export default async function StudentHomeworkPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Öğrencinin profil bilgilerini (özellikle grade) al
  // 1. Obtain the student's profile information (especially their grade).
  const { data: profile } = await supabase
    .from("profiles")
    .select("grade")
    .eq("id", user?.id)
    .single();

  // 2. Öğrenciye uygun ödevleri çek
  // Mantık: Herkese açık OR Kendi sınıfına özel OR Kendi ID'sine özel
  // 2. Draw assignments suitable for the student.
  // Logic: Public OR Class-specific OR Class-specific OR Student-specific
  const { data: homeworks } = await supabase
    .from("homeworks")
    .select(
      `
      *,
      submissions:homework_submissions(id)
    `
    )
    .or(
      `target_type.eq.all,and(target_type.eq.grade,target_grade.eq.${profile?.grade}),and(target_type.eq.student,target_student_id.eq.${user?.id})`
    )
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 font-heading">
        My Homeworks
      </h1>

      <div className="grid gap-6">
        {homeworks?.map((hw) => {
          const isCompleted = hw.submissions.length > 0;

          return (
            <div
              key={hw.id}
              className={`p-6 rounded-3xl border-2 transition-all ${
                isCompleted
                  ? "bg-green-50/50 border-green-100"
                  : "bg-white border-slate-100"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? "bg-green-200 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {isCompleted ? "Complated" : "Waiting"}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Clock size={12} />{" "}
                      {new Date(hw.created_at).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  <h2
                    className={`text-xl font-bold ${
                      isCompleted
                        ? "text-slate-500 line-through"
                        : "text-slate-900"
                    }`}
                  >
                    {hw.title}
                  </h2>
                  <p className="text-slate-600 mt-2">{hw.description}</p>

                  {hw.short_note && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-xl text-amber-700 text-sm italic">
                      Note: {hw.short_note}
                    </div>
                  )}
                </div>

                <HomeworkStatusButton
                  homeworkId={hw.id}
                  initialStatus={isCompleted}
                />
              </div>

              {hw.google_form_url && (
                <a
                  href={hw.google_form_url}
                  target="_blank"
                  className="mt-6 flex items-center justify-center gap-2 w-full p-3 bg-white border-2 border-slate-200 rounded-2xl font-bold hover:border-blue-500 hover:text-blue-600 transition-all group"
                >
                  <ExternalLink size={18} />
                  Open the assignment form.
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
