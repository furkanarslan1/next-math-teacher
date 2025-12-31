import React from "react";
import Comment_swiper from "./Comment_swiper";
import { CommentType } from "@/types/CommentType";

const comments: CommentType[] = [
  {
    id: "1",
    user: "Jane James",
    rate: 5,
    user_image: "https://i.pravatar.cc/150?u=1",
    comment: "Math lessons have never been this fun. Thank you!",
  },
  {
    id: "2",
    user: "Carol",
    rate: 3,
    user_image: "https://i.pravatar.cc/150?u=2",
    comment:
      "It was very helpful during my LGS preparation process, and now I solve questions much faster.",
  },
  {
    id: "3",
    user: "Jesse",
    rate: 4,
    user_image: "https://i.pravatar.cc/150?u=3",
    comment:
      "I used to struggle with new-generation questions, but I understood the logic very well.",
  },
  {
    id: "4",
    user: "Michel",
    rate: 5,
    user_image: "https://i.pravatar.cc/150?u=4",
    comment:
      "We started from scratch, and in a short time my scores doubled.An amazing teacher",
  },
];

export default function Home_comments() {
  return (
    <div className="bg-linear-to-b from-slate-950 to-slate-600 max-w-6xl mx-auto p-4 md:rounded-md">
      <div>
        <h3 className="text-white font-bold text-2xl mb-6">
          Students Comments
        </h3>
        <Comment_swiper comments={comments} />
      </div>
    </div>
  );
}
