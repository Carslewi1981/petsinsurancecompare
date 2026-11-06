import { PetProfile } from "./store";

// Age multipliers — older pets cost more to insure
const AGE_MULTIPLIERS: Record<string, number> = {
  puppy:    0.80,  // 0–1 year
  young:    1.00,  // 1–3 years
  adult:    1.20,  // 3–7 years
  senior:   1.55,  // 7–10 years
  "senior+": 1.90, // 10+ years
};

// Breed/size multipliers for dogs
const DOG_BREED_MULTIPLIERS: Record<string, number> = {
  any:    1.00,
  small:  0.88,  // under 20 lbs
  medium: 1.00,  // 20–50 lbs
  large:  1.22,  // 50–90 lbs
  giant:  1.45,  // 90+ lbs
};

// Breed multipliers for cats
const CAT_BREED_MULTIPLIERS: Record<string, number> = {
  any:       1.00,
  domestic:  0.95,
  purebred:  1.20,
};

// US state cost-of-living adjusters
const STATE_MULTIPLIERS: Record<string, number> = {
  AK: 1.30, AL: 0.90, AR: 0.88, AZ: 1.05, CA: 1.40,
  CO: 1.10, CT: 1.30, DC: 1.45, DE: 1.10, FL: 1.10,
  GA: 0.95, HI: 1.50, IA: 0.88, ID: 0.92, IL: 1.10,
  IN: 0.90, KS: 0.88, KY: 0.88, LA: 0.92, MA: 1.35,
  MD: 1.20, ME: 1.05, MI: 0.95, MN: 1.00, MO: 0.90,
  MS: 0.85, MT: 0.92, NC: 0.95, ND: 0.88, NE: 0.90,
  NH: 1.15, NJ: 1.30, NM: 0.92, NV: 1.05, NY: 1.40,
  OH: 0.92, OK: 0.88, OR: 1.15, PA: 1.00, RI: 1.15,
  SC: 0.92, SD: 0.88, TN: 0.90, TX: 1.05, UT: 1.00,
  VA: 1.10, VT: 1.05, WA: 1.25, WI: 0.95, WV: 0.88,
  WY: 0.90,
};

export function getPriceMultiplier(profile: PetProfile, animal: string): number {
  const ageM = AGE_MULTIPLIERS[profile.age] ?? 1.0;

  let breedM = 1.0;
  if (animal === "dog") {
    breedM = DOG_BREED_MULTIPLIERS[profile.breed] ?? 1.0;
  } else if (animal === "cat") {
    breedM = CAT_BREED_MULTIPLIERS[profile.breed] ?? 1.0;
  }

  const stateM = profile.location ? (STATE_MULTIPLIERS[profile.location] ?? 1.0) : 1.0;

  return ageM * breedM * stateM;
}

export const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI",
  "IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN",
  "MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH",
  "OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA",
  "WI","WV","WY",
];

export const STATE_NAMES: Record<string, string> = {
  AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California",
  CO:"Colorado", CT:"Connecticut", DC:"Washington D.C.", DE:"Delaware",
  FL:"Florida", GA:"Georgia", HI:"Hawaii", IA:"Iowa", ID:"Idaho",
  IL:"Illinois", IN:"Indiana", KS:"Kansas", KY:"Kentucky", LA:"Louisiana",
  MA:"Massachusetts", MD:"Maryland", ME:"Maine", MI:"Michigan", MN:"Minnesota",
  MO:"Missouri", MS:"Mississippi", MT:"Montana", NC:"North Carolina",
  ND:"North Dakota", NE:"Nebraska", NH:"New Hampshire", NJ:"New Jersey",
  NM:"New Mexico", NV:"Nevada", NY:"New York", OH:"Ohio", OK:"Oklahoma",
  OR:"Oregon", PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina",
  SD:"South Dakota", TN:"Tennessee", TX:"Texas", UT:"Utah", VA:"Virginia",
  VT:"Vermont", WA:"Washington", WI:"Wisconsin", WV:"West Virginia", WY:"Wyoming",
};
