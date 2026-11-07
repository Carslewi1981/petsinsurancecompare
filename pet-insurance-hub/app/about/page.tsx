import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DATA_CHECKED, RATINGS_SOURCE } from "@/lib/siteInfo";

const values = [
  {
    title: "Full transparency",
    description: "We show you all costs, exclusions, and fine print — no hidden fees, no sponsored rankings.",
  },
  {
    title: "Unbiased comparisons",
    description: "Plans are ranked by customer rating, and the same rule applies to every provider. Affiliate commissions never change the order.",
  },
  {
    title: "Built for pet owners",
    description: "Every card shows what a plan covers, what it excludes, and its waiting period, side by side.",
  },
  {
    title: "Always up to date",
    description: "Every price and rating carries the date it was last checked, so you know how fresh it is.",
  },
];

function Section({
  title,
  children,
  tone = "chart",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "chart" | "mint";
}) {
  return (
    <section
      style={{
        background: tone === "mint" ? "var(--color-mint)" : undefined,
        padding: "clamp(56px, 8vw, 104px) 0",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-8 lg:gap-20">
        <h2 className="display" style={{ fontSize: "clamp(36px, 4.6vw, 64px)" }}>
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <section style={{ padding: "clamp(48px, 8vw, 112px) 0 clamp(40px, 6vw, 80px)" }}>
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <h1 className="display" style={{ fontSize: "clamp(52px, 8.4vw, 132px)", maxWidth: "14ch" }}>
            We exist so your pet gets the care it deserves.
          </h1>
          <p className="prose-measure mt-8" style={{ fontSize: "clamp(19px, 1.8vw, 24px)", lineHeight: 1.5, color: "var(--color-muted)", maxWidth: "52ch" }}>
            PetPlan Compare is an independent comparison site. We are not an insurer, broker, or agent, and no
            provider pays to be listed or ranked.
          </p>
        </div>
      </section>

      <Section title="Our mission" tone="mint">
        <div className="space-y-5 prose-measure" style={{ fontSize: 19, lineHeight: 1.65 }}>
          <p>
            Pet insurance is one of the most important financial decisions a pet owner can make — yet the industry has
            historically been confusing, inconsistent, and exclusionary.
          </p>
          <p>
            PetPlan Compare changes that. We aggregate coverage from across the industry, normalize the data for easy
            comparison, and present it transparently — so you can make the best decision for your specific pet, budget,
            and risk tolerance.
          </p>
          <p>
            Most pet insurance is written for dogs and cats, and that is where most of the plans on this site are. For
            birds, rabbits, reptiles, and exotics the choice is much smaller, and we say so plainly rather than pad the
            list.
          </p>
        </div>
      </Section>

      <Section title="Who runs this">
        <div className="space-y-5 prose-measure" style={{ fontSize: 19, lineHeight: 1.65 }}>
          <p>
            PetPlan Compare is built and run by Carl, an independent business owner. It is not owned by, funded by, or
            affiliated with any insurance company.
          </p>
        </div>
      </Section>

      <div id="how-we-rate" style={{ scrollMarginTop: 96 }} />
      <Section title="How we rate" tone="mint">
        <div className="space-y-5 prose-measure" style={{ fontSize: 19, lineHeight: 1.65 }}>
          <p>
            <strong>Ranking.</strong> &ldquo;Top rated&rdquo; and the default order on the compare page are sorted by
            customer star rating, highest first. Nothing else moves a provider up or down. You can re-sort by price,
            number of reviews, claims speed, or breed match.
          </p>
          <p>
            <strong>Ratings.</strong> {RATINGS_SOURCE}. They are a snapshot, not a live feed.
          </p>
          <p>
            <strong>Prices.</strong> Monthly prices are estimated starting rates from publicly available information.
            Your real price depends on your pet&apos;s age, breed, and location, so always get a quote from the provider.
          </p>
          <p>
            <strong>Plan terms.</strong> Reimbursement, deductibles, annual limits, waiting periods, and exclusions come
            from each provider&apos;s published plan information.
          </p>
          <p>
            <strong>Last checked:</strong> {DATA_CHECKED}.
          </p>
        </div>
      </Section>

      <Section title="How the tool works">
        <div className="space-y-5 prose-measure" style={{ fontSize: 19, lineHeight: 1.65 }}>
          <p>
            When you filter by animal type, price, or coverage, we apply those filters instantly to the same plan data
            for every provider. No provider pays to appear higher in results.
          </p>
          <p>
            When you click &ldquo;Get a quote&rdquo; or &ldquo;Contact&rdquo;, you&apos;re directed to the
            provider&apos;s own systems. PetPlan Compare does not process insurance applications or handle premium
            payments. We are a comparison and education platform only. Some of those links may be affiliate links, which can earn us a
            commission at no cost to you; that never affects the order plans appear in.
          </p>
        </div>
      </Section>

      <Section title="What we stand for" tone="mint">
        <dl style={{ borderTop: "2px solid var(--color-ink)" }}>
          {values.map((v) => (
            <div
              key={v.title}
              className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-2 md:gap-8 py-6"
              style={{ borderBottom: "2px dashed var(--color-line)" }}
            >
              <dt className="heading" style={{ fontSize: 28 }}>
                {v.title}
              </dt>
              <dd style={{ fontSize: 18, lineHeight: 1.6 }}>{v.description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <section style={{ background: "var(--color-tag)", padding: "clamp(56px, 8vw, 104px) 0" }}>
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <h2 className="display" style={{ fontSize: "clamp(44px, 6vw, 88px)" }}>
            Start comparing today.
          </h2>
          <Link href="/compare" className="btn btn-ink self-start md:self-auto">
            Compare plans
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
