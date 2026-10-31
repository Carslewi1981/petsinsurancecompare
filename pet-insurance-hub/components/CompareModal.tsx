"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Printer } from "lucide-react";
import { useStore } from "@/lib/store";
import { insurers, ANIMAL_TYPES } from "@/lib/insurers";
import StarRating from "./StarRating";

export default function CompareModal() {
  const { activeModal, setActiveModal, comparedIds, selectedAnimal, setContactInsurer } = useStore();
  const isOpen = activeModal === "compare";

  const plans = insurers.filter((i) => comparedIds.includes(i.id));

  const getPrice = (insurer: (typeof insurers)[0]) => {
    if (selectedAnimal === "all") {
      return Math.min(...Object.values(insurer.monthlyPrice).filter((p) => p > 0));
    }
    return insurer.monthlyPrice[selectedAnimal] || 0;
  };

  const rows = [
    { label: "Monthly Price", render: (i: (typeof insurers)[0]) => `$${getPrice(i)}/mo`, highlight: true },
    { label: "Reimbursement", render: (i: (typeof insurers)[0]) => i.reimbursement },
    { label: "Annual Maximum", render: (i: (typeof insurers)[0]) => i.maxAnnual },
    { label: "Deductible Range", render: (i: (typeof insurers)[0]) => i.deductible },
    { label: "Claims Processing", render: (i: (typeof insurers)[0]) => i.claimsTime },
    { label: "App Rating", render: (i: (typeof insurers)[0]) => `⭐ ${i.appRating}` },
    { label: "Waiting Period", render: (i: (typeof insurers)[0]) => i.waitingPeriod },
    {
      label: "Animals Covered",
      render: (i: (typeof insurers)[0]) =>
        i.animals.map((a) => ANIMAL_TYPES.find((t) => t.id === a)?.icon).join(" "),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="bg-white w-full max-w-5xl max-h-[90vh] overflow-auto"
            style={{ borderRadius: 18, border: "1px solid #e0e0e0" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-6 sticky top-0 bg-white z-10"
              style={{ borderBottom: "1px solid #e0e0e0" }}
            >
              <div>
                <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: 21, letterSpacing: "0.231px" }}>
                  Plan Comparison
                </h2>
                <p className="text-[#7a7a7a]" style={{ fontSize: 14, letterSpacing: "-0.224px" }}>
                  Side-by-side analysis of {plans.length} selected plans
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 text-[#0066cc] px-4 py-2 hover:text-[#0071e3] transition-colors active:scale-95"
                  style={{ border: "1px solid #0066cc", borderRadius: 9999, fontSize: 14, letterSpacing: "-0.224px" }}
                >
                  <Printer className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 text-[#7a7a7a] hover:text-[#1d1d1f] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left w-40 pr-4" />
                    {plans.map((plan) => (
                      <th key={plan.id} className="text-center pb-6 px-3">
                        <div
                          className="w-14 h-14 mx-auto flex items-center justify-center text-2xl mb-2"
                          style={{ backgroundColor: plan.color + "15", borderRadius: 8 }}
                        >
                          {plan.logo}
                        </div>
                        <div className="font-semibold" style={{ fontSize: 17, letterSpacing: "-0.374px", color: plan.color }}>
                          {plan.name}
                        </div>
                        <div className="mt-1">
                          <StarRating rating={plan.rating} size="sm" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} style={{ borderTop: "1px solid #f0f0f0", background: row.highlight ? "#f5f5f7" : "transparent" }}>
                      <td className="py-3 pr-4 whitespace-nowrap text-[#7a7a7a]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>
                        {row.label}
                      </td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="py-3 px-3 text-center">
                          <span
                            className="font-semibold"
                            style={{ fontSize: row.highlight ? 17 : 14, color: row.highlight ? "#1d1d1f" : "#333333", letterSpacing: "-0.224px" }}
                          >
                            {row.render(plan)}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Features */}
                  <tr style={{ background: "#f5f5f7" }}>
                    <td colSpan={plans.length + 1} className="py-3 px-0">
                      <span className="font-semibold text-[#1d1d1f]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>Top Features</span>
                    </td>
                  </tr>
                  {[0, 1, 2, 3].map((fi) => (
                    <tr key={`feat-${fi}`} style={{ borderTop: "1px solid #f0f0f0" }}>
                      <td className="py-2 pr-4 text-[#7a7a7a] whitespace-nowrap" style={{ fontSize: 12 }}>Feature {fi + 1}</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="py-2 px-3 text-center">
                          {plan.features[fi] ? (
                            <div className="flex items-center gap-1.5 justify-center">
                              <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                              <span className="text-[#333333]" style={{ fontSize: 12 }}>{plan.features[fi]}</span>
                            </div>
                          ) : (
                            <span className="text-[#d2d2d7]">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Exclusions */}
                  <tr style={{ background: "#f5f5f7" }}>
                    <td colSpan={plans.length + 1} className="py-3 px-0">
                      <span className="font-semibold text-[#1d1d1f]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>Top Exclusions</span>
                    </td>
                  </tr>
                  {[0, 1, 2].map((ei) => (
                    <tr key={`excl-${ei}`} style={{ borderTop: "1px solid #f0f0f0" }}>
                      <td className="py-2 pr-4 text-[#7a7a7a]" style={{ fontSize: 12 }}>Exclusion {ei + 1}</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="py-2 px-3 text-center">
                          {plan.notCovered[ei] ? (
                            <span className="text-[#7a7a7a]" style={{ fontSize: 12 }}>{plan.notCovered[ei]}</span>
                          ) : (
                            <span className="text-[#d2d2d7]">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr style={{ borderTop: "1px solid #e0e0e0" }}>
                    <td className="pt-6" />
                    {plans.map((plan) => (
                      <td key={plan.id} className="pt-6 px-3">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => {
                              setContactInsurer(plan);
                              setActiveModal("contact");
                            }}
                            className="text-[#0066cc] py-2 hover:text-[#0071e3] transition-colors active:scale-95"
                            style={{ border: "1px solid #0066cc", borderRadius: 9999, fontSize: 14, letterSpacing: "-0.224px" }}
                          >
                            Contact
                          </button>
                          <a
                            href={plan.contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#0066cc] text-white py-2 text-center hover:bg-[#0071e3] transition-colors active:scale-95"
                            style={{ borderRadius: 9999, fontSize: 14, letterSpacing: "-0.224px" }}
                          >
                            Get Quote →
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
