import type { Provider } from '@supabase/supabase-js';
import type { LoginUser } from '@/shared/server-contracts/rest-schema';
import { BadRequest, InternalServer } from '../../core/error-handling';
import { createProcedure } from '../../core/procedure';

const providers = new Set<Provider>(['google']);

const validatePayload = (
  payload: unknown,
): { email?: string; password?: string; provider?: Provider } => {
  if (typeof payload !== 'object' || payload === null) throw new BadRequest();

  const { email, password, provider } = payload as {
    email?: unknown;
    password?: unknown;
    provider?: unknown;
  };

  if (typeof provider === 'string' && provider.length > 0) {
    if (!providers.has(provider as Provider)) throw new BadRequest();
    return { provider: provider as Provider };
  }

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

export const loginUser = createProcedure<LoginUser>(async ({ db, payload }) => {
  const parsedPayload = validatePayload(payload);

  if (parsedPayload.provider) {
    const oauthResult = await db.auth.signInWithOAuth({
      provider: parsedPayload.provider,
      options: {
        redirectTo: import.meta.env.AUTH_CALLBACK_URL,
        queryParams: { prompt: 'select_account' },
      },
    });

    if (oauthResult.error || !oauthResult.data.url) {
      throw new InternalServer(oauthResult.error?.message);
    }

    return {
      code: 303,
      location: oauthResult.data.url,
    };
  }

  const signInResult = await db.auth.signInWithPassword({
    email: parsedPayload.email!,
    password: parsedPayload.password!,
  });

  if (signInResult.error) {
    throw new InternalServer(signInResult.error.message);
  }

  return {
    code: 303,
    location: '/user-profile-setup',
  };
});
