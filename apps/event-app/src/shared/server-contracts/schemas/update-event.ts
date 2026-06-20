import z from 'zod';
import { EVENT_CATEGORIES } from '@/shared/event-categories';

const category = z.enum(EVENT_CATEGORIES);

const address = z.object({
  name: z.string().min(1),
  street: z.string().optional(),
  number: z.string().optional(),
  postalCode: z.string().min(1),
  city: z.string().min(1),
});

const coordinates = z.object({
  lat: z.number(),
  lng: z.number(),
});

const eventDetail = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  category,
  startDateTime: z.string().datetime({ offset: true }),
  endDateTime: z.string().datetime({ offset: true }).optional(),
  address,
  coordinates,
  externalLink: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  keywords: z.array(z.string()),
  organizerInfo: z.string().optional(),
  isFeatured: z.boolean(),
  attendeeCount: z.number().int(),
});

export const schema = () =>
  z.object({
    in: z.object({
      eventId: z.string(),
      name: z.string().min(1).optional(),
      category: category.optional(),
      startDateTime: z.string().datetime().optional(),
      endDateTime: z.string().datetime().optional(),
      address: address.optional(),
      coordinates: coordinates.optional(),
      externalLink: z.string().url().optional(),
      imageUrl: z.string().url().optional(),
      keywords: z.array(z.string()).optional(),
      organizerInfo: z.string().optional(),
      isFeatured: z.boolean().optional(),
    }),
    out: z.union([
      z.object({
        code: z.literal(200),
        event: eventDetail,
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
