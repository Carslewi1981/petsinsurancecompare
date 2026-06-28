"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import StatBar from "@/components/StatBar";
import HowItWorks from "@/components/HowItWorks";
import PlanCard from "@/components/PlanCard";
import { insurers } from "@/lib/insurers";
import { useStore } from "@/lib/store";

const topPlans = [...insurers].sort((a, b) => b.rating - a.rating).slice(0, 3);
const providers = insurers.map((i) => ({ name: i.name, logo: i.logo, color: i.color }));

export default function HomePage() {
  const { t } = useStore();

  return (
    <>
      {/* Hero — dark tile */}
      <section
        className="flex flex-col justify-center overflow-hidden"
        style={{ background: "#272729", minHeight: 600, paddingTop: 44 }}
      >
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-20 flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <span
              className="inline-block text-white text-[12px] font-semibold mb-6 px-4 py-1.5"
              style={{ background: "#0066cc", borderRadius: 9999, letterSpacing: "-0.12px" }}
            >
              {t.hero_badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bebas text-white leading-none mb-6 max-w-3xl"
            style={{ fontSize: "clamp(48px, 8vw, 80px)", letterSpacing: "0.02em" }}
          >
            {t.hero_h1}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#cccccc] max-w-2xl mb-10"
            style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.231px" }}
          >
            {t.hero_sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              href="/compare"
              className="flex items-center gap-2 bg-[#0066cc] text-white hover:bg-[#0071e3] transition-colors active:scale-95"
              style={{ fontSize: 18, fontWeight: 300, borderRadius: 9999, padding: "14px 28px" }}
            >
              {t.hero_cta1}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 text-[#2997ff] hover:text-white transition-colors active:scale-95"
              style={{
                fontSize: 18,
                fontWeight: 300,
                borderRadius: 9999,
                padding: "14px 28px",
                border: "1px solid #2997ff",
              }}
            >
              {t.hero_cta2}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 flex flex-wrap gap-10 justify-center"
          >
            {[
              { label: t.stat_providers, value: "8+" },
              { label: t.stat_animalTypes, value: "7" },
              { label: t.stat_comparisons, value: "50K+" },
              { label: t.stat_free, value: "✓" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-bebas text-white" style={{ fontSize: 40, lineHeight: 1.1 }}>
                  {s.value}
                </div>
                <div className="text-[#a1a1a6]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stat marquee */}
      <StatBar />

      {/* How it works — parchment tile */}
      <HowItWorks />

      {/* Featured plans — white tile */}
      <section className="bg-white" style={{ padding: "80px 0" }}>
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2
                className="font-semibold text-[#1d1d1f] mb-2"
                style={{ fontSize: 40, lineHeight: 1.1 }}
              >
                {t.feat_title}
              </h2>
              <p className="text-[#7a7a7a]" style={{ fontSize: 17, letterSpacing: "-0.374px" }}>
                {t.feat_sub}
              </p>
            </div>
            <Link
              href="/compare"
              className="text-[#0066cc] hover:text-[#0071e3] transition-colors"
              style={{ fontSize: 17, letterSpacing: "-0.374px" }}
            >
              {t.feat_seeAll}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPlans.map((insurer, i) => (
              <PlanCard key={insurer.id} insurer={insurer} animal="all" index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Provider trust bar — dark tile */}
      <section className="bg-[#2a2a2c]" style={{ padding: "64px 0" }}>
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <h3
            className="text-[#a1a1a6] text-center mb-10"
            style={{ fontSize: 12, letterSpacing: "-0.12px" }}
          >
            {t.prov_title}
          </h3>
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {providers.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2 px-4 py-2.5"
                style={{ background: "rgba(255,255,255,0.05)", borderRadius: 11, border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-xl">{p.logo}</span>
                <span className="font-bebas text-lg tracking-wide" style={{ color: p.color }}>
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark tile */}
      <section className="bg-[#272729]" style={{ padding: "80px 0" }}>
        <div className="max-w-[600px] mx-auto text-center px-4">
          <h2
            className="font-semibold text-white mb-4"
            style={{ fontSize: 40, lineHeight: 1.1 }}
          >
            {t.cta_title}
          </h2>
          <p className="text-[#cccccc] mb-8" style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.231px" }}>
            {t.cta_sub}
          </p>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 bg-[#0066cc] text-white hover:bg-[#0071e3] transition-colors active:scale-95"
            style={{ fontSize: 18, fontWeight: 300, borderRadius: 9999, padding: "14px 28px" }}
          >
            {t.cta_btn}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
