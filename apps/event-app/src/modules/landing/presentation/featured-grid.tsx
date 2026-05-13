import { Text } from '@/libs/ui/text';
import { EventCard } from './event-card';
import { IconArrow } from './icons';
import type { Event } from './mock-data';

type FeaturedGridProps = {
  events: Event[];
  onOpen: (event: Event) => void;
  onToggleSave: (id: string) => void;
  savedSet: Set<string>;
  onBrowseAll: () => void;
};

export const FeaturedGrid = ({
  events,
  onOpen,
  onToggleSave,
  savedSet,
  onBrowseAll,
}: FeaturedGridProps) => (
  <section className="px-8 pb-12 max-w-360 mx-auto">
    <div className="flex justify-between items-end gap-8 mt-18 mb-7">
      <div>
        <Text.MonoLabel>WYDARZENIA POLECANE</Text.MonoLabel>
        <h2 className="font-display font-medium leading-[1.05] tracking-[-0.02em] mt-2 max-w-180 text-[clamp(32px,4.5vw,56px)]">
          Najgłośniejsze afisze tygodnia.
        </h2>
      </div>
      <button
        className="text-ink text-sm inline-flex gap-2 items-center border-b border-ink pb-0.5 bg-transparent border-0 whitespace-nowrap hover:text-coral hover:border-coral transition-colors"
        onClick={onBrowseAll}
      >
        Zobacz wszystkie <IconArrow size={14} />
      </button>
    </div>
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 2xl:grid-cols-4">
      {events.map((e) => (
        <EventCard
          key={e.id}
          event={e}
          onOpen={onOpen}
          onToggleSave={onToggleSave}
          saved={savedSet.has(e.id)}
        />
      ))}
    </div>
  </section>
);
