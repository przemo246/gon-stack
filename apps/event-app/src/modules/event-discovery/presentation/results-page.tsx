import { useState, useMemo, useEffect } from 'react';

import { Text } from '@/libs/ui/text';
import { ResultsList } from './results-list';
import { CategoryChips } from './category-chips';
import { SearchBar, ActiveFilters } from './search-bar';
import type { SearchState } from './search-bar';
import { categoryLabel } from './mock-data';
import { useContext } from './context';

const segBtn = (active: boolean) =>
  `border-0 px-3.5 py-1.5 rounded-full text-sm transition-colors ${active ? 'bg-ink text-canvas' : 'bg-transparent text-ink hover:bg-hairline'}`;

const plural = (n: number, one: string, few: string, many: string): string => {
  if (n === 1) return one;
  const mod10 = n % 10,
    mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
};

const EMPTY_SEARCH: SearchState = {
  name: '',
  category: '',
  city: '',
  date: '',
};

const getSearchFromUrl = (): SearchState => {
  if (typeof window === 'undefined') return EMPTY_SEARCH;
  const p = new URLSearchParams(window.location.search);
  return {
    name: p.get('name') || '',
    category: p.get('category') || '',
    city: p.get('city') || '',
    date: p.get('date') || '',
  };
};

type ResultsPageProps = {
  onToggleSave: (id: string) => void;
  savedSet: Set<string>;
};

export const ResultsPage = ({ onToggleSave, savedSet }: ResultsPageProps) => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState<'date' | 'name' | 'city'>('date');
  const [search, setSearch] = useState<SearchState>(getSearchFromUrl);

  const ctx = useContext();
  const results = ctx.$results.use();
  const isLoading = ctx.$isLoading.use();
  const error = ctx.$error.use();

  const handleSearchSubmit = () => {
    const p = new URLSearchParams();
    if (search.name) p.set('name', search.name);
    if (search.category) p.set('category', search.category);
    if (search.city) p.set('city', search.city);
    if (search.date) p.set('date', search.date);
    window.history.pushState({}, '', `/results${p.toString() ? `?${p}` : ''}`);
    ctx.trigger('[TRIGGER]_SEARCH', {
      name: search.name || undefined,
      category: search.category || undefined,
      city: search.city || undefined,
      dateLabel: search.date || undefined,
    });
  };

  useEffect(() => {
    const s = getSearchFromUrl();
    ctx.trigger('[TRIGGER]_SEARCH', {
      name: s.name || undefined,
      category: s.category || undefined,
      city: s.city || undefined,
      dateLabel: s.date || undefined,
    });
  }, [ctx]);

  const sortedResults = useMemo(() => {
    const arr = [...results];
    if (sort === 'date')
      arr.sort((a, b) => a.startDateTime.localeCompare(b.startDateTime));
    else if (sort === 'name')
      arr.sort((a, b) => a.name.localeCompare(b.name, 'pl'));
    else arr.sort((a, b) => a.city.localeCompare(b.city, 'pl'));
    return arr;
  }, [results, sort]);

  const handleClearField = (k: keyof SearchState) =>
    setSearch({ ...search, [k]: '' });

  const handleClearAll = () => {
    setSearch(EMPTY_SEARCH);
    ctx.trigger('[TRIGGER]_SEARCH', {});
  };

  return (
    <section className="px-8 py-12 max-w-360 mx-auto">
      <div className="mb-8">
        <Text.MonoLabel>WYNIKI WYSZUKIWANIA</Text.MonoLabel>
        <Text.SectionHeading
          as="h1"
          className="my-2 text-[clamp(36px,5vw,64px)]"
        >
          {isLoading ? (
            'Szukam…'
          ) : (
            <>
              {results.length}{' '}
              {plural(results.length, 'wydarzenie', 'wydarzenia', 'wydarzeń')}
              {search.city && (
                <>
                  {' '}
                  w <em className="not-italic text-coral">{search.city}</em>
                </>
              )}
              {search.category && <> · {categoryLabel(search.category)}</>}
            </>
          )}
        </Text.SectionHeading>
        <div className="mb-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            onSubmit={handleSearchSubmit}
            variant="compact"
          />
        </div>
        <ActiveFilters
          search={search}
          onClear={handleClearField}
          onClearAll={handleClearAll}
        />
      </div>

      <div className="flex justify-between items-center gap-6 mb-6 flex-wrap">
        <CategoryChips
          value={search.category}
          onChange={(v) => setSearch({ ...search, category: v })}
        />
        <div className="flex gap-4 items-center">
          <div className="inline-flex bg-surface border border-card-border-c rounded-full p-1 items-center">
            <button
              className={segBtn(layout === 'grid')}
              onClick={() => setLayout('grid')}
            >
              Siatka
            </button>
            <button
              className={segBtn(layout === 'list')}
              onClick={() => setLayout('list')}
            >
              Lista
            </button>
          </div>
          <div className="inline-flex bg-surface border border-card-border-c rounded-full p-1 items-center gap-0">
            <span className="text-xs text-muted px-2.5">Sortuj:</span>
            {(['date', 'name', 'city'] as const).map((k) => (
              <button
                key={k}
                className={segBtn(sort === k)}
                onClick={() => setSort(k)}
              >
                {k === 'date' ? 'Data' : k === 'name' ? 'Nazwa' : 'Miasto'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ResultsList
        isLoading={isLoading}
        error={error}
        results={sortedResults}
        layout={layout}
        onToggleSave={onToggleSave}
        savedSet={savedSet}
        onClearAll={handleClearAll}
      />
    </section>
  );
};
