import { schema } from '@schemas/event-get-friends-attendance';
import { InternalServer } from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { privateProcedure } from '../../core/procedure';

export const eventGetFriendsAttendance = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (_input, { db, user }) => {
    const { data, error } = await db.rpc('get_friend_attendance_pins', {
      calling_user_id: user.id,
    });

    if (error) throw new InternalServer(error.message);

    return {
      code: 200 as const,
      pins: (data ?? []).map((row) => ({
        eventId: row.event_id,
        coordinates: { lat: row.lat, lng: row.lng },
      })),
    };
  },
});
