import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO – Baza wiedzy – Maks Biderman",
  description: "Notatki i zasoby o SEO technicznym, on-page i link buildingu.",
};

const entries = [
  {
    slug: "sitemap",
    title: "Sitemap.xml",
    description: "Czym jest sitemap i dlaczego pomaga Google indeksować Twoją stronę.",
  },
  {
    slug: "robots-txt",
    title: "Robots.txt",
    description: "Jak kontrolować co Google może, a czego nie może indeksować.",
  },
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
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
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
