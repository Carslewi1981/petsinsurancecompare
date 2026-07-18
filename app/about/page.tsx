import Link from "next/link";
import { ArrowRight, Shield, Eye, Users, Zap } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Full Transparency",
    description: "We show you all costs, exclusions, and fine print — no hidden fees, no sponsored rankings.",
  },
  {
    icon: Shield,
    title: "Unbiased Comparisons",
    description: "Our ranking algorithm is based purely on coverage quality, pricing, and customer reviews.",
  },
  {
    icon: Users,
    title: "Built for Pet Owners",
    description: "Designed by pet owners who struggled to find clear, honest insurance information.",
  },
  {
    icon: Zap,
    title: "Always Up to Date",
    description: "We update plan details regularly to ensure the information you see is current and accurate.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white" style={{ paddingTop: 44 }}>
      {/* Hero — dark tile */}
      <section className="bg-[#272729]" style={{ padding: "80px 0" }}>
        <div className="max-w-[600px] mx-auto px-4 sm:px-6 text-center">
          <h1
            className="font-bebas text-white leading-none mb-6"
            style={{ fontSize: "clamp(40px, 7vw, 64px)", letterSpacing: "0.02em" }}
          >
            We exist so your pet gets the{" "}
            <span style={{ color: "#2997ff" }}>care it deserves.</span>
          </h1>
          <p className="text-[#cccccc]" style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.231px" }}>
            PetPlan Compare was founded by pet owners frustrated by opaque insurance comparisons,
            confusing policies, and providers who didn&apos;t cover exotic animals.
          </p>
        </div>
      </section>

      {/* Mission — parchment tile */}
      <section className="bg-[#f5f5f7]" style={{ padding: "80px 0" }}>
        <div className="max-w-[740px] mx-auto px-4 sm:px-6">
          <h2
            className="font-semibold text-[#1d1d1f] mb-6"
            style={{ fontSize: 40, lineHeight: 1.1 }}
          >
            Our Mission
          </h2>
          <div className="space-y-4 text-[#1d1d1f]" style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}>
            <p>
              Pet insurance is one of the most important financial decisions a pet owner can make
              — yet the industry has historically been confusing, inconsistent, and exclusionary.
            </p>
            <p>
              PetPlan Compare changes that. We aggregate coverage from across the industry, normalize the
              data for easy comparison, and present it transparently — so you can make the best
              decision for your specific pet, budget, and risk tolerance.
            </p>
            <p>
              We cover dogs, cats, birds, rabbits, reptiles, and exotic animals. We believe every
              companion animal deserves access to quality veterinary care, regardless of species.
            </p>
          </div>
        </div>
      </section>

      {/* How the tool works — white tile */}
      <section className="bg-white" style={{ padding: "80px 0" }}>
        <div className="max-w-[740px] mx-auto px-4 sm:px-6">
          <h2
            className="font-semibold text-[#1d1d1f] mb-6"
            style={{ fontSize: 40, lineHeight: 1.1 }}
          >
            How the Tool Works
          </h2>
          <div className="space-y-4 text-[#1d1d1f]" style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}>
            <p>
              Our comparison database is maintained by a dedicated research team that reviews
              insurance policy documents, monitors pricing changes, and verifies coverage details
              directly with providers on a rolling basis.
            </p>
            <p>
              When you filter by animal type, price, or coverage parameters, we apply those
              filters in real-time against our normalized dataset. No provider pays to appear
              higher in results — rankings are determined entirely by rating, pricing, and
              relevant coverage for your selected criteria.
            </p>
            <p>
              When you click "Get a Quote" or "Contact", you're directed to the provider's own
              systems. PetPlan Compare does not process insurance applications or handle premium payments.
              We are a comparison and education platform only.
            </p>
          </div>
        </div>
      </section>

      {/* Values — parchment tile */}
      <section className="bg-[#f5f5f7]" style={{ padding: "80px 0" }}>
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <h2
            className="font-semibold text-[#1d1d1f] mb-12 text-center"
            style={{ fontSize: 40, lineHeight: 1.1 }}
          >
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-[#e0e0e0] p-6 flex gap-4"
                style={{ borderRadius: 18 }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: "#f0f0f0", borderRadius: 11 }}
                >
                  <v.icon className="w-5 h-5 text-[#0066cc]" />
                </div>
                <div>
                  <h3
                    className="font-semibold text-[#1d1d1f] mb-1"
                    style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.231px" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-[#7a7a7a]" style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}>
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark tile */}
      <section className="bg-[#272729]" style={{ padding: "80px 0" }}>
        <div className="max-w-[400px] mx-auto text-center px-4">
          <h2
            className="font-semibold text-white mb-6"
            style={{ fontSize: 40, lineHeight: 1.1 }}
          >
            Start Comparing Today
          </h2>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 bg-[#0066cc] text-white hover:bg-[#0071e3] transition-colors active:scale-95"
            style={{ fontSize: 18, fontWeight: 300, borderRadius: 9999, padding: "14px 28px" }}
          >
            Compare Plans <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
