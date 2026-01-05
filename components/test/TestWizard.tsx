"use client";

import { useState } from "react";

import { ChevronRight, ChevronLeft, Send, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { submitTestResultsAction } from "@/app/(Actions)/test/testAction";

interface TestWizardProps {
  test: any;
  questions: any[];
  isFixMode?: boolean;
}

export default function TestWizard({
  test,
  questions,
  isFixMode = false,
}: TestWizardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // { questionId: 'A' }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectAnswer = (option: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const results = questions.map((q) => ({
      questionId: q.id,
      selectedAnswer: answers[q.id],
      isCorrect: answers[q.id] === q.correct_answer,
    }));

    try {
      await submitTestResultsAction(test.id, results);
      // router.push("/stats"); // Başarılarım sayfasına yönlendir // Redirect to My Achievements page
      if (isFixMode) {
        router.push("/wrong-answers"); // Yanlışları çözüyorsa tekrar yanlışlar listesine dönsün
      } else {
        router.push("/stats"); // Normal test ise istatistiklere gitsin
      }
    } catch (err) {
      toast.error("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* İlerleme Çubuğu */}
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-3xl border p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-bold text-slate-400">
            QUESTON {currentIndex + 1} / {questions.length}
          </span>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
            {test.title}
          </span>
        </div>

        {/* Soru İçeriği */}
        {/* Question Content */}
        <div className="mb-8">
          {currentQuestion.image_url && (
            <img
              src={currentQuestion.image_url}
              alt="Soru"
              className="max-h-64 rounded-2xl mb-4 mx-auto border"
            />
          )}
          <h2 className="text-xl font-bold text-slate-800">
            {currentQuestion.question_text}
          </h2>
        </div>

        {/* Şıklar */}
        {/* Options */}
        <div className="grid gap-3">
          {["A", "B", "C", "D"].map((opt) => {
            const optionText = currentQuestion[`option_${opt.toLowerCase()}`];
            const isSelected = answers[currentQuestion.id] === opt;

            return (
              <button
                key={opt}
                onClick={() => handleSelectAnswer(opt)}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left
                  ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-100 hover:border-slate-300"
                  }`}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold 
                  ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {opt}
                </span>
                <span className="font-medium">{optionText}</span>
              </button>
            );
          })}
        </div>

        {/* Navigasyon Butonları */}
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            className="flex items-center gap-2 font-bold text-slate-500 disabled:opacity-0"
          >
            <ChevronLeft /> Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={
                isSubmitting || Object.keys(answers).length < questions.length
              }
              className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-700 disabled:bg-slate-300"
            >
              {isSubmitting ? "Saving..." : "Finish Test"}{" "}
              <CheckCircle2 size={20} />
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="flex items-center gap-2 font-bold text-blue-600"
            >
              Next <ChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
