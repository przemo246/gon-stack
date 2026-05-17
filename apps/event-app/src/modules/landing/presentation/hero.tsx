import { SearchBar } from './search-bar';
import type { SearchState } from './search-bar';
import { Text } from '@/libs/ui/text';

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

const HERO_BG = [
  'radial-gradient(ellipse 65% 55% at 2% 8%, rgba(255,119,89,0.13) 0%, transparent 60%)',
  'radial-gradient(ellipse 55% 65% at 98% 5%, rgba(241,245,255,0.95) 0%, transparent 55%)',
  'radial-gradient(ellipse 50% 45% at 55% 105%, rgba(237,252,233,0.75) 0%, transparent 50%)',
  'linear-gradient(150deg, #fff9f7 0%, #f5f7ff 45%, #f4faf3 100%)',
].join(',');

export const Hero = ({
  search,
  onChange,
  onSubmit,
  onQuickSearch,
}: HeroProps) => (
  <section className="px-8 pt-16 pb-12" style={{ background: HERO_BG }}>
    <div className="max-w-7xl mx-auto">
      <Text.HeroDisplay className="my-4 mb-6">
        Znajdź coś,
        <br />
        co warto
        <br />
        <em className="italic text-coral">przeżyć.</em>
      </Text.HeroDisplay>

      <p className="max-w-160 text-lg leading-relaxed text-body-muted mb-8">
        Koncerty, festiwale, sport, teatr, wystawy. Wszystkie wydarzenia w
        Polsce w jednym miejscu — bez biletów, bez pośredników, tylko afisz.
      </p>
      <div className="mt-6">
        <SearchBar value={search} onChange={onChange} onSubmit={onSubmit} />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {QUICK_LINKS.map((ql) => (
          <button
            key={ql.label}
            className="bg-surface border border-card-border-c rounded-full px-4 py-2 text-ink text-sm hover:bg-coral hover:text-white hover:border-coral transition-colors"
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
