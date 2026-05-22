CREATE OR REPLACE FUNCTION get_event_by_id(p_id uuid)
RETURNS TABLE (
  id                uuid,
  created_by        uuid,
  name              text,
  category          text,
  event_at          timestamptz,
  address           text,
  lat               float8,
  lng               float8,
  description       text,
  external_link     text,
  image_url         text,
  organizer_name    text,
  organizer_contact text,
  keywords          text[],
  created_at        timestamptz,
  updated_at        timestamptz
)
LANGUAGE sql STABLE SECURITY INVOKER AS $$
  SELECT
    e.id,
    e.created_by,
    e.name,
    e.category,
    e.event_at,
    e.address,
    ST_Y(e.location::geometry) AS lat,
    ST_X(e.location::geometry) AS lng,
    e.description,
    e.external_link,
    e.image_url,
    e.organizer_name,
    e.organizer_contact,
    e.keywords,
    e.created_at,
    e.updated_at
  FROM events e
  WHERE e.id = p_id;
$$;

-- Rollback:
-- DROP FUNCTION IF EXISTS get_event_by_id(uuid);
