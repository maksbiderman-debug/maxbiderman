import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://maxbiderman.pl",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://maxbiderman.pl/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://maxbiderman.pl/blog/czym-jest-seo",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://maxbiderman.pl/baza-wiedzy",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://maxbiderman.pl/baza-wiedzy/seo",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://maxbiderman.pl/baza-wiedzy/seo-ai",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...[
      "seo-ai-definicja",
      "aeo-conversational-layer",
      "seo-ai-3-cele",
      "rag",
      "playbook-seo-ai",
      "query-fan-out",
      "framework-authority-relevance-extractability",
      "mindset-seo-ai",
      "aio-vs-geo",
      "seo-vs-aeo-vs-geo",
      "ai-visibility-audit",
      "framework-12-intencji",
    ].map((slug) => ({
      url: `https://maxbiderman.pl/baza-wiedzy/seo-ai/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: "https://maxbiderman.pl/narzedzie/symulator-seo",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://maxbiderman.pl/baza-wiedzy/performance",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
