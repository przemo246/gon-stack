import { schema } from '@schemas/event-delete';
import { Forbidden, InternalServer, NotFound } from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { privateProcedure } from '../../core/procedure';

export const eventDelete = privateProcedure({
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

    const { error } = await db.from('events').delete().eq('id', input.id);

    if (error) throw new InternalServer(error.message);

    return { code: 200 as const, deleted: true as const };
  },
});
