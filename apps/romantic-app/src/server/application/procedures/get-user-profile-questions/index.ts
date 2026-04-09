import type { GetUserProfile } from '@/shared/server-contracts/rest-schema';
import { createProcedure } from '../../core/procedure';
import { authenticate } from './authenticate';
import { getProfileQuestions } from './get-profile-questions';

export const getUserProfileQuestions = createProcedure<GetUserProfile>(
  async ({ db }) => {
    await authenticate(db);
    const groups = await getProfileQuestions(db);

    return {
      code: 200,
      groups,
    };
  },
);
