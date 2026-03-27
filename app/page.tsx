export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-4">
        Maks Biderman
      </h1>
      <p className="text-lg text-zinc-600 mb-8">
        Customer Success Specialist w agencji digital marketingu. Piszę o SEO,
        marketingu cyfrowym i tym, czego uczę się na co dzień.
      </p>
      <a
        href="/blog"
        className="text-sm font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-600 transition-colors"
      >
        Przejdź do bloga →
      </a>
    </main>
  );
}
