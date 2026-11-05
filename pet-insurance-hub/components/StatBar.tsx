"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export default function StatBar() {
  const { t } = useStore();

  const stats = [
    t.bar_providers, t.bar_types, t.bar_sideBySide,
    t.bar_freeToUse, t.bar_noFees, t.bar_updated, t.bar_trusted,
  ];

  const doubled = [...stats, ...stats];

  return (
    <div style={{ background: "#0a0a0b", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "11px 0", overflow: "hidden" }}>
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((stat, i) => (
          <span key={i} className="flex items-center gap-3 flex-shrink-0">
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#c9a96e", opacity: 0.6 }} />
            <span style={{ fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", fontWeight: 400 }}>
              {stat}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
