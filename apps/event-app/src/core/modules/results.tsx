import { ResultsMain } from '@/modules/event-discovery/presentation/results-main';
import type { User } from '@supabase/supabase-js';

type ModuleProps = {
  user: User | null;
};

export const ResultsModule = ({ user }: ModuleProps) => {
  return <ResultsMain user={user} />;
};
