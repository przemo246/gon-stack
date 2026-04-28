import { Main } from '@/modules/room-lobby/presentation/main';
import { Provider } from '@/modules/room-lobby/presentation/context';

export const Module = () => {
  return (
    <Provider>
      <Main />
    </Provider>
  );
};
