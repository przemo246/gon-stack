import z from 'zod';

export const schema = () =>
  z.object({
    in: z.object({
      roomCode: z
        .string()
        .trim()
        .toUpperCase()
        .regex(/^[A-Z0-9]{6}$/),
    }),
    out: z.union([
      z.object({
        code: z.literal(201),
        gameId: z.uuid(),
        roomId: z.uuid(),
        roomCode: z.string().regex(/^[A-Z0-9]{6}$/),
        status: z.literal('active'),
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
