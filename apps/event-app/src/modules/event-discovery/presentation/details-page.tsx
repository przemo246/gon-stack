import { useState } from 'react';
import { Button } from '@/libs/ui/button';
import { Text } from '@/libs/ui/text';
import { Poster } from './poster';
import { Map } from './map';
import { EventCard } from './event-card';
import { IconBack, IconHeart, IconShare, IconCheck } from './icons';
import {
  POSTER_PALETTES,
  fmtDate,
  fmtDayNum,
  fmtMonthShort,
  fmtDayName,
} from './mock-data';
import type { Event, EventDetails } from '../contracts/models';
import { eventCategoryLabel } from '@/shared/event-categories';

const dateOnly = (iso: string) => iso.split('T')[0];
const timeOnly = (iso: string) => iso.split('T')[1]?.substring(0, 5) ?? '';

type DetailsPageProps = {
  event: EventDetails;
  allEvents: Event[];
  onBack: () => void;
  onOpenEvent: (event: Event) => void;
  onToggleSave: (id: string) => void;
  savedSet: Set<string>;
};

export const DetailsPage = ({
  event,
  allEvents,
  onBack,
  onOpenEvent,
  onToggleSave,
  savedSet,
}: DetailsPageProps) => {
  const [going, setGoing] = useState(false);
  // Random palette for the poster fallback, picked once and kept stable across
  // re-renders so it doesn't flicker on every state change.
  const [fallbackPalette] = useState(() =>
    Math.floor(Math.random() * POSTER_PALETTES.length),
  );
  const saved = savedSet.has(event.id);

  const date = dateOnly(event.startDateTime);
  const endDate = event.endDateTime ? dateOnly(event.endDateTime) : undefined;
  const time = timeOnly(event.startDateTime);
  // The place name is the primary label; the street line is shown only when the
  // location actually has one (parks, fields, lakes do not).
  const streetLine = [event.address.street, event.address.number]
    .filter(Boolean)
    .join(' ');
  const venue = event.address.name;
  const fullAddress = [
    streetLine,
    `${event.address.postalCode} ${event.address.city}`,
  ]
    .filter(Boolean)
    .join(', ');
  const posterTitle = event.name;
  const posterMeta = `${event.address.city.toUpperCase()} · ${fmtDate(date).toUpperCase()}`;
  const categoryDisplayLabel = eventCategoryLabel(event.category);

  const similar = allEvents
    .filter((e) => e.id !== event.id && e.category === event.category)
    .slice(0, 3);

  return (
    <section className="px-8 pt-8 pb-16 max-w-7xl mx-auto">
      <button
        className="bg-transparent border-0 text-ink p-0 inline-flex items-center gap-2 text-sm mb-6 hover:text-coral transition-colors"
        onClick={onBack}
      >
        <IconBack size={14} /> <span>Powrót do wyników</span>
      </button>

      {/* Hero block */}
      <div className="grid gap-12 items-stretch bg-surface rounded-lg p-8 mb-8 grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[18px] overflow-hidden aspect-3/4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] bg-soft-stone">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <Poster
              palette={fallbackPalette}
              posterTitle={posterTitle}
              posterMeta={posterMeta}
              size="lg"
            />
          )}
        </div>
        <div className="flex flex-col gap-5 py-3">
          <Text.MonoLabel>
            {categoryDisplayLabel.toUpperCase()} ·{' '}
            {event.address.city.toUpperCase()}
          </Text.MonoLabel>
          <Text.PageHeading className="m-0">{event.name}</Text.PageHeading>

          {/* When / where */}
          <div className="grid grid-cols-2 gap-6 border-t border-b border-hairline py-5">
            <div className="flex flex-col gap-1.5">
              <Text.MonoLabel>DATA</Text.MonoLabel>
              <Text.DateDisplay as="div">
                {fmtDayNum(date)}{' '}
                <span className="font-mono text-base tracking-[0.16em] text-coral">
                  {fmtMonthShort(date)}
                </span>
                {endDate && (
                  <>
                    {' '}
                    — {fmtDayNum(endDate)}{' '}
                    <span className="font-mono text-base tracking-[0.16em] text-coral">
                      {fmtMonthShort(endDate)}
                    </span>
                  </>
                )}
              </Text.DateDisplay>
              <div className="text-sm text-body-muted">
                {fmtDayName(date)}, godz. {time}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Text.MonoLabel>MIEJSCE</Text.MonoLabel>
              <Text.SubsectionHeading as="div">{venue}</Text.SubsectionHeading>
              <div className="text-sm text-body-muted">
                {event.address.city}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 flex-wrap">
            <Button
              variant="primary"
              className={going ? 'bg-deep-green text-white' : undefined}
              onClick={() => setGoing((g) => !g)}
            >
              {going ? (
                <>
                  <IconCheck size={14} /> Idziesz
                </>
              ) : (
                <>Idę na to wydarzenie</>
              )}
            </Button>
            <Button
              variant="secondary"
              className={saved ? 'text-coral border-coral' : undefined}
              onClick={() => onToggleSave(event.id)}
            >
              <IconHeart fill={saved ? 'currentColor' : 'none'} size={14} />
              {saved ? 'Zapisane' : 'Zapisz'}
            </Button>
            <Button variant="secondary">
              <IconShare size={14} /> Udostępnij
            </Button>
          </div>

          {going && (
            <div className="flex gap-3 items-center bg-pale-green rounded-xl px-4 py-3 text-deep-green text-sm">
              <Text.MonoLabel className="text-deep-green">
                POTWIERDZENIE
              </Text.MonoLabel>
              <div>Świetnie. Powiadomimy cię na 24h przed startem.</div>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="grid gap-12 mb-12 grid-cols-[1.6fr_0.9fr]">
        <div>
          {event.description && (
            <section className="mb-10">
              <Text.MonoLabel>O WYDARZENIU</Text.MonoLabel>
              <p className="text-[19px] leading-relaxed text-ink mt-3">
                {event.description}
              </p>
            </section>
          )}

          <section className="mb-10">
            <Text.MonoLabel>LOKALIZACJA</Text.MonoLabel>
            <Text.SubsectionHeading className="mt-2 mb-4">
              {venue}, {event.address.city}
            </Text.SubsectionHeading>
            <Map
              coordinates={event.coordinates}
              address={fullAddress}
              label={event.address.city}
            />
            <div className="grid grid-cols-3 gap-6 mt-4 pt-4 border-t border-hairline">
              <div className="flex flex-col gap-1 text-sm">
                <Text.MonoLabel>WSPÓŁRZĘDNE</Text.MonoLabel>
                <div className="font-mono text-[13px]">
                  {event.coordinates.lat.toFixed(4)}° N ·{' '}
                  {event.coordinates.lng.toFixed(4)}° E
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside>
          <div className="bg-card-bg border border-border-light rounded-md p-5 mb-4">
            <Text.MonoLabel>SZCZEGÓŁY</Text.MonoLabel>
            <ul className="list-none p-0 mt-3 m-0 flex flex-col gap-0">
              {[
                ['Kategoria', categoryDisplayLabel],
                ['Miasto', event.address.city],
                ['Miejsce', venue],
                [
                  'Data',
                  fmtDate(date) + (endDate ? ` – ${fmtDate(endDate)}` : ''),
                ],
                ['Godzina', time],
                ['Uczestników', String(event.attendeeCount)],
              ].map(([label, val]) => (
                <li
                  key={label}
                  className="flex justify-between gap-4 py-2.5 border-b border-hairline last:border-0 text-sm"
                >
                  <span className="text-muted">{label}</span>
                  <span className="text-right">{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Similar events */}
      {similar.length > 0 && (
        <section className="mt-6">
          <div className="flex justify-between items-end gap-8 mb-7">
            <div>
              <Text.MonoLabel>PODOBNE WYDARZENIA</Text.MonoLabel>
              <Text.SectionHeading className="mt-2">
                Jeśli podoba ci się to, zobacz też.
              </Text.SectionHeading>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
            {similar.map((e) => (
              <EventCard
                key={e.id}
                event={e}
                onOpen={onOpenEvent}
                onToggleSave={onToggleSave}
                saved={savedSet.has(e.id)}
              />
            ))}
          </div>
        </section>
      )}
    </section>
  );
};
