import { schema } from '@schemas/event-update';
import { Forbidden, InternalServer, NotFound } from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { privateProcedure } from '../../core/procedure';
import type { TablesUpdate } from '@/shared/data-sources/db-schema';

export const eventUpdate = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (input, { db, user }) => {
    const { data: existing, error: fetchError } = await db
      .from('events')
      .select('id, created_by')
      .eq('id', input.id)
      .single();

    if (fetchError || !existing) throw new NotFound();

    const isAdmin = (await db.rpc('is_admin')).data === true;
    if (existing.created_by !== user.id && !isAdmin) throw new Forbidden();

    const patch: TablesUpdate<'events'> = {};
    if (input.name !== undefined) patch.name = input.name;
    if (input.category !== undefined) patch.category = input.category;
    if (input.datetime !== undefined) patch.event_at = input.datetime;
    if (input.address !== undefined) patch.address = input.address;
    if (input.coordinates !== undefined) {
      patch.location = `SRID=4326;POINT(${input.coordinates.lng} ${input.coordinates.lat})`;
    }
    if (input.description !== undefined) patch.description = input.description;
    if (input.externalLink !== undefined)
      patch.external_link = input.externalLink;
    if (input.image !== undefined) patch.image_url = input.image;
    if (input.keywords !== undefined) patch.keywords = input.keywords;
    if (input.organizer !== undefined) {
      patch.organizer_name = input.organizer.name;
      patch.organizer_contact = input.organizer.contact;
    }

    const { error: updateError } = await db
      .from('events')
      .update(patch)
      .eq('id', input.id);

    if (updateError) throw new InternalServer(updateError.message);

    const { data: row, error: rowError } = await db
      .rpc('get_event_by_id', { p_id: input.id })
      .single();

    if (rowError || !row) throw new InternalServer(rowError?.message);

    return {
      code: 200 as const,
      event: {
        id: row.id,
        createdBy: row.created_by,
        name: row.name,
        category: row.category as NonNullable<typeof input.category>,
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
