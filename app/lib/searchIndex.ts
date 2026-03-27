export type SearchItem = {
  title: string;
  description: string;
  url: string;
  category: string;
};

export const searchIndex: SearchItem[] = [
  // Strony główne
  { title: "Strona główna", description: "Piszę o digital marketingu, organizuję wiedzę i agreguje ciekawe narzędzia.", url: "/", category: "Strona" },
  { title: "Blog", description: "Notatki i przemyślenia z pracy w digital marketingu.", url: "/blog", category: "Strona" },
  { title: "Baza wiedzy", description: "Zebrana wiedza z obszaru digital marketingu.", url: "/baza-wiedzy", category: "Strona" },
  // Blog
  { title: "Czym jest SEO i dlaczego warto je znać?", description: "Wprowadzenie do optymalizacji dla wyszukiwarek.", url: "/blog/czym-jest-seo", category: "Blog" },
  // Baza wiedzy – SEO
  { title: "Co to jest SEO", description: "Z czego się składa i jak działa — technika, treść, reputacja.", url: "/baza-wiedzy/seo/co-to-jest-seo", category: "SEO" },
  { title: "SEO vs SEM vs PPC", description: "Trzy pojęcia które się mieszają — czym się różnią i kiedy co wybrać.", url: "/baza-wiedzy/seo/seo-vs-sem-vs-ppc", category: "SEO" },
  { title: "Frazy kluczowe i keyword research", description: "Jak dobierać frazy pod intencję użytkownika, a nie tylko pod wolumen.", url: "/baza-wiedzy/seo/frazy-kluczowe", category: "SEO" },
  { title: "Content i SEO copywriting", description: "Jak pisać treści które rankują — struktura, intencja, aktualizacja.", url: "/baza-wiedzy/seo/content-i-copywriting", category: "SEO" },
  { title: "E-E-A-T", description: "Jak Google ocenia wiarygodność i ekspertyzę strony.", url: "/baza-wiedzy/seo/eeat", category: "SEO" },
  { title: "Optymalizacja techniczna SEO", description: "Indeksacja, duplikacja, szybkość, mobile — co sprawdzić w audycie.", url: "/baza-wiedzy/seo/optymalizacja-techniczna", category: "SEO" },
  { title: "Link building", description: "Pozyskiwanie linków jako sygnał autorytetu — zasady i pułapki.", url: "/baza-wiedzy/seo/link-building", category: "SEO" },
  { title: "Jak Google odkrywa i indeksuje strony", description: "Crawl, indeksowanie, sitemap — od odkrycia URL do pojawienia się w wynikach.", url: "/baza-wiedzy/seo/jak-google-indeksuje-strony", category: "SEO" },
  { title: "Jak działa SERP i co wpływa na kliknięcia", description: "Wyniki organiczne, reklamy, featured snippets i CTR.", url: "/baza-wiedzy/seo/jak-dziala-serp", category: "SEO" },
  { title: "Core Web Vitals", description: "LCP, INP, CLS — trzy wskaźniki wydajności które Google bierze pod uwagę.", url: "/baza-wiedzy/seo/core-web-vitals", category: "SEO" },
  { title: "Google Search Console", description: "Darmowe narzędzie Google do monitorowania widoczności i indeksacji.", url: "/baza-wiedzy/seo/google-search-console", category: "SEO" },
  { title: "Google Analytics 4", description: "Jak mierzyć ruch i konwersje — podstawy GA4 i kluczowe raporty.", url: "/baza-wiedzy/seo/google-analytics-4", category: "SEO" },
  { title: "Algorytmy Google i aktualizacje", description: "Core Updates, Helpful Content, filtry — jak rozumieć zmiany widoczności.", url: "/baza-wiedzy/seo/algorytmy-google", category: "SEO" },
  { title: "Dlaczego SEO trwa", description: "Horyzont czasowy SEO i jak o tym rozmawiać z klientem.", url: "/baza-wiedzy/seo/dlaczego-seo-trwa", category: "SEO" },
  { title: "Sitemap.xml", description: "Czym jest sitemap i dlaczego pomaga Google indeksować Twoją stronę.", url: "/baza-wiedzy/seo/sitemap", category: "SEO" },
  { title: "Robots.txt", description: "Jak kontrolować co Google może, a czego nie może indeksować.", url: "/baza-wiedzy/seo/robots-txt", category: "SEO" },
  { title: "Open Graph", description: "Jak Twoja strona wygląda gdy ktoś wklei link na LinkedIn czy Facebooku.", url: "/baza-wiedzy/seo/open-graph", category: "SEO" },
  { title: "Schema markup", description: "Dane strukturalne które pomagają Google lepiej rozumieć Twoją treść.", url: "/baza-wiedzy/seo/schema-markup", category: "SEO" },
];
