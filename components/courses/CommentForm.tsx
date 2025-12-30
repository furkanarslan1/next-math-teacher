"use client";

import { toast } from "sonner";
import StarRating from "./StarRating";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createCommentAction } from "@/app/(Actions)/comment/createCommentAction";

export default function CommentForm({ courseId }: { courseId: string }) {
  async function handleSubmit(formData: FormData) {
    const result = await createCommentAction(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.success);
      // Formu temizle
      //clean the form
      (document.getElementById("comment-form") as HTMLFormElement).reset();
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
      <h4 className="font-bold text-lg">Leave a Comment</h4>
      <form id="comment-form" action={handleSubmit} className="space-y-4">
        <input type="hidden" name="course_id" value={courseId} />

        <div className="space-y-2">
          <label className="text-sm font-medium">Your Rating</label>
          <StarRating name="rating" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your Comment</label>
          <Textarea
            name="content"
            placeholder="Share your experience about this course..."
            required
            className="min-h-25"
          />
        </div>

        <Button type="submit" className="w-full md:w-auto px-8 cursor-pointer">
          Submit Comment
        </Button>
      </form>
    </div>
  );
}
