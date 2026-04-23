import { useMemo, useReducer } from 'react';
import { CityStrip } from './citystrip';
import { Cta } from './cta';
import { EventCard } from './eventcard';
import { Featured } from './featured';
import { Filters } from './filters';
import { Footer } from './footer';
import { Hero } from './hero';
import { How } from './how';
import { Marquee } from './marquee';
import { Nav } from './nav';
import {
  MOCK_EVENTS,
  MOCK_EVENTS_SECTION_EYEBROW,
  MOCK_EVENTS_SECTION_TITLE,
} from './mock-data';

type State = {
  query: string;
  city: string;
  date: string;
  cat: string;
  sort: string;
  saved: Set<number>;
};

type Action =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_CITY'; payload: string }
  | { type: 'SET_DATE'; payload: string }
  | { type: 'SET_CAT'; payload: string }
  | { type: 'SET_SORT'; payload: string }
  | { type: 'TOGGLE_SAVE'; payload: number };

const initialState: State = {
  query: '',
  city: 'all',
  date: 'any',
  cat: 'Wszystko',
  sort: 'rec',
  saved: new Set([3, 5]),
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_CITY':
      return { ...state, city: action.payload };
    case 'SET_DATE':
      return { ...state, date: action.payload };
    case 'SET_CAT':
      return { ...state, cat: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'TOGGLE_SAVE': {
      const next = new Set(state.saved);
      if (next.has(action.payload)) next.delete(action.payload);
      else next.add(action.payload);
      return { ...state, saved: next };
    }
    default: {
      const exhaustiveCheck: never = action;
      throw new Error(`Unhandled action type: ${exhaustiveCheck}`);
    }
  }
}

export const Landing = () => {
  const [{ query, city, date, cat, sort, saved }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const toggleSave = (id: number) =>
    dispatch({ type: 'TOGGLE_SAVE', payload: id });

  const filtered = useMemo(() => {
    let list = MOCK_EVENTS.filter((e) => {
      if (
        query &&
        !(
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.venue.toLowerCase().includes(query.toLowerCase()) ||
          e.cat.toLowerCase().includes(query.toLowerCase())
        )
      )
        return false;
      if (city !== 'all' && e.city !== city) return false;
      if (date !== 'any') {
        if (date === 'free' && e.price !== 0) return false;
        else if (date !== 'free' && e.dateKey !== date) return false;
      }
      if (cat !== 'Wszystko' && e.cat !== cat) return false;
      return true;
    });

    if (sort === 'soon') list = [...list].sort((a, b) => a.id - b.id);
    if (sort === 'cheap') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'pop') list = [...list].sort((a, b) => b.id - a.id);

    return list;
  }, [query, city, date, cat, sort]);

  const featuredEvent = filtered[0] ?? MOCK_EVENTS[2];
  const gridEvents =
    filtered[0] === featuredEvent ? filtered.slice(1) : filtered;

  return (
    <>
      <Nav />
      <Hero
        query={query}
        setQuery={(v) => dispatch({ type: 'SET_QUERY', payload: v })}
        city={city}
        setCity={(v) => dispatch({ type: 'SET_CITY', payload: v })}
        date={date}
        setDate={(v) => dispatch({ type: 'SET_DATE', payload: v })}
        onSearch={() => {}}
      />

      <Marquee />
      <Filters
        cat={cat}
        setCat={(v) => dispatch({ type: 'SET_CAT', payload: v })}
        date={date}
        setDate={(v) => dispatch({ type: 'SET_DATE', payload: v })}
        sort={sort}
        setSort={(v) => dispatch({ type: 'SET_SORT', payload: v })}
      />

      <main className="max-w-350 mx-auto px-9 pt-8 pb-20">
        <div className="flex justify-between items-end gap-6 mb-7 flex-wrap mt-8">
          <div>
            <div className="font-mono text-[11px] tracking-[.14em] text-text-muted mb-2">
              {MOCK_EVENTS_SECTION_EYEBROW} · {filtered.length} WYNIKÓW
            </div>
            <h2 className="font-serif italic text-[52px] leading-none m-0 tracking-tight">
              {MOCK_EVENTS_SECTION_TITLE}
            </h2>
          </div>
          <a className="font-mono text-[11px] tracking-[.14em] text-text-muted cursor-pointer hover:text-text-primary transition-colors">
            PEŁEN AFISZ →
          </a>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-text-muted font-serif text-[28px] italic">
            Nic nie znaleziono.
            <div className="font-sans text-sm tracking-[.05em] mt-2.5 not-italic">
              SPRÓBUJ ZMIENIĆ FILTRY LUB DATĘ
            </div>
          </div>
        ) : (
          <>
            <Featured
              event={featuredEvent}
              saved={saved.has(featuredEvent.id)}
              onToggleSave={toggleSave}
            />
            <div className="grid grid-cols-4 gap-4.5">
              {gridEvents.map((ev) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  saved={saved.has(ev.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <CityStrip
        onPickCity={(c) => {
          dispatch({ type: 'SET_CITY', payload: c });
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
      />

      <How />

      <Cta />

      <Footer />
    </>
  );
};
