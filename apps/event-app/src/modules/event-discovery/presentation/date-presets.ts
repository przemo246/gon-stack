type DateRange = { dateFrom: string; dateTo: string };

/**
 * Resolves a date-preset key from the search UI into a concrete date range.
 * `dateFrom` is inclusive, `dateTo` is exclusive. Returns `undefined` for an
 * empty or unrecognized key (i.e. "any date").
 */
export const resolveDatePreset = (key: string): DateRange | undefined => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (key === 'today') {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return { dateFrom: today.toISOString(), dateTo: tomorrow.toISOString() };
  }

  if (key === 'weekend') {
    const dayOfWeek = today.getDay();
    const saturday = new Date(today);
    saturday.setDate(today.getDate() + ((6 - dayOfWeek + 7) % 7));
    const monday = new Date(saturday);
    monday.setDate(saturday.getDate() + 2);
    return { dateFrom: saturday.toISOString(), dateTo: monday.toISOString() };
  }

  if (key === 'week') {
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
    const nextMonday = new Date(monday);
    nextMonday.setDate(monday.getDate() + 7);
    return { dateFrom: monday.toISOString(), dateTo: nextMonday.toISOString() };
  }

  if (key === 'month') {
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1,
    );
    return {
      dateFrom: firstOfMonth.toISOString(),
      dateTo: firstOfNextMonth.toISOString(),
    };
  }

  if (key === 'summer') {
    // Meteorological summer: 1 Jun (inclusive) – 1 Sep (exclusive).
    const year = today.getFullYear();
    const summerStart = new Date(year, 5, 1);
    const summerEnd = new Date(year, 8, 1);
    return {
      dateFrom: summerStart.toISOString(),
      dateTo: summerEnd.toISOString(),
    };
  }

  return undefined;
};
