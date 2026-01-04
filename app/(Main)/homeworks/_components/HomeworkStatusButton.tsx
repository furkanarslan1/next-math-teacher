"use client";

import { useState } from "react";

import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { toggleHomeworkStatus } from "@/app/(Actions)/homework/homeworkAction";

export default function HomeworkStatusButton({
  homeworkId,
  initialStatus,
}: {
  homeworkId: string;
  initialStatus: boolean;
}) {
  const [isCompleted, setIsCompleted] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleHomeworkStatus(homeworkId, !isCompleted);
      setIsCompleted(!isCompleted);
    } catch (err) {
      alert("İşlem başarısız.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2 rounded-full transition-colors ${
        isCompleted ? "text-green-600" : "text-slate-300 hover:text-slate-400"
      }`}
    >
      {loading ? (
        <Loader2 size={32} className="animate-spin" />
      ) : isCompleted ? (
        <CheckCircle2 size={32} />
      ) : (
        <Circle size={32} />
      )}
    </button>
  );
}
