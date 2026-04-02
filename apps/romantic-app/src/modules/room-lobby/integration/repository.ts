const pause = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const randomCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('');
};

export const createRoom = async (signal?: AbortSignal): Promise<string> => {
  signal?.throwIfAborted();
  await pause(700);
  signal?.throwIfAborted();
  return randomCode();
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
