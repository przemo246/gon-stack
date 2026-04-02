export type RoomLobbyScreen = 'action' | 'create' | 'join' | 'waiting';

export type RoomLobbyStatus = 'idle' | 'loading' | 'success' | 'error';

export type WaitingState =
  | 'waiting_for_partner'
  | 'partner_joined'
  | 'connection_retry';
