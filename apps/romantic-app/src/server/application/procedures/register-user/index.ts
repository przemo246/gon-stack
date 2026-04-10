import { registerUserSchema } from '@/shared/server-contracts/rest-schema';
import { InternalServer } from '../../core/error-handling';
import { createProcedure } from '../../core/procedure';
import { withZodSchema } from '../../adapter/zod';

export const registerUser = createProcedure({
  schema: withZodSchema({ schema: registerUserSchema }),
})({
  handler: async ({ email, password }, { db }) => {
    const signUpResult = await db.auth.signUp({
      email,
      password,
    });

    if (signUpResult.error) {
      throw new InternalServer(signUpResult.error.message);
    }

    return {
      code: 303,
      location: '/user-profile-setup',
    };
  },
});
