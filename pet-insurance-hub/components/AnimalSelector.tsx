"use client";

import { ANIMAL_TYPES } from "@/lib/insurers";
import { useStore } from "@/lib/store";

export default function AnimalSelector() {
  const { selectedAnimal, setSelectedAnimal } = useStore();

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-[#1d1d1f]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>
        Animal Type
      </h3>
      <div className="flex flex-col gap-0.5">
        {ANIMAL_TYPES.map((animal) => {
          const active = selectedAnimal === animal.id;
          return (
            <button
              key={animal.id}
              onClick={() => setSelectedAnimal(animal.id)}
              className="flex items-center gap-3 px-3 py-2 text-left transition-all active:scale-95"
              style={{
                fontSize: 14,
                letterSpacing: "-0.224px",
                borderRadius: 8,
                background: active ? "#0066cc" : "transparent",
                color: active ? "#ffffff" : "#333333",
              }}
            >
              <span className="text-base">{animal.icon}</span>
              <span>{animal.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
