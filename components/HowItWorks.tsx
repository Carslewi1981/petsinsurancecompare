"use client";

import { useStore } from "@/lib/store";

export default function HowItWorks() {
  const { t } = useStore();

  const steps = [
    { number: "01", title: t.how_s1_title, description: t.how_s1_desc },
    { number: "02", title: t.how_s2_title, description: t.how_s2_desc },
    { number: "03", title: t.how_s3_title, description: t.how_s3_desc },
  ];

  return (
    <section id="how-it-works" className="bg-[#f5f5f7]" style={{ padding: "80px 0" }}>
      <div className="max-w-[980px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2
            className="font-semibold text-[#1d1d1f] mb-3"
            style={{ fontSize: 40, lineHeight: 1.1, letterSpacing: 0 }}
          >
            {t.how_title}
          </h2>
          <p className="text-[#7a7a7a] text-[21px] font-light max-w-xl mx-auto" style={{ letterSpacing: 0 }}>
            {t.how_sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-[#e0e0e0] p-6"
              style={{ borderRadius: 18 }}
            >
              <div
                className="font-semibold text-[#0066cc] mb-4"
                style={{ fontSize: 34, lineHeight: 1.47, letterSpacing: "-0.374px" }}
              >
                {step.number}
              </div>
              <h3
                className="font-semibold text-[#1d1d1f] mb-2"
                style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.231px" }}
              >
                {step.title}
              </h3>
              <p className="text-[#7a7a7a]" style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
