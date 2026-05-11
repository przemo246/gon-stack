import { schema } from '@schemas/get-user-profile';
import { withZodSchema } from '../../adapter/zod';
import { privateProcedure } from '../../core/procedure';
import { geProfile } from './get-profile';

export const getUserProfile = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async ({ userId }, { db }) => {
    const result = await geProfile(userId, db);

    return {
      code: 200,
      data: result,
    };
  },
});
