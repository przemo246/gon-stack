import z from 'zod';

// A single geocoding candidate. Coordinates are always present (they put the pin
// on the map); the structured address parts are best-effort — a park or a field
// has a city but no street/number.
export const geoResult = z.object({
  name: z.string(),
  street: z.string().optional(),
  number: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
  displayName: z.string(),
});

export const schema = () =>
  z.object({
    in: z.object({
      q: z.string().min(1),
    }),
    out: z.union([
      z.object({
        code: z.literal(200),
        results: z.array(geoResult),
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
export type GeoResult = z.infer<typeof geoResult>;
