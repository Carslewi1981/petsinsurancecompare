import Link from "next/link";
import { DATA_CHECKED, RATINGS_SOURCE } from "@/lib/siteInfo";

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
      <strong style={{ color: "var(--color-ink)" }}>How to read these cards.</strong> &ldquo;Get a quote&rdquo; links may
      be affiliate links: if you buy a policy, we may earn a commission at no cost to you. It never changes the order.
      Plans are ranked by customer rating. {RATINGS_SOURCE}. Prices are estimated starting rates. All figures last
      checked {DATA_CHECKED}.{" "}
      <Link href="/about#how-we-rate" className="link-u" style={{ color: "var(--color-ink)" }}>
        How we rate
      </Link>
    </p>
  );
}
