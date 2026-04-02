import { useEffect } from 'react';
import { Provider, useContext } from './context';
import { Chat } from './chat';

const Content = () => {
  const { trigger } = useContext();

  useEffect(() => {
    trigger('[TRIGGER]_BOOTSTRAP');
  }, [trigger]);

  return <Chat />;
};

export const Main = () => (
  <Provider>
    <Content />
  </Provider>
);
