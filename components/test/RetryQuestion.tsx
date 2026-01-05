"use client";

import { useState } from "react";

import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { submitTestResultsAction } from "@/app/(Actions)/test/testAction";

export default function RetryQuestion({ question }: { question: any }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const router = useRouter();

  const handleCheck = async (opt: string) => {
    if (result === "correct") return;

    setSelected(opt);
    const isCorrect = opt === question.correct_answer;
    setResult(isCorrect ? "correct" : "wrong");

    // Eğer doğruysa veritabanında bu soruyu "correct" olarak güncelle
    // If correct, update this query to "correct" in the database
    if (isCorrect) {
      await submitTestResultsAction(question.test_id, [
        {
          questionId: question.id,
          selectedAnswer: opt,
          isCorrect: true,
        },
      ]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        {question.question_text}
      </h2>

      {question.image_url && (
        <img
          src={question.image_url}
          alt="Soru"
          className="w-full rounded-2xl mb-6 border"
        />
      )}

      <div className="grid gap-3">
        {["A", "B", "C", "D"].map((opt) => {
          const isThisSelected = selected === opt;
          const isCorrect = question.correct_answer === opt;

          let btnStyle = "border-slate-100 hover:border-slate-300";
          if (isThisSelected) {
            btnStyle = isCorrect
              ? "border-green-500 bg-green-50"
              : "border-red-500 bg-red-50";
          }

          return (
            <button
              key={opt}
              onClick={() => handleCheck(opt)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${btnStyle}`}
            >
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold 
                ${
                  isThisSelected && isCorrect
                    ? "bg-green-500 text-white"
                    : isThisSelected && !isCorrect
                    ? "bg-red-500 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {opt}
              </span>
              <span className="font-medium">
                {question[`option_${opt.toLowerCase()}`]}
              </span>
            </button>
          );
        })}
      </div>

      {result === "correct" && (
        <div className="mt-8 p-4 bg-green-100 text-green-700 rounded-2xl flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 /> Congratulations! That's the correct answer.
          </div>
          <button
            onClick={() => router.push("/wrong-answers")}
            className="flex items-center gap-1 font-black underline"
          >
            Return to List <ArrowRight size={16} />
          </button>
        </div>
      )}

      {result === "wrong" && (
        <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-2xl flex items-center gap-2 font-bold">
          <XCircle />
          I'm sorry, please try again!
        </div>
      )}
    </div>
  );
}
