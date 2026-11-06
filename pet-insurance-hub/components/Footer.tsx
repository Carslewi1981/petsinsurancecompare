"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { PawMark } from "@/components/Navbar";

function FooterLinks({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="heading" style={{ fontSize: 20, color: "var(--color-tag)", marginBottom: 16 }}>
        {title}
      </h2>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-white/80 hover:text-white underline-offset-4 hover:underline"
              style={{ fontSize: 16 }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { t } = useStore();

  const compareLinks = [
    { label: t.footer_dogs, href: "/compare?animal=dogs" },
    { label: t.footer_cats, href: "/compare?animal=cats" },
    { label: t.footer_birds, href: "/compare?animal=birds" },
    { label: t.footer_rabbits, href: "/compare?animal=rabbits" },
    { label: t.footer_reptiles, href: "/compare?animal=reptiles" },
    { label: t.footer_exotic, href: "/compare?animal=exotic" },
  ];

  const resourceLinks = [
    { label: t.footer_deductibles, href: "/resources/how-deductibles-work" },
    { label: t.footer_preExisting, href: "/resources/pre-existing-conditions" },
    { label: t.footer_exoticGuide, href: "/resources/exotic-pet-coverage-guide" },
    { label: t.footer_whenToBuy, href: "/resources/when-to-buy-pet-insurance" },
  ];

  const companyLinks = [
    { label: t.footer_about, href: "/about" },
    { label: t.footer_howItWorks, href: "/#how-it-works" },
    { label: t.footer_resources, href: "/resources" },
  ];

  return (
    <footer className="on-dark" style={{ background: "var(--color-scrub)", color: "#fff" }}>
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 py-16 border-b"
          style={{ borderColor: "rgba(255,255,255,0.14)" }}
        >
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-5" aria-label="PetPlan Compare, home">
              <PawMark size={40} />
              <span className="heading" style={{ fontSize: 28, lineHeight: 1 }}>
                PetPlan Compare
              </span>
            </Link>
            <p className="prose-measure text-white/80" style={{ fontSize: 16, lineHeight: 1.65, maxWidth: "36ch" }}>
              {t.footer_desc}
            </p>
            <div className="mt-7">
              <Link href="/compare" className="btn btn-sm">
                Compare plans
              </Link>
            </div>
          </div>

          <FooterLinks title={t.footer_compare} items={compareLinks} />
          <FooterLinks title={t.footer_resources} items={resourceLinks} />
          <FooterLinks title={t.footer_company} items={companyLinks} />
        </div>

        <div className="py-8 flex flex-col gap-5">
          {/* Affiliate disclosure — required by FTC */}
          <p
            className="px-5 py-4 text-white/85"
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              background: "rgba(255,255,255,0.07)",
              borderLeft: "4px solid var(--color-tag)",
              borderRadius: 4,
            }}
          >
            <strong className="text-white">Affiliate disclosure.</strong> Some links on this site are
            affiliate links. If you click through and purchase a policy, PetPlan Compare may receive a
            commission from the insurer at no extra cost to you. This does not influence our rankings,
            coverage summaries, or editorial content — all 12 providers are evaluated using the same
            criteria regardless of affiliate relationship.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <p className="text-white/70" style={{ fontSize: 14, lineHeight: 1.65, maxWidth: "80ch" }}>
              <strong className="text-white">Disclaimer.</strong> {t.footer_disclaimer}
            </p>
            <p className="text-white/70 flex-shrink-0" style={{ fontSize: 14 }}>
              © {new Date().getFullYear()} PetPlan Compare
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
