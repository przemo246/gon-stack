export type ThreadId = string;
export type MessageId = string;

export type ThreadState = 'idle' | 'active' | 'loading' | 'error';
export type MessageRole = 'model' | 'user' | 'system';
export type ConnectionStatus = 'connected' | 'reconnecting' | 'disconnected';

export type Thread = {
  id: ThreadId;
  title: string;
  preview: string;
  time: string;
  unread: number;
  active: boolean;
  state: ThreadState;
};

export type Message = {
  id: MessageId;
  role: MessageRole;
  body: string;
};
