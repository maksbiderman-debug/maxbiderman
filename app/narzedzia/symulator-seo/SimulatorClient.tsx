"use client";
import { useState, useRef } from "react";
import Link from "next/link";

type ToggleId =
  | "robots" | "title" | "meta" | "h1" | "headings" | "schema" | "alt"
  | "canonical" | "facts" | "links" | "external"
  | "og" | "sitemap" | "vitals" | "eeat" | "keywords";

type TabId = "googlebot" | "rag" | "are" | "podglad";

type ToggleDef = { id: ToggleId; label: string; description: string; docUrl: string | null };

const GROUPS: { label: string; items: ToggleDef[] }[] = [
  {
    label: "Techniczne",
    items: [
      { id: "robots", label: "Robots: index", description: "Zezwolenie na indeksowanie", docUrl: "/baza-wiedzy/seo/robots-txt" },
      { id: "canonical", label: "Canonical URL", description: "Kanoniczna wersja strony", docUrl: null },
      { id: "sitemap", label: "Sitemap.xml", description: "Mapa strony dla Googlebota", docUrl: "/baza-wiedzy/seo/sitemap" },
      { id: "schema", label: "Schema markup", description: "Dane strukturalne JSON-LD", docUrl: "/baza-wiedzy/seo/schema-markup" },
      { id: "og", label: "Open Graph", description: "Metadane dla social media", docUrl: "/baza-wiedzy/seo/open-graph" },
      { id: "alt", label: "Alt atrybuty", description: "Opisy obrazów dla crawlerów", docUrl: null },
      { id: "vitals", label: "Core Web Vitals", description: "LCP, CLS, INP — wydajność strony", docUrl: "/baza-wiedzy/seo/core-web-vitals" },
    ],
  },
  {
    label: "Treść",
    items: [
      { id: "title", label: "Title tag", description: "Tytuł strony w SERP i zakładce", docUrl: null },
      { id: "meta", label: "Meta description", description: "Opis strony w wynikach Google", docUrl: null },
      { id: "h1", label: "Nagłówek H1", description: "Główny nagłówek określający temat", docUrl: null },
      { id: "headings", label: "Struktura H2/H3", description: "Hierarchia nagłówków w treści", docUrl: null },
      { id: "keywords", label: "Słowa kluczowe", description: "Frazy kluczowe wplecione w treść", docUrl: "/baza-wiedzy/seo/frazy-kluczowe" },
      { id: "facts", label: "Konkretne fakty", description: "Liczby i dane cytowalne przez AI", docUrl: "/baza-wiedzy/seo-ai/framework-authority-relevance-extractability" },
      { id: "eeat", label: "E-E-A-T", description: "Sygnały ekspertyzy i wiarygodności autora", docUrl: "/baza-wiedzy/seo/eeat" },
    ],
  },
  {
    label: "Autorytet",
    items: [
      { id: "links", label: "Linki wewnętrzne", description: "Połączenia między podstronami", docUrl: null },
      { id: "external", label: "Wzmianki zewnętrzne", description: "Cytowania marki w serwisach branżowych", docUrl: "/baza-wiedzy/seo-ai/framework-authority-relevance-extractability" },
    ],
  },
];

const ALL_TOGGLES: ToggleDef[] = GROUPS.flatMap((g) => g.items);

const INITIAL: Record<ToggleId, boolean> = {
  robots: true, title: true, meta: true, h1: true, headings: true,
  schema: true, alt: true, canonical: true, facts: true, links: true,
  external: true, og: true, sitemap: true, vitals: true, eeat: true, keywords: true,
};

type Item = {
  label: string;
  value: string;
  status: "ok" | "warn" | "error" | "info";
  note?: string;
};

function buildGbItems(a: Record<ToggleId, boolean>): Item[] {
  if (!a.robots)
    return [{ label: "Indeksowanie", value: "NOINDEX", status: "error", note: "Strona zablokowana dla Google. Pozostałe elementy są bez znaczenia." }];
  return [
    { label: "Indeksowanie", value: "INDEX, FOLLOW", status: "ok" },
    { label: "Tytuł strony", value: a.title ? '"Agencja SEO Poznań | Widoczni"' : "[brak]", status: a.title ? "ok" : "warn", note: a.title ? undefined : "Google wygeneruje własny tytuł — zwykle słabszy pod kątem CTR." },
    { label: "Meta description", value: a.meta ? '"Pozycjonujemy od 2009. 1 200+ klientów, +180% ruchu."' : "[brak]", status: a.meta ? "ok" : "warn", note: a.meta ? undefined : "Google wytnie losowy fragment z treści strony." },
    { label: "H1", value: a.h1 ? '"Agencja SEO Poznań — pozycjonowanie stron"' : "[brak]", status: a.h1 ? "ok" : "warn", note: a.h1 ? undefined : "Google nie ma wyraźnego sygnału o głównym temacie." },
    { label: "Struktura nagłówków", value: a.headings ? "H1 → H2 ×3 → H3 ×2" : "brak hierarchii", status: a.headings ? "ok" : "warn", note: a.headings ? undefined : "Brak struktury utrudnia Google zrozumienie podziału treści." },
    { label: "Słowa kluczowe", value: a.keywords ? "agencja SEO, pozycjonowanie, Poznań — w tytule, H1, treści" : "[brak sygnałów fraz]", status: a.keywords ? "ok" : "warn", note: a.keywords ? undefined : "Brak fraz kluczowych — Google nie wie pod co rankować stronę." },
    { label: "Schema markup", value: a.schema ? "LocalBusiness — rich result możliwy" : "[brak]", status: a.schema ? "ok" : "info", note: a.schema ? undefined : "Brak danych strukturalnych. Brak możliwości rich results." },
    { label: "Core Web Vitals", value: a.vitals ? "LCP 1.8s ✅  CLS 0.05 ✅  INP 180ms ✅" : "LCP 4.5s ❌  CLS 0.42 ❌  INP 620ms ❌", status: a.vitals ? "ok" : "warn", note: a.vitals ? undefined : "Słabe CWV to sygnał rankingowy — Google preferuje szybsze strony." },
    { label: "E-E-A-T", value: a.eeat ? "Autor, credentials, About page — sygnały obecne" : "[brak sygnałów ekspertyzy]", status: a.eeat ? "ok" : "warn", note: a.eeat ? undefined : "Brak autora i bio. Google trudniej ocenić wiarygodność strony." },
    { label: "Obrazy", value: a.alt ? "1/1 z atrybutem alt" : "0/1 z atrybutem alt", status: a.alt ? "ok" : "warn", note: a.alt ? undefined : "Obraz nieindeksowalny. Brakuje kontekstu dla crawlera." },
    { label: "Canonical URL", value: a.canonical ? "https://widoczni.com/agencja-seo-warszawa" : "[brak]", status: a.canonical ? "ok" : "warn", note: a.canonical ? undefined : "Ryzyko duplikacji treści (http/https, www/bez www)." },
    { label: "Sitemap.xml", value: a.sitemap ? "Strona w sitemap — odkryta szybciej" : "[brak w sitemap]", status: a.sitemap ? "ok" : "info", note: a.sitemap ? undefined : "Google może nie odkryć strony od razu bez sitemap." },
    { label: "Linki wewnętrzne", value: a.links ? "3 linki → /cennik, /o-nas, /kontakt" : "[brak]", status: a.links ? "ok" : "info", note: a.links ? undefined : "Crawler może nie odkryć innych podstron z tego URL." },
  ];
}

function buildRagItems(a: Record<ToggleId, boolean>): Item[] {
  if (!a.robots)
    return [{ label: "Dostępność", value: "Strona zablokowana (NOINDEX)", status: "error", note: "AI nie może tej strony zindeksować ani zacytować." }];
  const strong = a.facts && a.headings;
  const partial = a.facts || a.headings;
  return [
    {
      label: "Cytowalny fragment",
      value: strong
        ? '"Widoczni to agencja SEO działająca od 2009 roku. Ponad 1 200 klientów, średni wzrost ruchu organicznego +180%."'
        : partial ? '"Widoczni to agencja SEO. Pomagamy firmom rosnąć w Google."'
        : "[brak konkretnego fragmentu]",
      status: strong ? "ok" : partial ? "warn" : "error",
      note: strong ? "Konkretne dane + czytelna struktura = wysoka szansa na cytowanie."
        : partial ? "Fragment zbyt ogólny — AI pominie go na rzecz konkretniejszych źródeł."
        : "Brak faktów i struktury. AI nie ma co wyciąć.",
    },
    { label: "Extractability", value: a.facts ? "Fakty obecne: 2009, 1 200 klientów, +180%" : "[brak liczb i danych]", status: a.facts ? "ok" : "error", note: a.facts ? undefined : "AI cytuje konkrety, nie ogólniki. Dodaj liczby, daty, wyniki." },
    { label: "Struktura treści", value: a.headings ? "H2/H3 — AI identyfikuje sekcje" : "Brak hierarchii nagłówków", status: a.headings ? "ok" : "warn", note: a.headings ? undefined : "Brak nagłówków utrudnia AI wyciągnięcie właściwego fragmentu." },
    { label: "E-E-A-T → Authority", value: a.eeat ? "Kredencjały autora zwiększają wiarygodność cytowania" : "Brak sygnałów ekspertyzy", status: a.eeat ? "ok" : "warn", note: a.eeat ? undefined : "AI preferuje cytowanie źródeł z wyraźną ekspertyzą i autorem." },
    {
      label: "Query fan-out coverage",
      value: a.keywords && a.headings ? "Pokrycie: agencja SEO, pozycjonowanie, SEO Poznań, specjalizacje"
        : a.keywords || a.headings ? "Częściowe pokrycie intencji" : "Słabe pokrycie intencji",
      status: a.keywords && a.headings ? "ok" : a.keywords || a.headings ? "warn" : "error",
      note: a.keywords && a.headings ? undefined : "AI generuje wiele podzapytań — bez fraz i nagłówków strona nie odpowiada na żadne.",
    },
    { label: "Entity clarity", value: a.schema ? "LocalBusiness — AI rozumie typ encji" : "AI dedukuje typ strony samodzielnie", status: a.schema ? "ok" : "info" },
  ];
}

function buildScores(a: Record<ToggleId, boolean>) {
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

export default function SimulatorClient() {
  const [active, setActive] = useState<Record<ToggleId, boolean>>(INITIAL);
  const [tab, setTab] = useState<TabId>("googlebot");
  const [toast, setToast] = useState<string | null>(null);
  const toastRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = (id: ToggleId) => {
    setActive((p) => {
      const next = !p[id];
      if (!next) {
        const def = ALL_TOGGLES.find((t) => t.id === id);
        if (def) {
          if (toastRef.current) clearTimeout(toastRef.current);
          setToast(def.label);
          toastRef.current = setTimeout(() => setToast(null), 2500);
        }
      }
      return { ...p, [id]: next };
    });
  };
  const resetAll = () => { setActive(INITIAL); setToast(null); };
  const disableAll = () =>
    setActive(Object.fromEntries(Object.keys(INITIAL).map((k) => [k, false])) as Record<ToggleId, boolean>);

  const scores = buildScores(active);
  const avg = Math.round((scores.authority + scores.relevance + scores.extractability) / 3);

  const TABS: { id: TabId; label: string }[] = [
    { id: "googlebot", label: "🤖 Googlebot" },
    { id: "rag", label: "🧠 RAG / AI" },
    { id: "are", label: "📊 A/R/E" },
    { id: "podglad", label: "👁 Podgląd" },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-24">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-3">Symulator SEO</h1>
        <p className="text-zinc-500 max-w-2xl">
          Włączaj i wyłączaj elementy strony — sprawdź jak reaguje Googlebot, jak AI (RAG) decyduje o cytowaniu, jak zmienia się score A/R/E i jak strona wygląda w Google i social media.
        </p>
      </div>

      {/* Toggles grouped */}
      <div className="mb-8 space-y-4">
        {GROUPS.map((g) => (
          <div key={g.label}>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">{g.label}</p>
            <div className="flex flex-wrap gap-2">
              {g.items.map((t) => (
                <button
                  key={t.id}
                  onClick={() => toggle(t.id)}
                  title={t.description}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    active[t.id] ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-400 line-through"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="flex gap-3 pt-1">
          <button onClick={resetAll} className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">↺ Włącz wszystko</button>
          <span className="text-zinc-300">·</span>
          <button onClick={disableAll} className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">✕ Wyłącz wszystko</button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* ── Left: Mock page ── */}
        <div>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Podgląd strony</p>
          <div className="border border-zinc-200 rounded-xl overflow-hidden">

            {/* Browser chrome */}
            <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-300" />
                <div className="w-3 h-3 rounded-full bg-zinc-300" />
                <div className="w-3 h-3 rounded-full bg-zinc-300" />
              </div>
              <div className="flex-1 bg-white border border-zinc-200 rounded px-3 py-1 text-xs text-zinc-500 font-mono flex items-center justify-between">
                <span>widoczni.com/agencja-seo-poznan</span>
                {active.sitemap && <span title="sitemap.xml" className="text-zinc-400">🗺</span>}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded font-medium ${active.vitals ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                {active.vitals ? "⚡ Fast" : "🐢 Slow"}
              </span>
            </div>

            {/* HTML <head> */}
            <div className="bg-zinc-900 px-4 py-3 space-y-1.5 text-xs font-mono">

              {/* robots */}
              <div className={`transition-opacity duration-200 ${active.robots ? "opacity-100" : "opacity-25"}`}>
                <span className="text-zinc-500">&lt;meta </span>
                <span className="text-emerald-400">name</span>
                <span className="text-zinc-500">=</span>
                <span className="text-amber-300">&quot;robots&quot;</span>
                <span className="text-zinc-500"> content=</span>
                <span className={`text-amber-300 ${!active.robots ? "line-through" : ""}`}>&quot;{active.robots ? "index, follow" : "noindex"}&quot;</span>
                <span className="text-zinc-500"> /&gt;</span>
                {!active.robots && <span className="text-red-400 ml-2">← strona niewidoczna!</span>}
              </div>

              {/* title */}
              <div className={`transition-opacity duration-200 ${active.title ? "opacity-100" : "opacity-25"}`}>
                <span className="text-zinc-500">&lt;title&gt;</span>
                <span className={`text-zinc-300 ${!active.title ? "line-through" : ""}`}>Agencja SEO Poznań | Widoczni</span>
                <span className="text-zinc-500">&lt;/title&gt;</span>
              </div>

              {/* meta description */}
              <div className={`transition-opacity duration-200 ${active.meta ? "opacity-100" : "opacity-25"}`}>
                <span className="text-zinc-500">&lt;meta </span>
                <span className="text-emerald-400">name</span>
                <span className="text-zinc-500">=</span>
                <span className="text-amber-300">&quot;description&quot;</span>
                <span className="text-zinc-500"> content=</span>
                <span className={`text-amber-300 ${!active.meta ? "line-through" : ""}`}>&quot;Pozycjonujemy od 2009...&quot;</span>
                <span className="text-zinc-500"> /&gt;</span>
              </div>

              {/* canonical */}
              <div className={`transition-opacity duration-200 ${active.canonical ? "opacity-100" : "opacity-25"}`}>
                <span className="text-zinc-500">&lt;link </span>
                <span className="text-emerald-400">rel</span>
                <span className="text-zinc-500">=</span>
                <span className="text-amber-300">&quot;canonical&quot;</span>
                <span className="text-zinc-500"> href=</span>
                <span className={`text-amber-300 ${!active.canonical ? "line-through" : ""}`}>&quot;https://widoczni.com/agencja-seo-poznan&quot;</span>
                <span className="text-zinc-500"> /&gt;</span>
              </div>

              {/* og:title */}
              <div className={`transition-opacity duration-200 ${active.og ? "opacity-100" : "opacity-25"}`}>
                <span className="text-zinc-500">&lt;meta </span>
                <span className="text-emerald-400">property</span>
                <span className="text-zinc-500">=</span>
                <span className="text-amber-300">&quot;og:title&quot;</span>
                <span className="text-zinc-500"> content=</span>
                <span className={`text-amber-300 ${!active.og ? "line-through" : ""}`}>&quot;Agencja SEO Poznań | Widoczni&quot;</span>
                <span className="text-zinc-500"> /&gt;</span>
              </div>

              {/* schema */}
              <div className={`transition-opacity duration-200 ${active.schema ? "opacity-100" : "opacity-25"}`}>
                <span className="text-zinc-500">&lt;script </span>
                <span className="text-emerald-400">type</span>
                <span className="text-zinc-500">=</span>
                <span className="text-amber-300">&quot;application/ld+json&quot;</span>
                <span className="text-zinc-500">&gt; </span>
                <span className={`text-blue-400 ${!active.schema ? "line-through" : ""}`}>{`{ "@type": "LocalBusiness" }`}</span>
                <span className="text-zinc-500"> &lt;/script&gt;</span>
              </div>

            </div>

            {/* Page body */}
            <div className="bg-white px-5 py-5 space-y-4">

              {/* H1 */}
              <div className={`transition-opacity duration-200 ${active.h1 ? "opacity-100" : "opacity-25"}`}>
                <p className={`text-lg font-bold text-zinc-900 leading-tight ${!active.h1 ? "line-through" : ""}`}>
                  {active.keywords ? "Agencja SEO Poznań — pozycjonowanie stron" : "Agencja SEO, która dowozi wyniki"}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  ← H1{active.keywords ? " z frazami kluczowymi" : " — brak fraz kluczowych"}
                </p>
              </div>

              {/* Image */}
              <div className={`transition-opacity duration-200 ${active.alt ? "opacity-100" : "opacity-50"}`}>
                <div className="bg-zinc-100 rounded-lg h-12 flex items-center justify-center px-3">
                  <span className="text-xs text-zinc-400 font-mono text-center">
                    {active.alt ? 'alt="Zespół agencji SEO Widoczni w biurze w Warszawie"' : 'alt="" ← brak opisu obrazu'}
                  </span>
                </div>
              </div>

              {/* H2 */}
              <div className={`transition-opacity duration-200 ${active.headings ? "opacity-100" : "opacity-25"}`}>
                <p className={`font-semibold text-zinc-800 text-sm ${!active.headings ? "line-through" : ""}`}>
                  {active.keywords ? "Pozycjonowanie stron Poznań — dlaczego Widoczni?" : "Dlaczego klienci wybierają Widoczni?"}
                </p>
                <p className="text-xs text-zinc-400">← H2</p>
              </div>

              {/* Facts */}
              <div className={`transition-opacity duration-200 ${active.facts ? "opacity-100" : "opacity-25"}`}>
                <div className={`bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-2 text-sm text-zinc-700 ${!active.facts ? "line-through" : ""}`}>
                  🏆 <strong>1 200+ klientów</strong> od 2009 roku · <strong>+180%</strong> średni wzrost ruchu
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">← konkretne fakty / liczby</p>
              </div>

              {/* E-E-A-T */}
              <div className={`transition-opacity duration-200 ${active.eeat ? "opacity-100" : "opacity-25"}`}>
                <div className={`border border-zinc-100 rounded-lg px-3 py-2 text-xs text-zinc-600 ${!active.eeat ? "line-through" : ""}`}>
                  ✍️ <strong>Jan Kowalski</strong> · ekspert SEO, 15 lat doświadczenia · certyfikat Google
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">← sygnał E-E-A-T (autor, credentials)</p>
              </div>

              {/* H2 second */}
              <div className={`transition-opacity duration-200 ${active.headings ? "opacity-100" : "opacity-25"}`}>
                <p className={`font-semibold text-zinc-800 text-sm ${!active.headings ? "line-through" : ""}`}>Jak działamy?</p>
                <p className="text-xs text-zinc-400">← H2</p>
              </div>

              {/* Internal links */}
              <div className={`transition-opacity duration-200 ${active.links ? "opacity-100" : "opacity-25"}`}>
                <div className="flex gap-2 flex-wrap">
                  {["Cennik", "O nas", "Kontakt"].map((l) => (
                    <span key={l} className={`text-xs px-2 py-1 bg-zinc-100 rounded text-zinc-600 ${!active.links ? "line-through" : ""}`}>→ {l}</span>
                  ))}
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">← linki wewnętrzne</p>
              </div>

              {/* External */}
              <div className={`border-t border-zinc-100 pt-3 transition-opacity duration-200 ${active.external ? "opacity-100" : "opacity-25"}`}>
                <p className={`text-xs text-zinc-500 ${!active.external ? "line-through" : ""}`}>
                  🔗 Wymieniony w: Marketer+, WhitePress, Forbes.pl
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">← wzmianki zewnętrzne</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Analysis ── */}
        <div>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Analiza</p>

          {/* Toast */}
          {toast && (
            <div className="flex items-center gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5 mb-3 transition-all">
              <span className="text-base">⚠️</span>
              <span><strong>{toast}</strong> wyłączony — sprawdź zmiany w analizie</span>
            </div>
          )}

          {/* Tab bar */}
          <div className="flex gap-1 bg-zinc-100 rounded-lg p-1 mb-4">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 text-xs py-2 rounded-md font-medium transition-all cursor-pointer ${
                  tab === t.id ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="border border-zinc-200 rounded-xl p-5 min-h-96">

            {tab === "googlebot" && (
              <div className="space-y-3.5">
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Co Googlebot wyciąga z tej strony</p>
                {buildGbItems(active).map((item, i) => <ItemRow key={i} item={item} />)}
              </div>
            )}

            {tab === "rag" && (
              <div className="space-y-3.5">
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Co AI wyciągnie i zacytuje</p>
                {buildRagItems(active).map((item, i) => <ItemRow key={i} item={item} />)}
              </div>
            )}

            {tab === "are" && (
              <div>
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-5">Szansa na cytowanie w AI</p>
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

                {/* SERP */}
                <div>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Google SERP</p>
                  <div className="border border-zinc-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-zinc-200 rounded-sm shrink-0" />
                      <span className="text-xs text-zinc-500 font-mono">
                        widoczni.com › {active.canonical ? "agencja-seo-warszawa" : "agencja-seo-warszawa?ref=home&utm=..."}
                      </span>
                    </div>
                    <p className={`font-medium text-sm mb-1 leading-tight ${active.title ? "text-blue-600" : "text-zinc-500 italic"}`}>
                      {active.title
                        ? "Agencja SEO Poznań | Widoczni — Pozycjonowanie Stron"
                        : "Widoczni - Strona główna (auto-generated by Google)"}
                    </p>
                    <p className={`text-xs leading-relaxed ${active.meta ? "text-zinc-600" : "text-zinc-400 italic"}`}>
                      {active.meta
                        ? "Pozycjonujemy od 2009 roku. 1 200+ klientów, średni wzrost ruchu +180%. Bezpłatna wycena w 24h."
                        : "Agencja SEO, która dowozi wyniki Dlaczego klienci... (fragment z treści — losowy)"}
                    </p>
                    {active.schema && (
                      <div className="flex items-center gap-2 mt-2.5">
                        <span className="text-xs bg-zinc-100 px-2 py-0.5 rounded text-zinc-600">LocalBusiness</span>
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

                {/* Social / OG */}
                <div>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Social sharing (LinkedIn / Facebook)</p>
                  <div className="border border-zinc-200 rounded-lg overflow-hidden">
                    <div className={`h-20 flex items-center justify-center px-4 ${active.og ? "bg-zinc-100" : "bg-zinc-50 border-b border-dashed border-zinc-200"}`}>
                      <span className="text-xs text-zinc-400 text-center">
                        {active.og ? "og:image — hero grafika agencji (1200×630px)" : "brak og:image — miniatura losowa lub brak obrazu"}
                      </span>
                    </div>
                    <div className="px-4 py-3 bg-white">
                      <p className="text-xs text-zinc-400 uppercase mb-1">WIDOCZNI.COM</p>
                      <p className={`font-semibold text-sm ${active.og || active.title ? "text-zinc-900" : "text-zinc-400"}`}>
                        {active.og ? "Agencja SEO Poznań — Widoczni"
                          : active.title ? "Agencja SEO Poznań | Widoczni"
                          : "widoczni.com"}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {active.og ? "Pozycjonujemy strony w Google od 2009. Ponad 1 200 klientów."
                          : active.meta ? "Pozycjonujemy od 2009. 1 200+ klientów..."
                          : "Brak opisu — social media wyciągną losowy fragment ze strony."}
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

          {/* Legend */}
          <div className="mt-4 flex gap-4 text-xs text-zinc-400">
            <span>✅ OK</span><span>⚠️ Ostrzeżenie</span><span>❌ Problem</span><span>ℹ️ Info</span>
          </div>

          {/* Doc links */}
          <div className="mt-4">
            <p className="text-xs text-zinc-400 mb-2">Dowiedz się więcej w bazie wiedzy:</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {ALL_TOGGLES.filter((t) => t.docUrl).map((t) => (
                <Link key={t.id} href={t.docUrl!} className="text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-900 transition-colors">
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
