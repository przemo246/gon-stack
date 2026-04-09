import { Provider } from '@/modules/user-profile-setup/presentation/context';
import { Main } from '@/modules/user-profile-setup/presentation/main';

export const Module = () => {
  return (
    <Provider>
      <Main />
    </Provider>
  );
};
