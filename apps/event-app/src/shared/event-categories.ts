// Canonical event category codes. These are stable, language-agnostic codes
// stored in the database (public.event_category enum). Display labels live in
// the app layer so categories can be relabeled / localized without a migration.
export const EVENT_CATEGORIES = [
  'concert',
  'festival',
  'sports',
  'culture',
  'theatre',
  'food_and_drink',
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

// Polish display labels (default language).
export const EVENT_CATEGORY_LABELS_PL: Record<EventCategory, string> = {
  concert: 'Koncert',
  festival: 'Festiwal',
  sports: 'Sport',
  culture: 'Kultura',
  theatre: 'Teatr',
  food_and_drink: 'Jedzenie i napoje',
};

export const eventCategoryLabel = (category: string): string =>
  EVENT_CATEGORY_LABELS_PL[category as EventCategory] ?? category;
