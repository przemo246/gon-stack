import { schema } from '@schemas/auth-callback';
import { createProcedure } from '../../core/procedure';
import { InternalServer } from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';

export const authCallback = createProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async ({ code }, { db }) => {
    const { error } = await db.auth.exchangeCodeForSession(code);

    if (error) {
      throw new InternalServer(error.message);
    }

    return {
      code: 303,
      location: '/user-profile-setup',
    };
  },
});
