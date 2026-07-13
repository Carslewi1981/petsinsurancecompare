"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { t } = useStore();

  const compareLinks = [
    { label: t.footer_dogs, animal: "dogs" },
    { label: t.footer_cats, animal: "cats" },
    { label: t.footer_birds, animal: "birds" },
    { label: t.footer_rabbits, animal: "rabbits" },
    { label: t.footer_reptiles, animal: "reptiles" },
    { label: t.footer_exotic, animal: "exotic" },
  ];

  const resourceLinks = [
    { label: t.footer_deductibles, slug: "how-deductibles-work" },
    { label: t.footer_preExisting, slug: "pre-existing-conditions" },
    { label: t.footer_exoticGuide, slug: "exotic-pet-coverage-guide" },
    { label: t.footer_whenToBuy, slug: "when-to-buy-pet-insurance" },
  ];

  const companyLinks = [
    { label: t.footer_about, href: "/about" },
    { label: t.footer_howItWorks, href: "/#how-it-works" },
    { label: t.footer_resources, href: "/resources" },
  ];

  return (
    <footer style={{ background: "#0c0c0d", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 py-20 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-baseline gap-1.5 mb-6">
              <span
                className="font-[var(--font-playfair-next)] italic text-white leading-none"
                style={{ fontSize: 22, fontWeight: 500 }}
              >
                PetPlan
              </span>
              <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>
                Compare
              </span>
            </Link>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.3)", maxWidth: 280 }}>
              {t.footer_desc}
            </p>
            <div className="mt-8">
              <Link href="/compare" className="btn-gold" style={{ fontSize: 11, padding: "10px 24px" }}>
                Compare Now
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Compare */}
          <div>
            <h4 style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 20 }}>
              {t.footer_compare}
            </h4>
            <ul className="flex flex-col gap-3">
              {compareLinks.map((a) => (
                <li key={a.animal}>
                  <Link
                    href={`/compare?animal=${a.animal}`}
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#c9a96e"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 20 }}>
              {t.footer_resources}
            </h4>
            <ul className="flex flex-col gap-3">
              {resourceLinks.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/resources/${r.slug}`}
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#c9a96e"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 20 }}>
              {t.footer_company}
            </h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#c9a96e"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="py-8 flex flex-col gap-4">
          {/* Affiliate disclosure — required by FTC */}
          <div
            className="px-4 py-3"
            style={{ background: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.12)" }}
          >
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", lineHeight: 1.7 }}>
              <strong style={{ color: "#c9a96e", letterSpacing: "0.06em", textTransform: "uppercase", fontSize: 9 }}>
                Affiliate Disclosure&nbsp;&nbsp;
              </strong>
              Some links on this site are affiliate links. If you click through and purchase a policy, PetPlan Compare may receive a commission from the insurer at no extra cost to you. This does not influence our rankings, coverage summaries, or editorial content — all 12 providers are evaluated using the same criteria regardless of affiliate relationship.
            </p>
          </div>

          {/* Legal disclaimer + copyright */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", lineHeight: 1.7, maxWidth: 640 }}>
              <strong style={{ color: "#c9a96e", letterSpacing: "0.06em", textTransform: "uppercase", fontSize: 9 }}>Disclaimer&nbsp;&nbsp;</strong>{t.footer_disclaimer}
            </p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", flexShrink: 0 }}>
              © {new Date().getFullYear()} PetPlan Compare
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
