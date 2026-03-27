import Link from "next/link";
import Search from "./Search";

export default function Nav() {
  return (
    <nav className="border-b border-zinc-100">
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-6 text-sm">
        <Link
          href="/"
          className="text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          Strona główna
        </Link>
        <Link
          href="/blog"
          className="text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          Blog
        </Link>
        <Link
          href="/baza-wiedzy"
          className="text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          Baza wiedzy
        </Link>
        <div className="ml-auto">
          <Search />
        </div>
      </div>
    </nav>
  );
}
