export type EventCategory =
  | 'Concert'
  | 'Festival'
  | 'Sports'
  | 'Culture'
  | 'Theatre'
  | 'Food & Drink';

export type Event = {
  id: string;
  name: string;
  category: EventCategory;
  startDateTime: string;
  city: string;
  isFeatured: boolean;
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
