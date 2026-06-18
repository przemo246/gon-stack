import { schema } from '@schemas/search-events';
import { InternalServer } from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { publicProcedure } from '../../core/procedure';

export const searchEvents = publicProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (input, { db }) => {
    const { dateFrom, dateTo } = input;

    let query = db
      .from('events')
      .select('id, name, category, start_date_time, city, is_featured', {
        count: 'exact',
      });

    if (input.name) {
      query = query.ilike('name', `%${input.name}%`);
    }

    if (input.category) {
      query = query.eq('category', input.category);
    }

    if (input.city && input.city !== 'Cała Polska') {
      query = query.eq('city', input.city);
    }

    if (dateFrom) {
      query = query.gte('start_date_time', dateFrom);
    }

    if (dateTo) {
      query = query.lt('start_date_time', dateTo);
    }

    if (input.isFeatured !== undefined) {
      query = query.eq('is_featured', input.isFeatured);
    }

    const offset = input.offset ?? 0;
    const limit = input.limit ?? 20;

    const { data, count, error } = await query.range(
      offset,
      offset + limit - 1,
    );

    if (error) {
      throw new InternalServer('Failed to search events');
    }

    return {
      code: 200 as const,
      events: (data ?? []).map((e) => ({
        id: e.id,
        name: e.name,
        category: e.category,
        startDateTime: e.start_date_time,
        city: e.city,
        isFeatured: e.is_featured,
      })),
      total: count ?? 0,
    };
  },
});
