import { POSTER_PALETTES, fmtDateShort } from './mock-data';
import type { Event } from './mock-data';

type PosterProps = {
  event: Event;
  size?: 'sm' | 'md' | 'lg';
};

export const Poster = ({ event, size = 'md' }: PosterProps) => {
  const p = POSTER_PALETTES[event.palette % POSTER_PALETTES.length];
  const titleSize = size === 'lg' ? 56 : size === 'md' ? 32 : 22;
  const metaSize = size === 'lg' ? 12 : 11;
  const pad = size === 'lg' ? 28 : size === 'md' ? 18 : 14;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: p.bg, color: p.fg, borderRadius: 'inherit' }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `linear-gradient(${p.fg}10 1px, transparent 1px), linear-gradient(90deg, ${p.fg}10 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 80% at 80% 110%, ${p.accent}66, transparent 60%), radial-gradient(80% 60% at 10% -10%, ${p.fg}20, transparent 60%)`,
        }}
      />
      <div
        className="absolute font-mono text-[10px] tracking-[0.12em]"
        style={{
          top: pad,
          right: pad,
          color: p.fg,
          opacity: 0.9,
          border: `1px solid ${p.fg}55`,
          padding: '3px 8px',
          borderRadius: 999,
        }}
      >
        AFISZ · {fmtDateShort(event.date)}
      </div>
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: p.accent }}
      />
      <div
        className="absolute flex flex-col"
        style={{ left: pad, right: pad, bottom: pad, gap: 10 }}
      >
        <div
          className="font-sans font-semibold uppercase leading-[0.92] tracking-[-0.03em] whitespace-pre-line"
          style={{ fontSize: titleSize }}
        >
          {event.posterTitle}
        </div>
        <div
          className="font-mono tracking-[0.14em]"
          style={{ fontSize: metaSize, opacity: 0.85 }}
        >
          {event.posterMeta}
        </div>
      </div>
    </div>
  );
};
