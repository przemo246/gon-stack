import { Action } from './action';
import { Create } from './create';
import { useContext } from './context';
import { Join } from './join';
import { Waiting } from './waiting';

export const Router = () => {
  const ctx = useContext();
  const screen = ctx.$screen.use();

  return screen === 'action' ? (
    <Action />
  ) : screen === 'create' ? (
    <Create />
  ) : screen === 'join' ? (
    <Join />
  ) : (
    <Waiting />
  );
};
