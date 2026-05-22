import { schema } from '@schemas/event-create';
import { InternalServer } from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { privateProcedure } from '../../core/procedure';

export const eventCreate = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (input, { db, user }) => {
    const location = `SRID=4326;POINT(${input.coordinates.lng} ${input.coordinates.lat})`;

    const { data, error } = await db
      .from('events')
      .insert({
        created_by: user.id,
        name: input.name,
        category: input.category,
        event_at: input.datetime,
        address: input.address,
        location,
        description: input.description ?? null,
        external_link: input.externalLink ?? null,
        image_url: input.image ?? null,
        organizer_name: input.organizer?.name ?? null,
        organizer_contact: input.organizer?.contact ?? null,
        keywords: input.keywords ?? [],
      })
      .select('id')
      .single();

    if (error || !data) throw new InternalServer(error?.message);

    const { data: row, error: fetchError } = await db
      .rpc('get_event_by_id', { p_id: data.id })
      .single();

    if (fetchError || !row) throw new InternalServer(fetchError?.message);

    return {
      code: 200 as const,
      event: {
        id: row.id,
        createdBy: row.created_by,
        name: row.name,
        category: row.category as typeof input.category,
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
