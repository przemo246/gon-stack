import { schema } from '@schemas/get-user-profile';
import { withZodSchema } from '../../adapter/zod';
import { privateProcedure } from '../../core/procedure';
import { getProfile } from './get-profile';

export const getUserProfile = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (_input, { db, user }) => {
    const result = await getProfile(user.id, db);

    return {
      code: 200,
      data: result,
    };
  },
});
