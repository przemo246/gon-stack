import { MonoLabel } from './mono-label';
import { SearchBar } from './search-bar';
import type { SearchState } from './search-bar';

type HeroProps = {
  search: SearchState;
  onChange: (v: SearchState) => void;
  onSubmit: () => void;
  onQuickSearch: (query: Partial<SearchState>) => void;
};

const QUICK_LINKS: { label: string; query: Partial<SearchState> }[] = [
  {
    label: 'Ten weekend w Warszawie',
    query: { date: 'weekend', city: 'Warszawa' },
  },
  {
    label: 'Festiwale lato 2026',
    query: { category: 'festiwale', date: 'summer' },
  },
  { label: 'Sport · Ekstraklasa', query: { category: 'sport' } },
  {
    label: 'Stand-up · Kraków',
    query: { category: 'stand-up', city: 'Kraków' },
  },
];

export const Hero = ({
  search,
  onChange,
  onSubmit,
  onQuickSearch,
}: HeroProps) => (
  <section className="px-8 pt-16 pb-12">
    <div className="max-w-[1280px] mx-auto">
      <MonoLabel style={{ color: 'var(--color-coral)' }}>
        AFISZ · POLSKA · 2026
      </MonoLabel>
      <h1
        className="font-display font-medium leading-[0.92] tracking-[-0.04em] my-4 mb-6"
        style={{ fontSize: 'clamp(56px, 9vw, 128px)' }}
      >
        Znajdź coś,
        <br />
        co warto
        <br />
        <em className="not-italic text-coral">przeżyć.</em>
      </h1>
      <p className="max-w-[640px] text-lg leading-relaxed text-body-muted mb-8">
        Koncerty, festiwale, sport, teatr, wystawy. Wszystkie wydarzenia w
        Polsce w jednym miejscu — bez biletów, bez pośredników, tylko afisz.
      </p>
      <div className="mt-6">
        <SearchBar value={search} onChange={onChange} onSubmit={onSubmit} />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <MonoLabel>SZYBKI WYBÓR</MonoLabel>
        {QUICK_LINKS.map((ql) => (
          <button
            key={ql.label}
            className="bg-soft-stone border border-card-border rounded-full px-4 py-2 text-ink text-sm hover:bg-coral hover:text-white hover:border-coral transition-colors"
            onClick={() => {
              onChange({ ...search, ...ql.query });
              onQuickSearch(ql.query);
            }}
          >
            {ql.label}
          </button>
        ))}
      </div>
    </div>
  </section>
);
