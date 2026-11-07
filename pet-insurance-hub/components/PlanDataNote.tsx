import Link from "next/link";
import { DATA_CHECKED } from "@/lib/siteInfo";

// Shown beside every grid of plan cards: affiliate disclosure (FTC wants it near the links),
// where the ratings come from, and how fresh the prices are.
export default function PlanDataNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`px-4 py-3 ${className}`}
      style={{
        fontSize: 14,
        lineHeight: 1.55,
        color: "var(--color-muted)",
        background: "var(--color-paper)",
        borderLeft: "4px solid var(--color-tag)",
        borderRadius: 4,
      }}
    >
      <strong style={{ color: "var(--color-ink)" }}>Ranked by customer rating.</strong> &ldquo;Get a quote&rdquo; links
      may earn us a commission at no cost to you; that never changes the order. Data checked {DATA_CHECKED}.{" "}
      <Link href="/about#how-we-rate" className="link-u" style={{ color: "var(--color-ink)" }}>
        How we rate
      </Link>
    </p>
  );
}
