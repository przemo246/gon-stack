CREATE TABLE event_attendance (
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id   uuid        NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, event_id)
);

CREATE INDEX idx_event_attendance_event_id ON event_attendance (event_id);

ALTER TABLE event_attendance ENABLE ROW LEVEL SECURITY;

-- Friend attendance is exposed only via get_friend_attendance_pins(); direct SELECT is own-rows only
CREATE POLICY attendance_select_own ON event_attendance
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY attendance_insert_own ON event_attendance
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY attendance_delete_own ON event_attendance
  FOR DELETE USING (user_id = auth.uid());

-- Rollback:
-- DROP TABLE IF EXISTS event_attendance;
