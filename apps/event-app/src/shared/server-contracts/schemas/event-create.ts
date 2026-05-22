import z from 'zod';

export const category = z.enum([
  'Concert',
  'Festival',
  'Sports',
  'Culture',
  'Theatre',
  'Food & Drink',
]);

export const coordinates = z.object({ lat: z.number(), lng: z.number() });

export const organizer = z.object({
  name: z.string(),
  contact: z.string(),
});

export const eventDto = z.object({
  id: z.string(),
  createdBy: z.string(),
  name: z.string(),
  category,
  datetime: z.string().datetime(),
  address: z.string(),
  coordinates,
  description: z.string().optional(),
  externalLink: z.string().optional(),
  image: z.string().optional(),
  keywords: z.array(z.string()),
  organizer: organizer.optional(),
});

export const schema = () =>
  z.object({
    in: z.object({
      name: z.string().min(1),
      category,
      datetime: z.string().datetime(),
      address: z.string().min(1),
      coordinates,
      description: z.string().optional(),
      externalLink: z.string().url().optional(),
      image: z.string().url().optional(),
      keywords: z.array(z.string()).optional(),
      organizer: organizer.optional(),
    }),
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
        code: z.literal(500),
        type: z.literal('internal-server'),
        message: z.string(),
      }),
    ]),
  });

export type Schema = z.infer<ReturnType<typeof schema>>;
