import { z } from 'zod';

const emptyRecordSchema = z.record(z.string(), z.never());
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
  type: z.literal('internal-server-error'),
  message: z.string(),
});

export const questionConstraintsSchema = z.object({
  min: z.number(),
  max: z.number(),
  required: z.boolean(),
});
export type QuestionConstraints = z.infer<typeof questionConstraintsSchema>;

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

export const userProfileQuestionSchema = z.discriminatedUnion('type', [
  numericQuestionSchema,
  selectQuestionSchema,
  textQuestionSchema,
  slideQuestionSchema,
]);
export type UserProfileQuestion = z.infer<typeof userProfileQuestionSchema>;

export const getUserProfileSchema = z.object({
  path: z.literal('/config/user-profile'),
  request: z.object({
    searchParams: z.object({
      page: z.string().optional(),
      limit: z.string().optional(),
    }),
    pathParams: emptyRecordSchema,
    payload: z.never(),
    headers: emptyRecordSchema,
  }),
  responses: z.object({
    200: z.object({
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
    }),
    401: z.object({
      code: z.literal(401),
      type: z.literal('unauthorized'),
      message: z.string(),
    }),
    500: internalServerErrorResponseSchema,
  }),
});
export type GetUserProfile = z.infer<typeof getUserProfileSchema>;

export const registerUserSchema = z.object({
  path: z.literal('/auth/register'),
  request: z.object({
    searchParams: emptyRecordSchema,
    pathParams: emptyRecordSchema,
    payload: z.object({
      email: z.string(),
      password: z.string(),
    }),
    headers: emptyRecordSchema,
  }),
  responses: z.object({
    303: locationResponseSchema,
    400: badRequestResponseSchema,
    500: internalServerErrorResponseSchema,
  }),
});
export type RegisterUser = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  path: z.literal('/auth/login'),
  request: z.object({
    searchParams: emptyRecordSchema,
    pathParams: emptyRecordSchema,
    payload: z.union([
      z.object({
        email: z.string(),
        password: z.string(),
      }),
      z.object({
        provider: z.literal('google'),
      }),
    ]),
    headers: emptyRecordSchema,
  }),
  responses: z.object({
    303: locationResponseSchema,
    400: badRequestResponseSchema,
    500: internalServerErrorResponseSchema,
  }),
});
export type LoginUser = z.infer<typeof loginUserSchema>;

export const logoutUserSchema = z.object({
  path: z.literal('/auth/logout'),
  request: z.object({
    searchParams: emptyRecordSchema,
    pathParams: emptyRecordSchema,
    payload: z.never(),
    headers: emptyRecordSchema,
  }),
  responses: z.object({
    303: locationResponseSchema,
    500: internalServerErrorResponseSchema,
  }),
});
export type LogoutUser = z.infer<typeof logoutUserSchema>;

export const authCallbackSchema = z.object({
  path: z.literal('/auth/callback'),
  request: z.object({
    searchParams: z.object({
      code: z.string().optional(),
    }),
    pathParams: emptyRecordSchema,
    payload: z.never(),
    headers: emptyRecordSchema,
  }),
  responses: z.object({
    303: locationResponseSchema,
    400: badRequestResponseSchema,
    500: internalServerErrorResponseSchema,
  }),
});
export type AuthCallback = z.infer<typeof authCallbackSchema>;
