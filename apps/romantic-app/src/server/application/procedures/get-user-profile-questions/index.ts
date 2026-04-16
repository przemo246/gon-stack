import { schema } from '@schemas/get-user-profile-questions';
import { privateProcedure } from '../../core/procedure';
import { getProfileQuestions } from './get-profile-questions';
import { withZodSchema } from '../../adapter/zod';

export const getUserProfileQuestions = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (_, { db }) => {
    const groups = await getProfileQuestions(db);

    return {
      code: 200,
      groups,
    };
  },
});
