-- Assumption: application layer inserts both (A→B) and (B→A) rows atomically; bidirectional by convention
CREATE TABLE friendships (
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  friend_id  uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, friend_id),
  CHECK (user_id <> friend_id)
);

CREATE INDEX idx_friendships_friend_id ON friendships (friend_id);

ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;

CREATE POLICY friendships_select_own ON friendships
  FOR SELECT USING (user_id = auth.uid() OR friend_id = auth.uid());

CREATE POLICY friendships_insert_own ON friendships
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY friendships_delete_own ON friendships
  FOR DELETE USING (user_id = auth.uid());

-- Rollback:
-- DROP TABLE IF EXISTS friendships;
