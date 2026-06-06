import { atom } from '@/libs/supa-store';
import type { SearchFilters } from '../contracts/events';

export type EventCategory =
  | 'Concert'
  | 'Festival'
  | 'Sports'
  | 'Culture'
  | 'Theatre'
  | 'Food & Drink';

export type EventCard = {
  id: string;
  name: string;
  category: EventCategory;
  startDateTime: string;
  city: string;
};

export type EventDetail = {
  id: string;
  name: string;
  description?: string;
  category: EventCategory;
  startDateTime: string;
  endDateTime?: string;
  address: {
    street: string;
    number: string;
    postalCode: string;
    city: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  externalLink?: string;
  imageUrl?: string;
  keywords: string[];
  organizerInfo?: string;
  isFeatured: boolean;
  attendeeCount: number;
};

export const createStore = () => {
  const $filters = atom<SearchFilters>({});
  const $results = atom<EventCard[]>([]);
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
