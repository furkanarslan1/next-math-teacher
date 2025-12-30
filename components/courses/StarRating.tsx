"use client";
import { Star } from "lucide-react";
import { useState } from "react";

export default function StarRating({ name }: { name: string }) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {/* Hidden input to send value with FormData */}
      <input type="hidden" name={name} value={rating} />

      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
        >
          <Star
            size={24}
            className={`${
              star <= (hover || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-500 font-medium">
        ({rating}/5)
      </span>
    </div>
  );
}
