import { schema } from '@schemas/join-room';
import {
  BadRequest,
  InternalServer,
  NotFound,
} from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { privateProcedure } from '../../core/procedure';

const UNAVAILABLE_ROOM_STATUSES = ['cancelled', 'expired', 'finished'] as const;

export const joinRoom = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async ({ roomCode }, { db, user }) => {
    const normalizedCode = roomCode.trim().toUpperCase();
    const userId = user.id;

    const roomResult = await db
      .from('rooms')
      .select('id, code, status, max_players, expires_at')
      .eq('code', normalizedCode)
      .single();

    if (roomResult.error) {
      if (roomResult.error.code === 'PGRST116') {
        throw new NotFound('Room not found. Check the code and try again.');
      }

      throw new InternalServer(roomResult.error.message);
    }

    const room = roomResult.data;
    const roomExpired = new Date(room.expires_at).getTime() <= Date.now();

    if (
      roomExpired ||
      UNAVAILABLE_ROOM_STATUSES.some((status) => status === room.status)
    ) {
      throw new BadRequest(
        'Room is not available. Create a new room or use another code.',
      );
    }

    const existingMembership = await db
      .from('room_participants')
      .select('user_id')
      .eq('room_id', room.id)
      .eq('user_id', userId)
      .is('left_at', null)
      .maybeSingle();

    if (existingMembership.error) {
      throw new InternalServer(existingMembership.error.message);
    }

    if (existingMembership.data) {
      return {
        code: 200,
        roomId: room.id,
        roomCode: room.code,
      };
    }

    const participantsCount = await db
      .from('room_participants')
      .select('user_id', { count: 'exact', head: true })
      .eq('room_id', room.id)
      .is('left_at', null);

    if (participantsCount.error) {
      throw new InternalServer(participantsCount.error.message);
    }

    if ((participantsCount.count ?? 0) >= room.max_players) {
      throw new BadRequest(
        'Room is not available. Create a new room or use another code.',
      );
    }

    const insertParticipant = await db.from('room_participants').insert({
      room_id: room.id,
      user_id: userId,
      role: 'player',
    });

    if (insertParticipant.error) {
      throw new InternalServer(insertParticipant.error.message);
    }

    return {
      code: 200,
      roomId: room.id,
      roomCode: room.code,
    };
  },
});
