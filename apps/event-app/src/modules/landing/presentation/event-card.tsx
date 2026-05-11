import { Heart } from 'lucide-react';
import type { Event } from './mock-data';
import { fmtDate, getCategoryLabel } from './mock-data';
import { Poster } from './poster';

type EventCardProps = {
  event: Event;
  saved: boolean;
  onToggleSave: (id: string) => void;
};

export const EventCard = ({ event, saved, onToggleSave }: EventCardProps) => (
  <article className="bg-bg-base border border-border-default rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-25px_rgba(0,0,0,0.25)] transition-all duration-200">
    <div
      className="relative rounded-[10px] overflow-hidden m-2.5 mb-0"
      style={{ aspectRatio: '3/4' }}
    >
      <Poster event={event} size="md" />
      {event.badge && (
        <span
          className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.16em] uppercase text-white px-2 py-1 rounded-md"
          style={{ background: '#ff7759' }}
        >
          {event.badge}
        </span>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleSave(event.id);
        }}
        className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center border-0 transition-colors cursor-pointer"
        style={
          saved
            ? { background: '#ff7759', color: '#fff' }
            : { background: 'rgba(255,255,255,0.9)', color: '#17171c' }
        }
        aria-label={saved ? 'Usuń z zapisanych' : 'Zapisz'}
      >
        <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
      </button>
    </div>
    <div className="px-3.5 py-3 pb-4 flex flex-col gap-1.5">
      <span className="font-mono text-[10px] tracking-[0.14em] text-text-muted uppercase">
        {fmtDate(event.date)} · {event.city}
      </span>
      <h3 className="font-sans font-medium text-lg leading-[1.15] tracking-[-0.02em] m-0 text-text-primary">
        {event.name}
      </h3>
      <div className="flex justify-between gap-3 text-xs text-text-muted">
        <span className="bg-bg-surface rounded-md px-2 py-0.5">
          {getCategoryLabel(event.category)}
        </span>
        <span className="truncate">{event.venue}</span>
      </div>
    </div>
  </article>
);
