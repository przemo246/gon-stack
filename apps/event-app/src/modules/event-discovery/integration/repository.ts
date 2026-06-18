import type { Schema as SearchEventsSchema } from '@/shared/server-contracts/schemas/search-events';
import type { Schema as GetEventByIdSchema } from '@/shared/server-contracts/schemas/get-event-by-id';
import type { InferOut } from '@/shared/server-contracts/extraction';
import type { Event, EventDetail } from '../contracts/models';
import type { SearchFilters } from '../contracts/events';

const CATEGORY_MAP: Record<string, string> = {
  koncerty: 'concert',
  festiwale: 'festival',
  sport: 'sports',
  teatr: 'theatre',
  wystawy: 'culture',
};

export const searchEvents = async (
  filters: SearchFilters,
  signal: AbortSignal,
): Promise<{ events: Event[]; total: number }> => {
  const params = new URLSearchParams();
  if (filters.name) params.set('name', filters.name);
  if (filters.category) {
    const mapped = CATEGORY_MAP[filters.category];
    if (mapped) params.set('category', mapped);
  }
  if (filters.city) params.set('city', filters.city);
  if (filters.dateFrom) params.set('dateFrom', filters.dateFrom);
  if (filters.dateTo) params.set('dateTo', filters.dateTo);
  if (filters.isFeatured !== undefined)
    params.set('isFeatured', String(filters.isFeatured));

  const res = await fetch(`/api/event/search?${params}`, { signal });
  if (!res.ok) {
    throw new Error('Coś poszło nie tak. Spróbuj ponownie później.');
  }

  const data = (await res.json()) as InferOut<SearchEventsSchema['out']>;
  if (data.code !== 200) {
    throw new Error(data.message);
  }

  return { events: data.events, total: data.total };
};

export const fetchEvent = async (
  id: string,
  signal: AbortSignal,
): Promise<EventDetail> => {
  const res = await fetch(`/api/event/${id}`, { signal });
  if (!res.ok) {
    throw new Error('Coś poszło nie tak. Spróbuj ponownie później.');
  }

  const data = (await res.json()) as InferOut<GetEventByIdSchema['out']>;
  if (data.code !== 200) {
    throw new Error(data.message);
  }

  return data.event;
};
