"use client";

import { useId, useState } from "react";
import { useStore } from "@/lib/store";
import AnimalSelector from "./AnimalSelector";
import BreedRiskCard from "./BreedRiskCard";
import { Search, RotateCcw, X } from "lucide-react";
import { US_STATES, STATE_NAMES } from "@/lib/priceMultiplier";
import { getBreedsByAnimal } from "@/lib/breeds";

const budgetOptions = [
  { value: "under25", label: "Under $25" },
  { value: "25to50", label: "$25–$50" },
  { value: "50to75", label: "$50–$75" },
  { value: "75plus", label: "$75+" },
  { value: "any", label: "Any budget" },
];

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
  { value: "rating", label: "Top rated" },
  { value: "price", label: "Lowest price" },
  { value: "reviews", label: "Most reviews" },
  { value: "claims", label: "Fastest claims" },
  { value: "breedMatch", label: "Best breed match" },
];

const ageOptions = [
  { value: "puppy", label: "Puppy / Kitten (0–1 yr)" },
  { value: "young", label: "Young (1–3 yrs)" },
  { value: "adult", label: "Adult (3–7 yrs)" },
  { value: "senior", label: "Senior (7–10 yrs)" },
  { value: "senior+", label: "Senior+ (10+ yrs)" },
];

const dogBreedOptions = [
  { value: "any", label: "Any / Unknown" },
  { value: "small", label: "Small (under 20 lbs)" },
  { value: "medium", label: "Medium (20–50 lbs)" },
  { value: "large", label: "Large (50–90 lbs)" },
  { value: "giant", label: "Giant (90+ lbs)" },
];

const catBreedOptions = [
  { value: "any", label: "Any / Unknown" },
  { value: "domestic", label: "Domestic (mixed)" },
  { value: "purebred", label: "Purebred" },
];

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: (id: string) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {hint && <span style={{ fontWeight: 500, color: "var(--color-muted)" }}> {hint}</span>}
      </label>
      {children(id)}
    </div>
  );
}

function Select({
  id,
  value,
  onChange,
  options,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="field">
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function BreedSearch({
  id,
  animal,
  value,
  onChange,
}: {
  id: string;
  animal: "dog" | "cat";
  value: string;
  onChange: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const breeds = getBreedsByAnimal(animal);
  const filtered =
    query.length > 0 ? breeds.filter((b) => b.name.toLowerCase().includes(query.toLowerCase())) : breeds;
  const selected = breeds.find((b) => b.id === value);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "var(--color-muted)" }}
          aria-hidden
        />
        <input
          id={id}
          type="text"
          placeholder={`Search ${animal} breeds`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="field"
          style={{ paddingLeft: 36 }}
        />
      </div>

      {selected && (
        <div
          className="flex items-center justify-between px-3 py-1.5 rounded-lg"
          style={{ background: "var(--color-tag-soft)", border: "2px solid var(--color-ink)" }}
        >
          <span style={{ fontSize: 15, fontWeight: 700 }}>{selected.name}</span>
          <button
            onClick={() => {
              onChange("");
              setQuery("");
            }}
            aria-label={`Clear ${selected.name}`}
            className="p-1 rounded-full hover:bg-black/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {query.length > 0 && (
        <div
          className="bg-paper overflow-y-auto"
          style={{ borderRadius: 10, maxHeight: 200, border: "2px solid var(--color-ink)" }}
        >
          {filtered.length === 0 ? (
            <p className="px-3 py-2" style={{ fontSize: 14, color: "var(--color-muted)" }}>
              No breeds found
            </p>
          ) : (
            filtered.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  onChange(b.id);
                  setQuery("");
                }}
                className="w-full text-left px-3 py-2 hover:bg-mint-soft flex items-center justify-between gap-2"
                style={{ fontSize: 15 }}
              >
                <span>{b.name}</span>
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color:
                      b.riskLevel === "low"
                        ? "#0f5a31"
                        : b.riskLevel === "moderate"
                        ? "#6b3a00"
                        : b.riskLevel === "high"
                        ? "#8f2315"
                        : "#4b1f78",
                    background:
                      b.riskLevel === "low"
                        ? "#e3f2ea"
                        : b.riskLevel === "moderate"
                        ? "#fff1b8"
                        : b.riskLevel === "high"
                        ? "#fbe3df"
                        : "#efe6f7",
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

function Divider() {
  return <div className="w-full" style={{ borderTop: "2px dashed var(--color-line)" }} />;
}

export default function FilterSidebar() {
  const {
    filters,
    updateFilter,
    resetFilters,
    comparedIds,
    setActiveModal,
    petProfile,
    updatePetProfile,
    selectedAnimal,
  } = useStore();

  const breedOptions =
    selectedAnimal === "dog" ? dogBreedOptions : selectedAnimal === "cat" ? catBreedOptions : null;

  const showBreedSearch = selectedAnimal === "dog" || selectedAnimal === "cat";

  return (
    <div className="flex flex-col gap-6">
      <AnimalSelector />

      <Divider />

      <div className="space-y-4">
        <h3 className="heading" style={{ fontSize: 20 }}>
          Your pet
        </h3>

        <Field label="Age">
          {(id) => <Select id={id} value={petProfile.age} onChange={(v) => updatePetProfile("age", v)} options={ageOptions} />}
        </Field>

        {showBreedSearch && (
          <Field label="Specific breed" hint="(adds a health risk analysis)">
            {(id) => (
              <BreedSearch
                id={id}
                animal={selectedAnimal as "dog" | "cat"}
                value={petProfile.breedId}
                onChange={(b) => updatePetProfile("breedId", b)}
              />
            )}
          </Field>
        )}

        {breedOptions && (
          <Field label={selectedAnimal === "dog" ? "Size category" : "Breed type"}>
            {(id) => (
              <Select id={id} value={petProfile.breed} onChange={(v) => updatePetProfile("breed", v)} options={breedOptions} />
            )}
          </Field>
        )}

        <Field label="State">
          {(id) => (
            <select
              id={id}
              value={petProfile.location}
              onChange={(e) => updatePetProfile("location", e.target.value)}
              className="field"
            >
              <option value="">Any / Not sure</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {STATE_NAMES[s]} ({s})
                </option>
              ))}
            </select>
          )}
        </Field>

        {(petProfile.age !== "adult" || petProfile.breed !== "any" || petProfile.location) && (
          <p
            className="px-3 py-2 rounded-lg"
            style={{ fontSize: 14, background: "var(--color-tag-soft)", lineHeight: 1.4 }}
          >
            Prices are adjusted for your pet profile.
          </p>
        )}

        {petProfile.breedId && <BreedRiskCard breedId={petProfile.breedId} />}
      </div>

      <Divider />

      <fieldset className="space-y-2.5">
        <legend className="heading mb-2" style={{ fontSize: 20 }}>
          Monthly budget
        </legend>
        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Monthly budget">
          {budgetOptions.map(({ value, label }) => {
            const active = filters.budget === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => updateFilter("budget", value)}
                className={`rounded-full px-3 py-2 transition-colors ${value === "any" ? "col-span-2" : ""}`}
                style={{
                  fontSize: 15,
                  fontWeight: active ? 700 : 500,
                  background: active ? "var(--color-tag)" : "var(--color-paper)",
                  border: "2px solid var(--color-ink)",
                  boxShadow: active ? "2px 2px 0 var(--color-ink)" : "none",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-4">
        {[
          { label: "Reimbursement", key: "minReimbursement" as const, options: reimbursementOptions },
          { label: "Annual maximum", key: "maxAnnual" as const, options: annualMaxOptions },
          { label: "Deductible", key: "deductible" as const, options: deductibleOptions },
          { label: "Waiting period", key: "waitingPeriod" as const, options: waitingOptions },
        ].map(({ label, key, options }) => (
          <Field key={key} label={label}>
            {(id) => <Select id={id} value={filters[key]} onChange={(v) => updateFilter(key, v)} options={options} />}
          </Field>
        ))}
      </div>

      <Field label="Search provider">
        {(id) => (
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--color-muted)" }}
              aria-hidden
            />
            <input
              id={id}
              type="text"
              placeholder="Provider name"
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
              className="field"
              style={{ paddingLeft: 36 }}
            />
          </div>
        )}
      </Field>

      <Field label="Sort by">
        {(id) => <Select id={id} value={filters.sortBy} onChange={(v) => updateFilter("sortBy", v)} options={sortOptions} />}
      </Field>

      <button onClick={resetFilters} className="flex items-center gap-2 link-u self-start" style={{ fontSize: 15 }}>
        <RotateCcw className="w-4 h-4" />
        Reset filters
      </button>

      {comparedIds.length >= 2 && (
        <div
          className="p-4 space-y-3 sticky bottom-3"
          style={{ background: "var(--color-tag)", border: "2px solid var(--color-ink)", borderRadius: 12, boxShadow: "3px 3px 0 var(--color-ink)" }}
        >
          <p style={{ fontSize: 15 }}>
            <strong>{comparedIds.length}</strong> of 4 selected
          </p>
          <button onClick={() => setActiveModal("compare")} className="btn btn-ink btn-sm w-full">
            Compare selected
          </button>
        </div>
      )}
    </div>
  );
}
