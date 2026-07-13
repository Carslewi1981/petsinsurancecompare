"use client";

import { motion } from "framer-motion";
import { LayoutList, Equal, Ban, UserX, Coins } from "lucide-react";

const SIGNALS = [
  { icon: <LayoutList className="w-3.5 h-3.5" />, title: "12 providers compared" },
  { icon: <Equal className="w-3.5 h-3.5" />, title: "1 standard format — same criteria for all" },
  { icon: <Ban className="w-3.5 h-3.5" />, title: "0 paid rankings" },
  { icon: <Coins className="w-3.5 h-3.5" />, title: "Always free to use" },
  { icon: <UserX className="w-3.5 h-3.5" />, title: "No account required" },
];

export default function TrustBar() {
  return (
    <div style={{ background: "#0c0c0d", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "14px 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {SIGNALS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <span style={{ color: "#c9a96e", opacity: 0.7 }}>{s.icon}</span>
              <span style={{ fontSize: 11, letterSpacing: "0.06em", color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>
                {s.title}
              </span>
              {i < SIGNALS.length - 1 && (
                <span className="hidden sm:block ml-8" style={{ width: 1, height: 12, background: "rgba(255,255,255,0.08)" }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
