CREATE OR REPLACE FUNCTION search_events(
  p_query      text    DEFAULT NULL,
  p_categories text[]  DEFAULT NULL,
  p_date_from  timestamptz DEFAULT NULL,
  p_date_to    timestamptz DEFAULT NULL,
  p_lat        float8  DEFAULT NULL,
  p_lng        float8  DEFAULT NULL,
  p_radius_km  float8  DEFAULT NULL
)
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
  WHERE
    (p_query      IS NULL OR e.search_vector @@ to_tsquery('simple', p_query || ':*'))
    AND (p_categories IS NULL OR e.category = ANY(p_categories))
    AND (p_date_from  IS NULL OR e.event_at >= p_date_from)
    AND (p_date_to    IS NULL OR e.event_at <= p_date_to)
    AND (
      p_lat IS NULL OR p_lng IS NULL OR p_radius_km IS NULL
      OR ST_DWithin(
           e.location,
           ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography,
           p_radius_km * 1000
         )
    )
  ORDER BY e.event_at ASC;
$$;

-- Rollback:
-- DROP FUNCTION IF EXISTS search_events(text, text[], timestamptz, timestamptz, float8, float8, float8);
