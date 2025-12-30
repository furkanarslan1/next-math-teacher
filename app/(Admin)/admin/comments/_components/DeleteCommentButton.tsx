"use client";

import { deleteCommentAction } from "@/app/(Actions)/comment/deleteCommentAction";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteCommentButton({
  commentId,
}: {
  commentId: string;
}) {
  const handleDelete = async () => {
    if (confirm("Are you sure ?")) {
      const result = await deleteCommentAction(commentId);
      if (result.success) {
        toast.success(result.success);
      } else {
        toast.error(result.error);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
    >
      <Trash2 size={18} />
    </button>
  );
}
