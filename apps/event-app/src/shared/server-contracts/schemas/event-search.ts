import z from 'zod';
import { category, coordinates, organizer } from './event-create';

const searchEventDto = z.object({
  id: z.string(),
  name: z.string(),
  category,
  datetime: z.string().datetime(),
  address: z.string(),
  coordinates,
  description: z.string().optional(),
  image: z.string().optional(),
  keywords: z.array(z.string()),
  organizer: organizer.optional(),
});

export const schema = () =>
  z.object({
    in: z
      .object({
        query: z.string().optional(),
        categories: z.array(category).optional(),
        dateFrom: z.string().datetime().optional(),
        dateTo: z.string().datetime().optional(),
        latitude: z.coerce.number().optional(),
        longitude: z.coerce.number().optional(),
        radiusKm: z.coerce.number().positive().optional(),
      })
      .refine(
        (v) =>
          !(
            v.radiusKm !== undefined &&
            (v.latitude === undefined || v.longitude === undefined)
          ),
        {
          message:
            'latitude and longitude are required when radiusKm is provided',
        },
      )
      .refine((v) => !(v.dateFrom && v.dateTo && v.dateFrom > v.dateTo), {
        message: 'dateFrom must not be after dateTo',
      }),
    out: z.union([
      z.object({ code: z.literal(200), events: z.array(searchEventDto) }),
      z.object({
        code: z.literal(400),
        type: z.literal('validation-error'),
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
