import { Button } from '@/libs/ui/button';
import { Text } from '@/libs/ui/text';
import { EventCard } from './event-card';
import { SkeletonCard } from './skeleton-card';
import type { Event } from '../contracts/models';

const SKELETON_COUNT = 8;

type ResultsListProps = {
  isLoading: boolean;
  error: string | null;
  results: Event[];
  layout: 'grid' | 'list';
  onToggleSave: (id: string) => void;
  savedSet: Set<string>;
  onClearAll: () => void;
};

const openEvent = (event: Event) => {
  window.location.href = `/event/${event.id}`;
};

export const ResultsList = ({
  isLoading,
  error,
  results,
  layout,
  onToggleSave,
  savedSet,
  onClearAll,
}: ResultsListProps) => {
  if (isLoading) {
    const skeletons = Array.from({ length: SKELETON_COUNT }, (_, i) => (
      <SkeletonCard key={i} layout={layout} />
    ));

    return layout === 'grid' ? (
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 2xl:grid-cols-4">
        {skeletons}
      </div>
    ) : (
      <div className="flex flex-col gap-3">{skeletons}</div>
    );
  }

  if (error) {
    return (
      <div className="py-20 px-8 text-center bg-surface rounded-lg flex flex-col items-center gap-3">
        <Text.MonoLabel>BŁĄD</Text.MonoLabel>
        <h2 className="font-display font-medium text-[32px] m-1">
          Nie udało się pobrać wyników.
        </h2>
        <p className="text-body-muted m-0 mb-4">{error}</p>
        <Button variant="primary" onClick={onClearAll}>
          Spróbuj ponownie
        </Button>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="py-20 px-8 text-center bg-surface rounded-lg flex flex-col items-center gap-3">
        <Text.MonoLabel>BRAK WYNIKÓW</Text.MonoLabel>
        <h2 className="font-display font-medium text-[32px] m-1">
          Nic nie pasuje do tych filtrów.
        </h2>
        <p className="text-body-muted m-0 mb-4">
          Spróbuj zmienić miasto, datę lub kategorię — albo wyczyść filtry.
        </p>
        <Button variant="primary" onClick={onClearAll}>
          Wyczyść filtry
        </Button>
      </div>
    );
  }

  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 2xl:grid-cols-4">
        {results.map((e) => (
          <EventCard
            key={e.id}
            event={e}
            layout="grid"
            onOpen={openEvent}
            onToggleSave={onToggleSave}
            saved={savedSet.has(e.id)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {results.map((e) => (
        <EventCard
          key={e.id}
          event={e}
          layout="list"
          onOpen={openEvent}
          onToggleSave={onToggleSave}
          saved={savedSet.has(e.id)}
        />
      ))}
    </div>
  );
};
