export interface VetProcedure {
  id: string;
  name: string;
  emoji: string;
  category: "emergency" | "surgery" | "chronic" | "cancer" | "dental" | "diagnostic";
  animals: ("dog" | "cat" | "all")[];
  lowCost: number;
  highCost: number;
  avgCost: number;
  description: string;
  urgency: "life-threatening" | "serious" | "routine";
  withInsuranceEstimate: string; // e.g. "10–30% of cost"
}

export const VET_PROCEDURES: VetProcedure[] = [
  {
    id: "emergency-visit",
    name: "Emergency Vet Visit",
    emoji: "🚨",
    category: "emergency",
    animals: ["all"],
    lowCost: 800, highCost: 2500, avgCost: 1500,
    description: "After-hours emergency clinic visit for acute illness or injury",
    urgency: "life-threatening",
    withInsuranceEstimate: "Pay deductible only",
  },
  {
    id: "acl-surgery",
    name: "ACL / CCL Repair (TPLO)",
    emoji: "🦴",
    category: "surgery",
    animals: ["dog"],
    lowCost: 3500, highCost: 7000, avgCost: 5000,
    description: "Torn cruciate ligament — the #1 orthopedic surgery for dogs",
    urgency: "serious",
    withInsuranceEstimate: "~$500–$1,000 out-of-pocket",
  },
  {
    id: "cancer-treatment",
    name: "Cancer Treatment (Chemo/Surgery)",
    emoji: "🎗️",
    category: "cancer",
    animals: ["all"],
    lowCost: 5000, highCost: 20000, avgCost: 10000,
    description: "Chemotherapy, radiation, or oncologic surgery depending on type",
    urgency: "life-threatening",
    withInsuranceEstimate: "~$1,000–$3,000 out-of-pocket",
  },
  {
    id: "bloat-gvd",
    name: "Bloat / GDV Emergency Surgery",
    emoji: "💫",
    category: "emergency",
    animals: ["dog"],
    lowCost: 3000, highCost: 7500, avgCost: 5000,
    description: "Life-threatening stomach torsion — must operate within hours",
    urgency: "life-threatening",
    withInsuranceEstimate: "~$500–$1,500 out-of-pocket",
  },
  {
    id: "ivdd-surgery",
    name: "Spinal (IVDD) Surgery",
    emoji: "🧠",
    category: "surgery",
    animals: ["dog"],
    lowCost: 3000, highCost: 8000, avgCost: 5500,
    description: "Intervertebral disc disease — common in Dachshunds, French Bulldogs",
    urgency: "life-threatening",
    withInsuranceEstimate: "~$500–$1,500 out-of-pocket",
  },
  {
    id: "hip-replacement",
    name: "Hip Replacement (THR)",
    emoji: "🦿",
    category: "surgery",
    animals: ["dog"],
    lowCost: 3500, highCost: 7000, avgCost: 5000,
    description: "Total hip replacement for severe hip dysplasia",
    urgency: "serious",
    withInsuranceEstimate: "~$500–$1,500 out-of-pocket",
  },
  {
    id: "heart-disease",
    name: "Heart Disease (Annual Management)",
    emoji: "❤️",
    category: "chronic",
    animals: ["all"],
    lowCost: 1500, highCost: 5000, avgCost: 3000,
    description: "Ongoing medication, echocardiograms, and specialist visits per year",
    urgency: "serious",
    withInsuranceEstimate: "~$300–$600 out-of-pocket/yr",
  },
  {
    id: "hcm-cat",
    name: "HCM Management (Cats)",
    emoji: "🐱",
    category: "chronic",
    animals: ["cat"],
    lowCost: 1200, highCost: 4000, avgCost: 2500,
    description: "Hypertrophic cardiomyopathy — affects 1 in 7 cats",
    urgency: "serious",
    withInsuranceEstimate: "~$200–$500 out-of-pocket/yr",
  },
  {
    id: "diabetes",
    name: "Diabetes Management (Annual)",
    emoji: "💉",
    category: "chronic",
    animals: ["all"],
    lowCost: 1200, highCost: 4000, avgCost: 2200,
    description: "Daily insulin, glucose monitoring, and quarterly vet visits",
    urgency: "serious",
    withInsuranceEstimate: "~$200–$500 out-of-pocket/yr",
  },
  {
    id: "mri-ct",
    name: "MRI or CT Scan",
    emoji: "🔬",
    category: "diagnostic",
    animals: ["all"],
    lowCost: 1500, highCost: 4000, avgCost: 2500,
    description: "Advanced imaging — required for neurological, cancer, or surgical workup",
    urgency: "serious",
    withInsuranceEstimate: "~$300–$700 out-of-pocket",
  },
  {
    id: "swallowed-object",
    name: "Swallowed Object Surgery",
    emoji: "😮",
    category: "emergency",
    animals: ["all"],
    lowCost: 1500, highCost: 5000, avgCost: 3000,
    description: "Foreign body removal — sock, toy, bone, corn cob. Very common in dogs",
    urgency: "life-threatening",
    withInsuranceEstimate: "~$300–$800 out-of-pocket",
  },
  {
    id: "allergy-management",
    name: "Chronic Allergy Treatment (Annual)",
    emoji: "🤧",
    category: "chronic",
    animals: ["all"],
    lowCost: 1000, highCost: 3500, avgCost: 2000,
    description: "Immunotherapy, Apoquel/Cytopoint injections, dermatology visits per year",
    urgency: "routine",
    withInsuranceEstimate: "~$200–$500 out-of-pocket/yr",
  },
  {
    id: "eye-surgery",
    name: "Eye Surgery (cataract / glaucoma)",
    emoji: "👁️",
    category: "surgery",
    animals: ["all"],
    lowCost: 1500, highCost: 5000, avgCost: 3000,
    description: "Specialist ophthalmology surgery — often bilateral",
    urgency: "serious",
    withInsuranceEstimate: "~$300–$800 out-of-pocket",
  },
  {
    id: "broken-bone",
    name: "Broken Bone / Fracture Repair",
    emoji: "🦷",
    category: "surgery",
    animals: ["all"],
    lowCost: 1500, highCost: 5000, avgCost: 3000,
    description: "Surgical repair with plates, pins, or cast depending on severity",
    urgency: "serious",
    withInsuranceEstimate: "~$300–$800 out-of-pocket",
  },
  {
    id: "dental-surgery",
    name: "Dental Surgery (extractions)",
    emoji: "🦷",
    category: "dental",
    animals: ["all"],
    lowCost: 500, highCost: 2000, avgCost: 1000,
    description: "Anesthesia + multiple extractions — skipping dental care leads to organ damage",
    urgency: "routine",
    withInsuranceEstimate: "~$100–$300 out-of-pocket",
  },
];

// State cost multipliers for vet costs (higher than insurance price due to clinic overhead)
export const STATE_VET_MULTIPLIERS: Record<string, number> = {
  AK: 1.40, AL: 0.82, AR: 0.80, AZ: 1.05, CA: 1.55,
  CO: 1.18, CT: 1.40, DC: 1.60, DE: 1.15, FL: 1.10,
  GA: 0.92, HI: 1.65, IA: 0.82, ID: 0.88, IL: 1.12,
  IN: 0.86, KS: 0.84, KY: 0.84, LA: 0.90, MA: 1.45,
  MD: 1.28, ME: 1.05, MI: 0.92, MN: 1.02, MO: 0.88,
  MS: 0.80, MT: 0.90, NC: 0.92, ND: 0.84, NE: 0.86,
  NH: 1.20, NJ: 1.38, NM: 0.90, NV: 1.08, NY: 1.50,
  OH: 0.90, OK: 0.84, OR: 1.18, PA: 1.02, RI: 1.18,
  SC: 0.90, SD: 0.84, TN: 0.88, TX: 1.05, UT: 1.02,
  VA: 1.12, VT: 1.05, WA: 1.30, WI: 0.92, WV: 0.82,
  WY: 0.88,
};

export function getLocalizedCost(procedure: VetProcedure, stateCode: string): {
  low: number; high: number; avg: number;
} {
  const mult = stateCode ? (STATE_VET_MULTIPLIERS[stateCode] ?? 1.0) : 1.0;
  return {
    low: Math.round(procedure.lowCost * mult / 50) * 50,
    high: Math.round(procedure.highCost * mult / 50) * 50,
    avg: Math.round(procedure.avgCost * mult / 50) * 50,
  };
}

export const URGENCY_CONFIG = {
  "life-threatening": { label: "Life-Threatening", color: "#dc2626", bg: "#fef2f2" },
  "serious":          { label: "Serious",          color: "#d97706", bg: "#fffbeb" },
  "routine":          { label: "Routine",           color: "#0066cc", bg: "#eff6ff" },
} as const;
