import { useEffect, useRef, useState, useCallback } from 'react';
import type { Map as LeafletMap, Marker as LeafletMarker } from 'leaflet';
import { Search, Crosshair, X, Loader2, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/libs/ui/button';
import {
  searchLocations,
  reverseGeocode,
} from '../../../integration/repository';
import type { GeoResult } from '../../../contracts/models';

// Warsaw — a sensible default center when the form has no location yet.
const DEFAULT_CENTER = { lat: 52.2297, lng: 21.0122 };

const PIN_SVG = `<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 0C7.16 0 0 7.16 0 16c0 11 16 26 16 26s16-15 16-26C32 7.16 24.84 0 16 0z" fill="#ff7759"/>
  <circle cx="16" cy="16" r="6" fill="#ffffff"/>
</svg>`;

export type LocationPick = GeoResult;

type Props = {
  /** Current form coordinates, used to center the map on open. */
  initial: { lat: number; lng: number } | null;
  /** Place name already in the form, prefilled into the name field. */
  initialName: string;
  onClose: () => void;
  onSave: (pick: LocationPick) => void;
};

export const LocationMapModal = ({
  initial,
  initialName,
  onClose,
  onSave,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);

  const [pos, setPos] = useState(initial ?? DEFAULT_CENTER);
  const [name, setName] = useState(initialName);
  const [parts, setParts] = useState<
    Pick<GeoResult, 'street' | 'number' | 'postalCode' | 'city' | 'displayName'>
  >({ displayName: '' });

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoResult[]>([]);
  const [searching, setSearching] = useState(false);

  // Reverse-geocode a point and adopt its address parts + name. Coordinates stay
  // exactly where the user put the pin — only the labels come from the geocoder.
  const adoptPoint = useCallback(async (lat: number, lng: number) => {
    const ctrl = new AbortController();
    try {
      const r = await reverseGeocode(lat, lng, ctrl.signal);
      if (!r) return;
      setParts({
        street: r.street,
        number: r.number,
        postalCode: r.postalCode,
        city: r.city,
        displayName: r.displayName,
      });
      if (r.name) setName(r.name);
    } catch {
      /* leave existing labels; the pin position is what matters */
    }
  }, []);

  const moveTo = useCallback((lat: number, lng: number) => {
    setPos({ lat, lng });
    mapRef.current?.setView([lat, lng]);
    markerRef.current?.setLatLng([lat, lng]);
  }, []);

  // Initialise the Leaflet map once. Leaflet touches `window`, so import it
  // dynamically inside the effect (Astro SSR safety).
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const L = await import('leaflet');
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [pos.lat, pos.lng],
        zoom: 14,
      });
      mapRef.current = map;

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '© OpenStreetMap · © CARTO',
          subdomains: 'abcd',
          maxZoom: 20,
        },
      ).addTo(map);

      const icon = L.divIcon({
        className: 'event-map-pin',
        html: PIN_SVG,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
      });

      const marker = L.marker([pos.lat, pos.lng], {
        icon,
        draggable: true,
      }).addTo(map);
      markerRef.current = marker;

      marker.on('dragend', () => {
        const { lat, lng } = marker.getLatLng();
        setPos({ lat, lng });
        void adoptPoint(lat, lng);
      });

      map.on('click', (e: { latlng: { lat: number; lng: number } }) => {
        const { lat, lng } = e.latlng;
        moveTo(lat, lng);
        void adoptPoint(lat, lng);
      });
    };

    void init();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // Init once; subsequent position changes are pushed imperatively.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const runSearch = async () => {
    const q = query.trim();
    if (!q) return;
    setSearching(true);
    const ctrl = new AbortController();
    try {
      setResults(await searchLocations(q, ctrl.signal));
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const pickResult = (r: GeoResult) => {
    moveTo(r.lat, r.lng);
    setParts({
      street: r.street,
      number: r.number,
      postalCode: r.postalCode,
      city: r.city,
      displayName: r.displayName,
    });
    if (r.name) setName(r.name);
    setResults([]);
    setQuery('');
  };

  const locateMe = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((p) => {
      const { latitude, longitude } = p.coords;
      moveTo(latitude, longitude);
      void adoptPoint(latitude, longitude);
    });
  };

  const handleSave = () => {
    onSave({
      name: name.trim(),
      street: parts.street,
      number: parts.number,
      postalCode: parts.postalCode,
      city: parts.city,
      lat: pos.lat,
      lng: pos.lng,
      displayName: parts.displayName,
    });
  };

  const canSave = !!name.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-xl rounded-lg bg-canvas shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline">
          <h3 className="subsection-heading text-ink">Znajdź lokalizację</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-ink transition-colors"
            aria-label="Zamknij"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6 overflow-y-auto">
          <p className="text-sm text-body-muted">
            Szukaj według miejscowości, dzielnicy lub nazwy miejsca, albo
            przeciągnij pinezkę na mapie.
          </p>

          {/* Search */}
          <div className="relative">
            <div className="flex items-center gap-2 rounded-xs border border-hairline bg-canvas px-4 py-3 focus-within:border-primary transition-colors">
              {searching ? (
                <Loader2 size={16} className="animate-spin text-muted" />
              ) : (
                <Search size={16} className="text-muted" />
              )}
              <input
                type="text"
                value={query}
                placeholder="Szukaj"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    void runSearch();
                  }
                }}
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              />
            </div>
            {results.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full rounded-xs border border-hairline bg-canvas shadow-lg max-h-56 overflow-y-auto">
                {results.map((r, i) => (
                  <li key={`${r.lat},${r.lng},${i}`}>
                    <button
                      type="button"
                      onClick={() => pickResult(r)}
                      className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm hover:bg-surface transition-colors"
                    >
                      <MapPin
                        size={14}
                        className="mt-0.5 shrink-0 text-coral"
                      />
                      <span>
                        <span className="text-ink">{r.name}</span>
                        <span className="block text-xs text-muted">
                          {r.displayName}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Map */}
          <div className="relative">
            <div
              ref={containerRef}
              className="event-map h-72 w-full rounded-[14px] overflow-hidden border border-border-light z-0"
            />
            <button
              type="button"
              onClick={locateMe}
              className="absolute right-3 top-3 z-[400] rounded-full bg-canvas border border-hairline p-2 text-ink shadow-md hover:text-coral transition-colors"
              aria-label="Moja lokalizacja"
            >
              <Crosshair size={16} />
            </button>
          </div>

          {/* Coordinates readout */}
          <div className="flex items-center gap-2 text-sm text-body-muted">
            <MapPin size={14} className="text-coral" />
            Lokalizacja: {pos.lat.toFixed(6)}, {pos.lng.toFixed(6)}
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="modal-location-name"
              className="text-xs font-medium uppercase tracking-wide text-muted"
            >
              Nazwa lokalizacji
            </label>
            <input
              id="modal-location-name"
              type="text"
              value={name}
              placeholder="np. Polana nad jeziorem"
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xs border border-hairline bg-canvas px-4 py-3 text-sm text-ink outline-none focus:border-primary transition-colors placeholder:text-muted"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-hairline">
          <Button variant="ghost" type="button" onClick={onClose}>
            Anuluj
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSave}
            disabled={!canSave}
          >
            Zapisz
          </Button>
        </div>
      </div>
    </div>
  );
};
