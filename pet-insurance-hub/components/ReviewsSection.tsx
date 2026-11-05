"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Quote } from "lucide-react";
import Link from "next/link";
import { REVIEWS, AGGREGATE, Review } from "@/lib/reviews";
import StarRating from "./StarRating";
import { ArrowRight } from "lucide-react";

function RatingBar({ pct, label }: { pct: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", width: 20, textAlign: "right", flexShrink: 0 }}>
        {label}
      </span>
      <div className="flex-1 h-px overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          className="h-full"
          style={{ background: "#c9a96e" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", width: 28, flexShrink: 0 }}>{pct}%</span>
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 p-6 h-full"
      style={{
        background: featured ? "rgba(201,169,110,0.04)" : "rgba(255,255,255,0.02)",
        border: featured ? "1px solid rgba(201,169,110,0.2)" : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5" style={{ fontSize: 10, fontWeight: 600, color: "#c9a96e", letterSpacing: "0.06em" }}>
          <CheckCircle2 className="w-3 h-3" />
          Verified Owner
        </div>
        <Quote className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.1)" }} />
      </div>

      <StarRating rating={review.rating} size="sm" theme="dark" />

      <h3 style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.4, letterSpacing: "-0.01em" }}>
        {review.title}
      </h3>

      <div>
        <p style={{ fontSize: 12, lineHeight: 1.75, color: "rgba(255,255,255,0.4)" }}>
          {displayBody}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded((e) => !e)}
            style={{ fontSize: 11, color: "#c9a96e", marginTop: 4 }}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {review.claimAmount && (
        <div
          className="self-start px-3 py-1 font-semibold"
          style={{ fontSize: 11, color: "#c9a96e", background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)" }}
        >
          {review.claimAmount}
        </div>
      )}

      <div className="mt-auto pt-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2.5">
          <span style={{ fontSize: 20 }}>{review.avatar}</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>{review.author}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
              {review.petEmoji} {review.petName} · {review.petBreed}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div style={{ fontSize: 10, fontWeight: 600, color: "#c9a96e", opacity: 0.8 }}>{review.insurerFound}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>{review.location} · {review.date}</div>
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
    <section style={{ background: "#0e0d0c", padding: "120px 0" }} ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-16 mb-16 items-start">
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c9a96e", fontWeight: 500, marginBottom: 16 }}
            >
              Community Reviews
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-[var(--font-playfair-next)] text-white"
              style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: 16 }}
            >
              Real pet owners.<br />
              <span className="italic" style={{ color: "rgba(255,255,255,0.5)" }}>Real stories.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.35)", maxWidth: 360 }}
            >
              Every review is from a verified pet owner who used this site to find their plan.
            </motion.p>
          </div>

          {/* Aggregate score */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-shrink-0 p-8"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", minWidth: 240 }}
          >
            <div className="flex items-baseline gap-2 mb-2">
              <span
                className="font-[var(--font-bebas-next)] text-white"
                style={{ fontSize: 64, lineHeight: 1, letterSpacing: "-0.02em" }}
              >
                {AGGREGATE.avgRating}
              </span>
              <span style={{ fontSize: 16, color: "rgba(255,255,255,0.25)" }}>/5</span>
            </div>
            <StarRating rating={AGGREGATE.avgRating} size="md" theme="dark" />
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 8, marginBottom: 20, letterSpacing: "0.03em" }}>
              {AGGREGATE.totalReviews.toLocaleString()} verified reviews
            </p>
            <div className="flex flex-col gap-3">
              <RatingBar pct={AGGREGATE.fiveStarPct} label="5★" />
              <RatingBar pct={AGGREGATE.fourStarPct} label="4★" />
              <RatingBar pct={AGGREGATE.threeStarPct} label="3★" />
            </div>
          </motion.div>
        </div>

        <div className="rule-gold mb-16" />

        {/* Featured reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {FEATURED.map((r) => (
            <ReviewCard key={r.id} review={r} featured />
          ))}
        </div>

        {/* Paginated reviews */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
          >
            {pageReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => changePage(-1)}
            disabled={page === 0}
            className="flex items-center gap-2 transition-all disabled:opacity-20"
            style={{
              fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)", padding: "10px 20px",
              border: "1px solid rgba(255,255,255,0.1)", background: "transparent",
            }}
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Prev
          </button>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => changePage(1)}
            disabled={page === totalPages - 1}
            className="flex items-center gap-2 transition-all disabled:opacity-20"
            style={{
              fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)", padding: "10px 20px",
              border: "1px solid rgba(255,255,255,0.1)", background: "transparent",
            }}
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginBottom: 20 }}>
            Join {AGGREGATE.totalReviews.toLocaleString()}+ pet owners who found the right plan.
          </p>
          <Link href="/compare" className="btn-gold" style={{ fontSize: 11 }}>
            Start Comparing — It&rsquo;s Free
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
