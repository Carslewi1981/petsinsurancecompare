import { Breed, ConditionTag } from "./breeds";
import { Insurer } from "./insurers";

// Maps condition tags to keywords found in insurer feature strings
const TAG_FEATURE_KEYWORDS: Record<ConditionTag, string[]> = {
  hereditary:    ["Hereditary", "hereditary", "congenital", "breed-specific"],
  cancer:        ["Cancer", "cancer", "oncol"],
  cardiac:       ["cardiac", "heart", "Hydrotherapy"],
  orthopedic:    ["Surgery", "surgery", "hospitalization", "Prosthetics", "Hydrotherapy", "rehabilitation"],
  dental:        ["Dental", "dental"],
  respiratory:   ["Emergency", "specialist", "Specialist", "hospitalization"],
  dermatology:   ["illness", "Illness", "Accidents & illness"],
  ophthalmology: ["illness", "Illness", "Diagnostic", "diagnostic"],
  neurological:  ["Surgery", "surgery", "Emergency", "specialist"],
  behavioral:    ["Behavioral", "behavioral", "behavior"],
  unlimited:     ["Unlimited", "unlimited"],
};

const TAG_NOTCOVERED_KEYWORDS: Record<ConditionTag, string[]> = {
  hereditary:    [],
  cancer:        [],
  cardiac:       [],
  orthopedic:    [],
  dental:        ["Dental illness", "dental illness"],
  respiratory:   [],
  dermatology:   [],
  ophthalmology: [],
  neurological:  [],
  behavioral:    [],
  unlimited:     [],
};

function featuresCoverTag(insurer: Insurer, tag: ConditionTag): boolean {
  const keywords = TAG_FEATURE_KEYWORDS[tag] ?? [];
  const covered = insurer.features.some((f) =>
    keywords.some((kw) => f.includes(kw))
  );
  if (!covered) return false;

  // Check it's not explicitly excluded
  const excludeKws = TAG_NOTCOVERED_KEYWORDS[tag] ?? [];
  const excluded = insurer.notCovered.some((nc) =>
    excludeKws.some((kw) => nc.toLowerCase().includes(kw.toLowerCase()))
  );
  return !excluded;
}

export interface ConditionCoverage {
  conditionName: string;
  severity: "mild" | "moderate" | "severe";
  covered: boolean;
  partiallyExcluded: boolean;
}

export interface BreedMatchResult {
  score: number;        // 0–100
  grade: "A" | "B" | "C" | "D" | "F";
  label: string;
  conditions: ConditionCoverage[];
  coveredCount: number;
  totalSevere: number;
  coveredSevere: number;
  warnings: string[];
  highlights: string[];
}

export function scoreInsurerForBreed(insurer: Insurer, breed: Breed): BreedMatchResult {
  const conditions: ConditionCoverage[] = breed.conditions.map((bc) => {
    const covered = bc.tags.length === 0
      ? true // generic conditions — all insurers cover
      : bc.tags.every((tag) => featuresCoverTag(insurer, tag));

    // Check if dental is excluded but condition needs dental coverage
    const dentalExcluded = insurer.notCovered.some((nc) =>
      nc.toLowerCase().includes("dental illness") || nc.toLowerCase().includes("dental disease")
    );
    const needsDental = bc.tags.includes("dental");
    const partiallyExcluded = needsDental && dentalExcluded;

    return {
      conditionName: bc.name,
      severity: bc.severity,
      covered: covered && !partiallyExcluded,
      partiallyExcluded,
    };
  });

  const severe = conditions.filter((c) => c.severity === "severe");
  const coveredSevere = severe.filter((c) => c.covered).length;
  const coveredCount = conditions.filter((c) => c.covered).length;

  // Score: severe conditions weighted 3x, moderate 1.5x, mild 1x
  let weightedCovered = 0;
  let weightedTotal = 0;
  for (const c of conditions) {
    const w = c.severity === "severe" ? 3 : c.severity === "moderate" ? 1.5 : 1;
    weightedTotal += w;
    if (c.covered) weightedCovered += w;
  }

  // Bonus for unlimited coverage when breed needs it
  const breedNeedsUnlimited = breed.conditions.some((bc) => bc.tags.includes("unlimited"));
  const insurerUnlimited = insurer.maxAnnual.toLowerCase().includes("unlimited");
  const unlimitedBonus = breedNeedsUnlimited && insurerUnlimited ? 8 : 0;
  const unlimitedPenalty = breedNeedsUnlimited && !insurerUnlimited ? -12 : 0;

  const raw = weightedTotal > 0 ? (weightedCovered / weightedTotal) * 100 : 100;
  const score = Math.min(100, Math.max(0, Math.round(raw + unlimitedBonus + unlimitedPenalty)));

  const grade: BreedMatchResult["grade"] =
    score >= 88 ? "A" :
    score >= 75 ? "B" :
    score >= 60 ? "C" :
    score >= 45 ? "D" : "F";

  const label =
    grade === "A" ? "Excellent match" :
    grade === "B" ? "Good match" :
    grade === "C" ? "Moderate match" :
    grade === "D" ? "Poor match" : "Not recommended";

  // Warnings
  const warnings: string[] = [];
  if (breedNeedsUnlimited && !insurerUnlimited) {
    warnings.push(`${breed.name}s may need unlimited annual coverage for severe conditions.`);
  }
  const uncoveredSevere = severe.filter((c) => !c.covered);
  if (uncoveredSevere.length > 0) {
    warnings.push(`${uncoveredSevere.map((c) => c.conditionName).join(", ")} may not be fully covered.`);
  }

  // Highlights
  const highlights: string[] = [];
  if (coveredSevere === severe.length && severe.length > 0) {
    highlights.push("Covers all high-severity breed conditions");
  }
  if (insurerUnlimited && breedNeedsUnlimited) {
    highlights.push("Unlimited annual max — ideal for this breed");
  }
  const hereditary = breed.conditions.some((bc) => bc.tags.includes("hereditary"));
  if (hereditary && insurer.features.some((f) => f.toLowerCase().includes("hereditary"))) {
    highlights.push("Explicitly covers hereditary & congenital conditions");
  }
  if (breed.conditions.some((bc) => bc.tags.includes("cancer")) &&
      insurer.features.some((f) => f.toLowerCase().includes("cancer"))) {
    highlights.push("Cancer treatment included");
  }

  return {
    score, grade, label, conditions,
    coveredCount, totalSevere: severe.length, coveredSevere, warnings, highlights,
  };
}

export function getRiskLevelColor(level: string): string {
  switch (level) {
    case "low":       return "#16a34a";
    case "moderate":  return "#d97706";
    case "high":      return "#dc2626";
    case "very-high": return "#7c3aed";
    default:          return "#6b7280";
  }
}

export function getRiskLevelLabel(level: string): string {
  switch (level) {
    case "low":       return "Low Risk";
    case "moderate":  return "Moderate Risk";
    case "high":      return "High Risk";
    case "very-high": return "Very High Risk";
    default:          return "Unknown";
  }
}

export function getGradeColor(grade: string): string {
  switch (grade) {
    case "A": return "#16a34a";
    case "B": return "#0066cc";
    case "C": return "#d97706";
    case "D": return "#dc2626";
    case "F": return "#7c3aed";
    default:  return "#6b7280";
  }
}
