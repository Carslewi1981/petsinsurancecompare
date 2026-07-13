"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Shield, Zap, Star } from "lucide-react";
import TrustBar from "@/components/TrustBar";
import StatBar from "@/components/StatBar";
import VetCostSection from "@/components/VetCostSection";
import HowItWorks from "@/components/HowItWorks";
import PetGallery from "@/components/PetGallery";
import PlanCard from "@/components/PlanCard";
import { insurers } from "@/lib/insurers";
import { useStore } from "@/lib/store";
import { useRef } from "react";

const topPlans = [...insurers].sort((a, b) => b.rating - a.rating).slice(0, 3);
const providers = insurers.map((i) => ({ name: i.name, logo: i.logo, color: i.color }));

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HomePage() {
  const { t } = useStore();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative grain overflow-hidden flex flex-col"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, #0c0c0d 0%, #12100f 55%, #0e0d0c 100%)",
        }}
      >
        {/* Warm glow top */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: "-10%", left: "50%", transform: "translateX(-50%)",
            width: "80vw", height: "60vh",
            background: "radial-gradient(ellipse at center, rgba(201,169,110,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          }}
        />

        {/* Main content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, paddingTop: 120, paddingBottom: 60 }}
          className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6"
        >
          {/* Eyebrow pill */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
            <span
              className="inline-flex items-center gap-2 mb-8"
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#c9a96e",
                border: "1px solid rgba(201,169,110,0.35)",
                padding: "7px 18px",
              }}
            >
              <span className="w-1 h-1 rounded-full bg-[#c9a96e] animate-pulse" />
              {t.hero_badge}
            </span>
          </motion.div>

          {/* Headline — editorial serif + sans mix */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-white leading-none mb-8"
            style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            <span
              className="block font-[var(--font-playfair-next)] italic"
              style={{ color: "rgba(255,255,255,0.92)" }}
            >
              Protect what
            </span>
            <span
              className="block font-[var(--font-bebas-next)]"
              style={{
                letterSpacing: "0.04em",
                background: "linear-gradient(135deg, #e8d5aa 0%, #c9a96e 40%, #a8875a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              matters most.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 520,
              marginBottom: 48,
              letterSpacing: "0.01em",
            }}
          >
            {t.hero_sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-4 justify-center mb-24"
          >
            <Link href="/compare" className="btn-gold" style={{ fontSize: 12 }}>
              {t.hero_cta1}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a href="#how-it-works" className="btn-outline-light" style={{ fontSize: 12 }}>
              {t.hero_cta2}
            </a>
          </motion.div>

          {/* Hero stats — ruled bottom strip */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="w-full max-w-2xl"
          >
            <div className="rule-gold mb-8" />
            <div className="grid grid-cols-4 gap-8">
              {[
                { value: "12+", label: t.stat_providers },
                { value: "7", label: t.stat_animalTypes },
                { value: "50K+", label: t.stat_comparisons },
                { value: "Free", label: t.stat_free },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="font-[var(--font-bebas-next)] text-white mb-1"
                    style={{ fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "0.02em", lineHeight: 1 }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px bg-gradient-to-b from-white/30 to-transparent"
            style={{ height: 36 }}
          />
        </motion.div>
      </section>

      {/* ── TRUST BAR ── */}
      <TrustBar />

      {/* ── STAT MARQUEE ── */}
      <StatBar />

      {/* ── VET COST ── */}
      <VetCostSection />

      {/* ── HOW IT WORKS ── */}
      <HowItWorks />

      {/* ── FEATURED PLANS ── */}
      <section style={{ background: "#faf8f4", padding: "120px 0" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Section header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c9a96e", fontWeight: 500, marginBottom: 12 }}
              >
                Top Rated Plans
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-[var(--font-playfair-next)]"
                style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 500, color: "#1a1814", lineHeight: 1.15, letterSpacing: "-0.02em" }}
              >
                {t.feat_title}
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/compare" className="link-gold flex items-center gap-1.5" style={{ fontSize: 13, fontWeight: 500 }}>
                {t.feat_seeAll}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          <div className="rule-gold mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPlans.map((insurer, i) => (
              <motion.div
                key={insurer.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <PlanCard insurer={insurer} animal="all" index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PET GALLERY ── */}
      <PetGallery />

      {/* ── PROVIDER STRIP ── */}
      <section style={{ background: "#0c0c0d", padding: "80px 0" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <p
            className="text-center mb-10"
            style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}
          >
            {t.prov_title}
          </p>
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {providers.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2 px-5 py-2.5 transition-colors"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  letterSpacing: "0.06em",
                }}
              >
                <span style={{ fontSize: 16 }}>{p.logo}</span>
                <span
                  className="font-[var(--font-bebas-next)]"
                  style={{ fontSize: 14, letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)" }}
                >
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US — editorial 3-column ── */}
      <section style={{ background: "#f0ede7", padding: "120px 0" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Left — headline */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c9a96e", fontWeight: 500, marginBottom: 16 }}
              >
                Our Commitment
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-[var(--font-playfair-next)]"
                style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 500, color: "#1a1814", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 24 }}
              >
                Clarity over<br />
                <span className="italic">confusion.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ fontSize: 16, lineHeight: 1.7, color: "#6b6560", maxWidth: 400 }}
              >
                Pet insurance is complex. We cut through the jargon, surface what matters, and
                give you a side-by-side view that actually makes sense — so you can decide with confidence.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10"
              >
                <Link href="/compare" className="btn-gold" style={{ fontSize: 11 }}>
                  Compare Free Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>

            {/* Right — 3 pillars */}
            <div className="flex flex-col gap-0">
              {[
                {
                  icon: <Shield className="w-4 h-4" />,
                  title: "Independent & Unbiased",
                  desc: "We are not owned by any insurer. Every comparison is objective, data-driven, and updated monthly.",
                  num: "01",
                },
                {
                  icon: <Zap className="w-4 h-4" />,
                  title: "Compare in 30 Seconds",
                  desc: "No forms, no phone calls. Select your pet, filter by coverage, and see plans side-by-side instantly.",
                  num: "02",
                },
                {
                  icon: <Star className="w-4 h-4" />,
                  title: "Verified Real Reviews",
                  desc: "Every review comes from a confirmed pet owner. No paid placements. No manufactured trust.",
                  num: "03",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-6 py-8"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <span
                    className="font-[var(--font-bebas-next)] flex-shrink-0"
                    style={{ fontSize: 13, color: "#c9a96e", letterSpacing: "0.08em", paddingTop: 3 }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ color: "#c9a96e" }}>{item.icon}</span>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1a1814", letterSpacing: "-0.01em" }}>
                        {item.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: "#6b6560" }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="relative grain overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0c0c0d 0%, #12100f 100%)",
          padding: "140px 0",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(201,169,110,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c9a96e", fontWeight: 500, marginBottom: 20 }}
          >
            Start Today
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[var(--font-playfair-next)] text-white mb-6"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.025em" }}
          >
            {t.cta_title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(255,255,255,0.4)", marginBottom: 48 }}
          >
            {t.cta_sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/compare" className="btn-gold" style={{ fontSize: 12 }}>
              {t.cta_btn}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/resources" className="btn-outline-light" style={{ fontSize: 12 }}>
              Learn More
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", marginTop: 24, letterSpacing: "0.05em" }}
          >
            Free · No account required · No hidden fees
          </motion.p>
        </div>
      </section>
    </>
  );
}
