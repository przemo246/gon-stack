import { useState, useEffect, useRef } from 'react';
import type { User } from '@supabase/supabase-js';

import { Provider, useContext } from './context';
import { Header } from './header';
import { Footer } from './footer';
import { ResultsPage } from './results-page';
import type { Event as MockEvent } from './mock-data';
import type { SearchState } from './search-bar';
import type { EventCard as ApiEventCard } from '../core/store';

type ResultsMainProps = {
  user: User | null;
};

const EMPTY_SEARCH: SearchState = {
  name: '',
  category: '',
  city: '',
  date: '',
};

const toMockEvent = (e: ApiEventCard): MockEvent => ({
  id: e.id,
  name: e.name,
  category: e.category,
  city: e.city,
  venue: '',
  date: e.startDateTime.slice(0, 10),
  time: new Date(e.startDateTime).toLocaleTimeString('pl', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  coords: { x: 50, y: 50 },
  palette: 0,
  posterTitle: e.name,
  posterMeta: e.city,
  description: '',
  featured: false,
});

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

const Content = ({ user }: ResultsMainProps) => {
  const ctx = useContext();
  const results = ctx.$results.use();
  const isLoading = ctx.$isLoading.use();
  const error = ctx.$error.use();

  const [search, setSearch] = useState<SearchState>(getSearchFromUrl);
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set());
  const initialFetchFired = useRef(false);

  const toggleSave = (id: string) => {
    setSavedSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const submitSearch = () => {
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
    if (!initialFetchFired.current) {
      initialFetchFired.current = true;
      const s = getSearchFromUrl();
      ctx.trigger('[TRIGGER]_SEARCH', {
        name: s.name || undefined,
        category: s.category || undefined,
        city: s.city || undefined,
        dateLabel: s.date || undefined,
      });
    }
  }, [ctx]);

  const mappedResults = results.map(toMockEvent);

  return (
    <div className="bg-canvas min-h-screen text-ink">
      <Header activePage="results" savedCount={savedSet.size} user={user} />
      <main>
        <ResultsPage
          search={search}
          onSearchChange={setSearch}
          onSearchSubmit={submitSearch}
          results={mappedResults}
          isLoading={isLoading}
          error={error}
          onOpenEvent={(event: MockEvent) => {
            window.location.href = `/event/${event.id}`;
          }}
          onToggleSave={toggleSave}
          savedSet={savedSet}
          onClearAll={() => {
            setSearch(EMPTY_SEARCH);
            ctx.trigger('[TRIGGER]_SEARCH', {});
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export const ResultsMain = ({ user }: ResultsMainProps) => (
  <Provider>
    <Content user={user} />
  </Provider>
);
