import type { Schema as CreateRoomSchema } from '@/shared/server-contracts/schemas/create-room';
import type { Schema as JoinRoomSchema } from '@/shared/server-contracts/schemas/join-room';

const pause = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const createRoom = async (signal?: AbortSignal): Promise<string> => {
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
      'message' in data ? data.message : 'Could Not Create Room. Try Again.',
    );
  }

  return data.roomCode;
};

export const joinRoom = async (
  roomCode: string,
  signal?: AbortSignal,
): Promise<string> => {
  const code = roomCode.trim().toUpperCase();

  if (!/^[A-Z0-9]{6}$/.test(code)) {
    throw new Error('Room Code Is Invalid. Check the Code and Try Again.');
  }

  const response = await fetch('/api/rooms/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roomCode: code }),
    signal,
  });
  const data = (await response.json()) as JoinRoomSchema['out'];

  if (data.code !== 200) {
    throw new Error(
      'message' in data
        ? data.message
        : 'Room Is Not Available. Create a New Room or Use Another Code.',
    );
  }

  return data.roomCode;
};

export const waitForPartner = async (signal?: AbortSignal): Promise<void> => {
  signal?.throwIfAborted();
  await pause(1400);
  signal?.throwIfAborted();
};
