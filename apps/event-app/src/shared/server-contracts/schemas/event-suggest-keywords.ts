import z from 'zod';
import { category } from './event-create';

export const schema = () =>
  z.object({
    in: z.object({
      name: z.string().min(1),
      category,
      description: z.string().optional(),
      address: z.string().optional(),
    }),
    out: z.union([
      z.object({ code: z.literal(200), suggestions: z.array(z.string()) }),
      z.object({
        code: z.literal(400),
        type: z.literal('validation-error'),
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
