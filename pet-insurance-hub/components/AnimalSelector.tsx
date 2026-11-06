"use client";

import { ANIMAL_TYPES } from "@/lib/insurers";
import { useStore } from "@/lib/store";

export default function AnimalSelector() {
  const { selectedAnimal, setSelectedAnimal } = useStore();

  return (
    <fieldset>
      <legend className="heading mb-2" style={{ fontSize: 20 }}>
        Animal type
      </legend>
      <div className="grid grid-cols-2 gap-1.5" role="radiogroup" aria-label="Animal type">
        {ANIMAL_TYPES.map((animal) => {
          const active = selectedAnimal === animal.id;
          return (
            <button
              key={animal.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelectedAnimal(animal.id)}
              className="flex items-center gap-2 px-3 py-2 text-left rounded-lg transition-colors"
              style={{
                fontSize: 15,
                fontWeight: active ? 700 : 500,
                background: active ? "var(--color-scrub)" : "var(--color-paper)",
                color: active ? "#fff" : "var(--color-ink)",
                border: "2px solid var(--color-ink)",
              }}
            >
              <span aria-hidden>{animal.icon}</span>
              {animal.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
