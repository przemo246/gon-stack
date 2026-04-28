import { schema } from '@schemas/leave-room';
import { InternalServer, NotFound } from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { privateProcedure } from '../../core/procedure';

export const leaveRoom = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async ({ roomCode }, { db, user }) => {
    const normalizedCode = roomCode.trim().toUpperCase();
    const userId = user.id;

    const roomResult = await db
      .from('rooms')
      .select('id, code, host_user_id, status')
      .eq('code', normalizedCode)
      .single();

    if (roomResult.error) {
      if (roomResult.error.code === 'PGRST116') {
        throw new NotFound('Room not found. Check the code and try again.');
      }

      throw new InternalServer(roomResult.error.message);
    }

    const room = roomResult.data;
    const participantResult = await db
      .from('room_participants')
      .select('room_id, role')
      .eq('room_id', room.id)
      .eq('user_id', userId)
      .is('left_at', null)
      .maybeSingle();

    if (participantResult.error) {
      throw new InternalServer(participantResult.error.message);
    }

    if (!participantResult.data) {
      throw new NotFound('You are not an active participant of this room.');
    }

    const leaveResult = await db
      .from('room_participants')
      .update({
        left_at: new Date().toISOString(),
        is_ready: false,
      })
      .eq('room_id', room.id)
      .eq('user_id', userId)
      .is('left_at', null);

    if (leaveResult.error) {
      throw new InternalServer(leaveResult.error.message);
    }

    if (room.host_user_id === userId && room.status !== 'cancelled') {
      const cancelRoom = await db
        .from('rooms')
        .update({
          status: 'cancelled',
          ended_at: new Date().toISOString(),
        })
        .eq('id', room.id);

      if (cancelRoom.error) {
        throw new InternalServer(cancelRoom.error.message);
      }
    }

    return {
      code: 200,
      roomId: room.id,
      roomCode: room.code,
    };
  },
});
