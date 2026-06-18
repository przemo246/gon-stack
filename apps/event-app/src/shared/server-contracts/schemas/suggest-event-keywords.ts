import z from 'zod';
import { EVENT_CATEGORIES } from '@/shared/event-categories';

const category = z.enum(EVENT_CATEGORIES);

export const schema = () =>
  z.object({
    in: z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      category: category.optional(),
    }),
    out: z.union([
      z.object({
        code: z.literal(200),
        keywords: z.array(z.string()),
      }),
      z.object({
        code: z.literal(400),
        type: z.literal('bad-request'),
        message: z.string(),
      }),
      z.object({
        code: z.literal(401),
        type: z.literal('unauthorized'),
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
