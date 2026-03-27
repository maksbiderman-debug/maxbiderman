export type SearchItem = {
  title: string;
  description: string;
  url: string;
  category: string;
};

export const searchIndex: SearchItem[] = [
  // Strony główne
  {
    title: "Strona główna",
    description: "Piszę o digital marketingu, organizuję wiedzę i agreguje ciekawe narzędzia.",
    url: "/",
    category: "Strona",
  },
  {
    title: "Blog",
    description: "Notatki i przemyślenia z pracy w digital marketingu.",
    url: "/blog",
    category: "Strona",
  },
  {
    title: "Baza wiedzy",
    description: "Zebrana wiedza z obszaru digital marketingu.",
    url: "/baza-wiedzy",
    category: "Strona",
  },
  // Blog
  {
    title: "Czym jest SEO i dlaczego warto je znać?",
    description: "Wprowadzenie do optymalizacji dla wyszukiwarek — co to jest, jak działa i dlaczego każdy w digital marketingu powinien to rozumieć.",
    url: "/blog/czym-jest-seo",
    category: "Blog",
  },
  // Baza wiedzy – SEO
  {
    title: "Sitemap.xml",
    description: "Czym jest sitemap i dlaczego pomaga Google indeksować Twoją stronę.",
    url: "/baza-wiedzy/seo/sitemap",
    category: "SEO",
  },
  {
    title: "Robots.txt",
    description: "Jak kontrolować co Google może, a czego nie może indeksować.",
    url: "/baza-wiedzy/seo/robots-txt",
    category: "SEO",
  },
  {
    title: "Open Graph",
    description: "Jak Twoja strona wygląda gdy ktoś wklei link na LinkedIn czy Facebooku.",
    url: "/baza-wiedzy/seo/open-graph",
    category: "SEO",
  },
  {
    title: "Schema markup",
    description: "Dane strukturalne które pomagają Google lepiej rozumieć Twoją treść i wyświetlać rich snippets.",
    url: "/baza-wiedzy/seo/schema-markup",
    category: "SEO",
  },
];
