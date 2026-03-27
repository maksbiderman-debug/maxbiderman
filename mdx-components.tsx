import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-700 mb-4 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-zinc-700 mb-3 mt-10">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-zinc-700 mb-2 mt-6">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-zinc-600 leading-7 mb-4">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-zinc-900 underline underline-offset-4 hover:text-zinc-600"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-zinc-600 mb-4 space-y-1.5 pl-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-zinc-600 mb-4 space-y-1.5 pl-1">
        {children}
      </ol>
    ),
    // Blockquote = callout z niebieskim akcentem (do definicji i kluczowych pojęć)
    blockquote: ({ children }) => (
      <blockquote className="bg-blue-50 border-l-4 border-blue-400 px-5 py-4 rounded-r-lg my-6 text-zinc-700 not-italic">
        {children}
      </blockquote>
    ),
    // Inline code = podświetlony termin techniczny
    code: ({ children }) => (
      <code className="bg-zinc-900 text-emerald-400 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    // Blok kodu = ciemne tło
    pre: ({ children }) => (
      <pre className="bg-zinc-900 text-zinc-100 rounded-xl px-5 py-4 my-6 overflow-x-auto text-sm font-mono leading-6">
        {children}
      </pre>
    ),
    // Tabela
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-left border-collapse">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-zinc-100 text-zinc-900 font-semibold px-4 py-2 border border-zinc-200">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="text-zinc-600 px-4 py-2 border border-zinc-200">
        {children}
      </td>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-zinc-900">{children}</strong>
    ),
    hr: () => <hr className="border-zinc-200 my-8" />,
    ...components,
  };
}
