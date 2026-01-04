"use client";

import { useState } from "react";

import {
  Loader2,
  Link as LinkIcon,
  Users,
  User,
  GraduationCap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createHomeworkAction,
  updateHomeworkAction,
} from "@/app/(Actions)/homework/homeworkAction";

export default function HomeworkForm({
  students,
  initialData,
}: {
  students: any[];
  initialData?: any;
}) {
  const [loading, setLoading] = useState(false);
  const [targetType, setTargetType] = useState(
    initialData?.target_type || "all"
  );
  const router = useRouter();
  // We are in edit mode if data exists
  const isEdit = !!initialData; // Eğer data varsa edit modundayız

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      if (isEdit) {
        await updateHomeworkAction(initialData.id, formData);
      } else {
        await createHomeworkAction(formData);
      }
      router.push("/admin/homeworks");
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-2xl border shadow-sm"
    >
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Homework Ttile
        </label>
        <input
          name="title"
          defaultValue={initialData?.title}
          required
          className="w-full p-3 border rounded-xl bg-slate-50"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Homework Content
        </label>
        <textarea
          name="description"
          defaultValue={initialData?.description}
          rows={4}
          className="w-full p-3 border rounded-xl bg-slate-50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="short_note"
          defaultValue={initialData?.short_note}
          placeholder="Kısa Not"
          className="w-full p-3 border rounded-xl bg-slate-50"
        />
        <input
          name="google_form_url"
          defaultValue={initialData?.google_form_url}
          type="url"
          placeholder="Google Form Linki"
          className="w-full p-3 border rounded-xl bg-slate-50"
        />
      </div>

      {/* HEDEFLEME BÖLÜMÜ */}
      {/* Target Section */}
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <select
          name="target_type"
          value={targetType}
          onChange={(e) => setTargetType(e.target.value)}
          className="w-full p-3 border rounded-xl bg-white"
        >
          <option value="all">All Students</option>
          <option value="grade">With Class </option>
          <option value="student">For Student</option>
        </select>

        {targetType === "grade" && (
          <select
            name="target_grade"
            defaultValue={initialData?.target_grade}
            className="w-full mt-4 p-3 border rounded-xl"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
              <option key={g} value={g}>
                {g}. Class
              </option>
            ))}
          </select>
        )}

        {targetType === "student" && (
          <select
            name="target_student_id"
            defaultValue={initialData?.target_student_id}
            className="w-full mt-4 p-3 border rounded-xl"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.full_name}
              </option>
            ))}
          </select>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-slate-900 text-white p-4 rounded-2xl font-bold"
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : isEdit ? (
          "Update"
        ) : (
          "Share Homework"
        )}
      </button>
    </form>
  );
}
