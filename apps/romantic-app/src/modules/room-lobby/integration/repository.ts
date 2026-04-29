import type { Schema as JoinRoomSchema } from '@/shared/server-contracts/schemas/join-room';
import type { Schema as CreateRoomSchema } from '@/shared/server-contracts/schemas/create-room';
import type { InferOut } from '@/shared/server-contracts/extraction';

type JoinRoomSuccess = InferOut<JoinRoomSchema['out'], 200>;
type CreateRoomSuccess = InferOut<CreateRoomSchema['out'], 201>;

export const createRoom = async (
  signal?: AbortSignal,
): Promise<CreateRoomSuccess> => {
  const response = await fetch('/api/rooms/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
    signal,
  });

  const data = (await response.json()) as CreateRoomSchema['out'];

  if (data.code !== 201) {
    throw new Error(
      'message' in data ? data.message : 'Could not create room. Try again.',
    );
  }

  return data;
};

export const joinRoom = async (
  roomCode: string,
  signal?: AbortSignal,
): Promise<JoinRoomSuccess> => {
  const response = await fetch('/api/rooms/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roomCode }),
    signal,
  });

  const data = (await response.json()) as JoinRoomSchema['out'];

  if (data.code !== 200) {
    throw new Error(
      'message' in data
        ? data.message
        : 'Room is not available. Create a new room or use another code.',
    );
  }

  return data;
};
