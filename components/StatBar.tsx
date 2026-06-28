"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export default function StatBar() {
  const { t } = useStore();

  const stats = [
    t.bar_providers,
    t.bar_types,
    t.bar_sideBySide,
    t.bar_freeToUse,
    t.bar_noFees,
    t.bar_updated,
    t.bar_trusted,
  ];

  const doubled = [...stats, ...stats];

  return (
    <div className="bg-[#000000] overflow-hidden py-3">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((stat, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] flex-shrink-0" />
            <span className="text-[12px] tracking-[-0.12px] text-[#a1a1a6]">{stat}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
