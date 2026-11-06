"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BadgeCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { REVIEWS, AGGREGATE, Review } from "@/lib/reviews";
import StarRating from "./StarRating";

function RatingBar({ pct, label }: { pct: number; label: string }) {
  return (
    <div className="flex items-center gap-3" style={{ fontSize: 14 }}>
      <span style={{ width: 28, textAlign: "right", flexShrink: 0 }}>{label}</span>
      <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "var(--color-mint)" }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--color-scrub)" }} />
      </div>
      <span style={{ width: 36, flexShrink: 0, color: "var(--color-muted)" }}>{pct}%</span>
    </div>
  );
}

function ReviewCard({ review, featured }: { review: Review; featured?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const BODY_LIMIT = 160;
  const isLong = review.body.length > BODY_LIMIT;
  const displayBody = !isLong || expanded ? review.body : review.body.slice(0, BODY_LIMIT) + "…";

  return (
    <article
      className="flex flex-col gap-3.5 p-6 h-full"
      style={{
        background: featured ? "var(--color-tag-soft)" : "var(--color-paper)",
        border: "2px solid var(--color-ink)",
        borderRadius: 14,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <StarRating rating={review.rating} size="sm" />
        <span className="flex items-center gap-1.5" style={{ fontSize: 14, fontWeight: 600, color: "var(--color-teal)" }}>
          <BadgeCheck className="w-4 h-4" aria-hidden />
          Verified owner
        </span>
      </div>

      <h3 className="heading" style={{ fontSize: 24 }}>
        {review.title}
      </h3>

      <div>
        <p style={{ fontSize: 16, lineHeight: 1.6 }}>{displayBody}</p>
        {isLong && (
          <button onClick={() => setExpanded((e) => !e)} aria-expanded={expanded} className="link-u mt-1" style={{ fontSize: 15 }}>
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {review.claimAmount && (
        <p className="self-start px-3 py-1 rounded-full" style={{ fontSize: 14, fontWeight: 700, background: "var(--color-tag)", border: "2px solid var(--color-ink)" }}>
          {review.claimAmount}
        </p>
      )}

      <div className="mt-auto pt-4 flex items-center justify-between gap-3" style={{ borderTop: "2px dashed var(--color-line)" }}>
        <div className="flex items-center gap-2.5">
          <span aria-hidden style={{ fontSize: 24 }}>
            {review.avatar}
          </span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{review.author}</div>
            <div style={{ fontSize: 14, color: "var(--color-muted)" }}>
              {review.petEmoji} {review.petName}, {review.petBreed}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div style={{ fontSize: 14, fontWeight: 700 }}>{review.insurerFound}</div>
          <div style={{ fontSize: 14, color: "var(--color-muted)" }}>
            {review.location}, {review.date}
          </div>
        </div>
      </div>
    </article>
  );
}

const FEATURED = REVIEWS.filter((r) => r.featured);
const REST = REVIEWS.filter((r) => !r.featured);
const PAGE_SIZE = 6;

export default function ReviewsSection() {
  const [page, setPage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const totalPages = Math.ceil(REST.length / PAGE_SIZE);
  const pageReviews = REST.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const changePage = (dir: 1 | -1) => {
    setPage((p) => Math.max(0, Math.min(totalPages - 1, p + dir)));
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section style={{ background: "var(--color-mint)", padding: "clamp(64px, 9vw, 120px) 0" }} ref={sectionRef}>
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-12 lg:items-end lg:justify-between">
          <div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 5.5vw, 76px)" }}>
              Real pet owners. Real stories.
            </h2>
            <p className="mt-4 prose-measure" style={{ fontSize: 19, color: "var(--color-muted)", maxWidth: "44ch" }}>
              Every review is from a verified pet owner who used this site to find their plan.
            </p>
          </div>

          <div
            className="flex-shrink-0 p-6 w-full lg:w-[320px]"
            style={{ background: "var(--color-paper)", border: "2px solid var(--color-ink)", borderRadius: 14 }}
          >
            <div className="flex items-baseline gap-2 mb-2">
              <span className="display" style={{ fontSize: 72 }}>
                {AGGREGATE.avgRating}
              </span>
              <span style={{ fontSize: 18, color: "var(--color-muted)" }}>out of 5</span>
            </div>
            <StarRating rating={AGGREGATE.avgRating} size="md" />
            <p className="mt-2 mb-4" style={{ fontSize: 15, color: "var(--color-muted)" }}>
              {AGGREGATE.totalReviews.toLocaleString()} verified reviews
            </p>
            <div className="flex flex-col gap-2.5">
              <RatingBar pct={AGGREGATE.fiveStarPct} label="5★" />
              <RatingBar pct={AGGREGATE.fourStarPct} label="4★" />
              <RatingBar pct={AGGREGATE.threeStarPct} label="3★" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {FEATURED.map((r) => (
            <ReviewCard key={r.id} review={r} featured />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
          >
            {pageReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <button onClick={() => changePage(-1)} disabled={page === 0} className="btn btn-quiet btn-sm disabled:opacity-40">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <span style={{ fontSize: 15 }}>
            Page {page + 1} of {totalPages}
          </span>
          <button onClick={() => changePage(1)} disabled={page === totalPages - 1} className="btn btn-quiet btn-sm disabled:opacity-40">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-14 text-center">
          <p style={{ fontSize: 18, marginBottom: 18 }}>
            Join {AGGREGATE.totalReviews.toLocaleString()}+ pet owners who found the right plan.
          </p>
          <Link href="/compare" className="btn">
            Start comparing, it&rsquo;s free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
