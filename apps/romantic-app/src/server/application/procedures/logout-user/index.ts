import { logoutUserSchema } from '@/shared/server-contracts/rest-schema';
import { InternalServer } from '../../core/error-handling';
import { createProcedure } from '../../core/procedure';
import { withZodSchema } from '../../adapter/zod';

export const logoutUser = createProcedure({
  schema: withZodSchema({ schema: logoutUserSchema }),
})({
  handler: async (_input, { db }) => {
    const { error } = await db.auth.signOut();

    if (error) {
      throw new InternalServer(error.message);
    }

    return {
      code: 303,
      location: '/login',
    };
  },
});
