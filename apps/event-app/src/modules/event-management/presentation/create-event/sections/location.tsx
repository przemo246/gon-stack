import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MapPin, Loader2, Search, Map as MapIcon } from 'lucide-react';
import { type FormValues } from '../schema';
import type { GeoResult } from '../../../contracts/models';
import { Field, inputCls } from '../field';
import { useContext } from '../../context';
import { LocationMapModal, type LocationPick } from './location-map-modal';

// ── Helpers ──────────────────────────────────────────────────────────────────

const formatPostalCode = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 5);
  return digits.length > 2
    ? `${digits.slice(0, 2)}-${digits.slice(2)}`
    : digits;
};

// ── Component ──────────────────────────────────────────────────────────────────

export const LocationSection = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<FormValues>();
  const { trigger, $geoResults, $geoStatus, $coordinates } = useContext();

  const results = $geoResults.use();
  const geoStatus = $geoStatus.use();
  const coordinates = $coordinates.use();

  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const postalCode = register('address.postalCode');

  // Adopt a chosen location: coordinates are the source of truth (set via the
  // store), the structured fields are filled where the result provides them.
  const applyLocation = (r: GeoResult | LocationPick) => {
    setValue('address.name', r.name, { shouldValidate: true });
    setValue('address.street', r.street ?? '');
    setValue('address.number', r.number ?? '');
    if (r.postalCode)
      setValue('address.postalCode', r.postalCode, { shouldValidate: true });
    if (r.city) setValue('address.city', r.city, { shouldValidate: true });
    trigger('[TRIGGER]_SELECT_LOCATION', {
      coordinates: { lat: r.lat, lng: r.lng },
    });
  };

  const runSearch = () => {
    const q = query.trim();
    if (q) trigger('[TRIGGER]_SEARCH_LOCATION', { query: q });
  };

  return (
    <section id="location" className="flex flex-col gap-6 scroll-mt-20">
      <div className="flex items-baseline gap-3 pb-4 border-b border-hairline">
        <span className="mono-label">03</span>
        <h2 className="subsection-heading text-ink">Lokalizacja</h2>
      </div>

      {/* Search + map-pin button */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="flex items-center gap-2 rounded-xs border border-hairline bg-canvas px-4 py-3 focus-within:border-primary transition-colors">
              {geoStatus === 'loading' ? (
                <Loader2 size={16} className="animate-spin text-muted" />
              ) : (
                <Search size={16} className="text-muted" />
              )}
              <input
                type="text"
                value={query}
                placeholder="Szukaj miejsca lub adresu…"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    runSearch();
                  }
                }}
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              />
            </div>
            {results.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full rounded-xs border border-hairline bg-canvas shadow-lg max-h-64 overflow-y-auto">
                {results.map((r, i) => (
                  <li key={`${r.lat},${r.lng},${i}`}>
                    <button
                      type="button"
                      onClick={() => {
                        applyLocation(r);
                        setQuery(r.name);
                      }}
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
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-xs border border-border-dark px-4 text-sm text-ink hover:border-ink transition-colors whitespace-nowrap"
          >
            <MapIcon size={16} />
            Mapa
          </button>
        </div>
        {geoStatus === 'error' && results.length === 0 && (
          <p className="text-xs text-coral">
            Nie znaleziono lokalizacji. Spróbuj inaczej lub użyj mapy.
          </p>
        )}
      </div>

      {/* Place name */}
      <Field
        label="Nazwa miejsca"
        error={errors.address?.name?.message}
        htmlFor="placeName"
      >
        <input
          id="placeName"
          type="text"
          placeholder="np. Park Jordana"
          {...register('address.name')}
          className={inputCls(!!errors.address?.name)}
        />
      </Field>

      {/* City + postal code (always required, editable) */}
      <div className="grid grid-cols-[1fr_140px] gap-3">
        <Field
          label="Miasto"
          error={errors.address?.city?.message}
          htmlFor="city"
        >
          <input
            id="city"
            type="text"
            placeholder="np. Kraków"
            {...register('address.city')}
            className={inputCls(!!errors.address?.city)}
          />
        </Field>
        <Field
          label="Kod pocztowy"
          error={errors.address?.postalCode?.message}
          htmlFor="postalCode"
        >
          <input
            id="postalCode"
            type="text"
            inputMode="numeric"
            placeholder="00-000"
            {...postalCode}
            onChange={(e) => {
              e.target.value = formatPostalCode(e.target.value);
              postalCode.onChange(e);
            }}
            className={inputCls(!!errors.address?.postalCode)}
          />
        </Field>
      </div>

      {/* Confirmed coordinates */}
      {coordinates && (
        <div className="flex items-center gap-2 text-sm text-[#2d8a4e]">
          <MapPin size={14} />
          Lokalizacja ustawiona ({coordinates.lat.toFixed(4)},{' '}
          {coordinates.lng.toFixed(4)})
        </div>
      )}

      {modalOpen && (
        <LocationMapModal
          initial={coordinates}
          initialName={getValues('address.name') ?? ''}
          onClose={() => setModalOpen(false)}
          onSave={(pick) => {
            applyLocation(pick);
            setQuery(pick.name);
            setModalOpen(false);
          }}
        />
      )}
    </section>
  );
};
