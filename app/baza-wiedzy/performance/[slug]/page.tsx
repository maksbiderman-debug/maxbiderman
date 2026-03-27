import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { entries } from "../page";
import SchemaOrg from "@/app/components/SchemaOrg";

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
    title: `${entry.title} – Performance – Maks Biderman`,
    description: entry.description,
    alternates: {
      canonical: `/baza-wiedzy/performance/${slug}`,
    },
  };
}

export default async function PerformanceEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = entries.find((e) => e.slug === slug);
  if (!entry) notFound();

  let Post: React.ComponentType;
  try {
    const module = await import(`@/content/baza-wiedzy/performance/${slug}.mdx`);
    Post = module.default;
  } catch {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <SchemaOrg
        type="Article"
        title={entry.title}
        description={entry.description}
        url={`https://maxbiderman.pl/baza-wiedzy/performance/${slug}`}
      />
      <Link
        href="/baza-wiedzy/performance"
        className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8 inline-block"
      >
        ← Performance
      </Link>
      <article>
        <Post />
      </article>
    </main>
  );
}
