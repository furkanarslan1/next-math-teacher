import { createServerSupabase } from "@/lib/supabase/server";
import { MessageSquare, Star, User, BookOpen, Calendar } from "lucide-react";
import React from "react";
import DeleteCommentButton from "./_components/DeleteCommentButton";

export default async function AdminCommentsPage() {
  const supabase = await createServerSupabase();

  const { data: comments, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      content,
      rating,
      created_at,
      courses ( title ),
      profiles ( full_name )
    `
    )
    .order("created_at", { ascending: false });

  if (error)
    return (
      <div className="p-8 text-red-500">Comments could not be loaded.</div>
    );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <MessageSquare className="text-blue-600" /> Comment Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comments?.map((comment: any) => (
          <div
            key={comment.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header: User & Rating */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <User size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 leading-tight">
                      {comment.profiles?.full_name || "Anonymous"}
                    </p>
                    <div className="flex items-center text-yellow-500 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < comment.rating ? "currentColor" : "none"}
                          className={
                            i < comment.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <DeleteCommentButton commentId={comment.id} />
              </div>

              {/* Content */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-700 text-sm italic leading-relaxed">
                  "{comment.content}"
                </p>
              </div>
            </div>

            {/* Footer: Course & Date */}
            <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <BookOpen size={14} />
                <span className="font-medium truncate">
                  {comment.courses?.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Calendar size={14} />
                <span>{new Date(comment.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {comments?.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
          <p className="text-gray-500">No comments found to manage.</p>
        </div>
      )}
    </div>
  );
}
