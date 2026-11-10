"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { useStore } from "@/lib/store";
import { VET_PROCEDURES, getLocalizedCost } from "@/lib/vetCosts";
import { insurers } from "@/lib/insurers";

// Example plan terms used for the illustration only.
const DEDUCTIBLE = 250;
const REIMBURSEMENT = 0.8;

type Species = "dog" | "cat";

const SPECIES: { id: Species; label: string }[] = [
  { id: "dog", label: "Dog" },
  { id: "cat", label: "Cat" },
];

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** Counts toward `target` when it changes; jumps straight there for reduced-motion users. */
function useCountTo(target: number, duration = 650) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = fromRef.current;
    if (reduce || from === target) {
      setValue(target);
      fromRef.current = target;
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = Math.round(from + (target - from) * eased);
      setValue(next);
      fromRef.current = next;
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function Amount({ value, negative = false }: { value: number; negative?: boolean }) {
  const shown = useCountTo(value);
  return (
    <span aria-hidden>
      {negative ? "−" : ""}
      {usd(shown)}
    </span>
  );
}

export default function VetBill() {
  const { petProfile } = useStore();
  const stateCode = petProfile.location;

  const [species, setSpecies] = useState<Species>("dog");
  const [procId, setProcId] = useState("acl-surgery");

  const procedures = useMemo(
    () =>
      VET_PROCEDURES.filter((p) => p.animals.includes(species) || p.animals.includes("all")).slice(0, 6),
    [species]
  );

  const proc = procedures.find((p) => p.id === procId) ?? procedures[0];
  const cost = getLocalizedCost(proc, stateCode);

  const afterDeductible = Math.max(0, cost.avg - DEDUCTIBLE);
  const planPays = Math.round(afterDeductible * REIMBURSEMENT);
  const youPay = cost.avg - planPays;

  const lowestMonthly = Math.min(
    ...insurers
      .filter((i) => i.animals.includes(species))
      .map((i) => i.monthlyPrice[species])
      .filter((p) => p > 0)
  );
  const yearsOfPremiums = Math.round(cost.avg / (lowestMonthly * 12));

  const chooseSpecies = (s: Species) => {
    setSpecies(s);
    const list = VET_PROCEDURES.filter((p) => p.animals.includes(s) || p.animals.includes("all")).slice(0, 6);
    if (!list.some((p) => p.id === procId)) setProcId(list[0].id);
  };

  return (
    <div
      className="w-full"
      style={{
        background: "var(--color-mint)",
        borderRadius: 20,
        padding: "clamp(16px, 3vw, 32px)",
      }}
    >
      {/* Controls: they answer the question "whose bill, and for what?" */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-5">
        <div
          role="group"
          aria-label="Pet"
          className="inline-flex p-1 rounded-full"
          style={{ background: "var(--color-paper)", border: "2px solid var(--color-ink)" }}
        >
          {SPECIES.map((s) => (
            <button
              key={s.id}
              onClick={() => chooseSpecies(s.id)}
              aria-pressed={species === s.id}
              className="px-5 py-1.5 rounded-full transition-colors"
              style={{
                fontSize: 15,
                fontWeight: 650,
                background: species === s.id ? "var(--color-scrub)" : "transparent",
                color: species === s.id ? "#fff" : "var(--color-ink)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 15, color: "var(--color-muted)" }}>Pick a vet visit to see the bill.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-7" role="group" aria-label="Vet procedure">
        {procedures.map((p) => {
          const active = p.id === proc.id;
          return (
            <button
              key={p.id}
              onClick={() => setProcId(p.id)}
              aria-pressed={active}
              className="px-3.5 py-2 rounded-lg text-left transition-colors"
              style={{
                fontSize: 15,
                fontWeight: active ? 700 : 500,
                lineHeight: 1.2,
                background: active ? "var(--color-tag)" : "var(--color-paper)",
                border: "2px solid var(--color-ink)",
                boxShadow: active ? "2px 2px 0 var(--color-ink)" : "none",
              }}
            >
              {p.name.replace(/\s*\(.*\)$/, "")}
            </button>
          );
        })}
      </div>

      {/* The invoice: prints out of a slot on load */}
      <div style={{ filter: "drop-shadow(0 10px 18px rgba(7,42,43,0.22))" }}>
        <div className="relative overflow-hidden" style={{ borderRadius: "6px 6px 0 0" }}>
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 z-10"
            style={{ height: 10, background: "var(--color-scrub-deep)", borderRadius: "6px 6px 0 0" }}
          />
          <div
            className="print-out torn-bottom mono"
            style={{ background: "var(--color-paper)", padding: "30px clamp(18px, 3vw, 30px) 26px" }}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="font-sans" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, lineHeight: 1.2 }}>
                  Example invoice
                </p>
                <p style={{ fontSize: 13, color: "var(--color-muted)" }}>For a {species}</p>
              </div>
              <span className="stamp stamp-down" style={{ fontFamily: "var(--font-sans)", fontSize: 14, whiteSpace: "nowrap" }}>
                {usd(planPays)} covered
              </span>
            </div>

            <div className="leader" style={{ fontSize: 15 }}>
              <span style={{ fontWeight: 500 }}>{proc.name}</span>
              <span style={{ fontWeight: 500 }}>
                <Amount value={cost.avg} />
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--color-muted)", margin: "4px 0 14px" }}>
              Typical range {usd(cost.low)} to {usd(cost.high)}
              {stateCode ? ` in ${stateCode}` : ""}
            </p>

            <div className="leader" style={{ fontSize: 14, color: "var(--color-muted)" }}>
              <span>Deductible (example)</span>
              <span>{usd(Math.min(DEDUCTIBLE, cost.avg))}</span>
            </div>
            <div className="leader mt-1" style={{ fontSize: 14, color: "var(--color-muted)" }}>
              <span>Plan pays {Math.round(REIMBURSEMENT * 100)}% of the rest</span>
              <span>
                <Amount value={planPays} negative />
              </span>
            </div>

            <div className="mt-5 pt-4" style={{ borderTop: "2px dashed var(--color-line)" }}>
              <div className="leader" style={{ fontSize: 16 }}>
                <span className="strike" style={{ color: "var(--color-muted)" }}>
                  Without a plan
                </span>
                <span className="strike" style={{ color: "var(--color-muted)" }}>
                  {usd(cost.avg)}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4 mt-2">
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 20 }}>You pay</span>
                <span
                  className="highlight"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontStretch: "80%", fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1 }}
                >
                  <Amount value={youPay} />
                </span>
              </div>
            </div>

            <p className="sr-only" aria-live="polite">
              {proc.name}: {usd(cost.avg)} without insurance, about {usd(youPay)} with an example plan.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2" style={{ fontSize: 15 }}>
        {yearsOfPremiums >= 1 && (
          <p style={{ fontWeight: 600 }}>
            That one bill equals about {yearsOfPremiums} {yearsOfPremiums === 1 ? "year" : "years"} of premiums on the
            lowest-priced {species} plan we list ({usd(lowestMonthly)} a month).
          </p>
        )}
        {stateCode && (
          <p className="flex items-center gap-1.5" style={{ color: "var(--color-muted)" }}>
            <MapPin className="w-4 h-4" aria-hidden />
            Costs adjusted for {stateCode}.
          </p>
        )}
        <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.5 }}>
          Illustration only. Assumes {Math.round(REIMBURSEMENT * 100)}% reimbursement after a {usd(DEDUCTIBLE)} deductible;
          real plans differ. Cost ranges are based on AVMA veterinary fee surveys and published industry data.
        </p>
      </div>
    </div>
  );
}
