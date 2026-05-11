import { ArrowRight } from 'lucide-react';
import type { Event } from './mock-data';
import { EventCard } from './event-card';

type FeaturedGridProps = {
  events: Event[];
  saved: Set<string>;
  onToggleSave: (id: string) => void;
};

export const FeaturedGrid = ({
  events,
  saved,
  onToggleSave,
}: FeaturedGridProps) => (
  <section className="px-8 pb-12 max-w-360 mx-auto">
    <div className="flex justify-between items-end gap-8 mt-18 mb-7">
      <div>
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-muted">
          WYDARZENIA POLECANE
        </span>
        <h2
          className="font-sans font-medium leading-[1.05] tracking-[-0.02em] mt-2 mb-0 max-w-180 text-text-primary"
          style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
        >
          Najgłośniejsze afisze tygodnia.
        </h2>
      </div>
      <button className="text-sm text-text-primary pb-0.5 inline-flex items-center gap-2 bg-transparent border-0 border-b border-text-primary cursor-pointer whitespace-nowrap hover:text-accent hover:border-accent transition-colors">
        Zobacz wszystkie <ArrowRight size={14} />
      </button>
    </div>
    <div className="grid grid-cols-4 gap-5">
      {events.map((ev) => (
        <EventCard
          key={ev.id}
          event={ev}
          saved={saved.has(ev.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  </section>
);
