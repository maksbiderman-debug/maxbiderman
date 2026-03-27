"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type ToggleId =
  | "robots" | "title" | "meta" | "h1" | "headings" | "schema" | "alt"
  | "canonical" | "facts" | "links" | "external"
  | "og" | "sitemap" | "vitals" | "eeat" | "keywords";

type TabId = "googlebot" | "rag" | "are" | "podglad";
type PageType = "agencja" | "artykul" | "produkt" | "glowna";

type ToggleDef = { id: ToggleId; label: string; description: string; docUrl: string | null };

const GROUPS: { label: string; items: ToggleDef[] }[] = [
  {
    label: "Techniczne",
    items: [
      { id: "robots", label: "Robots: index", description: "Czy Google może indeksować tę stronę", docUrl: "/baza-wiedzy/seo/robots-txt" },
      { id: "canonical", label: "Canonical URL", description: "Wskazuje Google kanoniczną wersję strony", docUrl: null },
      { id: "sitemap", label: "Sitemap.xml", description: "Pomaga Googlebotowi odkryć stronę szybciej", docUrl: "/baza-wiedzy/seo/sitemap" },
      { id: "schema", label: "Schema markup", description: "Dane strukturalne ułatwiające rich results", docUrl: "/baza-wiedzy/seo/schema-markup" },
      { id: "og", label: "Open Graph", description: "Kontroluje wygląd linku na LinkedIn i Facebooku", docUrl: "/baza-wiedzy/seo/open-graph" },
      { id: "alt", label: "Alt atrybuty", description: "Opisy obrazów dla crawlerów i dostępności", docUrl: null },
      { id: "vitals", label: "Core Web Vitals", description: "LCP, CLS, INP — sygnał rankingowy Google", docUrl: "/baza-wiedzy/seo/core-web-vitals" },
    ],
  },
  {
    label: "Treść",
    items: [
      { id: "title", label: "Title tag", description: "Tytuł strony widoczny w SERP i zakładce", docUrl: null },
      { id: "meta", label: "Meta description", description: "Opis pod tytułem w wynikach Google", docUrl: null },
      { id: "h1", label: "Nagłówek H1", description: "Główny nagłówek — sygnał tematu dla Google i AI", docUrl: null },
      { id: "headings", label: "Struktura H2/H3", description: "Hierarchia nagłówków ułatwiająca parsowanie treści", docUrl: null },
      { id: "keywords", label: "Słowa kluczowe", description: "Frazy kluczowe wplecione w tytuł, H1 i treść", docUrl: "/baza-wiedzy/seo/frazy-kluczowe" },
      { id: "facts", label: "Konkretne fakty", description: "Liczby i dane — klucz do cytowalności przez AI", docUrl: "/baza-wiedzy/seo-ai/framework-authority-relevance-extractability" },
      { id: "eeat", label: "E-E-A-T", description: "Sygnały ekspertyzy: autor, credentials, doświadczenie", docUrl: "/baza-wiedzy/seo/eeat" },
    ],
  },
  {
    label: "Autorytet",
    items: [
      { id: "links", label: "Linki wewnętrzne", description: "Połączenia między podstronami — PageRank wewnętrzny", docUrl: null },
      { id: "external", label: "Wzmianki zewnętrzne", description: "Cytowania marki w serwisach branżowych — authority AI", docUrl: "/baza-wiedzy/seo-ai/framework-authority-relevance-extractability" },
    ],
  },
];

const ALL_TOGGLES: ToggleDef[] = GROUPS.flatMap((g) => g.items);

const INITIAL: Record<ToggleId, boolean> = {
  robots: true, title: true, meta: true, h1: true, headings: true,
  schema: true, alt: true, canonical: true, facts: true, links: true,
  external: true, og: true, sitemap: true, vitals: true, eeat: true, keywords: true,
};

const PRESETS: { label: string; state: Record<ToggleId, boolean> }[] = [
  {
    label: "Nowa strona bez SEO",
    state: { robots: true, title: false, meta: false, h1: false, headings: false, schema: false, alt: false, canonical: false, facts: false, links: false, external: false, og: false, sitemap: false, vitals: false, eeat: false, keywords: false },
  },
  {
    label: "Dobra technicznie, słaba dla AI",
    state: { robots: true, title: true, meta: true, h1: true, headings: true, schema: true, alt: true, canonical: true, vitals: true, og: true, sitemap: true, links: true, keywords: true, facts: false, eeat: false, external: false },
  },
  {
    label: "E-commerce bez schema",
    state: { robots: true, title: true, meta: true, h1: true, headings: true, schema: false, alt: true, canonical: true, facts: true, links: true, external: true, og: true, sitemap: true, vitals: true, eeat: true, keywords: true },
  },
  {
    label: "Po Helpful Content Update",
    state: { robots: true, title: true, meta: true, h1: true, headings: true, schema: true, alt: true, canonical: true, links: true, external: true, og: true, sitemap: true, vitals: true, keywords: true, facts: false, eeat: false },
  },
];

const PAGE_TYPES: { id: PageType; label: string }[] = [
  { id: "agencja", label: "Agencja SEO" },
  { id: "artykul", label: "Artykuł blogowy" },
  { id: "produkt", label: "Produkt e-commerce" },
  { id: "glowna", label: "Strona główna" },
];

type PageContent = {
  url: string;
  canonicalUrl: string;
  schemaType: string;
  pageTitle: string;
  h1: (kw: boolean) => string;
  h2: (kw: boolean) => string;
  facts: string;
  eeat: string;
  altText: string;
  keywords: string[];
  ogTitle: string;
  ogDesc: string;
  links: string[];
  external: string;
  ragStrong: string;
  ragPartial: string;
};

const PAGE_CONTENT: Record<PageType, PageContent> = {
  agencja: {
    url: "widoczni.com/agencja-seo-poznan",
    canonicalUrl: "https://widoczni.com/agencja-seo-poznan",
    schemaType: "LocalBusiness",
    pageTitle: "Agencja SEO Poznań | Widoczni",
    h1: (kw) => kw ? "Agencja SEO Poznań — pozycjonowanie stron" : "Agencja SEO, która dowozi wyniki",
    h2: (kw) => kw ? "Pozycjonowanie stron Poznań — dlaczego Widoczni?" : "Dlaczego klienci wybierają Widoczni?",
    facts: "🏆 1 200+ klientów od 2009 roku · +180% średni wzrost ruchu",
    eeat: "✍️ Jan Kowalski · ekspert SEO, 15 lat doświadczenia · certyfikat Google",
    altText: "Zespół agencji SEO Widoczni w biurze w Poznaniu",
    keywords: ["agencja SEO", "pozycjonowanie", "Poznań"],
    ogTitle: "Agencja SEO Poznań — Widoczni",
    ogDesc: "Pozycjonujemy strony w Google od 2009. Ponad 1 200 klientów.",
    links: ["Cennik", "O nas", "Kontakt"],
    external: "🔗 Wymieniony w: Marketer+, WhitePress, Forbes.pl",
    ragStrong: '"Widoczni to agencja SEO działająca od 2009 roku. Ponad 1 200 klientów, średni wzrost ruchu organicznego +180%."',
    ragPartial: '"Widoczni to agencja SEO. Pomagamy firmom rosnąć w Google."',
  },
  artykul: {
    url: "maxbiderman.pl/blog/co-to-jest-seo",
    canonicalUrl: "https://maxbiderman.pl/blog/co-to-jest-seo",
    schemaType: "Article",
    pageTitle: "Co to jest SEO i jak działa w 2025 | Maks Biderman",
    h1: (kw) => kw ? "Co to jest SEO i jak działa w 2025 roku" : "Wszystko o wyszukiwarkach internetowych",
    h2: (kw) => kw ? "Jak Google indeksuje strony — krok po kroku" : "Jak to właściwie działa?",
    facts: "📊 93% użytkowników nie wychodzi poza pierwszą stronę · 68% kliknięć trafia w top 3",
    eeat: "✍️ Maks Biderman · specjalista SEO · opublikowano 15.03.2025 · zaktualizowano 20.03.2025",
    altText: "Infografika: jak działa algorytm Google — schemat indeksowania",
    keywords: ["SEO", "pozycjonowanie", "Google"],
    ogTitle: "Co to jest SEO i jak działa w 2025",
    ogDesc: "Kompleksowy przewodnik po SEO dla początkujących i średnio zaawansowanych.",
    links: ["SEO basics", "Link building", "Core Web Vitals"],
    external: "🔗 Cytowany w: Moz Blog, Search Engine Journal, Senuto",
    ragStrong: '"93% użytkowników nie wychodzi poza pierwszą stronę wyników Google. 68% wszystkich kliknięć trafia na top 3 wyniki."',
    ragPartial: '"SEO to optymalizacja strony dla wyszukiwarek. Pomaga zwiększyć widoczność w Google."',
  },
  produkt: {
    url: "sklep.example.com/nike-air-max-270",
    canonicalUrl: "https://sklep.example.com/nike-air-max-270",
    schemaType: "Product",
    pageTitle: "Nike Air Max 270 — buty do biegania | Sklep",
    h1: (kw) => kw ? "Nike Air Max 270 — buty do biegania damskie" : "Nike Air Max 270",
    h2: (kw) => kw ? "Specyfikacja Nike Air Max 270 — rozmiary i kolory" : "Szczegóły produktu",
    facts: "⭐ 4.8/5 (342 recenzje) · 249 zł · Dostawa w 24h · Zwrot 30 dni",
    eeat: "✅ Autoryzowany sprzedawca Nike · gwarancja producenta · certyfikat sklepu",
    altText: "Nike Air Max 270 w kolorze czarnym — widok z boku na białym tle",
    keywords: ["Nike Air Max", "buty do biegania", "damskie"],
    ogTitle: "Nike Air Max 270 — 249 zł | Sklep",
    ogDesc: "Kup Nike Air Max 270 w najlepszej cenie. Darmowa dostawa od 199 zł.",
    links: ["Koszyk", "Podobne produkty", "Opinie"],
    external: "🔗 Polecany przez: Nike.com · Ceneo · Allegro",
    ragStrong: '"Nike Air Max 270 — 249 zł. Ocena 4.8/5 na podstawie 342 recenzji. Dostawa w 24h, zwrot do 30 dni."',
    ragPartial: '"Nike Air Max 270 to buty do biegania dostępne w sklepie online."',
  },
  glowna: {
    url: "maxbiderman.pl",
    canonicalUrl: "https://maxbiderman.pl",
    schemaType: "Organization",
    pageTitle: "Maks Biderman — digital marketing | maxbiderman.pl",
    h1: (kw) => kw ? "Digital marketing i SEO — maxbiderman.pl" : "Cześć, jestem Maks",
    h2: (kw) => kw ? "Baza wiedzy o SEO i AI — darmowe zasoby" : "Co tu znajdziesz?",
    facts: "📚 50+ wpisów w bazie wiedzy · nowe treści co tydzień · 0 zł",
    eeat: "👤 Maks Biderman · Customer Success Specialist · certyfikowany specjalista digital marketingu",
    altText: "Maks Biderman — specjalista digital marketingu, zdjęcie profilowe",
    keywords: ["digital marketing", "SEO", "baza wiedzy"],
    ogTitle: "Maks Biderman — digital marketing",
    ogDesc: "Piszę o SEO i digital marketingu. Baza wiedzy, narzędzia, notatki z pracy.",
    links: ["Blog", "Baza wiedzy", "O mnie"],
    external: "🔗 Wspomniany na: LinkedIn · Twitter/X · Marketer+",
    ragStrong: '"Maxbiderman.pl to baza wiedzy o digital marketingu i SEO. Ponad 50 wpisów, aktualizowana co tydzień, bezpłatna."',
    ragPartial: '"Maxbiderman.pl to strona o digital marketingu prowadzona przez Maksa Bidermana."',
  },
};

type Item = {
  label: string;
  value: string;
  status: "ok" | "warn" | "error" | "info";
  note?: string;
};

function buildGbItems(a: Record<ToggleId, boolean>, c: PageContent): Item[] {
  if (!a.robots)
    return [{ label: "Indeksowanie", value: "NOINDEX", status: "error", note: "Strona zablokowana dla Google. Pozostałe elementy są bez znaczenia." }];
  return [
    { label: "Indeksowanie", value: "INDEX, FOLLOW", status: "ok" },
    { label: "Tytuł strony", value: a.title ? `"${c.pageTitle}"` : "[brak]", status: a.title ? "ok" : "warn", note: a.title ? undefined : "Google wygeneruje własny tytuł — zwykle słabszy pod kątem CTR." },
    { label: "Meta description", value: a.meta ? `"${c.ogDesc}"` : "[brak]", status: a.meta ? "ok" : "warn", note: a.meta ? undefined : "Google wytnie losowy fragment z treści strony." },
    { label: "H1", value: a.h1 ? `"${c.h1(true)}"` : "[brak]", status: a.h1 ? "ok" : "warn", note: a.h1 ? undefined : "Google nie ma wyraźnego sygnału o głównym temacie." },
    { label: "Struktura nagłówków", value: a.headings ? "H1 → H2 ×3 → H3 ×2" : "brak hierarchii", status: a.headings ? "ok" : "warn", note: a.headings ? undefined : "Brak struktury utrudnia Google zrozumienie podziału treści." },
    { label: "Słowa kluczowe", value: a.keywords ? `${c.keywords.join(", ")} — w tytule, H1, treści` : "[brak sygnałów fraz]", status: a.keywords ? "ok" : "warn", note: a.keywords ? undefined : "Brak fraz kluczowych — Google nie wie pod co rankować stronę." },
    { label: "Schema markup", value: a.schema ? `${c.schemaType} — rich result możliwy` : "[brak]", status: a.schema ? "ok" : "info", note: a.schema ? undefined : "Brak danych strukturalnych. Brak możliwości rich results." },
    { label: "Core Web Vitals", value: a.vitals ? "LCP 1.8s ✅  CLS 0.05 ✅  INP 180ms ✅" : "LCP 4.5s ❌  CLS 0.42 ❌  INP 620ms ❌", status: a.vitals ? "ok" : "warn", note: a.vitals ? undefined : "Słabe CWV to sygnał rankingowy — Google preferuje szybsze strony." },
    { label: "E-E-A-T", value: a.eeat ? "Autor, credentials, About page — sygnały obecne" : "[brak sygnałów ekspertyzy]", status: a.eeat ? "ok" : "warn", note: a.eeat ? undefined : "Brak autora i bio. Google trudniej ocenić wiarygodność strony." },
    { label: "Obrazy", value: a.alt ? "1/1 z atrybutem alt" : "0/1 z atrybutem alt", status: a.alt ? "ok" : "warn", note: a.alt ? undefined : "Obraz nieindeksowalny. Brakuje kontekstu dla crawlera." },
    { label: "Canonical URL", value: a.canonical ? c.canonicalUrl : "[brak]", status: a.canonical ? "ok" : "warn", note: a.canonical ? undefined : "Ryzyko duplikacji treści (http/https, www/bez www)." },
    { label: "Sitemap.xml", value: a.sitemap ? "Strona w sitemap — odkryta szybciej" : "[brak w sitemap]", status: a.sitemap ? "ok" : "info", note: a.sitemap ? undefined : "Google może nie odkryć strony od razu bez sitemap." },
    { label: "Linki wewnętrzne", value: a.links ? `3 linki → /${c.links.map(l => l.toLowerCase()).join(", /")}` : "[brak]", status: a.links ? "ok" : "info", note: a.links ? undefined : "Crawler może nie odkryć innych podstron z tego URL." },
  ];
}

function buildRagItems(a: Record<ToggleId, boolean>, c: PageContent): Item[] {
  if (!a.robots)
    return [{ label: "Dostępność", value: "Strona zablokowana (NOINDEX)", status: "error", note: "AI nie może tej strony zindeksować ani zacytować." }];
  const strong = a.facts && a.headings;
  const partial = a.facts || a.headings;
  return [
    {
      label: "Cytowalny fragment",
      value: strong ? c.ragStrong : partial ? c.ragPartial : "[brak konkretnego fragmentu]",
      status: strong ? "ok" : partial ? "warn" : "error",
      note: strong ? "Konkretne dane + czytelna struktura = wysoka szansa na cytowanie."
        : partial ? "Fragment zbyt ogólny — AI pominie go na rzecz konkretniejszych źródeł."
        : "Brak faktów i struktury. AI nie ma co wyciąć.",
    },
    { label: "Extractability", value: a.facts ? `Fakty obecne: ${c.keywords[0]}, liczby, daty` : "[brak liczb i danych]", status: a.facts ? "ok" : "error", note: a.facts ? undefined : "AI cytuje konkrety, nie ogólniki. Dodaj liczby, daty, wyniki." },
    { label: "Struktura treści", value: a.headings ? "H2/H3 — AI identyfikuje sekcje" : "Brak hierarchii nagłówków", status: a.headings ? "ok" : "warn", note: a.headings ? undefined : "Brak nagłówków utrudnia AI wyciągnięcie właściwego fragmentu." },
    { label: "E-E-A-T → Authority", value: a.eeat ? "Kredencjały autora zwiększają wiarygodność cytowania" : "Brak sygnałów ekspertyzy", status: a.eeat ? "ok" : "warn", note: a.eeat ? undefined : "AI preferuje cytowanie źródeł z wyraźną ekspertyzą i autorem." },
    {
      label: "Query fan-out coverage",
      value: a.keywords && a.headings ? `Pokrycie: ${c.keywords.join(", ")} i powiązane tematy`
        : a.keywords || a.headings ? "Częściowe pokrycie intencji" : "Słabe pokrycie intencji",
      status: a.keywords && a.headings ? "ok" : a.keywords || a.headings ? "warn" : "error",
      note: a.keywords && a.headings ? undefined : "AI generuje wiele podzapytań — bez fraz i nagłówków strona nie odpowiada na żadne.",
    },
    { label: "Entity clarity", value: a.schema ? `${c.schemaType} — AI rozumie typ encji` : "AI dedukuje typ strony samodzielnie", status: a.schema ? "ok" : "info" },
    { label: "Nagłówek H1", value: a.h1 ? `"${c.h1(true)}" — AI zna temat strony` : "[brak H1] — AI samodzielnie dedukuje temat", status: a.h1 ? "ok" : "warn", note: a.h1 ? undefined : "Brak H1 utrudnia AI przypisanie strony do konkretnego tematu zapytania." },
    { label: "Wzmianki zewnętrzne", value: a.external ? `${c.external.replace("🔗 ", "").replace("Wymieniony w: ", "").replace("Cytowany w: ", "").replace("Polecany przez: ", "").replace("Wspomniany na: ", "")} — AI może zwalidować markę` : "[brak wzmianek] — marka nieznana AI", status: a.external ? "ok" : "error", note: a.external ? "Zewnętrzne cytowania potwierdzają autorytet — AI chętniej cytuje źródła już cytowane przez innych." : "Brak wzmianek zewnętrznych to najsilniejszy sygnał niskiego authority. AI unika cytowania nieznanych marek." },
  ];
}

function buildScores(a: Record<ToggleId, boolean>) {
  if (!a.robots) return { authority: 0, relevance: 0, extractability: 0 };
  return {
    authority: Math.min((a.external ? 55 : 5) + (a.eeat ? 20 : 0) + (a.schema ? 12 : 0) + (a.links ? 8 : 0) + (a.sitemap ? 5 : 0), 100),
    relevance: Math.min((a.keywords ? 25 : 0) + (a.h1 ? 25 : 0) + (a.headings ? 20 : 0) + (a.title ? 20 : 0) + (a.meta ? 10 : 0), 100),
    extractability: Math.min((a.facts ? 50 : 0) + (a.headings ? 25 : 0) + (a.h1 ? 15 : 0) + (a.schema ? 10 : 0), 100),
  };
}

function icon(s: Item["status"]) {
  return s === "ok" ? "✅" : s === "warn" ? "⚠️" : s === "error" ? "❌" : "ℹ️";
}
function color(s: Item["status"]) {
  return s === "ok" ? "text-emerald-700" : s === "warn" ? "text-amber-700" : s === "error" ? "text-red-700" : "text-blue-700";
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const bar = value >= 67 ? "bg-emerald-500" : value >= 34 ? "bg-amber-400" : "bg-red-400";
  const txt = value >= 67 ? "text-emerald-700" : value >= 34 ? "text-amber-700" : "text-red-700";
  return (
    <div className="mb-1">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-zinc-900">{label}</span>
        <span className={`text-sm font-bold tabular-nums ${txt}`}>{value}%</span>
      </div>
      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${bar}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ItemRow({ item }: { item: Item }) {
  return (
    <div>
      <div className="flex items-start gap-2">
        <span className="shrink-0 mt-0.5 text-base leading-tight">{icon(item.status)}</span>
        <div>
          <span className="text-xs text-zinc-400 mr-1.5">{item.label}:</span>
          <span className={`text-sm font-medium ${color(item.status)}`}>{item.value}</span>
        </div>
      </div>
      {item.note && <p className="text-xs text-zinc-500 mt-0.5 ml-7">{item.note}</p>}
    </div>
  );
}

function PreviewBlock({
  id,
  active,
  onToggle,
  label,
  children,
}: {
  id: ToggleId;
  active: boolean;
  onToggle: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const def = ALL_TOGGLES.find((t) => t.id === id);
  const docUrl = def?.docUrl ?? null;
  const description = def?.description ?? null;
  return (
    <div
      onClick={onToggle}
      className="cursor-pointer rounded-lg -mx-2 px-2 py-1.5 hover:bg-zinc-50 transition-colors"
    >
      <div className={`transition-opacity duration-200 ${active ? "opacity-100" : "opacity-30"}`}>
        {children}
      </div>
      <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
        <span className="group/tip relative">
          <span className="cursor-help">← {label}</span>
          {description && (
            <span className="pointer-events-none absolute bottom-5 left-0 z-20 hidden group-hover/tip:block bg-zinc-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
              {description}
            </span>
          )}
        </span>
        {!active && <span className="text-red-400 font-medium">✕ wyłączony</span>}
        {docUrl && (
          <Link
            href={docUrl}
            onClick={(e) => e.stopPropagation()}
            className="ml-1 text-zinc-300 hover:text-purple-600 transition-colors"
            title="Baza wiedzy →"
          >↗</Link>
        )}
      </p>
    </div>
  );
}

export default function SimulatorClient() {
  const [active, setActive] = useState<Record<ToggleId, boolean>>(INITIAL);
  const [tab, setTab] = useState<TabId>("googlebot");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [pageType, setPageType] = useState<PageType>("agencja");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("t");
    if (t && t.length === ALL_TOGGLES.length) {
      const next = { ...INITIAL };
      ALL_TOGGLES.forEach((tog, i) => { next[tog.id] = t[i] === "1"; });
      setActive(next);
    }
  }, []);

  useEffect(() => {
    const t = ALL_TOGGLES.map((tog) => (active[tog.id] ? "1" : "0")).join("");
    const url = new URL(window.location.href);
    url.searchParams.set("t", t);
    window.history.replaceState({}, "", url.toString());
  }, [active]);

  const toggle = (id: ToggleId) => { setActivePreset(null); setActive((p) => ({ ...p, [id]: !p[id] })); };
  const resetAll = () => { setActive(INITIAL); setActivePreset(null); };
  const disableAll = () => { setActive(Object.fromEntries(Object.keys(INITIAL).map((k) => [k, false])) as Record<ToggleId, boolean>); setActivePreset(null); };
  const applyPreset = (preset: typeof PRESETS[0]) => {
    if (activePreset === preset.label) { setActivePreset(null); setActive(INITIAL); }
    else { setActivePreset(preset.label); setActive(preset.state); }
  };

  const content = PAGE_CONTENT[pageType];
  const scores = buildScores(active);
  const avg = Math.round((scores.authority + scores.relevance + scores.extractability) / 3);
  const gbItems = buildGbItems(active, content);
  const errorCount = gbItems.filter((i) => i.status === "error").length;
  const warnCount = gbItems.filter((i) => i.status === "warn").length;

  const TABS: { id: TabId; label: string }[] = [
    { id: "googlebot", label: "🤖 Googlebot" },
    { id: "rag", label: "🧠 RAG / AI" },
    { id: "are", label: "📊 A/R/E" },
    { id: "podglad", label: "👁 Podgląd" },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-24">

      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-purple-800 mb-3">Symulator SEO</h1>
        <p className="text-zinc-500 max-w-2xl">
          Włączaj i wyłączaj elementy strony — sprawdź jak reaguje Googlebot, jak AI (RAG) decyduje o cytowaniu i jak zmienia się score A/R/E.
        </p>
      </div>

      {/* Typ strony */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider mr-1">Typ strony:</span>
        {PAGE_TYPES.map((pt) => (
          <button
            key={pt.id}
            onClick={() => setPageType(pt.id)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              pageType === pt.id
                ? "border-purple-400 bg-purple-100 text-purple-800 font-medium"
                : "border-zinc-200 text-zinc-600 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50"
            }`}
          >
            {pt.label}
          </button>
        ))}
      </div>

      {/* Presety */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider mr-1">Scenariusz:</span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              activePreset === p.label
                ? "border-purple-400 bg-purple-100 text-purple-800 font-medium"
                : "border-zinc-200 text-zinc-600 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {(errorCount > 0 || warnCount > 0) ? (
            <span className="text-xs font-medium">
              {errorCount > 0 && <span className="text-red-600">❌ {errorCount} {errorCount === 1 ? "problem" : "problemy"}</span>}
              {errorCount > 0 && warnCount > 0 && <span className="text-zinc-300 mx-1.5">·</span>}
              {warnCount > 0 && <span className="text-amber-600">⚠️ {warnCount} {warnCount === 1 ? "ostrzeżenie" : "ostrzeżenia"}</span>}
            </span>
          ) : (
            <span className="text-xs text-emerald-600 font-medium">✅ Brak problemów</span>
          )}
          <span className="text-zinc-200">|</span>
          <p className="text-xs text-zinc-400 italic">Najedź na etykietę żeby zobaczyć opis · kliknij element żeby go wyłączyć.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={resetAll} className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">↺ Włącz wszystko</button>
          <span className="text-zinc-300">·</span>
          <button onClick={disableAll} className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">✕ Wyłącz wszystko</button>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* ── Left: Interactive mock page ── */}
        <div>
          <div className="border border-zinc-200 rounded-xl overflow-hidden">

            {/* Browser chrome */}
            <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-3 h-3 rounded-full bg-zinc-300" />
                <div className="w-3 h-3 rounded-full bg-zinc-300" />
                <div className="w-3 h-3 rounded-full bg-zinc-300" />
              </div>
              <div className="flex-1 bg-white border border-zinc-200 rounded px-3 py-1 text-xs text-zinc-500 font-mono truncate">
                {content.url}
              </div>
              <button
                onClick={() => toggle("sitemap")}
                title={active.sitemap ? "Wyłącz sitemap.xml" : "Włącz sitemap.xml"}
                className={`shrink-0 text-xs px-2 py-0.5 rounded font-medium cursor-pointer transition-all ${active.sitemap ? "bg-zinc-100 text-zinc-500 hover:bg-zinc-200" : "bg-zinc-50 text-zinc-300 line-through"}`}
              >
                🗺 sitemap
              </button>
              <button
                onClick={() => toggle("vitals")}
                title={active.vitals ? "Wyłącz Core Web Vitals" : "Włącz Core Web Vitals"}
                className={`shrink-0 text-xs px-2 py-0.5 rounded font-medium cursor-pointer transition-all ${active.vitals ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-red-50 text-red-600 hover:bg-red-100"}`}
              >
                {active.vitals ? "⚡ Fast" : "🐢 Slow"}
              </button>
            </div>

            {/* HTML <head> */}
            <div className="bg-zinc-900 px-4 py-3 space-y-1 text-xs font-mono">

              <div onClick={() => toggle("robots")} title={active.robots ? "Wyłącz robots" : "Włącz robots"}
                className={`cursor-pointer hover:bg-zinc-800 rounded px-1 -mx-1 py-0.5 transition-colors ${active.robots ? "opacity-100" : "opacity-30"}`}>
                <span className="text-zinc-500">&lt;meta </span><span className="text-emerald-400">name</span><span className="text-zinc-500">=</span><span className="text-amber-300">&quot;robots&quot;</span><span className="text-zinc-500"> content=</span><span className="text-amber-300">&quot;{active.robots ? "index, follow" : "noindex"}&quot;</span><span className="text-zinc-500"> /&gt;</span>
                {!active.robots && <span className="text-red-400 ml-2">← strona niewidoczna!</span>}
                <Link href="/baza-wiedzy/seo/robots-txt" onClick={(e) => e.stopPropagation()} className="ml-2 text-zinc-600 hover:text-purple-400 transition-colors" title="Baza wiedzy: robots.txt">↗</Link>
              </div>

              <div onClick={() => toggle("title")} title={active.title ? "Wyłącz title" : "Włącz title"}
                className={`cursor-pointer hover:bg-zinc-800 rounded px-1 -mx-1 py-0.5 transition-colors ${active.title ? "opacity-100" : "opacity-30"}`}>
                <span className="text-zinc-500">&lt;title&gt;</span><span className="text-zinc-300">{content.pageTitle}</span><span className="text-zinc-500">&lt;/title&gt;</span>
              </div>

              <div onClick={() => toggle("meta")} title={active.meta ? "Wyłącz meta description" : "Włącz meta description"}
                className={`cursor-pointer hover:bg-zinc-800 rounded px-1 -mx-1 py-0.5 transition-colors ${active.meta ? "opacity-100" : "opacity-30"}`}>
                <span className="text-zinc-500">&lt;meta </span><span className="text-emerald-400">name</span><span className="text-zinc-500">=</span><span className="text-amber-300">&quot;description&quot;</span><span className="text-zinc-500"> content=</span><span className="text-amber-300">&quot;{content.ogDesc}&quot;</span><span className="text-zinc-500"> /&gt;</span>
              </div>

              <div onClick={() => toggle("canonical")} title={active.canonical ? "Wyłącz canonical" : "Włącz canonical"}
                className={`cursor-pointer hover:bg-zinc-800 rounded px-1 -mx-1 py-0.5 transition-colors ${active.canonical ? "opacity-100" : "opacity-30"}`}>
                <span className="text-zinc-500">&lt;link </span><span className="text-emerald-400">rel</span><span className="text-zinc-500">=</span><span className="text-amber-300">&quot;canonical&quot;</span><span className="text-zinc-500"> href=</span><span className="text-amber-300">&quot;{content.canonicalUrl}&quot;</span><span className="text-zinc-500"> /&gt;</span>
              </div>

              <div onClick={() => toggle("og")} title={active.og ? "Wyłącz Open Graph" : "Włącz Open Graph"}
                className={`cursor-pointer hover:bg-zinc-800 rounded px-1 -mx-1 py-0.5 transition-colors ${active.og ? "opacity-100" : "opacity-30"}`}>
                <span className="text-zinc-500">&lt;meta </span><span className="text-emerald-400">property</span><span className="text-zinc-500">=</span><span className="text-amber-300">&quot;og:title&quot;</span><span className="text-zinc-500"> content=</span><span className="text-amber-300">&quot;{content.ogTitle}&quot;</span><span className="text-zinc-500"> /&gt;</span>
                <Link href="/baza-wiedzy/seo/open-graph" onClick={(e) => e.stopPropagation()} className="ml-2 text-zinc-600 hover:text-purple-400 transition-colors" title="Baza wiedzy: Open Graph">↗</Link>
              </div>

              <div onClick={() => toggle("schema")} title={active.schema ? "Wyłącz Schema markup" : "Włącz Schema markup"}
                className={`cursor-pointer hover:bg-zinc-800 rounded px-1 -mx-1 py-0.5 transition-colors ${active.schema ? "opacity-100" : "opacity-30"}`}>
                <span className="text-zinc-500">&lt;script </span><span className="text-emerald-400">type</span><span className="text-zinc-500">=</span><span className="text-amber-300">&quot;application/ld+json&quot;</span><span className="text-zinc-500">&gt; </span><span className="text-blue-400">{`{ "@type": "${content.schemaType}" }`}</span><span className="text-zinc-500"> &lt;/script&gt;</span>
                <Link href="/baza-wiedzy/seo/schema-markup" onClick={(e) => e.stopPropagation()} className="ml-2 text-zinc-600 hover:text-purple-400 transition-colors" title="Baza wiedzy: Schema markup">↗</Link>
              </div>

            </div>

            {/* Page body */}
            <div className="bg-white px-5 py-4 space-y-1">

              <PreviewBlock id="h1" active={active.h1} onToggle={() => toggle("h1")} label="Nagłówek H1">
                <p className={`text-lg font-bold text-zinc-900 leading-tight ${!active.h1 ? "line-through" : ""}`}>
                  {content.h1(active.keywords)}
                </p>
              </PreviewBlock>

              <PreviewBlock id="alt" active={active.alt} onToggle={() => toggle("alt")} label="Alt atrybuty">
                <div className="bg-zinc-100 rounded-lg h-10 flex items-center justify-center px-3">
                  <span className="text-xs text-zinc-400 font-mono truncate">
                    {active.alt ? `alt="${content.altText}"` : 'alt="" ← brak opisu obrazu'}
                  </span>
                </div>
              </PreviewBlock>

              <PreviewBlock id="headings" active={active.headings} onToggle={() => toggle("headings")} label="Struktura H2/H3">
                <p className={`font-semibold text-zinc-800 text-sm ${!active.headings ? "line-through" : ""}`}>
                  {content.h2(active.keywords)}
                </p>
              </PreviewBlock>

              <PreviewBlock id="facts" active={active.facts} onToggle={() => toggle("facts")} label="Konkretne fakty">
                <div className={`bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-2 text-sm text-zinc-700 ${!active.facts ? "line-through" : ""}`}>
                  {content.facts}
                </div>
              </PreviewBlock>

              <PreviewBlock id="eeat" active={active.eeat} onToggle={() => toggle("eeat")} label="E-E-A-T">
                <div className={`border border-zinc-100 rounded-lg px-3 py-2 text-xs text-zinc-600 ${!active.eeat ? "line-through" : ""}`}>
                  {content.eeat}
                </div>
              </PreviewBlock>

              <PreviewBlock id="keywords" active={active.keywords} onToggle={() => toggle("keywords")} label="Słowa kluczowe">
                <div className="flex gap-1.5 flex-wrap">
                  {active.keywords
                    ? content.keywords.map((k) => (
                        <span key={k} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{k}</span>
                      ))
                    : <span className="text-xs text-zinc-400 line-through">brak fraz kluczowych w treści</span>
                  }
                </div>
              </PreviewBlock>

              <PreviewBlock id="links" active={active.links} onToggle={() => toggle("links")} label="Linki wewnętrzne">
                <div className="flex gap-2 flex-wrap">
                  {content.links.map((l) => (
                    <span key={l} className={`text-xs px-2 py-1 bg-zinc-100 rounded text-zinc-600 ${!active.links ? "line-through" : ""}`}>→ {l}</span>
                  ))}
                </div>
              </PreviewBlock>

              <PreviewBlock id="external" active={active.external} onToggle={() => toggle("external")} label="Wzmianki zewnętrzne">
                <p className={`text-xs text-zinc-500 ${!active.external ? "line-through" : ""}`}>
                  {content.external}
                </p>
              </PreviewBlock>

            </div>
          </div>
        </div>

        {/* ── Right: Analysis ── */}
        <div>
          <div className="flex gap-1 bg-zinc-100 rounded-lg p-1 mb-4">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex-1 text-xs py-2 rounded-md font-medium transition-all cursor-pointer ${tab === t.id ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"}`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="border border-zinc-200 rounded-xl p-5 min-h-96">

            {tab === "googlebot" && (
              <div className="space-y-3.5">
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Co Googlebot wyciąga z tej strony</p>
                {gbItems.map((item, i) => <ItemRow key={i} item={item} />)}
              </div>
            )}

            {tab === "rag" && (
              <div className="space-y-3.5">
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Co AI wyciągnie i zacytuje</p>
                {buildRagItems(active, content).map((item, i) => <ItemRow key={i} item={item} />)}
              </div>
            )}

            {tab === "are" && (
              <div>
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-5">Szansa na cytowanie w AI</p>
                {!active.robots && (
                  <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-5 text-sm text-red-700">
                    ❌ <strong>Strona zablokowana (robots: noindex)</strong> — AI nie może jej zindeksować. Wszystkie score = 0%.
                  </div>
                )}
                <div className="space-y-5">
                  <div>
                    <ScoreBar label="Authority — wiarygodność zewnętrzna" value={scores.authority} />
                    <p className="text-xs text-zinc-500 mt-1.5">
                      {scores.authority < 34 ? "❌ Brak wzmianek zewnętrznych. AI nie może zwalidować marki."
                        : scores.authority < 67 ? "⚠️ Słabe potwierdzenie zewnętrzne. Potrzeba więcej wzmianek branżowych."
                        : "✅ Dobre zewnętrzne potwierdzenie marki."}
                    </p>
                  </div>
                  <div>
                    <ScoreBar label="Relevance — trafność treści" value={scores.relevance} />
                    <p className="text-xs text-zinc-500 mt-1.5">
                      {scores.relevance < 34 ? "❌ Brak H1, nagłówków i fraz — AI nie wie czego dotyczy strona."
                        : scores.relevance < 67 ? "⚠️ Niekompletne sygnały tematyczne."
                        : "✅ Treść wyraźnie odpowiada na intencję zapytania."}
                    </p>
                  </div>
                  <div>
                    <ScoreBar label="Extractability — wyciągalność" value={scores.extractability} />
                    <p className="text-xs text-zinc-500 mt-1.5">
                      {scores.extractability < 34 ? "❌ AI nie ma co wyciąć. Brak konkretnych faktów i struktury."
                        : scores.extractability < 67 ? "⚠️ Słaby potencjał cytowania — treść zbyt ogólna."
                        : "✅ Strona ma cytowalne fragmenty z konkretnymi danymi."}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-zinc-100">
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Ogólna ocena</p>
                  <p className={`text-3xl font-bold tabular-nums ${avg >= 67 ? "text-emerald-700" : avg >= 34 ? "text-amber-700" : "text-red-700"}`}>{avg}%</p>
                  <p className="text-sm text-zinc-600 mt-1">
                    {avg >= 67 ? "Strona ma dobry potencjał cytowania w AI."
                      : avg >= 34 ? "Strona jest częściowo zoptymalizowana. Sprawdź słabe filary."
                      : "Strona ma niski potencjał cytowania w AI — wymaga pracy."}
                  </p>
                </div>
              </div>
            )}

            {tab === "podglad" && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Google SERP</p>
                  <div className="border border-zinc-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-zinc-200 rounded-sm shrink-0" />
                      <span className="text-xs text-zinc-500 font-mono truncate">
                        {content.url.split("/")[0]} › {active.canonical ? content.url.split("/").slice(1).join("/") || "" : `${content.url.split("/").slice(1).join("/") || ""}?ref=home&utm=...`}
                      </span>
                    </div>
                    <p className={`font-medium text-sm mb-1 leading-tight ${active.title ? "text-blue-600" : "text-zinc-500 italic"}`}>
                      {active.title ? content.pageTitle : `${content.url.split("/")[0]} (auto-generated by Google)`}
                    </p>
                    <p className={`text-xs leading-relaxed ${active.meta ? "text-zinc-600" : "text-zinc-400 italic"}`}>
                      {active.meta ? content.ogDesc : `${content.h1(false).slice(0, 60)}... (fragment z treści — losowy)`}
                    </p>
                    {active.schema && (
                      <div className="flex items-center gap-2 mt-2.5">
                        <span className="text-xs bg-zinc-100 px-2 py-0.5 rounded text-zinc-600">{content.schemaType}</span>
                        <span className="text-xs text-amber-500">★★★★★</span>
                        <span className="text-xs text-zinc-500">4.9 (87 opinii)</span>
                      </div>
                    )}
                    {active.vitals && (
                      <div className="mt-2">
                        <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">⚡ Szybka strona</span>
                      </div>
                    )}
                  </div>
                  {(!active.title || !active.meta || !active.canonical) && (
                    <div className="text-xs text-amber-700 bg-amber-50 rounded p-2 mt-2 space-y-1">
                      {!active.title && <p>⚠️ Brak tytułu — Google wygeneruje własny (zwykle gorszy CTR).</p>}
                      {!active.meta && <p>⚠️ Brak meta description — Google wytnie losowy fragment z treści.</p>}
                      {!active.canonical && <p>⚠️ Brak canonical — ryzyko duplikacji treści w wynikach.</p>}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Social sharing (LinkedIn / Facebook)</p>
                  <div className="border border-zinc-200 rounded-lg overflow-hidden">
                    <div className={`h-20 flex items-center justify-center px-4 ${active.og ? "bg-zinc-100" : "bg-zinc-50 border-b border-dashed border-zinc-200"}`}>
                      <span className="text-xs text-zinc-400 text-center">
                        {active.og ? "og:image — grafika strony (1200×630px)" : "brak og:image — miniatura losowa lub brak obrazu"}
                      </span>
                    </div>
                    <div className="px-4 py-3 bg-white">
                      <p className="text-xs text-zinc-400 uppercase mb-1">{content.url.split("/")[0].toUpperCase()}</p>
                      <p className={`font-semibold text-sm ${active.og || active.title ? "text-zinc-900" : "text-zinc-400"}`}>
                        {active.og ? content.ogTitle : active.title ? content.pageTitle : content.url.split("/")[0]}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {active.og ? content.ogDesc : active.meta ? content.ogDesc : "Brak opisu — social media wyciągną losowy fragment ze strony."}
                      </p>
                    </div>
                  </div>
                  {!active.og && (
                    <p className="text-xs text-amber-700 bg-amber-50 rounded p-2 mt-2">
                      ⚠️ Brak Open Graph — LinkedIn/Facebook wyciągną losowe dane. Miniatura może być przypadkowa lub jej nie będzie.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-4 text-xs text-zinc-400">
            <span>✅ OK</span><span>⚠️ Ostrzeżenie</span><span>❌ Problem</span><span>ℹ️ Info</span>
          </div>
        </div>

      </div>
    </main>
  );
}
