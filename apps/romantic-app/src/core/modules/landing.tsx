import { Main } from '@/modules/landing/presentation/main';

type ModuleProps = {
  userEmail?: string | null;
};

export const Module = ({ userEmail = null }: ModuleProps) => {
  return <Main userEmail={userEmail} />;
};
