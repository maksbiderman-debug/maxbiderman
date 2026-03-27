"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { searchIndex, type SearchItem } from "@/app/lib/searchIndex";

const fuse = new Fuse(searchIndex, {
  keys: ["title", "description", "category"],
  threshold: 0.4,
});

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const found = fuse.search(query).slice(0, 5).map((r) => r.item);
    setResults(found);
    setActiveIndex(0);
  }, [query]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      router.push(results[activeIndex].url);
      setQuery("");
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={handleKeyDown}
        placeholder="Szukaj..."
        className="text-sm bg-zinc-100 rounded-md px-3 py-1.5 text-zinc-700 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-zinc-300 w-40 focus:w-56 transition-all"
      />
      {open && results.length > 0 && (
        <ul className="absolute right-0 top-full mt-2 w-72 bg-white border border-zinc-100 rounded-lg shadow-lg z-50 overflow-y-auto max-h-72">
          {results.map((item, i) => (
            <li key={item.url}>
              <a
                href={item.url}
                className={`flex flex-col px-4 py-3 hover:bg-zinc-50 transition-colors ${
                  i === activeIndex ? "bg-zinc-50" : ""
                }`}
              >
                <span className="text-xs text-zinc-400 mb-0.5">{item.category}</span>
                <span className="text-sm font-medium text-zinc-900">{item.title}</span>
                <span className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{item.description}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
