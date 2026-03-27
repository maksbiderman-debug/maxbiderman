import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO AI – Baza wiedzy – Maks Biderman",
  description:
    "Jak sztuczna inteligencja zmienia wyszukiwarki i co to oznacza dla SEO.",
};

export const entries = [
  { slug: "seo-ai-definicja", title: "SEO AI — definicja i mechanizm", description: "Czym jest SEO AI, jak działa RAG i fan-out, i dlaczego cel to już nie tylko kliknięcie." },
  { slug: "aeo-conversational-layer", title: "AEO Conversational Layer", description: "Warstwa rozmów nad klasycznym lejkiem SEO — Prompts, Mentions, Citations." },
  { slug: "seo-ai-3-cele", title: "SEO AI: 3 cele + 2 wymiary", description: "Rekomendacje branżowe, obraz marki i moduły AI — trzy osobne cele z innymi timeline." },
  { slug: "rag", title: "RAG — jak AI szuka w sieci", description: "Retrieval-Augmented Generation: 4-etapowy mechanizm, który decyduje o cytowaniach." },
  { slug: "playbook-seo-ai", title: "Playbook SEO AI", description: "Mapa całego procesu: diagnoza → hipoteza → wdrożenie → weryfikacja." },
  { slug: "query-fan-out", title: "Query fan-out", description: "Dlaczego AI nie szuka jak Google i czemu słowa w prompcie to nie wszystko." },
  { slug: "framework-authority-relevance-extractability", title: "Framework: Authority / Relevance / Extractability", description: "3 siły, które decydują o cytowaniach w AI — i jak je diagnozować." },
  { slug: "mindset-seo-ai", title: "Mindset SEO AI", description: "Strategia iteracyjna zamiast checklisty: hipoteza → wdrożenie → weryfikacja → korekta." },
  { slug: "aio-vs-geo", title: "AIO vs GEO", description: "Dwa różne kanały widoczności AI — Google vs ChatGPT/Perplexity." },
  { slug: "seo-vs-aeo-vs-geo", title: "SEO vs AEO vs GEO", description: "3 warstwy widoczności: rankingi, bycie odpowiedzią i cytowania w modelach AI." },
  { slug: "ai-visibility-audit", title: "AI Visibility Audit", description: "Jak testować widoczność marki w AI — metodyka, narzędzia i interpretacja wyników." },
  { slug: "framework-12-intencji", title: "Framework 12 intencji", description: "Mapa promptów do monitoringu SEO AI — 12 typów intencji zakupowych." },
];

export default function SeoAiPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <Link
        href="/baza-wiedzy"
        className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8 inline-block"
      >
        ← Baza wiedzy
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
        SEO AI
      </h1>
      <p className="text-zinc-500 mb-12">
        Jak sztuczna inteligencja zmienia wyszukiwarki i co to oznacza dla widoczności marki.
      </p>
      <ul className="space-y-8">
        {entries.map((entry) => (
          <li key={entry.slug}>
            <Link href={`/baza-wiedzy/seo-ai/${entry.slug}`} className="group">
              <h2 className="text-lg font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors mb-1">
                {entry.title}
              </h2>
              <p className="text-zinc-500 text-sm">{entry.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
