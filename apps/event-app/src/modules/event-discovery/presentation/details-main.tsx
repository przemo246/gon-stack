import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

import { Provider, useContext } from './context';
import { Header } from './header';
import { Footer } from './footer';
import { DetailsPage } from './details-page';
import { SkeletonDetails } from './skeleton-details';

type Props = {
  id: string;
  user: User | null;
};

const Content = ({ id, user }: Props) => {
  const { trigger, $event, $isLoadingEvent, $eventError } = useContext();
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set());

  const event = $event.use();
  const isLoading = $isLoadingEvent.use();
  const error = $eventError.use();

  useEffect(() => {
    trigger('[TRIGGER]_FETCH_EVENT', { id });
  }, [trigger, id]);

  const toggleSave = (eid: string) => {
    setSavedSet((prev) => {
      const next = new Set(prev);
      if (next.has(eid)) next.delete(eid);
      else next.add(eid);
      return next;
    });
  };

  return (
    <div className="bg-canvas min-h-screen text-ink">
      <Header activePage="details" savedCount={savedSet.size} user={user} />
      <main>
        {isLoading && <SkeletonDetails />}
        {error && (
          <div className="py-20 text-center text-body-muted">{error}</div>
        )}
        {event && !isLoading && (
          <DetailsPage
            event={event}
            allEvents={[]}
            onBack={() => window.history.back()}
            onOpenEvent={(e) => {
              window.location.href = `/event/${e.id}`;
            }}
            onToggleSave={toggleSave}
            savedSet={savedSet}
          />
        )}
        {!isLoading && !error && !event && (
          <div className="py-20 text-center text-body-muted">
            Nie znaleziono wydarzenia.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export const DetailsMain = ({ id, user }: Props) => (
  <Provider>
    <Content id={id} user={user} />
  </Provider>
);
