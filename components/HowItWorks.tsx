"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export default function HowItWorks() {
  const { t } = useStore();

  const steps = [
    { number: "01", title: t.how_s1_title, description: t.how_s1_desc },
    { number: "02", title: t.how_s2_title, description: t.how_s2_desc },
    { number: "03", title: t.how_s3_title, description: t.how_s3_desc },
  ];

  return (
    <section id="how-it-works" style={{ background: "#faf8f4", padding: "140px 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 mb-20">
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c9a96e", fontWeight: 500, marginBottom: 14 }}
            >
              The Process
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-[var(--font-playfair-next)]"
              style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 500, color: "#1a1814", lineHeight: 1.15, letterSpacing: "-0.025em" }}
            >
              {t.how_title}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: 16, lineHeight: 1.7, color: "#6b6560", maxWidth: 340 }}
          >
            {t.how_sub}
          </motion.p>
        </div>

        {/* Horizontal rule */}
        <div className="rule-gold mb-0" />

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative py-14"
              style={{
                borderRight: i < 2 ? "1px solid rgba(0,0,0,0.07)" : "none",
                paddingLeft: i === 0 ? 0 : 48,
                paddingRight: i === 2 ? 0 : 48,
                borderTop: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              {/* Big number */}
              <div
                className="font-[var(--font-bebas-next)] mb-6"
                style={{
                  fontSize: 80,
                  lineHeight: 1,
                  color: "rgba(201,169,110,0.15)",
                  letterSpacing: "0.02em",
                  userSelect: "none",
                }}
              >
                {step.number}
              </div>

              {/* Gold dot accent */}
              <div className="w-2 h-2 rounded-full mb-5" style={{ background: "#c9a96e" }} />

              <h3
                style={{ fontSize: 20, fontWeight: 600, color: "#1a1814", marginBottom: 10, letterSpacing: "-0.015em", lineHeight: 1.3 }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "#6b6560" }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
