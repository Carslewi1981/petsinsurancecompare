"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { insurers, ANIMAL_TYPES } from "@/lib/insurers";
import { getBreedById } from "@/lib/breeds";
import { scoreInsurerForBreed } from "@/lib/healthRisk";
import { getPriceMultiplier } from "@/lib/priceMultiplier";
import FilterSidebar from "@/components/FilterSidebar";
import PlanCard from "@/components/PlanCard";

function inBudget(price: number, budget: string) {
  switch (budget) {
    case "under25":
      return price < 25;
    case "25to50":
      return price >= 25 && price <= 50;
    case "50to75":
      return price > 50 && price <= 75;
    case "75plus":
      return price > 75;
    default:
      return true;
  }
}

function filterAndSort(
  list: typeof insurers,
  animal: string,
  filters: ReturnType<typeof useStore>["filters"],
  breedId?: string,
  priceMultiplier = 1,
) {
  let result = list.filter((ins) => {
    if (animal !== "all" && !ins.animals.includes(animal)) return false;

    const price =
      animal === "all"
        ? Math.min(...Object.values(ins.monthlyPrice).filter((p) => p > 0))
        : ins.monthlyPrice[animal] || 0;
    // Match the adjusted price shown on each plan card
    if (!inBudget(Math.round(price * priceMultiplier), filters.budget)) return false;

    if (filters.minReimbursement !== "any") {
      const pct = parseInt(ins.reimbursement);
      if (pct < parseInt(filters.minReimbursement)) return false;
    }

    if (filters.maxAnnual !== "any" && filters.maxAnnual !== "unlimited") {
      const threshold = parseInt(filters.maxAnnual);
      const annualStr = ins.maxAnnual.toLowerCase();
      if (annualStr === "unlimited") {
        // pass
      } else {
        const annual = parseInt(annualStr.replace(/[^0-9]/g, "")) * 1000;
        if (annual < threshold) return false;
      }
    }

    if (filters.waitingPeriod !== "any") {
      const days = parseInt(filters.waitingPeriod);
      const waitDays = parseInt(ins.waitingPeriod.split(" ")[0]) || 99;
      if (waitDays > days) return false;
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      if (!ins.name.toLowerCase().includes(term) && !ins.tagline.toLowerCase().includes(term))
        return false;
    }

    return true;
  });

  result = result.sort((a, b) => {
    const priceA =
      animal === "all"
        ? Math.min(...Object.values(a.monthlyPrice).filter((p) => p > 0))
        : a.monthlyPrice[animal] || 0;
    const priceB =
      animal === "all"
        ? Math.min(...Object.values(b.monthlyPrice).filter((p) => p > 0))
        : b.monthlyPrice[animal] || 0;

    if (filters.sortBy === "breedMatch" && breedId) {
      const breed = getBreedById(breedId);
      if (breed) {
        const scoreA = scoreInsurerForBreed(a, breed).score;
        const scoreB = scoreInsurerForBreed(b, breed).score;
        return scoreB - scoreA;
      }
    }
    switch (filters.sortBy) {
      case "price":
        return priceA - priceB;
      case "reviews":
        return b.reviews - a.reviews;
      case "claims":
        return parseInt(a.claimsTime) - parseInt(b.claimsTime);
      default:
        return b.rating - a.rating;
    }
  });

  return result;
}

/** Reads ?animal=dog (or "dogs") from the URL once and selects that animal. Renders nothing. */
function AnimalFromUrl() {
  const params = useSearchParams();
  const { setSelectedAnimal } = useStore();
  const raw = params.get("animal");

  useEffect(() => {
    if (!raw) return;
    const key = raw.toLowerCase();
    const match = ANIMAL_TYPES.find((a) => a.id === key || `${a.id}s` === key);
    if (match) setSelectedAnimal(match.id);
  }, [raw, setSelectedAnimal]);

  return null;
}

export default function ComparePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedAnimal, filters, petProfile, resetFilters } = useStore();

  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSidebarOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sidebarOpen]);

  const animalLabel =
    selectedAnimal === "all"
      ? "all animals"
      : (ANIMAL_TYPES.find((a) => a.id === selectedAnimal)?.label ?? "").toLowerCase() + "s";

  const filtered = useMemo(
    () =>
      filterAndSort(
        insurers,
        selectedAnimal,
        filters,
        petProfile.breedId,
        getPriceMultiplier(petProfile, selectedAnimal),
      ),
    [selectedAnimal, filters, petProfile]
  );

  return (
    <div>
      <Suspense fallback={null}>
        <AnimalFromUrl />
      </Suspense>
      <header style={{ background: "var(--color-mint)", borderBottom: "2px solid var(--color-ink)" }}>
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-10 sm:py-14">
          <h1 className="display" style={{ fontSize: "clamp(44px, 6.5vw, 92px)" }}>
            Compare pet insurance plans
          </h1>
          <p className="mt-4 prose-measure" style={{ fontSize: 19, color: "var(--color-muted)", maxWidth: "52ch" }}>
            Filter by your pet, price and coverage, put plans side by side, then contact providers directly.
          </p>
        </div>
      </header>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-10">
        <div className="flex gap-10">
          <aside className="hidden lg:block w-[300px] flex-shrink-0">
            <div
              className="sticky top-[88px] p-5 overflow-y-auto"
              style={{
                background: "var(--color-paper)",
                border: "2px solid var(--color-ink)",
                borderRadius: 14,
                maxHeight: "calc(100vh - 108px)",
              }}
            >
              <FilterSidebar />
            </div>
          </aside>

          <div className="lg:hidden fixed bottom-5 right-5 z-40">
            <button onClick={() => setSidebarOpen(true)} className="btn">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 lg:hidden"
                  style={{ background: "rgba(7,42,43,0.55)" }}
                  onClick={() => setSidebarOpen(false)}
                />
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label="Filters"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.22 }}
                  className="fixed left-0 top-0 bottom-0 w-[min(340px,90vw)] z-50 overflow-y-auto p-5 lg:hidden"
                  style={{ background: "var(--color-chart)", borderRight: "2px solid var(--color-ink)" }}
                >
                  <div className="flex justify-between items-center mb-5">
                    <span className="heading" style={{ fontSize: 28 }}>
                      Filters
                    </span>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      aria-label="Close filters"
                      className="p-2 rounded-full hover:bg-mint-soft"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <FilterSidebar />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="flex-1 min-w-0">
            <p className="mb-2" style={{ fontSize: 20 }} aria-live="polite">
              <strong style={{ fontWeight: 800 }}>{filtered.length}</strong> plan{filtered.length !== 1 ? "s" : ""} for{" "}
              {animalLabel}
            </p>
            <p className="mb-6" style={{ fontSize: 14, color: "var(--color-muted)" }}>
              Sorted by star rating unless you change it. We may earn a commission if you buy through a link; it
              doesn&apos;t change the order. Plan details checked October 2026.{" "}
              <Link href="/about#how-we-rate" className="link-u">
                How we rate
              </Link>
            </p>

            {filtered.length === 0 ? (
              <div
                className="p-8 sm:p-12"
                style={{ background: "var(--color-paper)", border: "2px dashed var(--color-ink)", borderRadius: 14 }}
              >
                <h2 className="heading" style={{ fontSize: 34 }}>
                  No plans match these filters
                </h2>
                <p className="mt-3 prose-measure" style={{ fontSize: 17, color: "var(--color-muted)" }}>
                  Loosen the budget or coverage filters, or start over.
                </p>
                <button onClick={resetFilters} className="btn mt-6">
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch [overflow-anchor:none]">
                {filtered.map((insurer, i) => (
                  <PlanCard key={insurer.id} insurer={insurer} animal={selectedAnimal} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
