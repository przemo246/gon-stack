import type { EventCategory } from '@/shared/event-categories';

export type EventId = string;

export type { EventCategory };

export type Coordinates = { lat: number; lng: number };

export type { GeoResult } from '@/shared/server-contracts/schemas/geocode-address';

export type EventAddress = {
  name: string;
  street?: string;
  number?: string;
  postalCode: string;
  city: string;
};

export type GeoStatus = 'idle' | 'loading' | 'success' | 'error';

export type PosterStatus = 'idle' | 'uploading' | 'error';

export type CreateEventData = {
  name: string;
  description?: string;
  category: EventCategory;
  startDateTime: string;
  endDateTime?: string;
  address: EventAddress;
  coordinates: Coordinates;
  externalLink?: string;
  imageUrl?: string;
  keywords: string[];
  organizerInfo?: string;
};
