import type { AuthCallback } from '@/shared/server-contracts/rest-schema';
import { BadRequest, InternalServer } from '../../core/error-handling';
import { createProcedure } from '../../core/procedure';

export const authCallback = createProcedure<AuthCallback>(
  async ({ db, searchParams }) => {
    const code = searchParams.code;

    if (!code) {
      throw new BadRequest();
    }

    const { error } = await db.auth.exchangeCodeForSession(code);

    if (error) {
      throw new InternalServer(error.message);
    }

    return {
      code: 303,
      location: '/user-profile-setup',
    };
  },
);
