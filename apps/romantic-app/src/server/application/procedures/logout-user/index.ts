import type { LogoutUser } from '@/shared/server-contracts/rest-schema';
import { InternalServer } from '../../core/error-handling';
import { createProcedure } from '../../core/procedure';

export const logoutUser = createProcedure<LogoutUser>(async ({ db }) => {
  const { error } = await db.auth.signOut();

  if (error) {
    throw new InternalServer(error.message);
  }

  return {
    code: 303,
    location: '/login',
  };
});
