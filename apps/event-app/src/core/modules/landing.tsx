import { Main } from '@/modules/landing/presentation/main';
import type { User } from '@supabase/supabase-js';
import { Provider } from '@/modules/landing/presentation/context';

type ModuleProps = {
  user: User | null;
};

export const Module = ({ user }: ModuleProps) => {
  return (
    <Provider>
      <Main user={user} />
    </Provider>
  );
};
