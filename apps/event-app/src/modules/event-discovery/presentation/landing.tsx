import { useState } from 'react';

import { Hero } from './hero';
import { FeaturedGrid } from './featured-grid';
import { CategoryBand } from './category-band';
import { EVENTS } from './mock-data';
import type { Event } from './mock-data';
import type { SearchState } from './search-bar';

type LandingProps = {
  savedSet: Set<string>;
  onToggleSave: (id: string) => void;
};

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

export const Landing = ({ savedSet, onToggleSave }: LandingProps) => {
  const [search, setSearch] = useState<SearchState>(EMPTY_SEARCH);

  const featuredEvents = EVENTS.filter((e) => e.featured).slice(0, 8);

  return (
    <>
      <Hero
        search={search}
        onChange={setSearch}
        onSubmit={() => {
          window.location.href = toResultsUrl(search);
        }}
        onQuickSearch={(query) => {
          window.location.href = toResultsUrl({ ...search, ...query });
        }}
      />
      <FeaturedGrid
        events={featuredEvents}
        onOpen={(event: Event) => {
          window.location.href = `/event/${event.id}`;
        }}
        onToggleSave={onToggleSave}
        savedSet={savedSet}
        onBrowseAll={() => {
          window.location.href = '/results';
        }}
      />
      <CategoryBand
        onPick={(id: string) => {
          window.location.href = `/results?category=${id}`;
        }}
      />
    </>
  );
};
