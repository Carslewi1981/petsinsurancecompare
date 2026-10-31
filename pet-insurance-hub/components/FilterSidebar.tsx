"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import AnimalSelector from "./AnimalSelector";
import BreedRiskCard from "./BreedRiskCard";
import { Search, RotateCcw } from "lucide-react";
import { US_STATES, STATE_NAMES } from "@/lib/priceMultiplier";
import { getBreedsByAnimal } from "@/lib/breeds";

const reimbursementOptions = [
  { value: "any", label: "Any" },
  { value: "70", label: "70%+" },
  { value: "80", label: "80%+" },
  { value: "90", label: "90%+" },
  { value: "100", label: "100%" },
];

const annualMaxOptions = [
  { value: "any", label: "Any" },
  { value: "3000", label: "$3K+" },
  { value: "5000", label: "$5K+" },
  { value: "10000", label: "$10K+" },
  { value: "unlimited", label: "Unlimited" },
];

const deductibleOptions = [
  { value: "any", label: "Any" },
  { value: "under200", label: "Under $200" },
  { value: "200to500", label: "$200–$500" },
  { value: "500plus", label: "$500+" },
];

const waitingOptions = [
  { value: "any", label: "Any" },
  { value: "7", label: "Under 7 days" },
  { value: "14", label: "Under 14 days" },
];

const sortOptions = [
  { value: "rating", label: "Top Rated" },
  { value: "price", label: "Lowest Price" },
  { value: "reviews", label: "Most Reviews" },
  { value: "claims", label: "Fastest Claims" },
  { value: "breedMatch", label: "Best Breed Match" },
];

const ageOptions = [
  { value: "puppy",    label: "Puppy / Kitten (0–1 yr)" },
  { value: "young",   label: "Young (1–3 yrs)" },
  { value: "adult",   label: "Adult (3–7 yrs)" },
  { value: "senior",  label: "Senior (7–10 yrs)" },
  { value: "senior+", label: "Senior+ (10+ yrs)" },
];

const dogBreedOptions = [
  { value: "any",    label: "Any / Unknown" },
  { value: "small",  label: "Small (under 20 lbs)" },
  { value: "medium", label: "Medium (20–50 lbs)" },
  { value: "large",  label: "Large (50–90 lbs)" },
  { value: "giant",  label: "Giant (90+ lbs)" },
];

const catBreedOptions = [
  { value: "any",       label: "Any / Unknown" },
  { value: "domestic",  label: "Domestic (mixed)" },
  { value: "purebred",  label: "Purebred" },
];

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-[#e0e0e0] text-[#1d1d1f] px-3 py-2 focus:outline-none focus:border-[#0066cc] appearance-none cursor-pointer"
      style={{ fontSize: 14, letterSpacing: "-0.224px", borderRadius: 8 }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function BreedSearch({ animal, value, onChange }: {
  animal: "dog" | "cat";
  value: string;
  onChange: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const breeds = getBreedsByAnimal(animal);
  const filtered = query.length > 0
    ? breeds.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()))
    : breeds;
  const selected = breeds.find((b) => b.id === value);

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#d2d2d7]" />
        <input
          type="text"
          placeholder={`Search ${animal} breeds...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white border border-[#e0e0e0] text-[#1d1d1f] pl-8 pr-3 py-2 focus:outline-none focus:border-[#0066cc] placeholder-[#d2d2d7]"
          style={{ fontSize: 13, letterSpacing: "-0.12px", borderRadius: 8 }}
        />
      </div>

      {/* Current selection */}
      {selected && (
        <div
          className="flex items-center justify-between px-3 py-1.5"
          style={{ background: "#eff6ff", borderRadius: 7 }}
        >
          <span className="text-[#0066cc] font-semibold" style={{ fontSize: 12 }}>{selected.name}</span>
          <button
            onClick={() => { onChange(""); setQuery(""); }}
            className="text-[#7a7a7a] hover:text-[#1d1d1f]"
            style={{ fontSize: 11 }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Dropdown list */}
      {query.length > 0 && (
        <div
          className="bg-white border border-[#e0e0e0] overflow-y-auto"
          style={{ borderRadius: 8, maxHeight: 180 }}
        >
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-[#7a7a7a]" style={{ fontSize: 12 }}>No breeds found</div>
          ) : (
            filtered.map((b) => (
              <button
                key={b.id}
                onClick={() => { onChange(b.id); setQuery(""); }}
                className="w-full text-left px-3 py-2 hover:bg-[#f5f5f7] transition-colors flex items-center justify-between"
                style={{ fontSize: 13 }}
              >
                <span>{b.name}</span>
                <span
                  className="text-[10px] px-1.5 py-0.5 font-semibold"
                  style={{
                    borderRadius: 9999,
                    color: b.riskLevel === "low" ? "#16a34a" : b.riskLevel === "moderate" ? "#d97706" : b.riskLevel === "high" ? "#dc2626" : "#7c3aed",
                    background: b.riskLevel === "low" ? "#f0fdf4" : b.riskLevel === "moderate" ? "#fffbeb" : b.riskLevel === "high" ? "#fef2f2" : "#f5f3ff",
                  }}
                >
                  {b.riskLevel}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function FilterSidebar() {
  const {
    filters, updateFilter, resetFilters,
    comparedIds, setActiveModal,
    petProfile, updatePetProfile,
    selectedAnimal,
  } = useStore();

  const breedOptions =
    selectedAnimal === "dog" ? dogBreedOptions :
    selectedAnimal === "cat" ? catBreedOptions : null;

  const showBreedSearch = selectedAnimal === "dog" || selectedAnimal === "cat";

  return (
    <div className="flex flex-col gap-5">
      <AnimalSelector />

      <div className="w-full h-px bg-[#e0e0e0]" />

      {/* Pet Profile */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#1d1d1f]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>
          Your Pet
        </h3>

        {/* Age */}
        <div className="space-y-1">
          <label className="text-[#7a7a7a]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>Age</label>
          <Select
            value={petProfile.age}
            onChange={(v) => updatePetProfile("age", v)}
            options={ageOptions}
          />
        </div>

        {/* Specific breed search */}
        {showBreedSearch && (
          <div className="space-y-1">
            <label className="text-[#7a7a7a]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>
              Specific Breed
              <span
                className="ml-1.5 text-[#0066cc] font-semibold"
                style={{ fontSize: 10, letterSpacing: 0 }}
              >
                NEW — Health Risk Analysis
              </span>
            </label>
            <BreedSearch
              animal={selectedAnimal as "dog" | "cat"}
              value={petProfile.breedId}
              onChange={(id) => updatePetProfile("breedId", id)}
            />
          </div>
        )}

        {/* Size/breed category for price multiplier */}
        {breedOptions && (
          <div className="space-y-1">
            <label className="text-[#7a7a7a]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>
              {selectedAnimal === "dog" ? "Size Category" : "Breed Type"}
            </label>
            <Select
              value={petProfile.breed}
              onChange={(v) => updatePetProfile("breed", v)}
              options={breedOptions}
            />
          </div>
        )}

        {/* Location */}
        <div className="space-y-1">
          <label className="text-[#7a7a7a]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>State / Location</label>
          <select
            value={petProfile.location}
            onChange={(e) => updatePetProfile("location", e.target.value)}
            className="w-full bg-white border border-[#e0e0e0] text-[#1d1d1f] px-3 py-2 focus:outline-none focus:border-[#0066cc] appearance-none cursor-pointer"
            style={{ fontSize: 14, letterSpacing: "-0.224px", borderRadius: 8 }}
          >
            <option value="">Any / Not sure</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{STATE_NAMES[s]} ({s})</option>
            ))}
          </select>
        </div>

        {/* Price impact note */}
        {(petProfile.age !== "adult" || petProfile.breed !== "any" || petProfile.location) && (
          <p className="text-[#0066cc]" style={{ fontSize: 11, letterSpacing: "-0.12px" }}>
            ✦ Prices adjusted for your pet profile
          </p>
        )}

        {/* Breed risk card */}
        {petProfile.breedId && (
          <BreedRiskCard breedId={petProfile.breedId} />
        )}
      </div>

      <div className="w-full h-px bg-[#e0e0e0]" />

      {/* Price slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-[#1d1d1f]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>
            Max Monthly Price
          </h3>
          <span className="font-semibold text-[#0066cc]" style={{ fontSize: 14 }}>${filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min={10}
          max={200}
          step={5}
          value={filters.maxPrice}
          onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
          className="w-full cursor-pointer accent-[#0066cc]"
        />
        <div className="flex justify-between text-[#7a7a7a]" style={{ fontSize: 12 }}>
          <span>$10</span>
          <span>$200</span>
        </div>
      </div>

      {/* Filter selects */}
      <div className="space-y-3">
        {[
          { label: "Reimbursement", key: "minReimbursement" as const, options: reimbursementOptions },
          { label: "Annual Max", key: "maxAnnual" as const, options: annualMaxOptions },
          { label: "Deductible", key: "deductible" as const, options: deductibleOptions },
          { label: "Waiting Period", key: "waitingPeriod" as const, options: waitingOptions },
        ].map(({ label, key, options }) => (
          <div key={key} className="space-y-1">
            <label className="text-[#7a7a7a]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>{label}</label>
            <Select value={filters[key]} onChange={(v) => updateFilter(key, v)} options={options} />
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="space-y-1">
        <label className="text-[#7a7a7a]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>Search Provider</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d2d2d7]" />
          <input
            type="text"
            placeholder="Provider name..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter("searchTerm", e.target.value)}
            className="w-full bg-white border border-[#e0e0e0] text-[#1d1d1f] pl-9 pr-3 py-2 focus:outline-none focus:border-[#0066cc] placeholder-[#d2d2d7]"
            style={{ fontSize: 14, letterSpacing: "-0.224px", borderRadius: 9999 }}
          />
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-1">
        <label className="text-[#7a7a7a]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>Sort By</label>
        <Select value={filters.sortBy} onChange={(v) => updateFilter("sortBy", v)} options={sortOptions} />
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="flex items-center gap-2 text-[#0066cc] hover:text-[#0071e3] transition-colors"
        style={{ fontSize: 14, letterSpacing: "-0.224px" }}
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Reset Filters
      </button>

      {/* Compare bar */}
      {comparedIds.length >= 2 && (
        <div className="border border-[#0066cc] bg-[#f0f6ff] p-4 space-y-3" style={{ borderRadius: 11 }}>
          <div className="text-[#7a7a7a]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>
            <span className="font-semibold text-[#1d1d1f]">{comparedIds.length}</span> of 4 selected
          </div>
          <button
            onClick={() => setActiveModal("compare")}
            className="w-full bg-[#0066cc] text-white py-2.5 hover:bg-[#0071e3] transition-colors active:scale-95"
            style={{ fontSize: 14, letterSpacing: "-0.224px", borderRadius: 9999 }}
          >
            Compare Selected
          </button>
        </div>
      )}
    </div>
  );
}
