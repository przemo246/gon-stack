import { z } from 'zod';

const locationResponseSchema = z.object({
  code: z.literal(303),
  location: z.string(),
});
const badRequestResponseSchema = z.object({
  code: z.literal(400),
  type: z.literal('bad-request'),
  message: z.string(),
});
const internalServerErrorResponseSchema = z.object({
  code: z.literal(500),
  type: z.literal('internal-server'),
  message: z.string(),
});
const unauthorizedResponseSchema = z.object({
  code: z.literal(401),
  type: z.literal('unauthorized'),
  message: z.string(),
});

const questionConstraintsSchema = z.object({
  min: z.number(),
  max: z.number(),
  required: z.boolean(),
});

const questionBaseSchema = z.object({
  id: z.number(),
  key: z.string(),
  label: z.string(),
  category: z.string(),
  constraints: questionConstraintsSchema,
});
const numericQuestionSchema = questionBaseSchema.extend({
  type: z.literal('numeric'),
  value: z.number(),
});
const selectQuestionSchema = questionBaseSchema.extend({
  type: z.literal('select'),
  options: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
  ),
  value: z.string(),
});
const textQuestionSchema = questionBaseSchema.extend({
  type: z.literal('text'),
  value: z.string(),
});
const slideQuestionSchema = questionBaseSchema.extend({
  type: z.literal('slide'),
  badges: z.object({
    min: z.string(),
    max: z.string(),
  }),
  value: z.number(),
});

const userProfileQuestionSchema = z.discriminatedUnion('type', [
  numericQuestionSchema,
  selectQuestionSchema,
  textQuestionSchema,
  slideQuestionSchema,
]);

const getUserProfileSuccessResponseSchema = z.object({
  code: z.literal(200),
  groups: z.array(
    z.object({
      id: z.number(),
      key: z.string(),
      label: z.string(),
      description: z.string(),
      questions: z.array(userProfileQuestionSchema),
    }),
  ),
});

export const getUserProfileSchema = () =>
  z.object({
    in: z.object({
      page: z.string().optional(),
      limit: z.string().optional(),
    }),
    out: z.union([
      getUserProfileSuccessResponseSchema,
      unauthorizedResponseSchema,
      internalServerErrorResponseSchema,
    ]),
  });

type GetUserProfileSchema = z.infer<ReturnType<typeof getUserProfileSchema>>;
export type GetUserProfileOutput = GetUserProfileSchema['out'];
export type GetUserProfileSuccess = Extract<
  GetUserProfileOutput,
  { code: 200 }
>;

export const registerUserSchema = () =>
  z.object({
    in: z.object({
      email: z.string().min(1),
      password: z.string().min(1),
    }),
    out: z.union([
      locationResponseSchema,
      badRequestResponseSchema,
      internalServerErrorResponseSchema,
    ]),
  });

export const loginUserSchema = () =>
  z.object({
    in: z.union([
      z.object({
        email: z.string().min(1),
        password: z.string().min(1),
      }),
      z.object({
        provider: z.literal('google'),
      }),
    ]),
    out: z.union([
      locationResponseSchema,
      badRequestResponseSchema,
      internalServerErrorResponseSchema,
    ]),
  });

export const logoutUserSchema = () =>
  z.object({
    in: z.object({}),
    out: z.union([locationResponseSchema, internalServerErrorResponseSchema]),
  });

export const authCallbackSchema = () =>
  z.object({
    in: z.object({
      code: z.string(),
    }),
    out: z.union([
      z.object({
        code: z.literal(303),
        location: z.string(),
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
