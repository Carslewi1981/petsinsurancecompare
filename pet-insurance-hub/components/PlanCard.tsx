"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ChevronDown, ChevronUp, Phone, ArrowUpRight } from "lucide-react";
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

export default function PlanCard({ insurer, animal }: PlanCardProps) {
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

  const terms = [
    { label: t.card_reimburse, value: insurer.reimbursement },
    { label: t.card_annualMax, value: insurer.maxAnnual },
    { label: t.card_deductible, value: insurer.deductible },
    { label: t.card_claims, value: insurer.claimsTime },
  ];

  return (
    <article
      className="relative flex flex-col h-full"
      style={{
        background: "var(--color-paper)",
        border: `2px solid ${isSelected ? "var(--color-ink)" : "var(--color-line)"}`,
        borderRadius: 14,
        boxShadow: isSelected ? "5px 5px 0 var(--color-tag)" : "none",
        transition: "box-shadow 0.15s, border-color 0.15s",
      }}
    >
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-4" style={{ minHeight: 118 }}>
          <div className="min-w-0">
            <h3 className="heading flex items-center gap-2.5" style={{ fontSize: 28 }}>
              <span
                aria-hidden
                className="inline-block flex-shrink-0 rounded-full"
                style={{ width: 12, height: 12, background: insurer.color }}
              />
              {insurer.name}
            </h3>
            <p style={{ fontSize: 15, color: "var(--color-muted)", lineHeight: 1.4, marginTop: 4 }}>
              {insurer.tagline}
            </p>
          </div>
          <button
            role="checkbox"
            aria-checked={isSelected}
            onClick={() => toggleCompare(insurer.id)}
            aria-label={`Compare ${insurer.name}`}
            className="flex items-center gap-2 flex-shrink-0 px-2.5 py-1.5 rounded-full"
            style={{
              fontSize: 14,
              fontWeight: 600,
              border: "2px solid var(--color-ink)",
              background: isSelected ? "var(--color-tag)" : "transparent",
            }}
          >
            <span
              aria-hidden
              className="flex items-center justify-center rounded"
              style={{
                width: 16,
                height: 16,
                border: "2px solid var(--color-ink)",
                background: isSelected ? "var(--color-ink)" : "transparent",
              }}
            >
              {isSelected && <Check className="w-3 h-3" color="#fff" strokeWidth={4} />}
            </span>
            Compare
          </button>
        </div>

        <div className="flex items-baseline gap-1.5 mb-5">
          <span className="display" style={{ fontSize: 56 }}>
            ${price}
          </span>
          <span style={{ fontSize: 18, fontWeight: 600 }}>/mo</span>
          {priceAdjusted && (
            <span
              className="rounded px-1.5 py-0.5"
              style={{ fontSize: 13, fontWeight: 700, background: "var(--color-tag-soft)", marginLeft: 4 }}
            >
              est.
            </span>
          )}
          <span style={{ fontSize: 14, color: "var(--color-muted)", marginLeft: 6 }}>
            {animal === "all" ? t.card_startingFrom : t.card_forAnimal.replace("{animal}", animalLabel)}
          </span>
        </div>

        <dl className="mb-5 space-y-1.5">
          {terms.map((term) => (
            <div key={term.label} className="leader" style={{ fontSize: 15 }}>
              <dt style={{ color: "var(--color-muted)" }}>{term.label}</dt>
              <dd style={{ fontWeight: 650, textAlign: "right" }}>{term.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <StarRating rating={insurer.rating} reviews={insurer.reviews} size="sm" />
          <span style={{ fontSize: 14, color: "var(--color-muted)" }}>
            {t.card_app} {insurer.appRating}
          </span>
        </div>

        {breedMatch && (
          <div
            className="flex items-center justify-between gap-3 px-3.5 py-2.5 mb-4"
            style={{
              background: `${getGradeColor(breedMatch.grade)}14`,
              border: `2px solid ${getGradeColor(breedMatch.grade)}`,
              borderRadius: 10,
            }}
          >
            <p style={{ fontSize: 14, lineHeight: 1.3 }}>
              <strong>Breed match</strong>
              <span style={{ color: "var(--color-muted)" }}> for {selectedBreed?.name}</span>
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className="flex items-center justify-center"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#fff",
                  background: getGradeColor(breedMatch.grade),
                }}
              >
                {breedMatch.grade}
              </span>
              <span style={{ fontSize: 14, color: "var(--color-muted)" }}>{breedMatch.score}/100</span>
            </div>
          </div>
        )}

        <ul className="flex flex-wrap gap-1.5 mb-4" aria-label="Animals covered">
          {insurer.animals.map((a) => {
            const at = ANIMAL_TYPES.find((x) => x.id === a);
            return (
              <li
                key={a}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{ fontSize: 14, background: "var(--color-mint-soft)" }}
              >
                <span aria-hidden>{at?.icon}</span>
                {at?.label}
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="flex items-center gap-1.5 link-u self-start mb-4"
          style={{ fontSize: 15 }}
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {expanded ? t.card_hideFeatures : t.card_showFeatures}
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 space-y-5 overflow-hidden"
          >
            <div>
              <h4 className="heading mb-2" style={{ fontSize: 18 }}>
                {t.card_covered}
              </h4>
              <ul className="space-y-1.5">
                {insurer.features.map((f) => (
                  <li key={f} className="flex items-start gap-2" style={{ fontSize: 15, lineHeight: 1.4 }}>
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-teal)" }} strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="heading mb-2" style={{ fontSize: 18 }}>
                {t.card_notCovered}
              </h4>
              <ul className="space-y-1.5">
                {insurer.notCovered.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2"
                    style={{ fontSize: 15, lineHeight: 1.4, color: "var(--color-muted)" }}
                  >
                    <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-stamp)" }} strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <p className="px-3.5 py-2.5 rounded-lg" style={{ fontSize: 14, background: "var(--color-mint-soft)" }}>
              {t.card_waitingPeriod} <strong>{insurer.waitingPeriod}</strong>
            </p>

            {breedMatch && breedMatch.highlights.length > 0 && (
              <ul className="space-y-1.5">
                {breedMatch.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 px-3 py-2 rounded-lg"
                    style={{ fontSize: 14, background: "var(--color-mint-soft)" }}
                  >
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-teal)" }} strokeWidth={3} />
                    {h}
                  </li>
                ))}
              </ul>
            )}
            {breedMatch && breedMatch.warnings.length > 0 && (
              <ul className="space-y-1.5">
                {breedMatch.warnings.map((w) => (
                  <li
                    key={w}
                    className="flex items-start gap-2 px-3 py-2 rounded-lg"
                    style={{ fontSize: 14, background: "var(--color-tag-soft)" }}
                  >
                    <span aria-hidden className="flex-shrink-0" style={{ fontWeight: 800 }}>
                      !
                    </span>
                    {w}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}

        <div className="flex gap-2.5 mt-auto pt-2">
          <button onClick={handleContact} className="btn btn-quiet btn-sm flex-1">
            <Phone className="w-4 h-4" />
            {t.card_contact}
          </button>
          <a
            href={insurer.contact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm flex-1"
          >
            {t.card_getQuote}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
