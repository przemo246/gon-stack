import { useEffect } from 'react';
import { Button } from '@/libs/ui/button';
import { Text } from '@/libs/ui/text';
import { EventCard } from './event-card';
import { IconArrow } from './icons';
import { useContext } from './context';
import { SkeletonCard } from './skeleton-card';

const SKELETON_COUNT = 4;

type FeaturedGridProps = {
  onToggleSave: (id: string) => void;
  savedSet: Set<string>;
};

export const FeaturedGrid = ({ onToggleSave, savedSet }: FeaturedGridProps) => {
  const ctx = useContext();
  const events = ctx.$results.use();
  const isLoading = ctx.$isLoading.use();

  const renderCards = () => {
    if (isLoading) {
      return Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <SkeletonCard key={i} />
      ));
    } else {
      return events.map((e) => (
        <EventCard
          key={e.id}
          event={e}
          onOpen={(event) => {
            window.location.href = `/event/${event.id}`;
          }}
          onToggleSave={onToggleSave}
          saved={savedSet.has(e.id)}
        />
      ));
    }
  };

  useEffect(() => {
    ctx.trigger('[TRIGGER]_SEARCH', { isFeatured: true });
  }, [ctx]);

  return (
    <section className="px-8 pb-12 max-w-360 mx-auto">
      <div className="flex justify-between items-end gap-8 mt-18 mb-7">
        <div>
          <Text.MonoLabel>WYDARZENIA POLECANE</Text.MonoLabel>
          <Text.SectionHeading className="mt-2 max-w-180">
            Najgłośniejsze afisze tygodnia.
          </Text.SectionHeading>
        </div>
        <Button
          variant="ghost"
          className="whitespace-nowrap"
          onClick={() => {
            window.location.href = '/results';
          }}
        >
          Zobacz wszystkie <IconArrow size={14} />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 2xl:grid-cols-4">
        {renderCards()}
      </div>
    </section>
  );
};
