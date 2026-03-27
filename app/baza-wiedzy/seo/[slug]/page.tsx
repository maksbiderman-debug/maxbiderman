import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { entries } from "../page";

export function generateStaticParams() {
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = entries.find((e) => e.slug === slug);
  if (!entry) return {};
  return {
    title: `${entry.title} – SEO – Maks Biderman`,
    description: entry.description,
  };
}

export default async function SeoEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = entries.find((e) => e.slug === slug);
  if (!entry) notFound();

  let Post: React.ComponentType;
  try {
    const module = await import(`@/content/baza-wiedzy/seo/${slug}.mdx`);
    Post = module.default;
  } catch {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <Link
        href="/baza-wiedzy/seo"
        className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8 inline-block"
      >
        ← SEO
      </Link>
      <article>
        <Post />
      </article>
    </main>
  );
}
