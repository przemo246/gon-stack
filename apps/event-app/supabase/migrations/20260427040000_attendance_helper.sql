-- SECURITY DEFINER bypasses RLS to read friendships + event_attendance across user boundaries
-- Called by the API layer for event.getFriendsAttendance; never exposed directly as a public endpoint
CREATE OR REPLACE FUNCTION get_friend_attendance_pins(calling_user_id uuid)
RETURNS TABLE (event_id uuid, lat float8, lng float8)
LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT DISTINCT
    ea.event_id,
    ST_Y(e.location::geometry) AS lat,
    ST_X(e.location::geometry) AS lng
  FROM event_attendance ea
  JOIN events e ON e.id = ea.event_id
  WHERE ea.user_id IN (
    SELECT friend_id FROM friendships WHERE user_id   = calling_user_id
    UNION
    SELECT user_id   FROM friendships WHERE friend_id = calling_user_id
  );
$$;

-- Rollback:
-- DROP FUNCTION IF EXISTS get_friend_attendance_pins(uuid);
