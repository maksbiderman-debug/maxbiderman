export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-100">
      <div className="max-w-2xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-zinc-400">
        <span>© {new Date().getFullYear()} Maks Biderman</span>
        <a
          href="https://www.linkedin.com/in/maksymilian-biderman/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-600 transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
