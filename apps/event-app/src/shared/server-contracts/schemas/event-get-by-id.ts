import z from 'zod';
import { eventDto } from './event-create';

export const schema = () =>
  z.object({
    in: z.object({
      id: z.string(),
    }),
    out: z.union([
      z.object({ code: z.literal(200), event: eventDto }),
      z.object({
        code: z.literal(404),
        type: z.literal('not-found'),
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
