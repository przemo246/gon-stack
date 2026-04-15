import z from 'zod';

const question = z.object({
  id: z.number(),
  key: z.string(),
  label: z.string(),
  category: z.string(),
  constraints: z.object({
    min: z.number(),
    max: z.number(),
    required: z.boolean(),
  }),
});

export const schema = () =>
  z.object({
    in: z.object({
      page: z.string().optional(),
      limit: z.string().optional(),
    }),
    out: z.union([
      z.object({
        code: z.literal(200),
        groups: z.array(
          z.object({
            id: z.number(),
            key: z.string(),
            label: z.string(),
            description: z.string(),
            questions: z.array(
              z.discriminatedUnion('type', [
                question.extend({
                  type: z.literal('numeric'),
                  value: z.number(),
                }),
                question.extend({
                  type: z.literal('select'),
                  options: z.array(
                    z.object({
                      value: z.string(),
                      label: z.string(),
                    }),
                  ),
                  value: z.string(),
                }),
                question.extend({
                  type: z.literal('text'),
                  value: z.string(),
                }),
                question.extend({
                  type: z.literal('slide'),
                  badges: z.object({
                    min: z.string(),
                    max: z.string(),
                  }),
                  value: z.number(),
                }),
              ]),
            ),
          }),
        ),
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
