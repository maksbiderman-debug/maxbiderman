import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Performance – Baza wiedzy – Maks Biderman",
  description: "Szybkość stron, Core Web Vitals i wszystko co wpływa na doświadczenie użytkownika.",
};

export const entries = [
  { slug: "core-web-vitals", title: "Core Web Vitals", description: "LCP, INP, CLS — jak je mierzyć, diagnozować i poprawiać." },
  { slug: "pagespeed-insights", title: "PageSpeed Insights", description: "Jak czytać wyniki PSI, różnica lab vs field data i co z tym zrobić." },
  { slug: "lighthouse", title: "Lighthouse", description: "Wbudowany audytor Chrome — co mierzy, jak uruchomić i jak interpretować wyniki." },
  { slug: "optymalizacja-obrazow", title: "Optymalizacja obrazów", description: "WebP, AVIF, rozmiar, kompresja — najczęstszy powód wolnej strony." },
  { slug: "lazy-loading", title: "Lazy loading", description: "Jak opóźnione ładowanie obrazów i zasobów przyspiesza czas pierwszego renderowania." },
  { slug: "critical-rendering-path", title: "Critical Rendering Path", description: "Jak przeglądarka buduje stronę i co blokuje wyświetlenie treści." },
];

export default function PerformancePage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <Link
        href="/baza-wiedzy"
        className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8 inline-block"
      >
        ← Baza wiedzy
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight text-purple-800 mb-2">
        Performance
      </h1>
      <p className="text-zinc-500 mb-12">
        Szybkość stron, Core Web Vitals i wszystko co wpływa na doświadczenie użytkownika.
      </p>
      <ul className="space-y-8">
        {entries.map((entry) => (
          <li key={entry.slug}>
            <Link href={`/baza-wiedzy/performance/${entry.slug}`} className="group">
              <h2 className="text-lg font-medium text-purple-800 group-hover:text-purple-600 transition-colors mb-1">
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
