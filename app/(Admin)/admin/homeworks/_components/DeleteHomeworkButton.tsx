"use client";

import { useState } from "react";

import { Trash2, Loader2 } from "lucide-react";
import { deleteHomeworkAction } from "@/app/(Actions)/homework/homeworkAction";

export default function DeleteHomeworkButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Bu ödevi silmek istediğinize emin misiniz?")) return;

    setLoading(true);
    try {
      await deleteHomeworkAction(id);
    } catch (err: any) {
      alert("Hata: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-3 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <Trash2 size={20} />
      )}
    </button>
  );
}
