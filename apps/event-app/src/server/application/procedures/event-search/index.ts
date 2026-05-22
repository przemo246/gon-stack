import { schema } from '@schemas/event-search';
import { InternalServer } from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { publicProcedure } from '../../core/procedure';

export const eventSearch = publicProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (input, { db }) => {
    const { data, error } = await db.rpc('search_events', {
      p_query: input.query,
      p_categories: input.categories,
      p_date_from: input.dateFrom,
      p_date_to: input.dateTo,
      p_lat: input.latitude,
      p_lng: input.longitude,
      p_radius_km: input.radiusKm,
    });

    if (error) throw new InternalServer(error.message);

    return {
      code: 200 as const,
      events: (data ?? []).map((row) => ({
        id: row.id,
        name: row.name,
        category: row.category as
          | 'Concert'
          | 'Festival'
          | 'Sports'
          | 'Culture'
          | 'Theatre'
          | 'Food & Drink',
        datetime: row.event_at,
        address: row.address,
        coordinates: { lat: row.lat, lng: row.lng },
        description: row.description ?? undefined,
        image: row.image_url ?? undefined,
        keywords: row.keywords,
        organizer: row.organizer_name
          ? { name: row.organizer_name, contact: row.organizer_contact ?? '' }
          : undefined,
      })),
    };
  },
});
