"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Printer, ArrowUpRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { insurers, ANIMAL_TYPES } from "@/lib/insurers";
import StarRating from "./StarRating";
import { getPriceMultiplier } from "@/lib/priceMultiplier";

type Insurer = (typeof insurers)[0];

export default function CompareModal() {
  const { activeModal, setActiveModal, comparedIds, selectedAnimal, setContactInsurer, petProfile } = useStore();
  const isOpen = activeModal === "compare";

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveModal(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, setActiveModal]);

  const plans = insurers.filter((i) => comparedIds.includes(i.id));

  // Same adjusted price the plan cards show
  const multiplier = getPriceMultiplier(petProfile, selectedAnimal);
  const getPrice = (insurer: Insurer) => {
    const base =
      selectedAnimal === "all"
        ? Math.min(...Object.values(insurer.monthlyPrice).filter((p) => p > 0))
        : insurer.monthlyPrice[selectedAnimal] || 0;
    return Math.round(base * multiplier);
  };

  const rows = [
    { label: "Monthly price", render: (i: Insurer) => `$${getPrice(i)}/mo`, highlight: true },
    { label: "Reimbursement", render: (i: Insurer) => i.reimbursement },
    { label: "Annual maximum", render: (i: Insurer) => i.maxAnnual },
    { label: "Deductible range", render: (i: Insurer) => i.deductible },
    { label: "Claims processing", render: (i: Insurer) => i.claimsTime },
    { label: "App rating", render: (i: Insurer) => `${i.appRating} / 5` },
    { label: "Waiting period", render: (i: Insurer) => i.waitingPeriod },
    {
      label: "Animals covered",
      render: (i: Insurer) =>
        i.animals
          .map((a) => ANIMAL_TYPES.find((t) => t.id === a)?.label)
          .filter(Boolean)
          .join(", "),
    },
  ];

  const sectionRow = (label: string) => (
    <tr>
      <th
        colSpan={plans.length + 1}
        scope="colgroup"
        className="heading text-left pt-6 pb-2"
        style={{ fontSize: 22, borderBottom: "2px solid var(--color-ink)" }}
      >
        {label}
      </th>
    </tr>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
          style={{ background: "rgba(7,42,43,0.6)" }}
          onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="compare-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="bg-paper w-full max-w-5xl max-h-[92vh] overflow-auto"
            style={{ borderRadius: 16, border: "2px solid var(--color-ink)", boxShadow: "6px 6px 0 var(--color-ink)" }}
          >
            <div
              className="flex items-center justify-between gap-4 px-6 py-5 sticky top-0 bg-paper z-10"
              style={{ borderBottom: "2px solid var(--color-ink)" }}
            >
              <div>
                <h2 id="compare-title" className="heading" style={{ fontSize: 32 }}>
                  Plan comparison
                </h2>
                <p style={{ fontSize: 15, color: "var(--color-muted)" }}>
                  Side by side: {plans.length} selected plans
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => window.print()} className="btn btn-quiet btn-sm">
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  aria-label="Close comparison"
                  className="p-2.5 rounded-full hover:bg-mint-soft"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full" style={{ minWidth: 560 }}>
                <thead>
                  <tr>
                    <td className="w-44" />
                    {plans.map((plan) => (
                      <th key={plan.id} scope="col" className="text-left pb-5 px-4 align-bottom">
                        <div className="heading flex items-center gap-2" style={{ fontSize: 26 }}>
                          <span aria-hidden className="inline-block rounded-full" style={{ width: 11, height: 11, background: plan.color }} />
                          {plan.name}
                        </div>
                        <div className="mt-1.5">
                          <StarRating rating={plan.rating} size="sm" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.label}
                      style={{
                        borderTop: "1px solid var(--color-line)",
                        background: row.highlight ? "var(--color-tag-soft)" : "transparent",
                      }}
                    >
                      <th scope="row" className="py-3 pr-4 text-left whitespace-nowrap" style={{ fontSize: 15, fontWeight: 500, color: "var(--color-muted)" }}>
                        {row.label}
                      </th>
                      {plans.map((plan) => (
                        <td
                          key={plan.id}
                          className="py-3 px-4"
                          style={{ fontSize: row.highlight ? 22 : 15, fontWeight: row.highlight ? 800 : 600 }}
                        >
                          {row.render(plan)}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {sectionRow("Covered")}
                  {[0, 1, 2, 3].map((fi) => (
                    <tr key={`feat-${fi}`} style={{ borderTop: "1px solid var(--color-line)" }}>
                      <th scope="row" className="py-2.5 pr-4 text-left align-top" style={{ fontSize: 14, fontWeight: 500, color: "var(--color-muted)" }}>
                        Covered {fi + 1}
                      </th>
                      {plans.map((plan) => (
                        <td key={plan.id} className="py-2.5 px-4 align-top">
                          {plan.features[fi] ? (
                            <div className="flex items-start gap-2" style={{ fontSize: 15, lineHeight: 1.35 }}>
                              <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-teal)" }} strokeWidth={3} />
                              {plan.features[fi]}
                            </div>
                          ) : (
                            <span style={{ color: "var(--color-muted)" }}>None listed</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {sectionRow("Not covered")}
                  {[0, 1, 2].map((ei) => (
                    <tr key={`excl-${ei}`} style={{ borderTop: "1px solid var(--color-line)" }}>
                      <th scope="row" className="py-2.5 pr-4 text-left align-top" style={{ fontSize: 14, fontWeight: 500, color: "var(--color-muted)" }}>
                        Not covered {ei + 1}
                      </th>
                      {plans.map((plan) => (
                        <td key={plan.id} className="py-2.5 px-4 align-top">
                          {plan.notCovered[ei] ? (
                            <div className="flex items-start gap-2" style={{ fontSize: 15, lineHeight: 1.35, color: "var(--color-muted)" }}>
                              <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-stamp)" }} strokeWidth={3} />
                              {plan.notCovered[ei]}
                            </div>
                          ) : (
                            <span style={{ color: "var(--color-muted)" }}>None listed</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr style={{ borderTop: "2px solid var(--color-ink)" }}>
                    <td className="pt-6" />
                    {plans.map((plan) => (
                      <td key={plan.id} className="pt-6 px-4">
                        <div className="flex flex-col gap-2.5">
                          <button
                            onClick={() => {
                              setContactInsurer(plan);
                              setActiveModal("contact");
                            }}
                            className="btn btn-quiet btn-sm"
                          >
                            Contact
                          </button>
                          <a href={plan.contact.website} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                            Get a quote
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
