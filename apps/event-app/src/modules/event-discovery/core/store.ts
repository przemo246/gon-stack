import { atom } from '@/libs/supa-store';
import type { SearchFilters } from '../contracts/events';
import type { Event, EventDetail } from '../contracts/models';

export const createStore = () => {
  const $filters = atom<SearchFilters>({});
  const $results = atom<Event[]>([]);
  const $total = atom(0);
  const $isLoading = atom(false);
  const $error = atom<string | null>(null);

  const $event = atom<EventDetail | null>(null);
  const $isLoadingEvent = atom(false);
  const $eventError = atom<string | null>(null);

  return {
    $filters,
    $results,
    $total,
    $isLoading,
    $error,
    $event,
    $isLoadingEvent,
    $eventError,
  };
};

export type Store = ReturnType<typeof createStore>;
