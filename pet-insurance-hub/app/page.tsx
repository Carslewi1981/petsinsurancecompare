"use client";

import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import VetBill from "@/components/VetBill";
import HowItWorks from "@/components/HowItWorks";
import PetGallery from "@/components/PetGallery";
import PlanCard from "@/components/PlanCard";
import { insurers } from "@/lib/insurers";
import { useStore } from "@/lib/store";

const topPlans = [...insurers].sort((a, b) => b.rating - a.rating).slice(0, 3);

const WE_DO = [
  "Score every provider on the same criteria",
  "Show exclusions and waiting periods next to coverage",
  "Publish reviews from confirmed pet owners",
  "Recheck plan terms every month",
  "Keep the whole comparison free, with no account",
];

const WE_NEVER = [
  "Sell rankings or paid placements",
  "Hide what a plan does not cover",
  "Run or belong to an insurance company",
  "Ask you to sign up before you compare",
];

export default function HomePage() {
  const { t } = useStore();

  return (
    <>
      {/* ── HERO: the headline, and the bill it is about ── */}
      <section style={{ padding: "clamp(36px, 6vw, 80px) 0 clamp(56px, 8vw, 104px)" }}>
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.02fr] gap-12 lg:gap-16 items-start">
          <div className="lg:pt-6">
            <h1 className="display" style={{ fontSize: "clamp(56px, 8.4vw, 124px)" }}>
              Know what the vet bill will be before it arrives.
            </h1>
            <p
              className="prose-measure mt-7"
              style={{ fontSize: "clamp(18px, 1.6vw, 21px)", lineHeight: 1.55, color: "var(--color-muted)", maxWidth: "40ch" }}
            >
              {t.hero_sub}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/compare" className="btn">
                {t.hero_cta1}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#how-it-works" className="btn btn-quiet">
                {t.hero_cta2}
              </a>
            </div>
            <p className="mt-8" style={{ fontSize: 15, color: "var(--color-muted)", maxWidth: "46ch", lineHeight: 1.5 }}>
              {insurers.length} providers for dogs, cats, birds, rabbits, reptiles and exotics. Free, with no account.
            </p>
          </div>

          <VetBill />
        </div>
      </section>

      <HowItWorks />

      {/* ── TOP PLANS ── */}
      <section style={{ padding: "clamp(64px, 9vw, 120px) 0" }}>
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
            <div>
              <h2 className="display" style={{ fontSize: "clamp(40px, 5.5vw, 76px)" }}>
                {t.feat_title}
              </h2>
              <p className="mt-3" style={{ fontSize: 19, color: "var(--color-muted)" }}>
                {t.feat_sub}
              </p>
            </div>
            <Link href="/compare" className="link-u" style={{ fontSize: 17 }}>
              {t.feat_seeAll}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {topPlans.map((insurer, i) => (
              <PlanCard key={insurer.id} insurer={insurer} animal="all" index={i} />
            ))}
          </div>

          <p className="mt-10 prose-measure" style={{ fontSize: 15, color: "var(--color-muted)" }}>
            {t.prov_title}: {insurers.map((i) => i.name).join(", ")}.
          </p>
        </div>
      </section>

      <PetGallery />

      {/* ── WHY: laid out like the coverage page of a policy ── */}
      <section style={{ padding: "clamp(64px, 9vw, 120px) 0" }}>
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-20 items-start">
            <div>
              <h2 className="display" style={{ fontSize: "clamp(44px, 6vw, 88px)" }}>
                Clarity over confusion.
              </h2>
              <p className="prose-measure mt-5" style={{ fontSize: 19, color: "var(--color-muted)", maxWidth: "36ch" }}>
                Pet insurance is full of jargon. We cut through it and put plans side by side, so you can decide with
                confidence.
              </p>
              <Link href="/compare" className="btn mt-8">
                Compare plans
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2"
              style={{ background: "var(--color-paper)", border: "2px solid var(--color-ink)", borderRadius: 14, overflow: "hidden" }}
            >
              <div className="p-6 sm:p-8" style={{ background: "var(--color-mint-soft)" }}>
                <h3 className="heading mb-4" style={{ fontSize: 30 }}>
                  What we do
                </h3>
                <ul className="space-y-3.5">
                  {WE_DO.map((item) => (
                    <li key={item} className="flex items-start gap-3" style={{ fontSize: 17, lineHeight: 1.4 }}>
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--color-teal)" }} strokeWidth={3.5} aria-label="Yes" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 sm:p-8 sm:border-l-2 border-t-2 sm:border-t-0" style={{ borderColor: "var(--color-ink)" }}>
                <h3 className="heading mb-4" style={{ fontSize: 30 }}>
                  What we never do
                </h3>
                <ul className="space-y-3.5">
                  {WE_NEVER.map((item) => (
                    <li key={item} className="flex items-start gap-3" style={{ fontSize: 17, lineHeight: 1.4 }}>
                      <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--color-stamp)" }} strokeWidth={3.5} aria-label="No" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: "var(--color-tag)", padding: "clamp(64px, 9vw, 120px) 0" }}>
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <h2 className="display" style={{ fontSize: "clamp(48px, 7vw, 108px)" }}>
            {t.cta_title}
          </h2>
          <div>
            <p className="prose-measure" style={{ fontSize: 20, lineHeight: 1.5, maxWidth: "34ch" }}>
              {t.cta_sub}
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/compare" className="btn btn-ink">
                {t.cta_btn}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/resources" className="btn btn-quiet">
                Read the guides
              </Link>
            </div>
            <p className="mt-5" style={{ fontSize: 15 }}>
              Free, no account required, no hidden fees.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
