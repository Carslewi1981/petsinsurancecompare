import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { articles } from "@/lib/articles";
import { ANIMAL_TYPES } from "@/lib/insurers";

const animalIcons: Record<string, string> = {
  dog: "🐕",
  cat: "🐈",
  bird: "🦜",
  exotic: "✨",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 44 }}>
      {/* Hero — dark tile */}
      <div className="bg-[#272729]" style={{ padding: "80px 0" }}>
        <div className="max-w-[600px] mx-auto px-4 sm:px-6 text-center">
          <h1
            className="font-bebas text-white leading-none mb-4"
            style={{ fontSize: "clamp(40px, 7vw, 64px)", letterSpacing: "0.02em" }}
          >
            Pet Insurance <span style={{ color: "#2997ff" }}>Resources</span>
          </h1>
          <p className="text-[#cccccc]" style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.231px" }}>
            Everything you need to know about pet insurance — from deductibles to exotic pet coverage.
          </p>
        </div>
      </div>

      {/* Articles — white tile */}
      <div className="max-w-[980px] mx-auto px-4 sm:px-6" style={{ padding: "80px 24px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="group bg-white border border-[#e0e0e0] p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-all"
              style={{ borderRadius: 18 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="flex items-center gap-2 px-3 py-1"
                  style={{ background: "#f5f5f7", borderRadius: 9999 }}
                >
                  <span>{animalIcons[article.animal] || "🐾"}</span>
                  <span className="text-[#7a7a7a]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>
                    {ANIMAL_TYPES.find((a) => a.id === article.animal)?.label || article.animal}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#7a7a7a]" style={{ fontSize: 12 }}>
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </div>
              </div>
              <h2
                className="font-semibold text-[#1d1d1f] mb-2 group-hover:text-[#0066cc] transition-colors"
                style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.231px" }}
              >
                {article.title}
              </h2>
              <p className="text-[#7a7a7a] mb-4" style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}>
                {article.description}
              </p>
              <div className="flex items-center gap-1.5 text-[#0066cc]" style={{ fontSize: 17, letterSpacing: "-0.374px" }}>
                Read Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
