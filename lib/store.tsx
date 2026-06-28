"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Insurer } from "./insurers";
import { LangCode, T, translations } from "./translations";

export interface Filters {
  maxPrice: number;
  minReimbursement: string;
  maxAnnual: string;
  deductible: string;
  waitingPeriod: string;
  searchTerm: string;
  sortBy: string;
}

interface StoreState {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: T;
  selectedAnimal: string;
  setSelectedAnimal: (a: string) => void;
  filters: Filters;
  setFilters: (f: Filters) => void;
  updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  comparedIds: string[];
  toggleCompare: (id: string) => void;
  clearCompared: () => void;
  activeModal: "compare" | "contact" | null;
  setActiveModal: (m: "compare" | "contact" | null) => void;
  contactInsurer: Insurer | null;
  setContactInsurer: (i: Insurer | null) => void;
}

const defaultFilters: Filters = {
  maxPrice: 200,
  minReimbursement: "any",
  maxAnnual: "any",
  deductible: "any",
  waitingPeriod: "any",
  searchTerm: "",
  sortBy: "rating",
};

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangCode>("en");
  const t = translations[lang];
  const [selectedAnimal, setSelectedAnimal] = useState("all");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [activeModal, setActiveModal] = useState<"compare" | "contact" | null>(null);
  const [contactInsurer, setContactInsurer] = useState<Insurer | null>(null);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  const toggleCompare = (id: string) => {
    setComparedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  };

  const clearCompared = () => setComparedIds([]);

  return (
    <StoreContext.Provider
      value={{
        lang, setLang, t,
        selectedAnimal,
        setSelectedAnimal,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        comparedIds,
        toggleCompare,
        clearCompared,
        activeModal,
        setActiveModal,
        contactInsurer,
        setContactInsurer,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
