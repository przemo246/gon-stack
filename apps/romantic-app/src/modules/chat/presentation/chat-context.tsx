import { useState } from 'react';
import { createHookContext } from '../../../libs/power-context';
import { createStore } from '../logic/store';

export const [ChatProvider, useChatContext, ChatContext] = createHookContext(
  'Chat',
  () => useState(createStore)[0],
);
