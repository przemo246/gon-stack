import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';

type Coordinates = { lat: number; lng: number };

type MapProps = {
  /** Known coordinates. When omitted/invalid, the component geocodes `address`. */
  coordinates?: Partial<Coordinates>;
  /** Human-readable address used for geocoding fallback and the marker popup. */
  address?: string;
  /** Short label shown in the marker popup (e.g. the city). */
  label?: string;
  zoom?: number;
  className?: string;
};

const isValidCoord = (c?: Partial<Coordinates>): c is Coordinates =>
  !!c &&
  typeof c.lat === 'number' &&
  typeof c.lng === 'number' &&
  Number.isFinite(c.lat) &&
  Number.isFinite(c.lng) &&
  (c.lat !== 0 || c.lng !== 0);

/** Geocode a free-form address to coordinates via OpenStreetMap Nominatim. */
const geocode = async (
  address: string,
  signal: AbortSignal,
): Promise<Coordinates | null> => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
    address,
  )}`;
  const res = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as Array<{ lat: string; lon: string }>;
  if (!data.length) return null;
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
};

/**
 * Leaflet-backed map showing a single location pin for an event.
 *
 * Leaflet touches `window` on import, so it is loaded dynamically inside an
 * effect — this keeps the component safe under Astro's SSR (`client:load`).
 */
export const Map = ({
  coordinates,
  address,
  label,
  zoom = 14,
  className,
}: MapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const init = async () => {
      const point = isValidCoord(coordinates)
        ? coordinates
        : address
          ? await geocode(address, controller.signal).catch(() => null)
          : null;

      if (cancelled) return;
      if (!point) {
        setError('Nie udało się ustalić lokalizacji.');
        return;
      }
      setError(null);

      const L = await import('leaflet');
      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        center: [point.lat, point.lng],
        zoom,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      // CartoDB Positron — a minimal, light basemap that suits the app's
      // clean aesthetic. Free and key-less. `{r}` serves retina tiles.
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '© OpenStreetMap · © CARTO',
          subdomains: 'abcd',
          maxZoom: 20,
        },
      ).addTo(map);

      // Coral teardrop pin rendered as an SVG divIcon — avoids the broken
      // default-marker asset paths under bundlers and matches the theme.
      const icon = L.divIcon({
        className: 'event-map-pin',
        html: `<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.16 0 0 7.16 0 16c0 11 16 26 16 26s16-15 16-26C32 7.16 24.84 0 16 0z" fill="#ff7759"/>
          <circle cx="16" cy="16" r="6" fill="#ffffff"/>
        </svg>`,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -38],
      });

      const marker = L.marker([point.lat, point.lng], { icon }).addTo(map);
      const popupText = [label, address].filter(Boolean).join(' · ');
      if (popupText) marker.bindPopup(popupText);
    };

    init();

    return () => {
      cancelled = true;
      controller.abort();
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // Depend on the primitive coords (not the object) so a new object
    // identity on each render doesn't needlessly re-initialise the map.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates?.lat, coordinates?.lng, address, label, zoom]);

  if (error) {
    return (
      <div
        className={
          className ??
          'flex items-center justify-center bg-surface border border-border-light rounded-[18px] aspect-4/3 text-sm text-body-muted'
        }
      >
        {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`event-map ${
        className ??
        'bg-surface border border-border-light rounded-[18px] overflow-hidden aspect-4/3 z-0'
      }`}
    />
  );
};
