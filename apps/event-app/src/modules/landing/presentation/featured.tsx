import { MOCK_FEATURED_COPY, type Event } from './mock-data';
import { Poster } from './poster';
import { Button } from '@/libs/ui/button';

interface Props {
  event: Event;
  saved: boolean;
  onToggleSave: (id: number) => void;
}

export const Featured = ({ event, saved, onToggleSave }: Props) => {
  return (
    <article className="grid grid-cols-[1.05fr_1fr] gap-12 p-9 border border-border-default rounded-3xl bg-bg-surface mb-12 items-stretch">
      <div className="relative rounded-2xl overflow-hidden min-h-115">
        <Poster idx={event.poster} title={event.title} />
      </div>

      <div className="flex flex-col py-2">
        <div className="font-mono text-[11px] tracking-[.14em] text-text-muted mb-3">
          POLECANE · {event.cat.toUpperCase()}
        </div>
        <h2 className="font-serif italic text-[60px] leading-none m-0 mb-7 tracking-tight">
          {event.title}
        </h2>

        <div className="grid grid-cols-2 gap-5 gap-x-8 py-5 border-t border-b border-border-default mb-5">
          <div>
            <div className="font-mono text-[10px] tracking-[.14em] text-text-muted mb-1">
              DATA
            </div>
            <div className="text-[15px] font-medium">{event.date}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[.14em] text-text-muted mb-1">
              GODZINA
            </div>
            <div className="text-[15px] font-medium">{event.time}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[.14em] text-text-muted mb-1">
              MIEJSCE
            </div>
            <div className="text-[15px] font-medium">
              {event.venue}, {event.city}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[.14em] text-text-muted mb-1">
              BILET OD
            </div>
            <div className="text-[15px] font-medium">
              {event.price === 0 ? 'Wstęp wolny' : `${event.price} PLN`}
            </div>
          </div>
        </div>

        <p className="text-[15px] leading-normal text-text-muted m-0 mb-6">
          {MOCK_FEATURED_COPY}
        </p>

        <div className="flex gap-2.5 mt-auto">
          <button className="px-6.5 py-3.5 rounded-full text-[15px] font-medium bg-accent text-white transition-transform hover:-translate-y-px cursor-pointer">
            {event.price === 0
              ? 'Wstęp wolny — zarezerwuj miejsce'
              : `Kup bilet · od ${event.price} PLN`}
          </button>
          <Button
            variant="ghost-with-border"
            onClick={() => onToggleSave(event.id)}
          >
            {saved ? 'Zapisane ✓' : 'Zapisz na później'}
          </Button>
        </div>
      </div>
    </article>
  );
};
