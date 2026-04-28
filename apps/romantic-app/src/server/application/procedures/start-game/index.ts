import { schema } from '@schemas/start-game';
import {
  BadRequest,
  Forbidden,
  InternalServer,
  NotFound,
} from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { privateProcedure } from '../../core/procedure';
import { questionsRandomizer } from './questions-randomizer';

const STARTABLE_ROOM_STATUSES = ['waiting', 'ready'] as const;
const ACTIVE_GAME_STATUSES = ['pending', 'active', 'paused'] as const;
const MINIMUM_SEEDED_QUESTIONS = 6;

export const startGame = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async ({ roomCode }, { db, user }) => {
    const normalizedCode = roomCode.trim().toUpperCase();
    const userId = user.id;

    const roomResult = await db
      .from('rooms')
      .select('id, code, host_user_id, status, min_players, target_score')
      .eq('code', normalizedCode)
      .single();

    if (roomResult.error) {
      if (roomResult.error.code === 'PGRST116') {
        throw new NotFound('Room not found. Check the code and try again.');
      }

      throw new InternalServer(roomResult.error.message);
    }

    const room = roomResult.data;

    if (room.host_user_id !== userId) {
      throw new Forbidden('Only the room host can start the game.');
    }

    if (!STARTABLE_ROOM_STATUSES.some((status) => status === room.status)) {
      throw new BadRequest(
        'Game can be started only from waiting or ready room.',
      );
    }

    const activeParticipants = await db
      .from('room_participants')
      .select('user_id')
      .eq('room_id', room.id)
      .is('left_at', null);

    if (activeParticipants.error) {
      throw new InternalServer(activeParticipants.error.message);
    }

    if (activeParticipants.data.length < room.min_players) {
      throw new BadRequest('Not enough players to start the game.');
    }

    const existingGame = await db
      .from('games')
      .select('id, status')
      .eq('room_id', room.id)
      .in('status', [...ACTIVE_GAME_STATUSES])
      .maybeSingle();

    if (existingGame.error) {
      throw new InternalServer(existingGame.error.message);
    }

    if (existingGame.data) {
      throw new BadRequest('There is already an active game for this room.');
    }

    const availableQuestions = await db
      .from('quiz_questions')
      .select('id, difficulty')
      .eq('is_active', true);

    if (availableQuestions.error) {
      throw new InternalServer(availableQuestions.error.message);
    }

    if (availableQuestions.data.length < MINIMUM_SEEDED_QUESTIONS) {
      throw new BadRequest(
        'Not enough active quiz questions configured to start the game.',
      );
    }

    const gameInsert = await db
      .from('games')
      .insert({
        room_id: room.id,
        created_by_user_id: userId,
        status: 'active',
        started_at: new Date().toISOString(),
        target_score: room.target_score,
      })
      .select('id')
      .single();

    if (gameInsert.error) {
      throw new InternalServer(gameInsert.error.message);
    }

    const gameParticipantsPayload = activeParticipants.data.map(
      (participant) => ({
        game_id: gameInsert.data.id,
        user_id: participant.user_id,
      }),
    );

    const participantsInsert = await db
      .from('game_participants')
      .insert(gameParticipantsPayload);

    if (participantsInsert.error) {
      await db.from('games').delete().eq('id', gameInsert.data.id);
      throw new InternalServer(participantsInsert.error.message);
    }

    const randomizedQuestions = questionsRandomizer(
      'auto',
      availableQuestions.data,
    );

    if (randomizedQuestions.length === 0) {
      await db.from('games').delete().eq('id', gameInsert.data.id);
      throw new InternalServer(
        'Could not assign quiz questions for this game.',
      );
    }

    const gameQuestionsInsert = await db.from('game_questions').insert(
      randomizedQuestions.map((question, index) => {
        const status = index === 0 ? ('open' as const) : ('pending' as const);

        return {
          game_id: gameInsert.data.id,
          question_id: question.questionId,
          ordinal: question.ordinal,
          status,
          time_limit_sec: question.timeLimitSec,
          opened_at: index === 0 ? new Date().toISOString() : null,
        };
      }),
    );

    if (gameQuestionsInsert.error) {
      await db.from('games').delete().eq('id', gameInsert.data.id);
      throw new InternalServer(gameQuestionsInsert.error.message);
    }

    const roomStart = await db
      .from('rooms')
      .update({
        status: 'active',
        started_at: new Date().toISOString(),
      })
      .eq('id', room.id);

    if (roomStart.error) {
      await db.from('games').delete().eq('id', gameInsert.data.id);
      throw new InternalServer(roomStart.error.message);
    }

    return {
      code: 201,
      gameId: gameInsert.data.id,
      roomId: room.id,
      roomCode: room.code,
      status: 'active' as const,
    };
  },
});
