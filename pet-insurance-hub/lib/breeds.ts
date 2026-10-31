export type SizeCategory = "small" | "medium" | "large" | "giant";
export type RiskLevel = "low" | "moderate" | "high" | "very-high";
export type ConditionSeverity = "mild" | "moderate" | "severe";

export type ConditionTag =
  | "hereditary"  // hereditary & congenital
  | "cancer"      // cancer / oncology
  | "cardiac"     // heart disease
  | "orthopedic"  // hip/joint/spine
  | "dental"      // dental disease
  | "respiratory" // breathing / airway
  | "dermatology" // skin / allergies
  | "ophthalmology" // eye conditions
  | "neurological"  // brain / nerve
  | "behavioral"    // anxiety / OCD
  | "unlimited";    // needs unlimited annual max

export interface BreedCondition {
  name: string;
  severity: ConditionSeverity;
  tags: ConditionTag[];
}

export interface Breed {
  id: string;
  name: string;
  animal: "dog" | "cat";
  sizeCategory: SizeCategory | null;
  riskLevel: RiskLevel;
  riskScore: number; // 1–100
  conditions: BreedCondition[];
  avgLifespan: string;
  priceMultiplier: number;
  blurb: string;
}

export const DOG_BREEDS: Breed[] = [
  {
    id: "labrador-retriever", name: "Labrador Retriever", animal: "dog",
    sizeCategory: "large", riskLevel: "moderate", riskScore: 42,
    avgLifespan: "10–12 yrs", priceMultiplier: 1.15,
    blurb: "Generally healthy but prone to joint issues and obesity-related problems.",
    conditions: [
      { name: "Hip & Elbow Dysplasia", severity: "severe", tags: ["hereditary", "orthopedic"] },
      { name: "Obesity", severity: "moderate", tags: ["hereditary"] },
      { name: "Exercise-Induced Collapse (EIC)", severity: "moderate", tags: ["hereditary", "neurological"] },
      { name: "Progressive Retinal Atrophy", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
    ],
  },
  {
    id: "golden-retriever", name: "Golden Retriever", animal: "dog",
    sizeCategory: "large", riskLevel: "high", riskScore: 68,
    avgLifespan: "10–12 yrs", priceMultiplier: 1.35,
    blurb: "High cancer rates — nearly 60% of Goldens develop cancer. Hereditary coverage is critical.",
    conditions: [
      { name: "Cancer (lymphoma, hemangiosarcoma)", severity: "severe", tags: ["cancer", "unlimited"] },
      { name: "Hip Dysplasia", severity: "severe", tags: ["hereditary", "orthopedic"] },
      { name: "Heart Disease (SAS)", severity: "moderate", tags: ["hereditary", "cardiac"] },
      { name: "Skin Allergies", severity: "moderate", tags: ["dermatology"] },
      { name: "Hypothyroidism", severity: "mild", tags: ["hereditary"] },
    ],
  },
  {
    id: "french-bulldog", name: "French Bulldog", animal: "dog",
    sizeCategory: "small", riskLevel: "very-high", riskScore: 88,
    avgLifespan: "10–12 yrs", priceMultiplier: 1.75,
    blurb: "Brachycephalic breed with extensive structural health problems. One of the most expensive breeds to insure.",
    conditions: [
      { name: "Brachycephalic Airway Syndrome (BOAS)", severity: "severe", tags: ["hereditary", "respiratory", "unlimited"] },
      { name: "Intervertebral Disc Disease (IVDD)", severity: "severe", tags: ["hereditary", "orthopedic", "neurological"] },
      { name: "Skin Fold Dermatitis", severity: "moderate", tags: ["hereditary", "dermatology"] },
      { name: "Eye Conditions (cherry eye, entropion)", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
      { name: "Hip Dysplasia", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Allergies", severity: "moderate", tags: ["dermatology"] },
    ],
  },
  {
    id: "german-shepherd", name: "German Shepherd", animal: "dog",
    sizeCategory: "large", riskLevel: "high", riskScore: 65,
    avgLifespan: "9–13 yrs", priceMultiplier: 1.30,
    blurb: "Susceptible to several serious hereditary conditions including degenerative myelopathy.",
    conditions: [
      { name: "Hip & Elbow Dysplasia", severity: "severe", tags: ["hereditary", "orthopedic"] },
      { name: "Degenerative Myelopathy (DM)", severity: "severe", tags: ["hereditary", "neurological"] },
      { name: "Bloat (GDV)", severity: "severe", tags: ["unlimited"] },
      { name: "Exocrine Pancreatic Insufficiency (EPI)", severity: "moderate", tags: ["hereditary"] },
      { name: "Perianal Fistulas", severity: "moderate", tags: ["hereditary"] },
    ],
  },
  {
    id: "bulldog", name: "English Bulldog", animal: "dog",
    sizeCategory: "medium", riskLevel: "very-high", riskScore: 90,
    avgLifespan: "8–10 yrs", priceMultiplier: 1.80,
    blurb: "Highest health insurance cost of any breed. Multiple severe structural conditions require ongoing care.",
    conditions: [
      { name: "Brachycephalic Syndrome", severity: "severe", tags: ["hereditary", "respiratory", "unlimited"] },
      { name: "Hip Dysplasia", severity: "severe", tags: ["hereditary", "orthopedic"] },
      { name: "Cherry Eye & Entropion", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
      { name: "Skin Fold Infections", severity: "moderate", tags: ["hereditary", "dermatology"] },
      { name: "Interdigital Cysts", severity: "mild", tags: ["dermatology"] },
      { name: "Heart Disease", severity: "moderate", tags: ["cardiac"] },
    ],
  },
  {
    id: "poodle", name: "Poodle (Standard)", animal: "dog",
    sizeCategory: "medium", riskLevel: "moderate", riskScore: 38,
    avgLifespan: "12–15 yrs", priceMultiplier: 1.05,
    blurb: "One of the healthiest purebreds. Long-lived with manageable hereditary risks.",
    conditions: [
      { name: "Hip Dysplasia", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Progressive Retinal Atrophy", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
      { name: "Bloat (GDV)", severity: "moderate", tags: ["unlimited"] },
      { name: "Sebaceous Adenitis", severity: "mild", tags: ["hereditary", "dermatology"] },
    ],
  },
  {
    id: "beagle", name: "Beagle", animal: "dog",
    sizeCategory: "small", riskLevel: "low", riskScore: 28,
    avgLifespan: "12–15 yrs", priceMultiplier: 0.92,
    blurb: "Hardy and generally healthy. Main concerns are ear infections and weight management.",
    conditions: [
      { name: "Ear Infections (chronic)", severity: "mild", tags: ["hereditary"] },
      { name: "Hypothyroidism", severity: "mild", tags: ["hereditary"] },
      { name: "Intervertebral Disc Disease", severity: "moderate", tags: ["orthopedic"] },
    ],
  },
  {
    id: "yorkshire-terrier", name: "Yorkshire Terrier", animal: "dog",
    sizeCategory: "small", riskLevel: "moderate", riskScore: 45,
    avgLifespan: "13–16 yrs", priceMultiplier: 1.10,
    blurb: "Small but with notable hereditary conditions, including a serious liver condition.",
    conditions: [
      { name: "Luxating Patella", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Portosystemic Shunt (liver)", severity: "severe", tags: ["hereditary", "unlimited"] },
      { name: "Tracheal Collapse", severity: "moderate", tags: ["hereditary", "respiratory"] },
      { name: "Dental Disease", severity: "mild", tags: ["dental"] },
      { name: "Progressive Retinal Atrophy", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
    ],
  },
  {
    id: "boxer", name: "Boxer", animal: "dog",
    sizeCategory: "large", riskLevel: "high", riskScore: 70,
    avgLifespan: "10–12 yrs", priceMultiplier: 1.40,
    blurb: "High cancer rates and significant heart disease risk make Boxers expensive to insure.",
    conditions: [
      { name: "Cancer (mast cell, brain, lymphoma)", severity: "severe", tags: ["cancer", "unlimited"] },
      { name: "Dilated Cardiomyopathy (DCM)", severity: "severe", tags: ["hereditary", "cardiac", "unlimited"] },
      { name: "Hip Dysplasia", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Brachycephalic Syndrome (mild)", severity: "mild", tags: ["respiratory"] },
      { name: "Thyroid Issues", severity: "mild", tags: ["hereditary"] },
    ],
  },
  {
    id: "dachshund", name: "Dachshund", animal: "dog",
    sizeCategory: "small", riskLevel: "high", riskScore: 65,
    avgLifespan: "12–16 yrs", priceMultiplier: 1.25,
    blurb: "Their long spine makes IVDD extremely common — spinal surgery can cost $5,000–$10,000.",
    conditions: [
      { name: "Intervertebral Disc Disease (IVDD)", severity: "severe", tags: ["hereditary", "orthopedic", "neurological", "unlimited"] },
      { name: "Obesity", severity: "moderate", tags: ["hereditary"] },
      { name: "Dental Disease", severity: "moderate", tags: ["dental"] },
      { name: "Epilepsy", severity: "moderate", tags: ["hereditary", "neurological"] },
    ],
  },
  {
    id: "siberian-husky", name: "Siberian Husky", animal: "dog",
    sizeCategory: "medium", riskLevel: "low", riskScore: 30,
    avgLifespan: "12–14 yrs", priceMultiplier: 0.95,
    blurb: "Relatively healthy working breed. Main concerns are eye conditions and hip issues.",
    conditions: [
      { name: "Hip Dysplasia", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Progressive Retinal Atrophy (PRA)", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
      { name: "Cataracts (hereditary juvenile)", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
    ],
  },
  {
    id: "chihuahua", name: "Chihuahua", animal: "dog",
    sizeCategory: "small", riskLevel: "moderate", riskScore: 40,
    avgLifespan: "14–16 yrs", priceMultiplier: 0.98,
    blurb: "Long-lived but prone to dental disease and heart issues, which worsen with age.",
    conditions: [
      { name: "Luxating Patella", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Dental Disease", severity: "severe", tags: ["dental"] },
      { name: "Mitral Valve Disease", severity: "moderate", tags: ["hereditary", "cardiac"] },
      { name: "Hypoglycemia", severity: "mild", tags: ["hereditary"] },
      { name: "Tracheal Collapse", severity: "moderate", tags: ["respiratory"] },
    ],
  },
  {
    id: "cavalier-king-charles", name: "Cavalier King Charles Spaniel", animal: "dog",
    sizeCategory: "small", riskLevel: "very-high", riskScore: 92,
    avgLifespan: "9–14 yrs", priceMultiplier: 1.85,
    blurb: "Nearly all Cavaliers develop heart disease by age 10. Syringomyelia causes chronic pain. Critical to have unlimited coverage.",
    conditions: [
      { name: "Mitral Valve Disease (MVD)", severity: "severe", tags: ["hereditary", "cardiac", "unlimited"] },
      { name: "Syringomyelia / Chiari Malformation", severity: "severe", tags: ["hereditary", "neurological", "unlimited"] },
      { name: "Hip Dysplasia", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Eye Conditions", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
      { name: "Episodic Falling", severity: "moderate", tags: ["hereditary", "neurological"] },
    ],
  },
  {
    id: "doberman", name: "Doberman Pinscher", animal: "dog",
    sizeCategory: "large", riskLevel: "high", riskScore: 72,
    avgLifespan: "10–13 yrs", priceMultiplier: 1.45,
    blurb: "Serious heart and cancer risks. DCM can require expensive ongoing cardiac medication.",
    conditions: [
      { name: "Dilated Cardiomyopathy (DCM)", severity: "severe", tags: ["hereditary", "cardiac", "unlimited"] },
      { name: "Wobbler Syndrome (cervical spondylomyelopathy)", severity: "severe", tags: ["hereditary", "neurological"] },
      { name: "Von Willebrand Disease", severity: "moderate", tags: ["hereditary"] },
      { name: "Cancer", severity: "moderate", tags: ["cancer"] },
      { name: "Hip Dysplasia", severity: "moderate", tags: ["hereditary", "orthopedic"] },
    ],
  },
  {
    id: "great-dane", name: "Great Dane", animal: "dog",
    sizeCategory: "giant", riskLevel: "very-high", riskScore: 85,
    avgLifespan: "7–10 yrs", priceMultiplier: 1.70,
    blurb: "Shortest lifespan of large breeds. Bloat is life-threatening and requires emergency surgery.",
    conditions: [
      { name: "Bloat / GDV", severity: "severe", tags: ["unlimited"] },
      { name: "Dilated Cardiomyopathy", severity: "severe", tags: ["hereditary", "cardiac", "unlimited"] },
      { name: "Hip Dysplasia", severity: "severe", tags: ["hereditary", "orthopedic"] },
      { name: "Osteosarcoma (bone cancer)", severity: "severe", tags: ["cancer", "unlimited"] },
      { name: "Wobbler Syndrome", severity: "moderate", tags: ["hereditary", "neurological"] },
    ],
  },
  {
    id: "rottweiler", name: "Rottweiler", animal: "dog",
    sizeCategory: "large", riskLevel: "high", riskScore: 68,
    avgLifespan: "8–10 yrs", priceMultiplier: 1.40,
    blurb: "High cancer risk and serious joint problems make Rottweilers costly to insure.",
    conditions: [
      { name: "Hip & Elbow Dysplasia", severity: "severe", tags: ["hereditary", "orthopedic"] },
      { name: "Osteosarcoma (bone cancer)", severity: "severe", tags: ["cancer", "unlimited"] },
      { name: "Bloat / GDV", severity: "severe", tags: ["unlimited"] },
      { name: "Heart Disease", severity: "moderate", tags: ["hereditary", "cardiac"] },
    ],
  },
  {
    id: "pug", name: "Pug", animal: "dog",
    sizeCategory: "small", riskLevel: "very-high", riskScore: 87,
    avgLifespan: "12–15 yrs", priceMultiplier: 1.70,
    blurb: "Extreme brachycephalic features cause lifelong respiratory and eye problems. High vet costs from puppyhood.",
    conditions: [
      { name: "Brachycephalic Airway Syndrome", severity: "severe", tags: ["hereditary", "respiratory", "unlimited"] },
      { name: "Eye Ulcers & Proptosis", severity: "severe", tags: ["hereditary", "ophthalmology"] },
      { name: "Pug Dog Encephalitis (PDE)", severity: "severe", tags: ["hereditary", "neurological", "unlimited"] },
      { name: "Hip Dysplasia", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Skin Fold Infections", severity: "moderate", tags: ["dermatology"] },
    ],
  },
  {
    id: "shih-tzu", name: "Shih Tzu", animal: "dog",
    sizeCategory: "small", riskLevel: "moderate", riskScore: 48,
    avgLifespan: "10–18 yrs", priceMultiplier: 1.12,
    blurb: "Long-lived but needs regular dental care and monitoring for eye and breathing issues.",
    conditions: [
      { name: "Dental Disease", severity: "severe", tags: ["dental"] },
      { name: "Eye Conditions (proptosis, corneal ulcers)", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
      { name: "Brachycephalic Syndrome (mild)", severity: "mild", tags: ["respiratory"] },
      { name: "Hypothyroidism", severity: "mild", tags: ["hereditary"] },
    ],
  },
  {
    id: "border-collie", name: "Border Collie", animal: "dog",
    sizeCategory: "medium", riskLevel: "low", riskScore: 25,
    avgLifespan: "12–15 yrs", priceMultiplier: 0.90,
    blurb: "One of the healthiest breeds. Primarily genetic eye conditions to watch.",
    conditions: [
      { name: "Collie Eye Anomaly (CEA)", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
      { name: "Hip Dysplasia", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "MDR1 Gene Mutation (drug sensitivity)", severity: "moderate", tags: ["hereditary"] },
      { name: "Epilepsy", severity: "moderate", tags: ["hereditary", "neurological"] },
    ],
  },
  {
    id: "australian-shepherd", name: "Australian Shepherd", animal: "dog",
    sizeCategory: "medium", riskLevel: "low", riskScore: 28,
    avgLifespan: "13–15 yrs", priceMultiplier: 0.92,
    blurb: "Generally healthy. Drug sensitivity from MDR1 mutation is the main concern.",
    conditions: [
      { name: "MDR1 Gene Mutation", severity: "moderate", tags: ["hereditary"] },
      { name: "Hip Dysplasia", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Epilepsy", severity: "moderate", tags: ["hereditary", "neurological"] },
      { name: "Collie Eye Anomaly", severity: "mild", tags: ["hereditary", "ophthalmology"] },
    ],
  },
  {
    id: "cocker-spaniel", name: "Cocker Spaniel", animal: "dog",
    sizeCategory: "medium", riskLevel: "moderate", riskScore: 50,
    avgLifespan: "12–15 yrs", priceMultiplier: 1.15,
    blurb: "Prone to ear infections, eye conditions, and hip problems — all manageable with coverage.",
    conditions: [
      { name: "Chronic Ear Infections", severity: "moderate", tags: ["hereditary"] },
      { name: "Hip Dysplasia", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Eye Conditions (PRA, glaucoma)", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
      { name: "Autoimmune Hemolytic Anemia (IMHA)", severity: "severe", tags: ["hereditary", "unlimited"] },
      { name: "Seborrhea (skin)", severity: "mild", tags: ["dermatology"] },
    ],
  },
  {
    id: "maltese", name: "Maltese", animal: "dog",
    sizeCategory: "small", riskLevel: "low", riskScore: 30,
    avgLifespan: "12–15 yrs", priceMultiplier: 0.95,
    blurb: "Relatively hardy small breed. Dental disease and luxating patellas are the main concerns.",
    conditions: [
      { name: "Dental Disease", severity: "moderate", tags: ["dental"] },
      { name: "Luxating Patella", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Portosystemic Shunt (liver)", severity: "moderate", tags: ["hereditary", "unlimited"] },
    ],
  },
  {
    id: "mixed-breed", name: "Mixed Breed / Mutt", animal: "dog",
    sizeCategory: "medium", riskLevel: "low", riskScore: 20,
    avgLifespan: "13–15 yrs", priceMultiplier: 0.85,
    blurb: "Hybrid vigor makes mixed breeds statistically healthier than most purebreds. Lowest average vet costs.",
    conditions: [
      { name: "Standard accident & illness risks", severity: "mild", tags: [] },
    ],
  },
  {
    id: "bernese-mountain-dog", name: "Bernese Mountain Dog", animal: "dog",
    sizeCategory: "large", riskLevel: "very-high", riskScore: 80,
    avgLifespan: "6–8 yrs", priceMultiplier: 1.65,
    blurb: "Tragically short lifespan dominated by cancer. Nearly half die of cancer before age 8.",
    conditions: [
      { name: "Histiocytic Sarcoma (cancer)", severity: "severe", tags: ["cancer", "unlimited"] },
      { name: "Hip & Elbow Dysplasia", severity: "severe", tags: ["hereditary", "orthopedic"] },
      { name: "Bloat / GDV", severity: "severe", tags: ["unlimited"] },
      { name: "Progressive Retinal Atrophy", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
    ],
  },
  {
    id: "irish-setter", name: "Irish Setter", animal: "dog",
    sizeCategory: "large", riskLevel: "moderate", riskScore: 45,
    avgLifespan: "11–15 yrs", priceMultiplier: 1.10,
    blurb: "Active breed with manageable health risks. Hip dysplasia and bloat are the main concerns.",
    conditions: [
      { name: "Hip Dysplasia", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Bloat / GDV", severity: "moderate", tags: ["unlimited"] },
      { name: "Progressive Retinal Atrophy", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
      { name: "Hypothyroidism", severity: "mild", tags: ["hereditary"] },
    ],
  },
  {
    id: "weimaraner", name: "Weimaraner", animal: "dog",
    sizeCategory: "large", riskLevel: "moderate", riskScore: 48,
    avgLifespan: "11–14 yrs", priceMultiplier: 1.15,
    conditions: [
      { name: "Hip Dysplasia", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Bloat / GDV", severity: "severe", tags: ["unlimited"] },
      { name: "Hypothyroidism", severity: "mild", tags: ["hereditary"] },
    ],
    blurb: "Deep-chested breed at risk of bloat. Hip dysplasia common in the breed.",
  },
];

export const CAT_BREEDS: Breed[] = [
  {
    id: "persian", name: "Persian", animal: "cat",
    sizeCategory: null, riskLevel: "high", riskScore: 70,
    avgLifespan: "12–17 yrs", priceMultiplier: 1.45,
    blurb: "Flat faces cause chronic respiratory and dental issues. Polycystic kidney disease (PKD) is common.",
    conditions: [
      { name: "Polycystic Kidney Disease (PKD)", severity: "severe", tags: ["hereditary", "unlimited"] },
      { name: "Brachycephalic Airway Syndrome", severity: "moderate", tags: ["hereditary", "respiratory"] },
      { name: "Dental Malocclusion", severity: "moderate", tags: ["dental"] },
      { name: "Progressive Retinal Atrophy (PRA)", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
    ],
  },
  {
    id: "maine-coon", name: "Maine Coon", animal: "cat",
    sizeCategory: null, riskLevel: "high", riskScore: 65,
    avgLifespan: "12–15 yrs", priceMultiplier: 1.35,
    blurb: "Large breed prone to serious heart and joint conditions. HCM testing is recommended.",
    conditions: [
      { name: "Hypertrophic Cardiomyopathy (HCM)", severity: "severe", tags: ["hereditary", "cardiac", "unlimited"] },
      { name: "Hip Dysplasia", severity: "moderate", tags: ["hereditary", "orthopedic"] },
      { name: "Spinal Muscular Atrophy (SMA)", severity: "moderate", tags: ["hereditary", "neurological"] },
      { name: "Polycystic Kidney Disease", severity: "moderate", tags: ["hereditary"] },
    ],
  },
  {
    id: "siamese", name: "Siamese", animal: "cat",
    sizeCategory: null, riskLevel: "moderate", riskScore: 45,
    avgLifespan: "15–20 yrs", priceMultiplier: 1.10,
    blurb: "Long-lived but susceptible to respiratory conditions and certain cancers.",
    conditions: [
      { name: "Mediastinal Lymphoma", severity: "severe", tags: ["cancer", "unlimited"] },
      { name: "Progressive Retinal Atrophy", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
      { name: "Amyloidosis (liver/kidneys)", severity: "moderate", tags: ["hereditary"] },
      { name: "Asthma", severity: "moderate", tags: ["respiratory"] },
    ],
  },
  {
    id: "ragdoll", name: "Ragdoll", animal: "cat",
    sizeCategory: null, riskLevel: "high", riskScore: 60,
    avgLifespan: "12–17 yrs", priceMultiplier: 1.30,
    blurb: "Calm breed but significant heart disease risk. Requires unlimited coverage for HCM management.",
    conditions: [
      { name: "Hypertrophic Cardiomyopathy (HCM)", severity: "severe", tags: ["hereditary", "cardiac", "unlimited"] },
      { name: "Feline Infectious Peritonitis (FIP) susceptibility", severity: "moderate", tags: [] },
      { name: "Bladder Stones", severity: "moderate", tags: ["hereditary"] },
    ],
  },
  {
    id: "bengal", name: "Bengal", animal: "cat",
    sizeCategory: null, riskLevel: "moderate", riskScore: 42,
    avgLifespan: "12–16 yrs", priceMultiplier: 1.15,
    blurb: "Active and generally healthy, but genetic conditions include PRA and heart disease.",
    conditions: [
      { name: "Progressive Retinal Atrophy (PRA-b)", severity: "severe", tags: ["hereditary", "ophthalmology"] },
      { name: "Hypertrophic Cardiomyopathy (HCM)", severity: "moderate", tags: ["hereditary", "cardiac"] },
      { name: "Bengal Progressive Retinal Atrophy", severity: "moderate", tags: ["hereditary", "ophthalmology"] },
    ],
  },
  {
    id: "british-shorthair", name: "British Shorthair", animal: "cat",
    sizeCategory: null, riskLevel: "moderate", riskScore: 40,
    avgLifespan: "12–20 yrs", priceMultiplier: 1.10,
    blurb: "Stocky breed prone to obesity and heart disease. Generally robust with good longevity.",
    conditions: [
      { name: "Hypertrophic Cardiomyopathy (HCM)", severity: "moderate", tags: ["hereditary", "cardiac"] },
      { name: "Obesity", severity: "moderate", tags: [] },
      { name: "Polycystic Kidney Disease", severity: "moderate", tags: ["hereditary"] },
    ],
  },
  {
    id: "scottish-fold", name: "Scottish Fold", animal: "cat",
    sizeCategory: null, riskLevel: "very-high", riskScore: 85,
    avgLifespan: "11–14 yrs", priceMultiplier: 1.65,
    blurb: "The folded ear gene causes osteochondrodysplasia — a painful systemic bone and joint disease affecting all folds.",
    conditions: [
      { name: "Osteochondrodysplasia (OCD)", severity: "severe", tags: ["hereditary", "orthopedic", "unlimited"] },
      { name: "Hypertrophic Cardiomyopathy (HCM)", severity: "moderate", tags: ["hereditary", "cardiac"] },
      { name: "Polycystic Kidney Disease", severity: "moderate", tags: ["hereditary"] },
    ],
  },
  {
    id: "sphynx", name: "Sphynx", animal: "cat",
    sizeCategory: null, riskLevel: "high", riskScore: 68,
    avgLifespan: "8–14 yrs", priceMultiplier: 1.40,
    blurb: "Hairless breed with significant heart disease and skin condition risks. Ongoing care is expensive.",
    conditions: [
      { name: "Hypertrophic Cardiomyopathy (HCM)", severity: "severe", tags: ["hereditary", "cardiac", "unlimited"] },
      { name: "Hereditary Myopathy (HCM-related)", severity: "moderate", tags: ["hereditary"] },
      { name: "Skin Conditions (sunburn, dermatitis)", severity: "moderate", tags: ["dermatology"] },
      { name: "Dental Disease", severity: "moderate", tags: ["dental"] },
    ],
  },
  {
    id: "norwegian-forest-cat", name: "Norwegian Forest Cat", animal: "cat",
    sizeCategory: null, riskLevel: "moderate", riskScore: 45,
    avgLifespan: "14–16 yrs", priceMultiplier: 1.12,
    blurb: "Hardy breed with notable heart disease risk and a rare glycogen storage disease.",
    conditions: [
      { name: "Hypertrophic Cardiomyopathy (HCM)", severity: "moderate", tags: ["hereditary", "cardiac"] },
      { name: "Glycogen Storage Disease IV (GSD IV)", severity: "severe", tags: ["hereditary", "unlimited"] },
      { name: "Hip Dysplasia", severity: "mild", tags: ["orthopedic"] },
    ],
  },
  {
    id: "domestic-shorthair", name: "Domestic Shorthair (mixed)", animal: "cat",
    sizeCategory: null, riskLevel: "low", riskScore: 18,
    avgLifespan: "15–20 yrs", priceMultiplier: 0.82,
    blurb: "Mixed breed cats have the lowest health risk of any cat. Excellent longevity and low vet costs.",
    conditions: [
      { name: "Standard illness risks (UTI, diabetes, dental)", severity: "mild", tags: [] },
    ],
  },
  {
    id: "domestic-longhair", name: "Domestic Longhair (mixed)", animal: "cat",
    sizeCategory: null, riskLevel: "low", riskScore: 20,
    avgLifespan: "14–18 yrs", priceMultiplier: 0.84,
    blurb: "Healthy mixed-breed cat. Hairballs and dental disease are the primary concerns.",
    conditions: [
      { name: "Dental Disease", severity: "mild", tags: ["dental"] },
      { name: "Hairball / GI issues", severity: "mild", tags: [] },
    ],
  },
  {
    id: "abyssinian", name: "Abyssinian", animal: "cat",
    sizeCategory: null, riskLevel: "moderate", riskScore: 48,
    avgLifespan: "14–15 yrs", priceMultiplier: 1.15,
    blurb: "Active breed with progressive blindness risk. Kidney disease emerges in middle age.",
    conditions: [
      { name: "Progressive Retinal Atrophy (rdAc-PRA)", severity: "severe", tags: ["hereditary", "ophthalmology"] },
      { name: "Renal Amyloidosis", severity: "moderate", tags: ["hereditary"] },
      { name: "Pyruvate Kinase Deficiency (PK Deficiency)", severity: "moderate", tags: ["hereditary"] },
    ],
  },
  {
    id: "burmese", name: "Burmese", animal: "cat",
    sizeCategory: null, riskLevel: "moderate", riskScore: 42,
    avgLifespan: "16–18 yrs", priceMultiplier: 1.10,
    blurb: "Long-lived but certain bloodlines have head defect mutations. Diabetes risk in older cats.",
    conditions: [
      { name: "Head Defect (Burmese orofacial pain syndrome)", severity: "moderate", tags: ["hereditary", "neurological"] },
      { name: "Diabetes Mellitus", severity: "moderate", tags: ["hereditary"] },
      { name: "Feline Orofacial Pain Syndrome", severity: "moderate", tags: ["hereditary"] },
    ],
  },
];

export const ALL_BREEDS: Breed[] = [...DOG_BREEDS, ...CAT_BREEDS];

export function getBreedById(id: string): Breed | undefined {
  return ALL_BREEDS.find((b) => b.id === id);
}

export function getBreedsByAnimal(animal: "dog" | "cat"): Breed[] {
  return ALL_BREEDS.filter((b) => b.animal === animal);
}
