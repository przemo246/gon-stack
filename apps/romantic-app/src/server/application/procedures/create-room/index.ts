import { schema } from '@schemas/create-room';
import { InternalServer } from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { privateProcedure } from '../../core/procedure';

const ROOM_CODE_LENGTH = 6;
const ROOM_CODE_ATTEMPTS = 8;
const ROOM_CODE_CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const generateRoomCode = (): string => {
  return Array.from({ length: ROOM_CODE_LENGTH }, () => {
    const randomIndex = Math.floor(Math.random() * ROOM_CODE_CHARSET.length);
    return ROOM_CODE_CHARSET[randomIndex];
  }).join('');
};

export const createRoom = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (_input, { db, user }) => {
    const userId = user.id;

    for (let attempt = 0; attempt < ROOM_CODE_ATTEMPTS; attempt++) {
      const code = generateRoomCode();

      const roomInsert = await db
        .from('rooms')
        .insert({
          code,
          host_user_id: userId,
        })
        .select('id, code')
        .single();

      if (roomInsert.error) {
        if (roomInsert.error.code === '23505') {
          continue;
        }

        throw new InternalServer(roomInsert.error.message);
      }

      const participantInsert = await db.from('room_participants').insert({
        room_id: roomInsert.data.id,
        user_id: userId,
        role: 'host',
      });

      if (participantInsert.error) {
        await db.from('rooms').delete().eq('id', roomInsert.data.id);
        throw new InternalServer(participantInsert.error.message);
      }

      return {
        code: 201,
        roomId: roomInsert.data.id,
        roomCode: roomInsert.data.code,
      };
    }

    throw new InternalServer('Could not create room. Please try again.');
  },
});
