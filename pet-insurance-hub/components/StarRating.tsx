"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: "sm" | "md";
  theme?: "dark" | "light";
}

export default function StarRating({ rating, reviews, size = "md", theme = "dark" }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i + 1 <= Math.floor(rating);
    const partial = !filled && i < rating;
    return { filled, partial };
  });

  const sz = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {stars.map((s, i) => (
          <Star
            key={i}
            className={`${sz} ${s.filled ? "fill-yellow-400 text-yellow-400" : s.partial ? "fill-yellow-400/50 text-yellow-400" : "text-gray-600"}`}
          />
        ))}
      </div>
      <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-[#1d1d1f]"} ${size === "sm" ? "text-xs" : "text-sm"}`}>
        {rating.toFixed(1)}
      </span>
      {reviews !== undefined && (
        <span className={`${theme === "dark" ? "text-gray-400" : "text-[#7a7a7a]"} ${size === "sm" ? "text-xs" : "text-sm"}`}>
          ({reviews.toLocaleString()})
        </span>
      )}
    </div>
  );
}
