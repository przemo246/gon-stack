import z from 'zod';
import { geoResult } from './geocode-address';

// Reverse geocoding: a dropped/dragged pin -> the structured address parts of the
// point. Coordinates echo the input so the caller has one consistent shape.
export const schema = () =>
  z.object({
    in: z.object({
      lat: z.coerce.number(),
      lng: z.coerce.number(),
    }),
    out: z.union([
      z.object({
        code: z.literal(200),
        result: geoResult,
      }),
      z.object({
        code: z.literal(404),
        type: z.literal('not-found'),
        message: z.string(),
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
