import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SchemaOrg from "@/app/components/SchemaOrg";

const posts = [
  {
    slug: "czym-jest-seo",
    title: "Czym jest SEO i dlaczego warto je znać?",
    date: "2026-03-27",
    description:
      "Wprowadzenie do optymalizacji dla wyszukiwarek — co to jest, jak działa i dlaczego każdy w digital marketingu powinien to rozumieć.",
  },
];

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} – Maks Biderman`,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  let Post: React.ComponentType;
  try {
    const module = await import(`@/content/blog/${slug}.mdx`);
    Post = module.default;
  } catch {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <SchemaOrg
        type="Article"
        title={post.title}
        description={post.description}
        datePublished={post.date}
        url={`https://maxbiderman.pl/blog/${post.slug}`}
      />
      <Link
        href="/blog"
        className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8 inline-block"
      >
        ← Blog
      </Link>
      <time className="block text-sm text-zinc-400 mb-2">{post.date}</time>
      <article>
        <Post />
      </article>
    </main>
  );
}
