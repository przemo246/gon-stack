import z from 'zod';
import { EVENT_CATEGORIES } from '@/shared/event-categories';

const category = z.enum(EVENT_CATEGORIES);

export const schema = () =>
  z.object({
    in: z.object({
      name: z.string().optional(),
      category: category.optional(),
      city: z.string().optional(),
      dateFrom: z.string().datetime({ offset: true }).optional(),
      dateTo: z.string().datetime({ offset: true }).optional(),
      isFeatured: z.preprocess(
        (val) => (typeof val === 'string' ? val === 'true' : val),
        z.boolean().optional(),
      ),
      offset: z.number().int().min(0).optional(),
      limit: z.number().int().min(1).max(100).optional(),
    }),
    out: z.union([
      z.object({
        code: z.literal(200),
        events: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            category,
            startDateTime: z.string().datetime({ offset: true }),
            city: z.string(),
            isFeatured: z.boolean(),
          }),
        ),
        total: z.number().int(),
      }),
      z.object({
        code: z.literal(400),
        type: z.literal('bad-request'),
        message: z.string(),
      }),
      z.object({
        code: z.literal(500),
        type: z.literal('internal-server'),
        message: z.string(),
      }),
    ]),
  });

export type Schema = z.infer<ReturnType<typeof schema>>;
