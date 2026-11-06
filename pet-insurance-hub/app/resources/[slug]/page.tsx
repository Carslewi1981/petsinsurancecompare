import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { articles } from "@/lib/articles";
import { ANIMAL_TYPES } from "@/lib/insurers";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

const BODY = { fontSize: 19, lineHeight: 1.7 } as const;
const bold = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="heading mt-12 mb-4" style={{ fontSize: "clamp(30px, 3.4vw, 40px)" }}>
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="mt-6 mb-2" style={{ ...BODY, fontWeight: 700 }}>
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
        <ul key={`ul-${i}`} className="list-disc pl-6 space-y-2 mb-5 marker:text-teal" style={BODY}>
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: bold(item) }} />
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
        <ol key={`ol-${i}`} className="list-decimal pl-6 space-y-2 mb-5 marker:font-bold marker:text-teal" style={BODY}>
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: bold(item) }} />
          ))}
        </ol>
      );
      continue;
    } else if (line.trim() !== "") {
      elements.push(
        <p key={i} className="mb-5" style={BODY} dangerouslySetInnerHTML={{ __html: bold(line) }} />
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
    <div className="max-w-[1240px] mx-auto px-5 sm:px-8" style={{ padding: "clamp(32px, 5vw, 64px) 32px clamp(56px, 8vw, 104px)" }}>
      <Link href="/resources" className="inline-flex items-center gap-2 link-u mb-8" style={{ fontSize: 17 }}>
        <ArrowLeft className="w-4 h-4" aria-hidden />
        All guides
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 items-start">
        <article className="min-w-0">
          <div className="flex items-center gap-3 mb-5" style={{ fontSize: 15, color: "var(--color-muted)" }}>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ background: "var(--color-mint)", color: "var(--color-ink)" }}>
              <span aria-hidden>{animalIcon}</span>
              {animalLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden />
              {article.readTime}
            </span>
          </div>

          <h1 className="display" style={{ fontSize: "clamp(44px, 6.4vw, 92px)", maxWidth: "16ch" }}>
            {article.title}
          </h1>
          <p
            className="mt-6 prose-measure"
            style={{ fontSize: 22, lineHeight: 1.45, maxWidth: "52ch", paddingLeft: 18, borderLeft: "6px solid var(--color-tag)" }}
          >
            {article.description}
          </p>

          <div className="mt-10 prose-measure" style={{ maxWidth: "66ch" }}>
            {renderMarkdown(article.content)}
          </div>
        </article>

        <aside className="lg:sticky lg:top-[92px]">
          <div
            className="p-6"
            style={{ background: "var(--color-tag)", border: "2px solid var(--color-ink)", borderRadius: 14, boxShadow: "5px 5px 0 var(--color-ink)" }}
          >
            <h2 className="heading" style={{ fontSize: 32 }}>
              Compare {animalLabel.toLowerCase()} plans
            </h2>
            <p className="mt-3" style={{ fontSize: 17, lineHeight: 1.5 }}>
              Ready to find coverage for your {animalLabel.toLowerCase()}? Put top-rated plans side by side, free.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Link href={`/compare?animal=${article.animal}`} className="btn btn-ink">
                Compare plans
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/resources" className="btn btn-quiet">
                More guides
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
