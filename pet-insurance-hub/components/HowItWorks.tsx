"use client";

import { useStore } from "@/lib/store";

export default function HowItWorks() {
  const { t } = useStore();

  // This one really is a sequence, so the steps are numbered.
  const steps = [
    { title: t.how_s1_title, description: t.how_s1_desc },
    { title: t.how_s2_title, description: t.how_s2_desc },
    { title: t.how_s3_title, description: t.how_s3_desc },
  ];

  return (
    <section
      id="how-it-works"
      className="on-dark"
      style={{ background: "var(--color-scrub)", color: "#fff", padding: "clamp(64px, 9vw, 120px) 0" }}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20">
          <div>
            <h2 className="display" style={{ fontSize: "clamp(44px, 6vw, 84px)" }}>
              {t.how_title}
            </h2>
            <p className="prose-measure mt-5 text-white/85" style={{ fontSize: 19, lineHeight: 1.55, maxWidth: "34ch" }}>
              {t.how_sub}
            </p>
          </div>

          <ol className="relative">
            {steps.map((step, i) => (
              <li key={step.title} className="relative flex gap-5 sm:gap-7 pb-10 last:pb-0">
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute"
                    style={{
                      left: 27,
                      top: 60,
                      bottom: 4,
                      borderLeft: "3px dotted rgba(255,255,255,0.35)",
                    }}
                  />
                )}
                <span
                  className="flex-shrink-0 flex items-center justify-center rounded-full display"
                  style={{
                    width: 56,
                    height: 56,
                    fontSize: 30,
                    background: "var(--color-tag)",
                    color: "var(--color-ink)",
                    lineHeight: 1,
                  }}
                >
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="heading" style={{ fontSize: "clamp(26px, 3vw, 34px)" }}>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-white/85 prose-measure" style={{ fontSize: 17, lineHeight: 1.6, maxWidth: "52ch" }}>
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
