import { useLayoutEffect, useState } from 'react';
import { createHookContext } from '@/libs/power-context';
import { createMediator } from '../core/mediator';

export const [Provider, useContext] = createHookContext('UserProfile', () => {
  const { facade, register } = useState(createMediator)[0];

  useLayoutEffect(() => {
    const unsub = register();
    return () => unsub();
  }, [register]);

  return facade;
});