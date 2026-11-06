import Link from "next/link";
import { ArrowRight } from "lucide-react";

const values = [
  {
    title: "Full transparency",
    description: "We show you all costs, exclusions, and fine print — no hidden fees, no sponsored rankings.",
  },
  {
    title: "Unbiased comparisons",
    description: "Our ranking algorithm is based purely on coverage quality, pricing, and customer reviews.",
  },
  {
    title: "Built for pet owners",
    description: "Designed by pet owners who struggled to find clear, honest insurance information.",
  },
  {
    title: "Always up to date",
    description: "We update plan details regularly to ensure the information you see is current and accurate.",
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
            PetPlan Compare was founded by pet owners frustrated by opaque insurance comparisons, confusing policies,
            and providers who didn&apos;t cover exotic animals.
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
            Our comparison database is maintained by a dedicated research team that reviews insurance policy documents,
            monitors pricing changes, and verifies coverage details directly with providers on a rolling basis.
          </p>
          <p>
            When you filter by animal type, price, or coverage parameters, we apply those filters in real-time against
            our normalized dataset. No provider pays to appear higher in results — rankings are determined entirely by
            rating, pricing, and relevant coverage for your selected criteria.
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
