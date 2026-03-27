import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog – Maks Biderman",
  description:
    "Artykuły o SEO, marketingu cyfrowym i digital marketingu z perspektywy praktyka.",
};

const posts = [
  {
    slug: "czym-jest-seo",
    title: "Czym jest SEO i dlaczego warto je znać?",
    date: "2026-03-27",
    description:
      "Wprowadzenie do optymalizacji dla wyszukiwarek — co to jest, jak działa i dlaczego każdy w digital marketingu powinien to rozumieć.",
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-purple-800 mb-2">
        Blog
      </h1>
      <p className="text-zinc-500 mb-12">
        Notatki i przemyślenia z pracy w digital marketingu.
      </p>

      <ul className="space-y-10">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group">
              <time className="text-sm text-zinc-400">{post.date}</time>
              <h2 className="text-lg font-medium text-purple-800 group-hover:text-purple-600 transition-colors mt-1 mb-1">
                {post.title}
              </h2>
              <p className="text-zinc-500 text-sm">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
