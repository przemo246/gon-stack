import { useState, useMemo } from 'react';
import type { User } from '@supabase/supabase-js';

import { Header } from './header';
import type { Route } from './header';
import { Landing } from './landing';
import { Footer } from './footer';
import { ResultsPage } from './results-page';
import { DetailsPage } from './details-page';
import { EVENTS } from './mock-data';
import type { SearchState } from './search-bar';
import type { Event } from './mock-data';

type MainProps = {
  user: User | null;
};

const EMPTY_SEARCH: SearchState = {
  name: '',
  category: '',
  city: '',
  date: '',
};

export const Main = ({ user }: MainProps) => {
  const [route, setRoute] = useState<Route>('home');
  const [search, setSearch] = useState<SearchState>(EMPTY_SEARCH);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const navigate = (r: Route) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitSearch = () => navigate('results');

  const openEvent = (event: Event) => {
    setActiveEventId(event.id);
    navigate('details' as Route);
  };

  const pickCategory = (id: string) => {
    setSearch((s) => ({ ...s, category: id }));
    navigate('results');
  };

  const quickSearch = (query: Partial<SearchState>) => {
    setSearch((s) => ({ ...s, ...query }));
    navigate('results');
  };

  const filteredEvents = useMemo(
    () =>
      EVENTS.filter((e) => {
        if (search.name) {
          const n = search.name.toLowerCase();
          if (
            !e.name.toLowerCase().includes(n) &&
            !e.venue.toLowerCase().includes(n)
          )
            return false;
        }
        if (search.category && e.category !== search.category) return false;
        if (search.city && e.city !== search.city) return false;
        return true;
      }),
    [search],
  );

  const featuredEvents = EVENTS.filter((e) => e.featured).slice(0, 8);
  const currentEvent = activeEventId
    ? (EVENTS.find((e) => e.id === activeEventId) ?? null)
    : null;

  return (
    <div className="bg-canvas min-h-screen text-ink">
      <Header
        route={route}
        onNavigate={navigate}
        savedCount={savedSet.size}
        user={user}
      />
      <main>
        {route === 'home' && (
          <Landing
            search={search}
            onSearchChange={setSearch}
            onSearchSubmit={submitSearch}
            onQuickSearch={quickSearch}
            featuredEvents={featuredEvents}
            onOpenEvent={openEvent}
            onToggleSave={toggleSave}
            savedSet={savedSet}
            onPickCategory={pickCategory}
            onBrowseAll={() => navigate('results')}
          />
        )}
        {route === 'results' && (
          <ResultsPage
            search={search}
            onSearchChange={setSearch}
            onSearchSubmit={submitSearch}
            results={filteredEvents}
            onOpenEvent={openEvent}
            onToggleSave={toggleSave}
            savedSet={savedSet}
            onClearAll={() => setSearch(EMPTY_SEARCH)}
          />
        )}
        {route === 'details' && currentEvent && (
          <DetailsPage
            event={currentEvent}
            allEvents={EVENTS}
            onBack={() => navigate('results')}
            onOpenEvent={openEvent}
            onToggleSave={toggleSave}
            savedSet={savedSet}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};
