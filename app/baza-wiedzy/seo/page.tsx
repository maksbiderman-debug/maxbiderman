import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO – Baza wiedzy – Maks Biderman",
  description: "Notatki i zasoby o SEO technicznym, on-page i link buildingu.",
};

export const entries = [
  { slug: "co-to-jest-seo", title: "Co to jest SEO", description: "Z czego się składa i jak działa — technika, treść, reputacja." },
  { slug: "seo-vs-sem-vs-ppc", title: "SEO vs SEM vs PPC", description: "Trzy pojęcia które się mieszają — czym się różnią i kiedy co wybrać." },
  { slug: "frazy-kluczowe", title: "Frazy kluczowe i keyword research", description: "Jak dobierać frazy pod intencję użytkownika, a nie tylko pod wolumen." },
  { slug: "content-i-copywriting", title: "Content i SEO copywriting", description: "Jak pisać treści które rankują — struktura, intencja, aktualizacja." },
  { slug: "eeat", title: "E-E-A-T", description: "Jak Google ocenia wiarygodność i ekspertyzę strony." },
  { slug: "optymalizacja-techniczna", title: "Optymalizacja techniczna SEO", description: "Indeksacja, duplikacja, szybkość, mobile — co sprawdzić w audycie." },
  { slug: "link-building", title: "Link building", description: "Pozyskiwanie linków jako sygnał autorytetu — zasady i pułapki." },
  { slug: "jak-google-indeksuje-strony", title: "Jak Google odkrywa i indeksuje strony", description: "Crawl, indeksowanie, sitemap — od odkrycia URL do pojawienia się w wynikach." },
  { slug: "jak-dziala-serp", title: "Jak działa SERP i co wpływa na kliknięcia", description: "Wyniki organiczne, reklamy, featured snippets i CTR." },
  { slug: "core-web-vitals", title: "Core Web Vitals", description: "LCP, INP, CLS — trzy wskaźniki wydajności które Google bierze pod uwagę." },
  { slug: "google-search-console", title: "Google Search Console", description: "Darmowe narzędzie Google do monitorowania widoczności i indeksacji." },
  { slug: "google-analytics-4", title: "Google Analytics 4", description: "Jak mierzyć ruch i konwersje — podstawy GA4 i kluczowe raporty." },
  { slug: "algorytmy-google", title: "Algorytmy Google i aktualizacje", description: "Core Updates, Helpful Content, filtry — jak rozumieć zmiany widoczności." },
  { slug: "dlaczego-seo-trwa", title: "Dlaczego SEO trwa", description: "Horyzont czasowy SEO i jak o tym rozmawiać z klientem." },
  { slug: "sitemap", title: "Sitemap.xml", description: "Czym jest sitemap i dlaczego pomaga Google indeksować Twoją stronę." },
  { slug: "robots-txt", title: "Robots.txt", description: "Jak kontrolować co Google może, a czego nie może indeksować." },
  { slug: "open-graph", title: "Open Graph", description: "Jak Twoja strona wygląda gdy ktoś wklei link na LinkedIn czy Facebooku." },
  { slug: "schema-markup", title: "Schema markup", description: "Dane strukturalne które pomagają Google lepiej rozumieć Twoją treść." },
];

export default function SeoPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <Link
        href="/baza-wiedzy"
        className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8 inline-block"
      >
        ← Baza wiedzy
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-700 mb-2">
        SEO
      </h1>
      <p className="text-zinc-500 mb-12">
        Optymalizacja techniczna, on-page, linki i wszystko co wpływa na widoczność w Google.
      </p>
      <ul className="space-y-8">
        {entries.map((entry) => (
          <li key={entry.slug}>
            <Link href={`/baza-wiedzy/seo/${entry.slug}`} className="group">
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
