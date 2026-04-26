import { Landing } from '@/modules/landing/presentation/main';
import type { User } from '@supabase/supabase-js';

type ModuleProps = {
  user: User | null;
};

export const Module = ({ user }: ModuleProps) => {
  return <Landing user={user} />;
};
