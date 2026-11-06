"use client";

import { getBreedById } from "@/lib/breeds";
import { getRiskLevelColor, getRiskLevelLabel } from "@/lib/healthRisk";
import { AlertTriangle, ShieldCheck, Heart } from "lucide-react";

interface Props {
  breedId: string;
}

const SEVERITY_COLOR = {
  mild: { bg: "#e3f2ea", text: "#0f5a31", dot: "#17703f" },
  moderate: { bg: "#fff1b8", text: "#6b3a00", dot: "#a85a00" },
  severe: { bg: "#fbe3df", text: "#8f2315", dot: "#c4301f" },
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
      className="mt-4 bg-paper overflow-hidden"
      style={{ borderRadius: 12, border: "2px solid var(--color-ink)" }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between gap-2"
        style={{ background: "var(--color-mint-soft)", borderBottom: "2px solid var(--color-ink)" }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Heart className="w-4 h-4 flex-shrink-0" style={{ color: riskColor }} aria-hidden />
          <span className="font-bold truncate" style={{ fontSize: 15 }}>
            {breed.name}
          </span>
        </div>
        <span
          className="px-2.5 py-0.5 rounded-full flex-shrink-0"
          style={{ fontSize: 13, fontWeight: 700, color: "#fff", background: riskColor }}
        >
          {riskLabel}
        </span>
      </div>

      <div className="px-4 py-3.5 space-y-3.5">
        <div>
          <div className="flex justify-between mb-1.5" style={{ fontSize: 14 }}>
            <span style={{ color: "var(--color-muted)" }}>Health risk score</span>
            <span className="font-bold">{breed.riskScore}/100</span>
          </div>
          <div
            className="w-full h-2.5 rounded-full"
            style={{ background: "var(--color-mint)" }}
            role="meter"
            aria-valuenow={breed.riskScore}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Health risk score"
          >
            <div className="h-full rounded-full" style={{ width: `${breed.riskScore}%`, background: riskColor }} />
          </div>
        </div>

        <div className="leader" style={{ fontSize: 14 }}>
          <span style={{ color: "var(--color-muted)" }}>Average lifespan</span>
          <span className="font-bold">{breed.avgLifespan}</span>
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--color-muted)" }}>{breed.blurb}</p>

        {breed.conditions.length > 0 && breed.conditions[0].tags.length > 0 && (
          <div>
            <h4 className="heading mb-1.5" style={{ fontSize: 17 }}>
              Known health risks
            </h4>
            <ul className="space-y-1">
              {breed.conditions.map((c) => {
                const col = SEVERITY_COLOR[c.severity];
                return (
                  <li
                    key={c.name}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-md"
                    style={{ background: col.bg }}
                  >
                    <span aria-hidden className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: col.dot }} />
                    <span style={{ fontSize: 14, color: col.text, lineHeight: 1.3 }}>
                      {c.name}
                      <span className="sr-only"> ({c.severity})</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {(needsUnlimited || severeConds.length > 0) && (
          <div
            className="flex items-start gap-2 px-3 py-2.5 rounded-lg"
            style={{ background: "var(--color-tag-soft)" }}
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden />
            <p style={{ fontSize: 14, lineHeight: 1.4 }}>
              {needsUnlimited
                ? "This breed may need unlimited annual coverage due to potentially high treatment costs."
                : `${severeConds.length} severe condition${severeConds.length > 1 ? "s" : ""}. Make sure hereditary conditions are covered.`}
            </p>
          </div>
        )}

        <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg" style={{ background: "var(--color-mint-soft)" }}>
          <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-teal)" }} aria-hidden />
          <p style={{ fontSize: 14, lineHeight: 1.4 }}>
            Plan cards now show a <strong>breed match score</strong>. Higher is better for {breed.name}s.
          </p>
        </div>
      </div>
    </div>
  );
}
