import { useLayoutEffect, useState } from 'react';
import { createHookContext } from '@/libs/power-context';
import { createMediator } from '../core/mediator';

export const [Provider, useContext] = createHookContext(
  'RoomLobby2',
  ({ mediatorFactory } = { mediatorFactory: createMediator }) => {
    const [{ facade, register }] = useState(mediatorFactory);

    useLayoutEffect(() => {
      const unsub = register();
      return () => unsub();
    }, [register]);

    return facade;
  },
);
