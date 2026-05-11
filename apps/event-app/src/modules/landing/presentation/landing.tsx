import { useMemo, useReducer } from 'react';
import type { User } from '@supabase/supabase-js';

import { Header } from './header';
import { Hero } from './hero';
import { FeaturedGrid } from './featured-grid';
import { CategoryBand } from './category-band';
import { Footer } from './footer';
import { EVENTS } from './mock-data';
import type { SearchValue } from './search-bar';

type State = {
  search: SearchValue;
  saved: Set<string>;
};

type Action =
  | { type: 'SET_SEARCH'; payload: SearchValue }
  | { type: 'TOGGLE_SAVE'; payload: string };

const initialState: State = {
  search: { name: '', category: '', city: '', date: '' },
  saved: new Set(),
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'TOGGLE_SAVE': {
      const next = new Set(state.saved);
      if (next.has(action.payload)) next.delete(action.payload);
      else next.add(action.payload);
      return { ...state, saved: next };
    }
    default: {
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
    }
  }
};

type LandingProps = {
  user: User | null;
};

export const Landing = ({ user }: LandingProps) => {
  const [{ search, saved }, dispatch] = useReducer(reducer, initialState);

  const featured = useMemo(
    () => EVENTS.filter((e) => e.featured).slice(0, 8),
    [],
  );

  return (
    <>
      <Header user={user} />
      <Hero
        search={search}
        setSearch={(v) => dispatch({ type: 'SET_SEARCH', payload: v })}
        onSubmit={() => {}}
      />
      <FeaturedGrid
        events={featured}
        saved={saved}
        onToggleSave={(id) => dispatch({ type: 'TOGGLE_SAVE', payload: id })}
      />
      <CategoryBand onPickCategory={() => {}} />
      <Footer />
    </>
  );
};
