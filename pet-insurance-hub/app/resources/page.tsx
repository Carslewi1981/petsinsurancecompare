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
    <>
      <header style={{ background: "var(--color-mint)", borderBottom: "2px solid var(--color-ink)" }}>
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <h1 className="display" style={{ fontSize: "clamp(48px, 7.2vw, 108px)", maxWidth: "12ch" }}>
            Pet insurance, explained.
          </h1>
          <p className="mt-5 prose-measure" style={{ fontSize: 20, color: "var(--color-muted)", maxWidth: "50ch" }}>
            Everything you need to know about pet insurance, from deductibles to exotic pet coverage.
          </p>
        </div>
      </header>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8" style={{ padding: "clamp(40px, 6vw, 80px) 32px" }}>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/resources/${article.slug}`}
                className="group flex flex-col h-full p-6 sm:p-7 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--color-paper)", border: "2px solid var(--color-ink)", borderRadius: 14, boxShadow: "4px 4px 0 var(--color-ink)" }}
              >
                <div className="flex items-center justify-between gap-3 mb-4" style={{ fontSize: 15, color: "var(--color-muted)" }}>
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ background: "var(--color-mint-soft)", color: "var(--color-ink)" }}>
                    <span aria-hidden>{animalIcons[article.animal] || "🐾"}</span>
                    {ANIMAL_TYPES.find((a) => a.id === article.animal)?.label || article.animal}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" aria-hidden />
                    {article.readTime}
                  </span>
                </div>
                <h2 className="heading" style={{ fontSize: "clamp(28px, 3vw, 38px)" }}>
                  {article.title}
                </h2>
                <p className="mt-3 prose-measure" style={{ fontSize: 17, lineHeight: 1.55, color: "var(--color-muted)" }}>
                  {article.description}
                </p>
                <span className="mt-auto pt-5 flex items-center gap-2 link-u self-start" style={{ fontSize: 17 }}>
                  Read the guide
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
