"use client";

import { getBreedById } from "@/lib/breeds";
import { getRiskLevelColor, getRiskLevelLabel } from "@/lib/healthRisk";
import { AlertTriangle, ShieldCheck, Heart, Info } from "lucide-react";

interface Props {
  breedId: string;
}

const SEVERITY_COLOR = {
  mild:     { bg: "#f0fdf4", text: "#16a34a", dot: "#16a34a" },
  moderate: { bg: "#fffbeb", text: "#d97706", dot: "#d97706" },
  severe:   { bg: "#fef2f2", text: "#dc2626", dot: "#dc2626" },
};

export default function BreedRiskCard({ breedId }: Props) {
  const breed = getBreedById(breedId);
  if (!breed) return null;

  const riskColor = getRiskLevelColor(breed.riskLevel);
  const riskLabel = getRiskLevelLabel(breed.riskLevel);
  const severeConds = breed.conditions.filter((c) => c.severity === "severe");
  const needsUnlimited = breed.conditions.some((c) => c.tags.includes("unlimited"));

  return (
    <div
      className="mt-4 bg-white border"
      style={{ borderRadius: 14, border: `1.5px solid ${riskColor}33`, overflow: "hidden" }}
    >
      {/* Header bar */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ background: `${riskColor}12` }}
      >
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4" style={{ color: riskColor }} />
          <span className="font-semibold text-[#1d1d1f]" style={{ fontSize: 13, letterSpacing: "-0.12px" }}>
            {breed.name}
          </span>
        </div>
        <span
          className="font-semibold px-2 py-0.5"
          style={{ fontSize: 11, color: riskColor, background: `${riskColor}18`, borderRadius: 9999 }}
        >
          {riskLabel}
        </span>
      </div>

      <div className="px-4 py-3 space-y-3">
        {/* Risk bar */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-[#7a7a7a]" style={{ fontSize: 11 }}>Health Risk Score</span>
            <span className="font-semibold" style={{ fontSize: 11, color: riskColor }}>{breed.riskScore}/100</span>
          </div>
          <div className="w-full bg-[#f0f0f0] h-1.5" style={{ borderRadius: 9999 }}>
            <div
              className="h-1.5 transition-all"
              style={{ width: `${breed.riskScore}%`, background: riskColor, borderRadius: 9999 }}
            />
          </div>
        </div>

        {/* Lifespan */}
        <div className="flex items-center justify-between">
          <span className="text-[#7a7a7a]" style={{ fontSize: 11 }}>Avg. lifespan</span>
          <span className="font-semibold text-[#1d1d1f]" style={{ fontSize: 11 }}>{breed.avgLifespan}</span>
        </div>

        {/* Blurb */}
        <p className="text-[#555]" style={{ fontSize: 11, lineHeight: 1.5 }}>{breed.blurb}</p>

        {/* Conditions */}
        {breed.conditions.length > 0 && breed.conditions[0].tags.length > 0 && (
          <div>
            <p className="text-[#7a7a7a] font-semibold mb-1.5" style={{ fontSize: 11 }}>Known Health Risks</p>
            <div className="space-y-1">
              {breed.conditions.map((c) => {
                const col = SEVERITY_COLOR[c.severity];
                return (
                  <div
                    key={c.name}
                    className="flex items-center gap-2 px-2 py-1.5"
                    style={{ background: col.bg, borderRadius: 7 }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: col.dot }}
                    />
                    <span style={{ fontSize: 11, color: col.text, lineHeight: 1.3 }}>{c.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Warnings */}
        {(needsUnlimited || severeConds.length > 0) && (
          <div
            className="flex items-start gap-2 px-3 py-2"
            style={{ background: "#fffbeb", borderRadius: 8, border: "1px solid #fde68a" }}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#d97706] flex-shrink-0 mt-0.5" />
            <p style={{ fontSize: 11, color: "#92400e", lineHeight: 1.4 }}>
              {needsUnlimited
                ? "This breed may need unlimited annual coverage due to potentially high treatment costs."
                : `${severeConds.length} severe condition${severeConds.length > 1 ? "s" : ""} — ensure hereditary conditions are covered.`}
            </p>
          </div>
        )}

        {/* Coverage tip */}
        <div
          className="flex items-start gap-2 px-3 py-2"
          style={{ background: "#eff6ff", borderRadius: 8 }}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#0066cc] flex-shrink-0 mt-0.5" />
          <p style={{ fontSize: 11, color: "#1e40af", lineHeight: 1.4 }}>
            Plan cards below now show a <strong>breed match score</strong> — higher is better for {breed.name}s.
          </p>
        </div>
      </div>
    </div>
  );
}
