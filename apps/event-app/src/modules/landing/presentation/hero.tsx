import { SearchBar } from './search-bar';
import type { SearchValue } from './search-bar';

type HeroProps = {
  search: SearchValue;
  setSearch: (v: SearchValue) => void;
  onSubmit: () => void;
};

const QUICK_LINKS = [
  'Ten weekend w Warszawie',
  'Festiwale lato 2026',
  'Sport · Ekstraklasa',
  'Stand-up · Kraków',
];

export const Hero = ({ search, setSearch, onSubmit }: HeroProps) => (
  <section className="px-8 pt-16 pb-12">
    <div className="max-w-350 mx-auto">
      <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent">
        AFISZ · POLSKA · 2026
      </span>
      <h1
        className="font-sans font-medium leading-[0.92] tracking-[-0.04em] mt-4 mb-6 text-text-primary"
        style={{ fontSize: 'clamp(56px, 9vw, 128px)' }}
      >
        Znajdź coś,
        <br />
        co warto
        <br />
        <em className="not-italic" style={{ color: '#ff7759' }}>
          przeżyć.
        </em>
      </h1>
      <p className="max-w-160 text-lg leading-relaxed text-text-muted mb-8">
        Koncerty, festiwale, sport, teatr, wystawy. Wszystkie wydarzenia w
        Polsce w jednym miejscu — bez biletów, bez pośredników, tylko afisz.
      </p>
      <SearchBar value={search} onChange={setSearch} onSubmit={onSubmit} />
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-muted">
          SZYBKI WYBÓR
        </span>
        {QUICK_LINKS.map((q) => (
          <button
            key={q}
            className="bg-bg-surface border border-border-default rounded-full px-4 py-2 text-text-primary text-sm hover:bg-accent hover:text-white hover:border-transparent transition-colors cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  </section>
);
