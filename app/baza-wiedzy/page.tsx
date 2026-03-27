import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baza wiedzy – Maks Biderman",
  description:
    "Zebrana wiedza o SEO, AI w marketingu i performance. Narzędzia, notatki i przemyślenia z pracy w digital marketingu.",
};

const categories = [
  {
    slug: "seo",
    title: "SEO",
    description: "Optymalizacja techniczna, on-page, linki i wszystko co wpływa na widoczność w Google.",
  },
  {
    slug: "seo-ai",
    title: "SEO AI",
    description: "Jak sztuczna inteligencja zmienia wyszukiwarki i co to oznacza dla SEO.",
  },
  {
    slug: "performance",
    title: "Performance",
    description: "Szybkość stron, Core Web Vitals i wszystko co wpływa na doświadczenie użytkownika.",
  },
];

export default function BazaWiedzyPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-700 mb-2">
        Baza wiedzy
      </h1>
      <p className="text-zinc-500 mb-12">
        Zebrana wiedza z obszaru digital marketingu. Narzędzia, notatki, przemyślenia.
      </p>

      <ul className="space-y-8">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link href={`/baza-wiedzy/${cat.slug}`} className="group">
              <h2 className="text-lg font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors mb-1">
                {cat.title}
              </h2>
              <p className="text-zinc-500 text-sm">{cat.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
