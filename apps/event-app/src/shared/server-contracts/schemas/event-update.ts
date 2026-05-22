import z from 'zod';
import { category, coordinates, organizer, eventDto } from './event-create';

export const schema = () =>
  z.object({
    in: z
      .object({
        id: z.string(),
        name: z.string().optional(),
        category: category.optional(),
        datetime: z.string().datetime().optional(),
        address: z.string().optional(),
        coordinates: coordinates.optional(),
        description: z.string().optional(),
        externalLink: z.string().url().optional(),
        image: z.string().url().optional(),
        keywords: z.array(z.string()).optional(),
        organizer: organizer.optional(),
      })
      .refine(
        (v) => {
          const { id: _id, ...rest } = v;
          return Object.values(rest).some((f) => f !== undefined);
        },
        { message: 'At least one editable field must be provided' },
      ),
    out: z.union([
      z.object({ code: z.literal(200), event: eventDto }),
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
        code: z.literal(403),
        type: z.literal('forbidden'),
        message: z.string(),
      }),
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
