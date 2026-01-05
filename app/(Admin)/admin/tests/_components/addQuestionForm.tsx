"use client";
import { addQuestionAction } from "@/app/(Actions)/test/testAction";
import { CheckCircle2, ImagePlus, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function AddQuestionForm({ testId }: { testId: string }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      await addQuestionAction(formData, testId);
      e.currentTarget.reset();
      setPreview(null);
      toast.success("Question successfully added.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-3xl border shadow-sm space-y-4"
    >
      <h3 className="font-bold text-lg border-b pb-2">Add New Question</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-500">
            QUESTION TEXT
          </label>
          <textarea
            name="question_text"
            required
            className="w-full p-3 border rounded-xl h-32 bg-slate-50"
            placeholder="Write your question here..."
          />
        </div>

        <div className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 relative bg-slate-50">
          {preview ? (
            <img src={preview} className="max-h-32 rounded-lg" alt="Önizleme" />
          ) : (
            <div className="text-center text-slate-400">
              <ImagePlus className="mx-auto mb-2" size={32} />
              <p className="text-xs">Question Image (Optional)</p>
            </div>
          )}
          <input
            type="file"
            name="question_image"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept="image/*"
          />
        </div>
      </div>

      {/* Şıklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["A", "B", "C", "D"].map((option) => (
          <div key={option} className="flex items-center gap-2">
            <span className="font-bold text-slate-400">{option})</span>
            <input
              name={`option_${option.toLowerCase()}`}
              required
              className="flex-1 p-2 border rounded-lg"
              placeholder={`Seçenek ${option}`}
            />
          </div>
        ))}
      </div>

      {/* Doğru Cevap Seçimi */}
      <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl">
        <label className="text-sm font-bold text-green-700">
          CORRECT ANSWER:
        </label>
        <div className="flex gap-4">
          {["A", "B", "C", "D"].map((ans) => (
            <label key={ans} className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="correct_answer"
                value={ans}
                required
                className="text-green-600"
              />
              <span className="font-bold">{ans}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        disabled={loading}
        className="w-full bg-slate-900 text-white p-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all hover:bg-slate-800"
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <CheckCircle2 size={20} /> SAVE THE QUESTION
          </>
        )}
      </button>
    </form>
  );
}
