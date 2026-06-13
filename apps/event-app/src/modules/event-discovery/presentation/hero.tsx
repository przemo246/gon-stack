import { useState } from 'react';
import { SearchBar } from './search-bar';
import type { SearchState } from './search-bar';
import { Text } from '@/libs/ui/text';
import { Button } from '@/libs/ui/button';

const EMPTY_SEARCH: SearchState = {
  name: '',
  category: '',
  city: '',
  date: '',
};

const toResultsUrl = (s: SearchState) => {
  const p = new URLSearchParams();
  if (s.name) p.set('name', s.name);
  if (s.category) p.set('category', s.category);
  if (s.city) p.set('city', s.city);
  if (s.date) p.set('date', s.date);
  return `/results${p.toString() ? `?${p}` : ''}`;
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

export const Hero = () => {
  const [search, setSearch] = useState<SearchState>(EMPTY_SEARCH);

  return (
    <section className="hero-bg px-8 pt-16 pb-12">
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
          <SearchBar
            value={search}
            onChange={setSearch}
            onSubmit={() => {
              window.location.href = toResultsUrl(search);
            }}
          />
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {QUICK_LINKS.map((ql) => (
            <Button
              key={ql.label}
              variant="tertiary"
              onClick={() => {
                const next = { ...search, ...ql.query };
                setSearch(next);
                window.location.href = toResultsUrl(next);
              }}
            >
              {ql.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};
