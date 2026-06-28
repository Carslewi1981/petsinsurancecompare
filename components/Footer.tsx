"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

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
    <footer className="bg-[#f5f5f7]" style={{ padding: "64px 0 0" }}>
      <div className="max-w-[980px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-[#e0e0e0]">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-bebas text-xl tracking-widest text-[#1d1d1f] mb-3">
              Petz Insurance<span className="text-[#0066cc]"> Compare</span>
            </div>
            <p className="text-[#7a7a7a] text-[12px] leading-relaxed">
              {t.footer_desc}
            </p>
          </div>

          {/* Compare */}
          <div>
            <h4 className="text-[12px] font-semibold text-[#1d1d1f] tracking-[-0.12px] mb-3">{t.footer_compare}</h4>
            <ul>
              {compareLinks.map((a) => (
                <li key={a.animal}>
                  <Link
                    href={`/compare?animal=${a.animal}`}
                    className="text-[17px] text-[#0066cc] leading-[2.41] tracking-[0] hover:underline block"
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[12px] font-semibold text-[#1d1d1f] tracking-[-0.12px] mb-3">{t.footer_resources}</h4>
            <ul>
              {resourceLinks.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/resources/${r.slug}`}
                    className="text-[17px] text-[#0066cc] leading-[2.41] tracking-[0] hover:underline block"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[12px] font-semibold text-[#1d1d1f] tracking-[-0.12px] mb-3">{t.footer_company}</h4>
            <ul>
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[17px] text-[#0066cc] leading-[2.41] tracking-[0] hover:underline block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6">
          <p className="text-[12px] text-[#7a7a7a] leading-relaxed max-w-4xl mb-3">
            <strong className="text-[#333333]">Disclaimer:</strong> {t.footer_disclaimer}
          </p>
          <p className="text-[12px] text-[#7a7a7a]">
            © {new Date().getFullYear()} Petz Insurance Compare. {t.footer_rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
