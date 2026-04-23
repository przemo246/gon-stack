import { type Event } from './mock-data';
import { Poster } from './poster';

interface Props {
  event: Event;
  saved: boolean;
  onToggleSave: (id: number) => void;
}

export const EventCard = ({ event, saved, onToggleSave }: Props) => {
  return (
    <article className="border border-border-default rounded-[18px] overflow-hidden flex flex-col transition-all cursor-pointer hover:-translate-y-0.75 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,.15)] hover:border-border-strong">
      <div className="relative aspect-4/5 overflow-hidden">
        <Poster idx={event.poster} title={event.title} />

        <button
          onClick={() => onToggleSave(event.id)}
          aria-label="Zapisz"
          className={`absolute bottom-3.5 right-3.5 w-8.5 h-8.5 rounded-full flex items-center justify-center border border-black/6 transition-all hover:scale-[1.08] cursor-pointer ${
            saved
              ? 'bg-accent text-white border-accent'
              : 'bg-white/95 text-text-primary'
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill={saved ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M3 2h8v10l-4-2.5L3 12V2z" />
          </svg>
        </button>

        <div className="absolute top-3.5 left-3.5 bg-white/95 text-text-primary px-2.5 py-1.25 rounded-full font-mono text-[10px] tracking-[.12em] backdrop-blur-[6px] whitespace-nowrap">
          {event.cat.toUpperCase()}
        </div>
        {event.tag && (
          <div className="absolute top-3.5 right-3.5 bg-bg-inverse/82 text-white px-2.5 py-1.25 rounded-full font-mono text-[10px] tracking-[.12em] backdrop-blur-[6px] whitespace-nowrap max-w-[60%] overflow-hidden text-ellipsis">
            {event.tag}
          </div>
        )}
      </div>

      <div className="px-4.5 pt-4.5 pb-5 flex flex-col gap-2.5 flex-1">
        <div className="font-mono text-[11px] tracking-[.08em] text-text-muted flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
          <span>{event.date}</span>
          <span className="w-0.75 h-0.75 rounded-full bg-text-muted shrink-0" />
          <span>{event.time}</span>
        </div>

        <h3 className="text-[17px] leading-tight m-0 font-medium tracking-[-0.005em] text-pretty">
          {event.title}
        </h3>

        <div className="font-mono text-[11px] text-text-muted flex items-center gap-1.5 tracking-[.02em]">
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          >
            <path d="M5.5 10s3.5-3 3.5-6a3.5 3.5 0 10-7 0c0 3 3.5 6 3.5 6z" />
            <circle cx="5.5" cy="4" r="1.3" />
          </svg>
          {event.city} · {event.venue}
        </div>

        <div className="mt-auto pt-3 border-t border-border-default flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.25 whitespace-nowrap">
            {event.price === 0 ? (
              <span className="font-serif text-lg italic">Wstęp wolny</span>
            ) : (
              <>
                <span className="font-serif text-[26px] italic tracking-tight">
                  {event.price}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-text-muted">
                  PLN
                </span>
              </>
            )}
          </div>
          <button className="text-xs tracking-[.08em] font-medium uppercase whitespace-nowrap text-accent cursor-pointer">
            Bilety <span className="inline-block">→</span>
          </button>
        </div>
      </div>
    </article>
  );
};
