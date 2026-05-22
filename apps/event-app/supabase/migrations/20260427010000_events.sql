CREATE TABLE events (
  id                uuid                   PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by        uuid                   NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name              text                   NOT NULL,
  category          text                   NOT NULL
                    CHECK (category IN ('Concert', 'Festival', 'Sports', 'Culture', 'Theatre', 'Food & Drink')),
  event_at          timestamptz            NOT NULL,
  address           text                   NOT NULL,
  location          geography(Point, 4326) NOT NULL,
  description       text,
  external_link     text,
  image_url         text,
  organizer_name    text,
  organizer_contact text,
  keywords          text[]                 NOT NULL DEFAULT '{}',
  search_vector     tsvector,
  created_at        timestamptz            NOT NULL DEFAULT now(),
  updated_at        timestamptz            NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION events_search_vector_update()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.search_vector :=
    to_tsvector('simple', coalesce(NEW.name, ''))
    || to_tsvector('simple', coalesce(NEW.address, ''))
    || to_tsvector('simple', array_to_string(NEW.keywords, ' '));
  RETURN NEW;
END;
$$;

CREATE TRIGGER events_search_vector_trigger
BEFORE INSERT OR UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION events_search_vector_update();

CREATE TRIGGER events_updated_at
BEFORE UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX idx_events_search_vector ON events USING GIN (search_vector);
CREATE INDEX idx_events_location      ON events USING GIST (location);
CREATE INDEX idx_events_category      ON events (category);
CREATE INDEX idx_events_event_at      ON events (event_at);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY events_select_public ON events
  FOR SELECT USING (true);

CREATE POLICY events_insert_auth ON events
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY events_update_owner_or_admin ON events
  FOR UPDATE USING (created_by = auth.uid() OR is_admin());

CREATE POLICY events_delete_owner_or_admin ON events
  FOR DELETE USING (created_by = auth.uid() OR is_admin());

-- Rollback:
-- DROP POLICY IF EXISTS events_delete_owner_or_admin ON events;
-- DROP POLICY IF EXISTS events_update_owner_or_admin ON events;
-- DROP POLICY IF EXISTS events_insert_auth ON events;
-- DROP POLICY IF EXISTS events_select_public ON events;
-- DROP TRIGGER IF EXISTS events_updated_at ON events;
-- DROP TRIGGER IF EXISTS events_search_vector_trigger ON events;
-- DROP FUNCTION IF EXISTS events_search_vector_update();
-- DROP TABLE IF EXISTS events;
