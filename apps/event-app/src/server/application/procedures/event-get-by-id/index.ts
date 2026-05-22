import { schema } from '@schemas/event-get-by-id';
import { InternalServer, NotFound } from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { publicProcedure } from '../../core/procedure';

export const eventGetById = publicProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (input, { db }) => {
    const { data: row, error } = await db
      .rpc('get_event_by_id', { p_id: input.id })
      .single();

    if (error) throw new InternalServer(error.message);
    if (!row) throw new NotFound();

    return {
      code: 200 as const,
      event: {
        id: row.id,
        createdBy: row.created_by,
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
        externalLink: row.external_link ?? undefined,
        image: row.image_url ?? undefined,
        keywords: row.keywords,
        organizer: row.organizer_name
          ? { name: row.organizer_name, contact: row.organizer_contact ?? '' }
          : undefined,
      },
    };
  },
});
