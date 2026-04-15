import { schema } from '@schemas/get-user-profile-questions';
import { createProcedure } from '../../core/procedure';
import { authenticate } from './authenticate';
import { getProfileQuestions } from './get-profile-questions';
import { withZodSchema } from '../../adapter/zod';

export const getUserProfileQuestions = createProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (_, { db }) => {
    await authenticate(db);
    const groups = await getProfileQuestions(db);

    return {
      code: 200,
      groups,
    };
  },
});
