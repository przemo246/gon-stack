import type { RegisterUser } from '@/shared/server-contracts/rest-schema';
import { BadRequest, InternalServer } from '../../core/error-handling';
import { createProcedure } from '../../core/procedure';

const validatePayload = (
  payload: unknown,
): { email: string; password: string } => {
  if (typeof payload !== 'object' || payload === null) throw new BadRequest();

  const { email, password } = payload as {
    email?: unknown;
    password?: unknown;
  };

  if (
    typeof email !== 'string' ||
    email.length === 0 ||
    typeof password !== 'string' ||
    password.length === 0
  ) {
    throw new BadRequest();
  }

  return { email, password };
};

export const registerUser = createProcedure<RegisterUser>(
  async ({ db, payload }) => {
    const { email, password } = validatePayload(payload);

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
);
