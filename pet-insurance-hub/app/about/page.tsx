import Link from "next/link";
import { ArrowRight } from "lucide-react";

const values = [
  {
    title: "Full transparency",
    description: "We show costs, exclusions, and fine print for every plan, and we say how we earn money.",
  },
  {
    title: "Rankings we don't sell",
    description: "No insurer pays to rank higher. Commissions never change the order of the list.",
  },
  {
    title: "Clear to pet owners",
    description: "Plain language, the same details for every plan, and exotic pets included.",
  },
  {
    title: "Checked, with a date",
    description: "Plan details were last checked in October 2026. Always confirm terms with the insurer before you buy.",
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
            PetPlan Compare puts pet insurance plans side by side in plain language, including for birds, reptiles,
            and other exotic pets that most comparison sites skip.
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
            We cover dogs, cats, birds, rabbits, reptiles, and exotic animals. We believe every companion animal
            deserves access to quality veterinary care, regardless of species.
          </p>
        </div>
      </Section>

      <Section title="How the tool works">
        <div className="space-y-5 prose-measure" style={{ fontSize: 19, lineHeight: 1.65 }}>
          <p>
            We put plan details for every insurer in one format so they are easy to compare. Prices are estimates,
            not quotes, and they change, so confirm the terms with the insurer before you buy.
          </p>
          <p id="how-we-rate">
            By default the list is sorted by star rating, highest first. You can sort by price, reviews, claims speed,
            or breed match instead. No insurer pays to rank higher. Some links are affiliate links, so we may earn a
            commission if you buy a policy, and that never changes the order.
          </p>
          <p>
            When you click &ldquo;Get a quote&rdquo; or &ldquo;Contact&rdquo;, you&apos;re directed to the
            provider&apos;s own systems. PetPlan Compare does not process insurance applications or handle premium
            payments. We are a comparison and education platform only.
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
