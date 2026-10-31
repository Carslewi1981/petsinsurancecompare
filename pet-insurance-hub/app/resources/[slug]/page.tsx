import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { articles } from "@/lib/articles";
import { ANIMAL_TYPES } from "@/lib/insurers";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="font-semibold text-[#1d1d1f] mt-10 mb-4"
          style={{ fontSize: 28, lineHeight: 1.14, letterSpacing: "0.196px" }}
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="font-semibold text-[#1d1d1f] mb-2" style={{ fontSize: 17, letterSpacing: "-0.374px" }}>
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 mb-4 text-[#1d1d1f]" style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}>
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ul>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside space-y-1 mb-4 text-[#1d1d1f]" style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}>
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ol>
      );
      continue;
    } else if (line.trim() !== "") {
      elements.push(
        <p
          key={i}
          className="text-[#1d1d1f] mb-4"
          style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}
          dangerouslySetInnerHTML={{
            __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
          }}
        />
      );
    }
    i++;
  }

  return elements;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const animalLabel = ANIMAL_TYPES.find((a) => a.id === article.animal)?.label || article.animal;
  const animalIcon = ANIMAL_TYPES.find((a) => a.id === article.animal)?.icon || "🐾";

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 44 }}>
      <div className="max-w-[980px] mx-auto px-4 sm:px-6" style={{ padding: "64px 24px" }}>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article */}
          <article className="flex-1 min-w-0">
            <Link
              href="/resources"
              className="flex items-center gap-2 text-[#0066cc] mb-8 hover:text-[#0071e3] transition-colors"
              style={{ fontSize: 17, letterSpacing: "-0.374px" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Resources
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{animalIcon}</span>
              <span className="text-[#7a7a7a]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>{animalLabel}</span>
              <span className="text-[#e0e0e0]">·</span>
              <div className="flex items-center gap-1 text-[#7a7a7a]" style={{ fontSize: 12 }}>
                <Clock className="w-3 h-3" />
                {article.readTime}
              </div>
            </div>

            <h1
              className="font-bebas text-[#1d1d1f] leading-tight mb-4"
              style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "0.02em" }}
            >
              {article.title}
            </h1>
            <p
              className="text-[#7a7a7a] mb-10"
              style={{
                fontSize: 21,
                lineHeight: 1.19,
                letterSpacing: "0.231px",
                borderLeft: "3px solid #0066cc",
                paddingLeft: 16,
              }}
            >
              {article.description}
            </p>

            <div>{renderMarkdown(article.content)}</div>
          </article>

          {/* Sidebar CTA */}
          <aside className="lg:w-64 flex-shrink-0">
            <div
              className="sticky top-14 bg-[#f5f5f7] border border-[#e0e0e0] p-6 space-y-4"
              style={{ borderRadius: 18 }}
            >
              <div className="text-2xl">{animalIcon}</div>
              <h3
                className="font-semibold text-[#1d1d1f]"
                style={{ fontSize: 21, lineHeight: 1.19, letterSpacing: "0.231px" }}
              >
                Compare {animalLabel} Plans
              </h3>
              <p className="text-[#7a7a7a]" style={{ fontSize: 17, lineHeight: 1.47, letterSpacing: "-0.374px" }}>
                Ready to find coverage for your {animalLabel.toLowerCase()}? Compare top-rated plans side-by-side for free.
              </p>
              <Link
                href={`/compare?animal=${article.animal}`}
                className="flex items-center justify-center gap-2 w-full bg-[#0066cc] text-white py-3 hover:bg-[#0071e3] transition-colors active:scale-95"
                style={{ borderRadius: 9999, fontSize: 17, letterSpacing: "-0.374px" }}
              >
                Compare Plans
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/resources"
                className="flex items-center justify-center gap-2 w-full text-[#0066cc] py-2.5 hover:text-[#0071e3] transition-colors"
                style={{ border: "1px solid #0066cc", borderRadius: 9999, fontSize: 17, letterSpacing: "-0.374px" }}
              >
                More Articles
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
