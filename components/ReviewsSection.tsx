"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Quote, Lock } from "lucide-react";
import Link from "next/link";
import { REVIEWS, AGGREGATE, Review } from "@/lib/reviews";
import StarRating from "./StarRating";

function RatingBar({ pct, label, color }: { pct: number; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#7a7a7a] w-6 text-right flex-shrink-0" style={{ fontSize: 11 }}>
        {label}
      </span>
      <div className="flex-1 h-1.5 bg-[#e0e0e0] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <span className="text-[#7a7a7a] w-6 flex-shrink-0" style={{ fontSize: 11 }}>
        {pct}%
      </span>
    </div>
  );
}

function ReviewCard({ review, featured }: { review: Review; featured?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const BODY_LIMIT = 160;
  const isLong = review.body.length > BODY_LIMIT;
  const displayBody = !isLong || expanded ? review.body : review.body.slice(0, BODY_LIMIT) + "…";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-4 p-6 bg-white h-full"
      style={{
        borderRadius: 18,
        border: featured ? "1.5px solid #0066cc30" : "1px solid #e0e0e0",
        boxShadow: featured ? "0 4px 24px rgba(0,102,204,0.07)" : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Verified badge + quote icon */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[#16a34a]" style={{ fontSize: 11, fontWeight: 600 }}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          Verified Pet Owner
        </div>
        <Quote className="w-4 h-4 text-[#e0e0e0]" />
      </div>

      {/* Stars */}
      <StarRating rating={review.rating} size="sm" theme="light" />

      {/* Title */}
      <h3 className="font-semibold text-[#1d1d1f] leading-snug" style={{ fontSize: 15, letterSpacing: "-0.224px" }}>
        {review.title}
      </h3>

      {/* Body */}
      <div>
        <p className="text-[#3a3a3c] leading-relaxed" style={{ fontSize: 13, letterSpacing: "-0.12px" }}>
          {displayBody}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-[#0066cc] mt-1 hover:text-[#0071e3] transition-colors"
            style={{ fontSize: 12 }}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Claim amount pill */}
      {review.claimAmount && (
        <div
          className="self-start px-3 py-1 font-semibold text-[#16a34a]"
          style={{ fontSize: 12, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 9999 }}
        >
          {review.claimAmount}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-3 border-t border-[#f0f0f0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 22 }}>{review.avatar}</span>
          <div>
            <div className="font-semibold text-[#1d1d1f]" style={{ fontSize: 12 }}>
              {review.author}
            </div>
            <div className="text-[#7a7a7a]" style={{ fontSize: 11 }}>
              {review.petEmoji} {review.petName} · {review.petBreed}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[#0066cc]" style={{ fontSize: 11, fontWeight: 600 }}>
            {review.insurerFound}
          </div>
          <div className="text-[#7a7a7a]" style={{ fontSize: 10 }}>
            {review.location} · {review.date}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const FEATURED = REVIEWS.filter((r) => r.featured);
const REST = REVIEWS.filter((r) => !r.featured);
const PAGE_SIZE = 6;

export default function ReviewsSection() {
  const [page, setPage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(REST.length / PAGE_SIZE);
  const pageReviews = REST.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const changePage = (dir: 1 | -1) => {
    setPage((p) => Math.max(0, Math.min(totalPages - 1, p + dir)));
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-[#f5f5f7]" style={{ padding: "88px 0" }} ref={sectionRef}>
      <div className="max-w-[980px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-10 mb-14 items-start">
          {/* Left — headline */}
          <div className="flex-1">
            <span
              className="inline-block text-white text-[11px] font-semibold mb-4 px-3 py-1"
              style={{ background: "#16a34a", borderRadius: 9999 }}
            >
              Community Reviews
            </span>
            <h2
              className="font-semibold text-[#1d1d1f] mb-3 leading-tight"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.374px" }}
            >
              Real pet owners.<br />Real stories.
            </h2>
            <p className="text-[#7a7a7a] max-w-sm" style={{ fontSize: 17, letterSpacing: "-0.374px" }}>
              Every review is from a verified pet owner who used this site to find their plan.
            </p>
            {/* Privacy promise */}
            <div
              className="inline-flex items-center gap-2 mt-5 px-4 py-2.5"
              style={{ background: "white", border: "1px solid #e0e0e0", borderRadius: 12 }}
            >
              <Lock className="w-3.5 h-3.5 text-[#16a34a]" />
              <span className="text-[#1d1d1f] font-semibold" style={{ fontSize: 12 }}>
                We do not sell your data — ever.
              </span>
            </div>
          </div>

          {/* Right — aggregate score */}
          <div
            className="flex-shrink-0 p-6 bg-white"
            style={{ borderRadius: 18, border: "1px solid #e0e0e0", minWidth: 220 }}
          >
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-semibold text-[#1d1d1f]" style={{ fontSize: 48, letterSpacing: "-0.374px", lineHeight: 1 }}>
                {AGGREGATE.avgRating}
              </span>
              <span className="text-[#7a7a7a]" style={{ fontSize: 17 }}>/5</span>
            </div>
            <StarRating rating={AGGREGATE.avgRating} size="md" theme="light" />
            <p className="text-[#7a7a7a] mt-2 mb-4" style={{ fontSize: 12 }}>
              Based on {AGGREGATE.totalReviews.toLocaleString()} reviews
            </p>
            <div className="space-y-2">
              <RatingBar pct={AGGREGATE.fiveStarPct} label="5★" color="#16a34a" />
              <RatingBar pct={AGGREGATE.fourStarPct} label="4★" color="#65a30d" />
              <RatingBar pct={AGGREGATE.threeStarPct} label="3★" color="#d97706" />
            </div>
          </div>
        </div>

        {/* Featured reviews — 3 col */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {FEATURED.map((r) => (
            <ReviewCard key={r.id} review={r} featured />
          ))}
        </div>

        {/* Rest of reviews */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
          >
            {pageReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => changePage(-1)}
            disabled={page === 0}
            className="flex items-center gap-1.5 px-4 py-2 transition-all active:scale-95 disabled:opacity-30"
            style={{
              borderRadius: 9999,
              fontSize: 13,
              background: "white",
              border: "1px solid #e0e0e0",
              color: "#1d1d1f",
            }}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-[#7a7a7a]" style={{ fontSize: 12 }}>
            {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => changePage(1)}
            disabled={page === totalPages - 1}
            className="flex items-center gap-1.5 px-4 py-2 transition-all active:scale-95 disabled:opacity-30"
            style={{
              borderRadius: 9999,
              fontSize: 13,
              background: "white",
              border: "1px solid #e0e0e0",
              color: "#1d1d1f",
            }}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#7a7a7a] mb-4" style={{ fontSize: 15, letterSpacing: "-0.224px" }}>
            Join {AGGREGATE.totalReviews.toLocaleString()}+ pet owners who found the right plan.
          </p>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 bg-[#0066cc] text-white hover:bg-[#0071e3] transition-colors active:scale-95"
            style={{ fontSize: 15, borderRadius: 9999, padding: "12px 28px" }}
          >
            Start comparing — it&rsquo;s free
          </Link>
        </div>

      </div>
    </section>
  );
}
