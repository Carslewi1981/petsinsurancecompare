"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowRight, Shield, MapPin } from "lucide-react";
import { useStore } from "@/lib/store";
import {
  VET_PROCEDURES, VetProcedure, getLocalizedCost, URGENCY_CONFIG,
} from "@/lib/vetCosts";
import { insurers } from "@/lib/insurers";

// Animated counter hook
function useCounter(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return value;
}

function AnimatedDollar({ amount }: { amount: number }) {
  const val = useCounter(amount);
  return <>${val.toLocaleString()}</>;
}

const ANIMAL_TABS = [
  { id: "dog", label: "Dog", icon: "🐕" },
  { id: "cat", label: "Cat", icon: "🐈" },
  { id: "all", label: "Any Pet", icon: "🐾" },
];

export default function VetCostSection() {
  const { petProfile, selectedAnimal } = useStore();
  const [activeAnimal, setActiveAnimal] = useState<"dog" | "cat" | "all">(
    selectedAnimal === "dog" ? "dog" : selectedAnimal === "cat" ? "cat" : "dog"
  );
  const [selectedProc, setSelectedProc] = useState<VetProcedure | null>(null);
  const [hasLocation, setHasLocation] = useState(false);

  const stateCode = petProfile.location;

  useEffect(() => {
    setHasLocation(!!stateCode);
  }, [stateCode]);

  const procedures = VET_PROCEDURES.filter(
    (p) => p.animals.includes(activeAnimal) || p.animals.includes("all")
  ).slice(0, 9);

  const lowestMonthly = Math.min(
    ...insurers
      .filter((ins) => activeAnimal === "all" || ins.animals.includes(activeAnimal))
      .map((ins) =>
        activeAnimal === "all"
          ? Math.min(...Object.values(ins.monthlyPrice).filter((p) => p > 0))
          : ins.monthlyPrice[activeAnimal] || 999
      )
  );

  const featured = selectedProc ?? procedures[0];
  const localCost = featured ? getLocalizedCost(featured, stateCode) : null;
  const urgency = featured ? URGENCY_CONFIG[featured.urgency] : null;

  const yearlyPremium = lowestMonthly * 12;
  const savingsAtAvg = localCost ? localCost.avg - yearlyPremium : 0;

  return (
    <section className="bg-[#1a1a1c]" style={{ padding: "88px 0" }}>
      <div className="max-w-[980px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-flex items-center gap-1.5 text-white text-[12px] font-semibold mb-5 px-4 py-1.5"
              style={{ background: "#dc2626", borderRadius: 9999, letterSpacing: "-0.12px" }}
            >
              <AlertTriangle className="w-3 h-3" />
              Vet Cost Reality Check
            </span>
            <h2
              className="font-bebas text-white mb-4"
              style={{ fontSize: "clamp(36px, 6vw, 60px)", letterSpacing: "0.02em", lineHeight: 1.1 }}
            >
              ONE VET BILL CAN COST MORE THAN{" "}
              <span style={{ color: "#dc2626" }}>A YEAR OF INSURANCE.</span>
            </h2>
            <p className="text-[#a1a1a6] max-w-xl mx-auto" style={{ fontSize: 17, letterSpacing: "-0.374px" }}>
              Real procedures. Real costs. See what you&rsquo;d pay without coverage
              {stateCode ? ` in ${stateCode}` : " in your area"}.
            </p>
            {stateCode && (
              <div className="flex items-center justify-center gap-1.5 mt-3 text-[#0066cc]" style={{ fontSize: 13 }}>
                <MapPin className="w-3.5 h-3.5" />
                <span>Costs adjusted for {stateCode}</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Animal tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {ANIMAL_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveAnimal(tab.id as "dog" | "cat" | "all");
                setSelectedProc(null);
              }}
              className="flex items-center gap-2 px-4 py-2 transition-all active:scale-95"
              style={{
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: activeAnimal === tab.id ? 600 : 400,
                background: activeAnimal === tab.id ? "#dc2626" : "rgba(255,255,255,0.06)",
                color: activeAnimal === tab.id ? "#fff" : "#a1a1a6",
                border: activeAnimal === tab.id ? "none" : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Procedure list — left */}
          <div className="lg:col-span-2 space-y-2">
            {procedures.map((proc) => {
              const costs = getLocalizedCost(proc, stateCode);
              const urg = URGENCY_CONFIG[proc.urgency];
              const isActive = featured?.id === proc.id;

              return (
                <motion.button
                  key={proc.id}
                  onClick={() => setSelectedProc(proc)}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left flex items-center gap-3 px-4 py-3 transition-all"
                  style={{
                    borderRadius: 12,
                    background: isActive
                      ? "rgba(220,38,38,0.12)"
                      : "rgba(255,255,255,0.04)",
                    border: isActive
                      ? "1px solid rgba(220,38,38,0.4)"
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span style={{ fontSize: 22, lineHeight: 1 }}>{proc.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-white font-semibold truncate"
                      style={{ fontSize: 13, letterSpacing: "-0.12px" }}
                    >
                      {proc.name}
                    </div>
                    <div style={{ fontSize: 11, color: urg.color }}>
                      {urg.label}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-semibold text-white" style={{ fontSize: 13 }}>
                      up to ${costs.high.toLocaleString()}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Detail panel — right */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {featured && localCost && urgency && (
                <motion.div
                  key={featured.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  <div
                    className="p-6 h-full flex flex-col gap-5"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: 18,
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* Title */}
                    <div className="flex items-start gap-3">
                      <span style={{ fontSize: 36, lineHeight: 1 }}>{featured.emoji}</span>
                      <div>
                        <h3
                          className="text-white font-semibold"
                          style={{ fontSize: 21, letterSpacing: "-0.374px", lineHeight: 1.2 }}
                        >
                          {featured.name}
                        </h3>
                        <span
                          className="inline-block mt-1 px-2 py-0.5 text-[11px] font-semibold"
                          style={{ borderRadius: 9999, color: urgency.color, background: urgency.bg }}
                        >
                          {urgency.label}
                        </span>
                      </div>
                    </div>

                    <p className="text-[#a1a1a6]" style={{ fontSize: 14, letterSpacing: "-0.224px" }}>
                      {featured.description}
                    </p>

                    {/* Cost breakdown */}
                    <div
                      className="grid grid-cols-3 gap-3 p-4"
                      style={{ background: "rgba(0,0,0,0.3)", borderRadius: 12 }}
                    >
                      {[
                        { label: "Low estimate", value: localCost.low },
                        { label: "Average cost", value: localCost.avg },
                        { label: "High estimate", value: localCost.high },
                      ].map((item) => (
                        <div key={item.label} className="text-center">
                          <div
                            className="font-semibold text-white"
                            style={{ fontSize: 22, letterSpacing: "-0.374px" }}
                          >
                            <AnimatedDollar amount={item.value} />
                          </div>
                          <div className="text-[#7a7a7a]" style={{ fontSize: 11 }}>
                            {item.label}
                            {item.label === "Average cost" && stateCode && (
                              <span className="text-[#0066cc] ml-1">({stateCode})</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Without vs With insurance */}
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className="p-4 flex flex-col gap-2"
                        style={{ background: "rgba(220,38,38,0.08)", borderRadius: 12, border: "1px solid rgba(220,38,38,0.2)" }}
                      >
                        <div className="text-[#dc2626]" style={{ fontSize: 11, fontWeight: 600 }}>
                          ✕ Without Insurance
                        </div>
                        <div
                          className="font-semibold text-white"
                          style={{ fontSize: 26, letterSpacing: "-0.374px" }}
                        >
                          <AnimatedDollar amount={localCost.avg} />
                        </div>
                        <div className="text-[#7a7a7a]" style={{ fontSize: 11 }}>
                          Full cost out-of-pocket
                        </div>
                      </div>

                      <div
                        className="p-4 flex flex-col gap-2"
                        style={{ background: "rgba(0,102,204,0.08)", borderRadius: 12, border: "1px solid rgba(0,102,204,0.25)" }}
                      >
                        <div className="text-[#0066cc]" style={{ fontSize: 11, fontWeight: 600 }}>
                          ✓ With Insurance
                        </div>
                        <div
                          className="font-semibold text-[#2997ff]"
                          style={{ fontSize: 15, letterSpacing: "-0.224px", lineHeight: 1.5 }}
                        >
                          {featured.withInsuranceEstimate}
                        </div>
                        <div className="text-[#7a7a7a]" style={{ fontSize: 11 }}>
                          Plans from ${lowestMonthly}/mo
                        </div>
                      </div>
                    </div>

                    {/* Savings callout */}
                    {savingsAtAvg > 0 && (
                      <div
                        className="flex items-center gap-3 px-4 py-3"
                        style={{ background: "rgba(22,163,74,0.1)", borderRadius: 10, border: "1px solid rgba(22,163,74,0.25)" }}
                      >
                        <Shield className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <p style={{ fontSize: 13, color: "#86efac" }}>
                          One {featured.name.toLowerCase()} event could cost you{" "}
                          <strong className="text-white">${localCost.avg.toLocaleString()}</strong>{" "}
                          — that&rsquo;s{" "}
                          <strong className="text-white">
                            {Math.round(savingsAtAvg / yearlyPremium + 1)} years
                          </strong>{" "}
                          of insurance premiums.
                        </p>
                      </div>
                    )}

                    <Link
                      href="/compare"
                      className="flex items-center justify-center gap-2 bg-[#0066cc] text-white hover:bg-[#0071e3] transition-colors active:scale-95 mt-auto"
                      style={{ borderRadius: 9999, fontSize: 15, fontWeight: 400, padding: "12px 24px" }}
                    >
                      Compare plans that cover this
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "1 in 3", label: "pets need unexpected vet care each year*" },
            { value: "$3,000–$8,000", label: "typical major surgery cost range*" },
            { value: "44%", label: "of pet owners couldn't cover a $1K vet bill*" },
            { value: "$17/mo", label: "lowest listed insurance starting price" },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center p-4"
              style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="font-bebas text-white mb-1"
                style={{ fontSize: 32, lineHeight: 1 }}
              >
                {s.value}
              </div>
              <div className="text-[#7a7a7a]" style={{ fontSize: 11, lineHeight: 1.4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", marginTop: 16, lineHeight: 1.6 }}>
          * Cost ranges sourced from AVMA veterinary fee surveys and published industry data. Actual costs vary by location, provider, and individual case. Insurance estimates assume a standard 80% reimbursement after deductible.
        </p>

      </div>
    </section>
  );
}
