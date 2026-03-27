import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO AI – Baza wiedzy – Maks Biderman",
  description:
    "Jak sztuczna inteligencja zmienia wyszukiwarki i co to oznacza dla SEO.",
};

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
        Jak sztuczna inteligencja zmienia wyszukiwarki i co to oznacza dla SEO.
      </p>
      <p className="text-zinc-400 text-sm">Wkrótce pojawi się tu pierwsza treść.</p>
    </main>
  );
}
