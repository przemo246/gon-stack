import type { Schema as CreateRoomSchema } from '@/shared/server-contracts/schemas/create-room';

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
  signal?.throwIfAborted();
  await pause(700);
  signal?.throwIfAborted();

  const code = roomCode.trim().toUpperCase();

  if (!/^[A-Z0-9]{6}$/.test(code)) {
    throw new Error('Room Code Is Invalid. Check the Code and Try Again.');
  }

  if (code === 'FULL00') {
    throw new Error(
      'Room Is Not Available. Create a New Room or Use Another Code.',
    );
  }

  return code;
};

export const waitForPartner = async (signal?: AbortSignal): Promise<void> => {
  signal?.throwIfAborted();
  await pause(1400);
  signal?.throwIfAborted();
};
