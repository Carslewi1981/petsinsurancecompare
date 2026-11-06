"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: "sm" | "md";
  theme?: "dark" | "light";
}

export default function StarRating({ rating, reviews, size = "md", theme = "light" }: StarRatingProps) {
  const dark = theme === "dark";
  const px = size === "sm" ? 14 : 18;

  return (
    <div className="flex items-center gap-2" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      <div className="flex gap-0.5" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => {
          const fill = Math.max(0, Math.min(1, rating - i));
          return (
            <span key={i} className="relative inline-block" style={{ width: px, height: px }}>
              <Star
                width={px}
                height={px}
                strokeWidth={1.6}
                style={{ color: dark ? "rgba(255,255,255,0.45)" : "rgba(15,37,36,0.35)", position: "absolute", inset: 0 }}
              />
              {fill > 0 && (
                <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                  <Star
                    width={px}
                    height={px}
                    strokeWidth={1.6}
                    fill="#ffd23f"
                    style={{ color: dark ? "#ffd23f" : "#0f2524" }}
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      <span style={{ fontWeight: 700, fontSize: size === "sm" ? 15 : 17, color: dark ? "#fff" : "var(--color-ink)" }}>
        {rating.toFixed(1)}
      </span>
      {reviews !== undefined && (
        <span style={{ fontSize: size === "sm" ? 14 : 15, color: dark ? "rgba(255,255,255,0.75)" : "var(--color-muted)" }}>
          ({reviews.toLocaleString()})
        </span>
      )}
    </div>
  );
}
