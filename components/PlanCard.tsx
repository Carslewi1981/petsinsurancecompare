"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ChevronDown, ChevronUp, Phone, Globe } from "lucide-react";
import { Insurer, ANIMAL_TYPES } from "@/lib/insurers";
import { useStore } from "@/lib/store";
import { getPriceMultiplier } from "@/lib/priceMultiplier";
import { getBreedById } from "@/lib/breeds";
import { scoreInsurerForBreed, getGradeColor } from "@/lib/healthRisk";
import StarRating from "./StarRating";

interface PlanCardProps {
  insurer: Insurer;
  animal: string;
  index?: number;
}

export default function PlanCard({ insurer, animal, index = 0 }: PlanCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { comparedIds, toggleCompare, setActiveModal, setContactInsurer, t, petProfile } = useStore();
  const isSelected = comparedIds.includes(insurer.id);

  const basePrice =
    animal === "all"
      ? Math.min(...Object.values(insurer.monthlyPrice).filter((p) => p > 0))
      : insurer.monthlyPrice[animal] || 0;

  const multiplier = getPriceMultiplier(petProfile, animal);
  const price = Math.round(basePrice * multiplier);
  const priceAdjusted = multiplier !== 1.0;

  const selectedBreed = petProfile.breedId ? getBreedById(petProfile.breedId) : null;
  const breedMatch = selectedBreed ? scoreInsurerForBreed(insurer, selectedBreed) : null;

  const animalLabel =
    animal === "all" ? t.card_from : ANIMAL_TYPES.find((a) => a.id === animal)?.label || "";

  const handleContact = () => {
    setContactInsurer(insurer);
    setActiveModal("contact");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative bg-white transition-all duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
      style={{
        border: isSelected ? "1.5px solid #c9a96e" : "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={() => toggleCompare(insurer.id)}
          className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors active:scale-95"
          style={{
            backgroundColor: isSelected ? "#c9a96e" : "transparent",
            borderColor: isSelected ? "#c9a96e" : "#d2d2d7",
          }}
        >
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-3 mb-5 pr-8">
          {insurer.logo && (
            <div
              className="w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: insurer.color + "15", borderRadius: 8 }}
            >
              {insurer.logo}
            </div>
          )}
          <div>
            <h3
              className="font-semibold leading-tight"
              style={{ fontSize: 17, letterSpacing: "-0.374px", color: insurer.color }}
            >
              {insurer.name}
            </h3>
            <p className="text-[#7a7a7a] text-[14px] leading-tight mt-0.5" style={{ letterSpacing: "-0.224px" }}>
              {insurer.tagline}
            </p>
          </div>
        </div>

        <div className="mb-5">
          <div className="flex items-baseline gap-1">
            <span className="font-semibold text-[#1d1d1f]" style={{ fontSize: 34, letterSpacing: "-0.374px" }}>
              ${price}
            </span>
            <span className="text-[#7a7a7a] text-[17px]">/mo</span>
            {priceAdjusted && (
              <span
                className="text-[#c9a96e] font-semibold"
                style={{ fontSize: 11, letterSpacing: "-0.12px", marginLeft: 4 }}
              >
                est.
              </span>
            )}
          </div>
          <div className="text-[#7a7a7a] text-[14px]" style={{ letterSpacing: "-0.224px" }}>
            {animal === "all" ? t.card_startingFrom : t.card_forAnimal.replace("{animal}", animalLabel)}
          </div>
        </div>

        <div
          className="grid grid-cols-4 gap-0 mb-5 bg-[#f5f5f7]"
          style={{ borderRadius: 11, overflow: "hidden" }}
        >
          {[
            { label: t.card_reimburse, value: insurer.reimbursement },
            { label: t.card_annualMax, value: insurer.maxAnnual },
            { label: t.card_deductible, value: insurer.deductible },
            { label: t.card_claims, value: insurer.claimsTime },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-3 px-1"
              style={{ borderRight: i < 3 ? "1px solid #e0e0e0" : "none" }}
            >
              <span className="text-[#1d1d1f] text-[12px] font-semibold leading-tight text-center">
                {stat.value}
              </span>
              <span className="text-[#7a7a7a] text-[10px] mt-0.5 text-center">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <StarRating rating={insurer.rating} reviews={insurer.reviews} size="sm" />
          <span className="text-[12px] text-[#7a7a7a]">{t.card_app} ⭐ {insurer.appRating}</span>
        </div>

        {/* Breed match badge */}
        {breedMatch && (
          <div
            className="flex items-center justify-between px-3 py-2 mb-4"
            style={{
              background: `${getGradeColor(breedMatch.grade)}12`,
              border: `1px solid ${getGradeColor(breedMatch.grade)}30`,
              borderRadius: 9,
            }}
          >
            <div>
              <span className="font-semibold" style={{ fontSize: 11, color: getGradeColor(breedMatch.grade) }}>
                Breed Match
              </span>
              <span className="text-[#7a7a7a] ml-1" style={{ fontSize: 11 }}>
                {selectedBreed?.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="font-semibold w-6 h-6 flex items-center justify-center"
                style={{
                  fontSize: 13,
                  color: "#fff",
                  background: getGradeColor(breedMatch.grade),
                  borderRadius: 6,
                }}
              >
                {breedMatch.grade}
              </span>
              <span className="text-[#7a7a7a]" style={{ fontSize: 11 }}>{breedMatch.score}/100</span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-4">
          {insurer.animals.map((a) => {
            const at = ANIMAL_TYPES.find((x) => x.id === a);
            return (
              <span
                key={a}
                className="flex items-center gap-1 text-[#333333] text-[12px] px-3 py-1"
                style={{ background: "#f5f5f7", borderRadius: 9999 }}
              >
                <span className="text-xs">{at?.icon}</span>
                <span>{at?.label}</span>
              </span>
            );
          })}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-[14px] text-[#c9a96e] mb-4 hover:text-[#a8875a] transition-colors"
          style={{ letterSpacing: "-0.224px" }}
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? t.card_hideFeatures : t.card_showFeatures}
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 space-y-4"
          >
            <div>
              <h4 className="text-[12px] font-semibold text-[#7a7a7a] mb-2">{t.card_covered}</h4>
              <ul className="space-y-1">
                {insurer.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[14px] text-[#1d1d1f]" style={{ letterSpacing: "-0.224px" }}>
                    <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] font-semibold text-[#7a7a7a] mb-2">{t.card_notCovered}</h4>
              <ul className="space-y-1">
                {insurer.notCovered.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[14px] text-[#7a7a7a]" style={{ letterSpacing: "-0.224px" }}>
                    <X className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="flex items-center gap-2 text-[12px] text-[#7a7a7a] px-3 py-2 bg-[#f5f5f7]"
              style={{ borderRadius: 8 }}
            >
              <span>⏱</span>
              {t.card_waitingPeriod} {insurer.waitingPeriod}
            </div>

            {/* Breed-specific insights */}
            {breedMatch && breedMatch.highlights.length > 0 && (
              <div className="space-y-1">
                {breedMatch.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 px-3 py-1.5 bg-[#f0fdf4]" style={{ borderRadius: 7 }}>
                    <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-800" style={{ fontSize: 11 }}>{h}</span>
                  </div>
                ))}
              </div>
            )}
            {breedMatch && breedMatch.warnings.length > 0 && (
              <div className="space-y-1">
                {breedMatch.warnings.map((w) => (
                  <div key={w} className="flex items-start gap-2 px-3 py-1.5 bg-[#fffbeb]" style={{ borderRadius: 7 }}>
                    <span className="text-[#d97706] flex-shrink-0 mt-0.5" style={{ fontSize: 10 }}>⚠</span>
                    <span className="text-[#92400e]" style={{ fontSize: 11 }}>{w}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleContact}
            className="flex-1 flex items-center justify-center gap-1.5 text-[#c9a96e] text-[14px] py-2.5 hover:text-[#a8875a] transition-colors active:scale-95"
            style={{ border: "1px solid #c9a96e", letterSpacing: "0.05em", textTransform: "uppercase" as const, fontSize: 11 }}
          >
            <Phone className="w-3 h-3" />
            {t.card_contact}
          </button>
          <a
            href={insurer.contact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 text-[#0c0c0d] text-[11px] py-2.5 transition-colors active:scale-95"
            style={{ background: "#c9a96e", letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            <Globe className="w-3 h-3" />
            {t.card_getQuote}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
