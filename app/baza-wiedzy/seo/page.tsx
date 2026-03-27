import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO – Baza wiedzy – Maks Biderman",
  description:
    "Notatki i zasoby o SEO technicznym, on-page i link buildingu.",
};

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
      <p className="text-zinc-400 text-sm">Wkrótce pojawi się tu pierwsza treść.</p>
    </main>
  );
}
