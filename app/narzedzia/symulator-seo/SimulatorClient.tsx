"use client";
import { useState } from "react";
import Link from "next/link";

type ToggleId =
  | "robots"
  | "title"
  | "meta"
  | "h1"
  | "headings"
  | "schema"
  | "alt"
  | "canonical"
  | "facts"
  | "links"
  | "external";

type TabId = "googlebot" | "rag" | "are";

const TOGGLES: {
  id: ToggleId;
  label: string;
  description: string;
  docUrl: string | null;
}[] = [
  {
    id: "robots",
    label: "Robots: index",
    description: "Zezwolenie na indeksowanie strony przez boty",
    docUrl: "/baza-wiedzy/seo/robots-txt",
  },
  {
    id: "title",
    label: "Title tag",
    description: "Tytuł strony widoczny w SERP i zakładce",
    docUrl: null,
  },
  {
    id: "meta",
    label: "Meta description",
    description: "Opis strony w wynikach Google",
    docUrl: null,
  },
  {
    id: "h1",
    label: "Nagłówek H1",
    description: "Główny nagłówek określający temat strony",
    docUrl: null,
  },
  {
    id: "headings",
    label: "Struktura H2/H3",
    description: "Hierarchia nagłówków w treści",
    docUrl: null,
  },
  {
    id: "schema",
    label: "Schema markup",
    description: "Dane strukturalne JSON-LD",
    docUrl: "/baza-wiedzy/seo/schema-markup",
  },
  {
    id: "alt",
    label: "Alt atrybuty",
    description: "Opisy obrazów dla crawlerów i dostępności",
    docUrl: null,
  },
  {
    id: "canonical",
    label: "Canonical URL",
    description: "Wskazanie kanonicznej wersji strony",
    docUrl: null,
  },
  {
    id: "facts",
    label: "Konkretne fakty",
    description: "Liczby i dane cytowalne przez AI",
    docUrl: "/baza-wiedzy/seo-ai/framework-authority-relevance-extractability",
  },
  {
    id: "links",
    label: "Linki wewnętrzne",
    description: "Połączenia między podstronami witryny",
    docUrl: null,
  },
  {
    id: "external",
    label: "Wzmianki zewnętrzne",
    description: "Cytowania marki w innych serwisach branżowych",
    docUrl: "/baza-wiedzy/seo-ai/framework-authority-relevance-extractability",
  },
];

type Item = {
  label: string;
  value: string;
  status: "ok" | "warn" | "error" | "info";
  note?: string;
};

function buildGooglebotItems(a: Record<ToggleId, boolean>): Item[] {
  if (!a.robots) {
    return [
      {
        label: "Indeksowanie",
        value: "NOINDEX",
        status: "error",
        note: "Strona zablokowana dla Google. Pozostałe elementy są bez znaczenia — ta strona nie pojawi się w wynikach.",
      },
    ];
  }
  return [
    { label: "Indeksowanie", value: "INDEX, FOLLOW", status: "ok" },
    {
      label: "Tytuł strony",
      value: a.title
        ? '"Agencja SEO Warszawa | Widoczni — Pozycjonowanie"'
        : "[brak]",
      status: a.title ? "ok" : "warn",
      note: a.title
        ? undefined
        : "Google wygeneruje własny tytuł z treści — zwykle słabszy pod kątem CTR i brandingu.",
    },
    {
      label: "Meta description",
      value: a.meta
        ? '"Pozycjonujemy od 2009. 1 200+ klientów, +180% ruchu."'
        : "[brak]",
      status: a.meta ? "ok" : "warn",
      note: a.meta
        ? undefined
        : "Google wytnie losowy fragment z treści strony. Może być przypadkowy.",
    },
    {
      label: "Nagłówek H1",
      value: a.h1 ? '"Agencja SEO, która dowozi wyniki"' : "[brak]",
      status: a.h1 ? "ok" : "warn",
      note: a.h1
        ? undefined
        : "Google nie ma wyraźnego sygnału o głównym temacie strony.",
    },
    {
      label: "Struktura nagłówków",
      value: a.headings ? "H1 → H2 ×3 → H3 ×2" : "brak hierarchii",
      status: a.headings ? "ok" : "warn",
      note: a.headings
        ? undefined
        : "Brak struktury utrudnia Google zrozumienie podziału i wagi sekcji.",
    },
    {
      label: "Schema markup",
      value: a.schema ? "LocalBusiness — rich result możliwy" : "[brak]",
      status: a.schema ? "ok" : "info",
      note: a.schema
        ? undefined
        : "Brak danych strukturalnych. Google nie może generować rich results dla tej strony.",
    },
    {
      label: "Obrazy",
      value: a.alt ? "1/1 z atrybutem alt" : "0/1 z atrybutem alt",
      status: a.alt ? "ok" : "warn",
      note: a.alt
        ? undefined
        : "Obraz nieindeksowalny w Google Images. Brakuje kontekstu dla crawlera.",
    },
    {
      label: "Canonical URL",
      value: a.canonical
        ? "https://widoczni.com/agencja-seo-warszawa"
        : "[brak]",
      status: a.canonical ? "ok" : "warn",
      note: a.canonical
        ? undefined
        : "Ryzyko duplikacji treści (http/https, www/bez www, parametry URL).",
    },
    {
      label: "Linki wewnętrzne",
      value: a.links ? "3 linki → /cennik, /o-nas, /kontakt" : "[brak]",
      status: a.links ? "ok" : "info",
      note: a.links
        ? undefined
        : "Crawler może nie odkryć innych podstron z tego URL.",
    },
  ];
}

function buildRagItems(a: Record<ToggleId, boolean>): Item[] {
  if (!a.robots) {
    return [
      {
        label: "Dostępność",
        value: "Strona zablokowana (NOINDEX)",
        status: "error",
        note: "AI nie może tej strony zindeksować ani zacytować.",
      },
    ];
  }
  const strong = a.facts && a.headings;
  const partial = a.facts || a.headings;
  return [
    {
      label: "Cytowalny fragment",
      value: strong
        ? '"Widoczni to agencja SEO działająca od 2009 roku. Ponad 1 200 klientów, średni wzrost ruchu organicznego +180%."'
        : partial
        ? '"Widoczni to agencja SEO. Pomagamy firmom rosnąć w Google."'
        : "[brak konkretnego fragmentu]",
      status: strong ? "ok" : partial ? "warn" : "error",
      note: strong
        ? "Konkretne dane + czytelna struktura = wysoka szansa na cytowanie."
        : partial
        ? "Fragment zbyt ogólny — AI pominie go na rzecz konkretniejszych źródeł."
        : "Brak faktów i struktury. AI nie ma co wyciąć i zacytować.",
    },
    {
      label: "Extractability",
      value: a.facts
        ? "Fakty obecne: 2009, 1 200 klientów, +180%"
        : "[brak liczb i danych]",
      status: a.facts ? "ok" : "error",
      note: a.facts
        ? undefined
        : "AI cytuje konkrety, nie ogólniki. Dodaj liczby, daty, wyniki.",
    },
    {
      label: "Struktura treści",
      value: a.headings
        ? "H2/H3 — AI identyfikuje sekcje"
        : "Brak hierarchii nagłówków",
      status: a.headings ? "ok" : "warn",
      note: a.headings
        ? undefined
        : "Brak nagłówków utrudnia AI wyciągnięcie właściwego fragmentu z odpowiedniego miejsca.",
    },
    {
      label: "Entity clarity (Schema)",
      value: a.schema
        ? "LocalBusiness — AI rozumie typ encji"
        : "AI samodzielnie dedukuje typ strony",
      status: a.schema ? "ok" : "info",
      note: a.schema
        ? undefined
        : "Schema pomaga AI szybciej zakwalifikować markę jako wiarygodne źródło.",
    },
    {
      label: "Query fan-out coverage",
      value:
        a.h1 && a.headings
          ? "Pokrycie: agencja SEO, SEO Warszawa, pozycjonowanie stron"
          : "Słabe pokrycie intencji",
      status: a.h1 && a.headings ? "ok" : "warn",
      note:
        a.h1 && a.headings
          ? undefined
          : "AI generuje wiele podzapytań — bez nagłówków strona nie odpowiada na żadne z nich wystarczająco.",
    },
  ];
}

function buildAreScores(a: Record<ToggleId, boolean>) {
  const authority = Math.min(
    (a.external ? 60 : 5) +
      (a.schema ? 20 : 0) +
      (a.links ? 10 : 0) +
      (a.title ? 10 : 0),
    100
  );
  const relevance = Math.min(
    (a.h1 ? 30 : 0) +
      (a.headings ? 30 : 0) +
      (a.title ? 25 : 0) +
      (a.meta ? 15 : 0),
    100
  );
  const extractability = Math.min(
    (a.facts ? 50 : 0) +
      (a.headings ? 25 : 0) +
      (a.h1 ? 15 : 0) +
      (a.schema ? 10 : 0),
    100
  );
  return { authority, relevance, extractability };
}

function statusIcon(s: Item["status"]) {
  if (s === "ok") return "✅";
  if (s === "warn") return "⚠️";
  if (s === "error") return "❌";
  return "ℹ️";
}

function statusColor(s: Item["status"]) {
  if (s === "ok") return "text-emerald-700";
  if (s === "warn") return "text-amber-700";
  if (s === "error") return "text-red-700";
  return "text-blue-700";
}

function ScoreBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const barColor =
    value >= 67
      ? "bg-emerald-500"
      : value >= 34
      ? "bg-amber-400"
      : "bg-red-400";
  const textColor =
    value >= 67
      ? "text-emerald-700"
      : value >= 34
      ? "text-amber-700"
      : "text-red-700";
  return (
    <div className="mb-1">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-zinc-900">{label}</span>
        <span className={`text-sm font-bold tabular-nums ${textColor}`}>
          {value}%
        </span>
      </div>
      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function SimulatorClient() {
  const [active, setActive] = useState<Record<ToggleId, boolean>>({
    robots: true,
    title: true,
    meta: true,
    h1: true,
    headings: true,
    schema: true,
    alt: true,
    canonical: true,
    facts: true,
    links: true,
    external: true,
  });
  const [tab, setTab] = useState<TabId>("googlebot");

  const toggle = (id: ToggleId) =>
    setActive((prev) => ({ ...prev, [id]: !prev[id] }));

  const gbItems = buildGooglebotItems(active);
  const rItems = buildRagItems(active);
  const scores = buildAreScores(active);
  const avg = Math.round(
    (scores.authority + scores.relevance + scores.extractability) / 3
  );

  return (
    <main className="max-w-5xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-3">
          Symulator SEO
        </h1>
        <p className="text-zinc-500 max-w-2xl">
          Włączaj i wyłączaj elementy strony — sprawdź jak reaguje Googlebot,
          jak AI (RAG) decyduje o cytowaniu i jak zmienia się score Authority /{" "}
          Relevance / Extractability.
        </p>
      </div>

      {/* Toggles */}
      <div className="mb-8">
        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">
          Elementy strony — kliknij żeby włączyć / wyłączyć
        </p>
        <div className="flex flex-wrap gap-2">
          {TOGGLES.map((t) => (
            <button
              key={t.id}
              onClick={() => toggle(t.id)}
              title={t.description}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                active[t.id]
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-400 line-through"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Mock page */}
        <div>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">
            Podgląd strony
          </p>
          <div className="border border-zinc-200 rounded-xl overflow-hidden">
            {/* Browser chrome */}
            <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-300" />
                <div className="w-3 h-3 rounded-full bg-zinc-300" />
                <div className="w-3 h-3 rounded-full bg-zinc-300" />
              </div>
              <div className="flex-1 bg-white border border-zinc-200 rounded px-3 py-1 text-xs text-zinc-500 font-mono">
                widoczni.com/agencja-seo-warszawa
              </div>
            </div>

            {/* HTML head — dark */}
            <div className="bg-zinc-900 px-4 py-3 space-y-1.5 text-xs font-mono">
              <div
                className={`transition-opacity duration-200 ${
                  active.robots ? "opacity-100" : "opacity-25"
                }`}
              >
                <span className="text-zinc-500">&lt;meta </span>
                <span className="text-emerald-400">name</span>
                <span className="text-zinc-500">=</span>
                <span className="text-amber-300">&quot;robots&quot;</span>
                <span className="text-zinc-500"> content=</span>
                <span className="text-amber-300">
                  &quot;{active.robots ? "index, follow" : "noindex"}&quot;
                </span>
                <span className="text-zinc-500"> /&gt;</span>
                {!active.robots && (
                  <span className="ml-2 text-red-400">← strona niewidoczna!</span>
                )}
              </div>

              <div
                className={`transition-opacity duration-200 ${
                  active.title ? "opacity-100" : "opacity-25"
                }`}
              >
                <span className="text-zinc-500">&lt;title&gt;</span>
                <span className={active.title ? "text-zinc-300" : "text-zinc-500 line-through"}>
                  Agencja SEO Warszawa | Widoczni
                </span>
                <span className="text-zinc-500">&lt;/title&gt;</span>
              </div>

              <div
                className={`transition-opacity duration-200 ${
                  active.meta ? "opacity-100" : "opacity-25"
                }`}
              >
                <span className="text-zinc-500">&lt;meta </span>
                <span className="text-emerald-400">name</span>
                <span className="text-zinc-500">=</span>
                <span className="text-amber-300">&quot;description&quot;</span>
                <span className="text-zinc-500"> content=</span>
                <span
                  className={`text-amber-300 ${
                    !active.meta ? "line-through" : ""
                  }`}
                >
                  &quot;Pozycjonujemy od 2009. 1200+ klientów.&quot;
                </span>
                <span className="text-zinc-500"> /&gt;</span>
              </div>

              <div
                className={`transition-opacity duration-200 ${
                  active.canonical ? "opacity-100" : "opacity-25"
                }`}
              >
                <span className="text-zinc-500">&lt;link </span>
                <span className="text-emerald-400">rel</span>
                <span className="text-zinc-500">=</span>
                <span className="text-amber-300">&quot;canonical&quot;</span>
                <span className="text-zinc-500"> href=</span>
                <span
                  className={`text-amber-300 ${
                    !active.canonical ? "line-through" : ""
                  }`}
                >
                  &quot;https://widoczni.com/agencja-seo-warszawa&quot;
                </span>
                <span className="text-zinc-500"> /&gt;</span>
              </div>

              <div
                className={`transition-opacity duration-200 ${
                  active.schema ? "opacity-100" : "opacity-25"
                }`}
              >
                <span className="text-zinc-500">&lt;script </span>
                <span className="text-emerald-400">type</span>
                <span className="text-zinc-500">=</span>
                <span className="text-amber-300">
                  &quot;application/ld+json&quot;
                </span>
                <span className="text-zinc-500">&gt; </span>
                <span
                  className={`text-blue-400 ${
                    !active.schema ? "line-through" : ""
                  }`}
                >
                  {`{ "@type": "LocalBusiness" }`}
                </span>
                <span className="text-zinc-500"> &lt;/script&gt;</span>
              </div>
            </div>

            {/* Page body */}
            <div className="bg-white px-5 py-5 space-y-4">
              {/* H1 */}
              <div
                className={`transition-opacity duration-200 ${
                  active.h1 ? "opacity-100" : "opacity-25"
                }`}
              >
                <p
                  className={`text-lg font-bold text-zinc-900 leading-tight ${
                    !active.h1 ? "line-through" : ""
                  }`}
                >
                  Agencja SEO, która dowozi wyniki
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">← H1</p>
              </div>

              {/* Image */}
              <div
                className={`transition-opacity duration-200 ${
                  active.alt ? "opacity-100" : "opacity-60"
                }`}
              >
                <div className="bg-zinc-100 rounded-lg h-16 flex items-center justify-center px-3">
                  <span className="text-xs text-zinc-400 font-mono text-center">
                    {active.alt
                      ? 'alt="Zespół agencji SEO Widoczni w biurze w Warszawie"'
                      : 'alt="" ← brak opisu obrazu'}
                  </span>
                </div>
              </div>

              {/* H2 */}
              <div
                className={`transition-opacity duration-200 ${
                  active.headings ? "opacity-100" : "opacity-25"
                }`}
              >
                <p
                  className={`font-semibold text-zinc-800 text-sm ${
                    !active.headings ? "line-through" : ""
                  }`}
                >
                  Dlaczego klienci wybierają Widoczni?
                </p>
                <p className="text-xs text-zinc-400">← H2</p>
              </div>

              {/* Facts */}
              <div
                className={`transition-opacity duration-200 ${
                  active.facts ? "opacity-100" : "opacity-25"
                }`}
              >
                <div
                  className={`bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-2 text-sm text-zinc-700 ${
                    !active.facts ? "line-through" : ""
                  }`}
                >
                  🏆{" "}
                  <strong>1 200+ klientów</strong> od 2009 roku ·{" "}
                  <strong>+180%</strong> średni wzrost ruchu organicznego
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">← konkretne fakty / liczby</p>
              </div>

              {/* H2 second */}
              <div
                className={`transition-opacity duration-200 ${
                  active.headings ? "opacity-100" : "opacity-25"
                }`}
              >
                <p
                  className={`font-semibold text-zinc-800 text-sm ${
                    !active.headings ? "line-through" : ""
                  }`}
                >
                  Jak działamy?
                </p>
                <p className="text-xs text-zinc-400">← H2</p>
              </div>

              {/* Internal links */}
              <div
                className={`transition-opacity duration-200 ${
                  active.links ? "opacity-100" : "opacity-25"
                }`}
              >
                <div className="flex gap-2 flex-wrap">
                  {["Cennik", "O nas", "Kontakt"].map((l) => (
                    <span
                      key={l}
                      className={`text-xs px-2 py-1 bg-zinc-100 rounded text-zinc-600 ${
                        !active.links ? "line-through" : ""
                      }`}
                    >
                      → {l}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">← linki wewnętrzne</p>
              </div>

              {/* External mentions */}
              <div
                className={`border-t border-zinc-100 pt-3 transition-opacity duration-200 ${
                  active.external ? "opacity-100" : "opacity-25"
                }`}
              >
                <p
                  className={`text-xs text-zinc-500 ${
                    !active.external ? "line-through" : ""
                  }`}
                >
                  🔗 Wymieniony w: Marketer+, WhitePress, Forbes.pl
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">← wzmianki zewnętrzne</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Analysis */}
        <div>
          {/* Tabs */}
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">
            Analiza
          </p>
          <div className="flex gap-1 bg-zinc-100 rounded-lg p-1 mb-4">
            {(
              [
                { id: "googlebot" as const, label: "🤖 Googlebot" },
                { id: "rag" as const, label: "🧠 RAG / AI" },
                { id: "are" as const, label: "📊 A/R/E" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 text-sm py-2 rounded-md font-medium transition-all cursor-pointer ${
                  tab === t.id
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="border border-zinc-200 rounded-xl p-5 min-h-96">
            {tab === "googlebot" && (
              <div className="space-y-4">
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Co Googlebot wyciąga z tej strony
                </p>
                {gbItems.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 text-base leading-tight mt-0.5">
                        {statusIcon(item.status)}
                      </span>
                      <div>
                        <span className="text-xs text-zinc-400 mr-1.5">
                          {item.label}:
                        </span>
                        <span
                          className={`text-sm font-medium ${statusColor(item.status)}`}
                        >
                          {item.value}
                        </span>
                      </div>
                    </div>
                    {item.note && (
                      <p className="text-xs text-zinc-500 mt-0.5 ml-7">
                        {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {tab === "rag" && (
              <div className="space-y-4">
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Co AI wyciągnie i zacytuje
                </p>
                {rItems.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 text-base leading-tight mt-0.5">
                        {statusIcon(item.status)}
                      </span>
                      <div>
                        <span className="text-xs text-zinc-400 mr-1.5">
                          {item.label}:
                        </span>
                        <span
                          className={`text-sm font-medium ${statusColor(item.status)}`}
                        >
                          {item.value}
                        </span>
                      </div>
                    </div>
                    {item.note && (
                      <p className="text-xs text-zinc-500 mt-0.5 ml-7">
                        {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {tab === "are" && (
              <div>
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-5">
                  Szansa na cytowanie w AI
                </p>

                <div className="space-y-5">
                  <div>
                    <ScoreBar
                      label="Authority — wiarygodność zewnętrzna"
                      value={scores.authority}
                    />
                    <p className="text-xs text-zinc-500 mt-1.5">
                      {scores.authority < 34
                        ? "❌ Brak wzmianek zewnętrznych. AI nie może zwalidować marki przez inne serwisy."
                        : scores.authority < 67
                        ? "⚠️ Słabe potwierdzenie zewnętrzne. Potrzeba więcej wzmianek branżowych."
                        : "✅ Dobre zewnętrzne potwierdzenie marki w serwisach branżowych."}
                    </p>
                  </div>

                  <div>
                    <ScoreBar
                      label="Relevance — trafność treści"
                      value={scores.relevance}
                    />
                    <p className="text-xs text-zinc-500 mt-1.5">
                      {scores.relevance < 34
                        ? "❌ Brak H1, nagłówków i tytułu — AI nie wie czego dotyczy strona."
                        : scores.relevance < 67
                        ? "⚠️ Niekompletne sygnały tematyczne. Dodaj nagłówki lub tytuł."
                        : "✅ Treść wyraźnie odpowiada na intencję zapytania."}
                    </p>
                  </div>

                  <div>
                    <ScoreBar
                      label="Extractability — wyciągalność"
                      value={scores.extractability}
                    />
                    <p className="text-xs text-zinc-500 mt-1.5">
                      {scores.extractability < 34
                        ? "❌ AI nie ma co wyciąć. Brak konkretnych faktów i struktury."
                        : scores.extractability < 67
                        ? "⚠️ Słaby potencjał cytowania — treść zbyt ogólna."
                        : "✅ Strona ma cytowalne fragmenty z konkretnymi danymi."}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-zinc-100">
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                    Ogólna ocena
                  </p>
                  <p
                    className={`text-3xl font-bold tabular-nums ${
                      avg >= 67
                        ? "text-emerald-700"
                        : avg >= 34
                        ? "text-amber-700"
                        : "text-red-700"
                    }`}
                  >
                    {avg}%
                  </p>
                  <p className="text-sm text-zinc-600 mt-1">
                    {avg >= 67
                      ? "Strona ma dobry potencjał cytowania w AI."
                      : avg >= 34
                      ? "Strona jest częściowo zoptymalizowana. Sprawdź słabe filary."
                      : "Strona ma niski potencjał cytowania w AI — wymaga pracy."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Legend + doc links */}
          <div className="mt-4 flex gap-4 text-xs text-zinc-400">
            <span>✅ OK</span>
            <span>⚠️ Ostrzeżenie</span>
            <span>❌ Problem</span>
            <span>ℹ️ Info</span>
          </div>

          <div className="mt-4">
            <p className="text-xs text-zinc-400 mb-2">
              Dowiedz się więcej w bazie wiedzy:
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {TOGGLES.filter((t) => t.docUrl).map((t) => (
                <Link
                  key={t.id}
                  href={t.docUrl!}
                  className="text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-900 transition-colors"
                >
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
