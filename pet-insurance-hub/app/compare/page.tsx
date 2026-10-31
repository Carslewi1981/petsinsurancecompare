"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { insurers, ANIMAL_TYPES } from "@/lib/insurers";
import { getBreedById } from "@/lib/breeds";
import { scoreInsurerForBreed } from "@/lib/healthRisk";
import FilterSidebar from "@/components/FilterSidebar";
import PlanCard from "@/components/PlanCard";

function filterAndSort(
  list: typeof insurers,
  animal: string,
  filters: ReturnType<typeof useStore>["filters"],
  breedId?: string,
) {
  let result = list.filter((ins) => {
    if (animal !== "all" && !ins.animals.includes(animal)) return false;

    const price =
      animal === "all"
        ? Math.min(...Object.values(ins.monthlyPrice).filter((p) => p > 0))
        : ins.monthlyPrice[animal] || 0;
    if (price > filters.maxPrice) return false;

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

export default function ComparePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedAnimal, filters, petProfile } = useStore();

  const animalLabel =
    selectedAnimal === "all"
      ? "All Animals"
      : ANIMAL_TYPES.find((a) => a.id === selectedAnimal)?.label + "s" || "";

  const filtered = useMemo(
    () => filterAndSort(insurers, selectedAnimal, filters, petProfile.breedId),
    [selectedAnimal, filters, petProfile.breedId]
  );

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 44 }}>
      {/* Page header */}
      <div className="bg-[#272729]">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-bebas text-white leading-none mb-1" style={{ fontSize: 40, letterSpacing: "0.02em" }}>
            Compare Pet Insurance <span style={{ color: "#2997ff" }}>Plans</span>
          </h1>
          <p className="text-[#a1a1a6]" style={{ fontSize: 17, letterSpacing: "-0.374px" }}>
            Find the perfect plan for your pet — filter, compare, and connect with providers.
          </p>
        </div>
      </div>

      <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-14 bg-[#f5f5f7] border border-[#e0e0e0] p-5" style={{ borderRadius: 18 }}>
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile filter toggle */}
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 bg-[#0066cc] text-white px-5 py-3 shadow-xl hover:bg-[#0071e3] transition-colors active:scale-95"
              style={{ borderRadius: 9999, fontSize: 14, letterSpacing: "-0.224px" }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Mobile sidebar drawer */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween" }}
                  className="fixed left-0 top-0 bottom-0 w-80 bg-white border-r border-[#e0e0e0] z-50 overflow-y-auto p-5 lg:hidden"
                >
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-semibold text-[#1d1d1f]" style={{ fontSize: 21, letterSpacing: "0.231px" }}>Filters</span>
                    <button onClick={() => setSidebarOpen(false)}>
                      <X className="w-5 h-5 text-[#7a7a7a]" />
                    </button>
                  </div>
                  <FilterSidebar />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-semibold text-[#1d1d1f]" style={{ fontSize: 21, letterSpacing: "0.231px" }}>
                  {filtered.length}{" "}
                  <span className="text-[#7a7a7a] font-normal">
                    plan{filtered.length !== 1 ? "s" : ""} for {animalLabel}
                  </span>
                </span>
              </div>
            </div>

            {/* Cards grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 text-[#7a7a7a]">
                <div className="text-5xl mb-4">🔍</div>
                <p className="font-semibold text-[#1d1d1f] mb-2" style={{ fontSize: 21 }}>No plans match your filters</p>
                <p style={{ fontSize: 17, letterSpacing: "-0.374px" }}>Try adjusting your filters or resetting them.</p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 xl:grid-cols-2 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((insurer, i) => (
                    <PlanCard
                      key={insurer.id}
                      insurer={insurer}
                      animal={selectedAnimal}
                      index={i}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
