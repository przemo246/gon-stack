import type { CSSProperties } from 'react';
import { POSTER_PALETTES, fmtDateShort } from './mock-data';
import type { Event } from './mock-data';

type PosterSize = 'sm' | 'md' | 'lg';

type PosterProps = {
  event: Event;
  size?: PosterSize;
  className?: string;
  style?: CSSProperties;
};

const TITLE_SIZE: Record<PosterSize, number> = { lg: 56, md: 32, sm: 22 };
const META_SIZE: Record<PosterSize, number> = { lg: 12, md: 11, sm: 11 };
const PADDING: Record<PosterSize, number> = { lg: 28, md: 18, sm: 14 };

export const Poster = ({
  event,
  size = 'md',
  className = '',
  style = {},
}: PosterProps) => {
  const p = POSTER_PALETTES[event.palette % POSTER_PALETTES.length];
  const titleSize = TITLE_SIZE[size];
  const metaSize = META_SIZE[size];
  const pad = PADDING[size];

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        background: p.bg,
        color: p.fg,
        borderRadius: 'inherit',
        ...style,
      }}
    >
      {/* grid texture */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${p.fg}10 1px, transparent 1px), linear-gradient(90deg, ${p.fg}10 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(120% 80% at 80% 110%, ${p.accent}66, transparent 60%), radial-gradient(80% 60% at 10% -10%, ${p.fg}20, transparent 60%)`,
        }}
      />
      {/* date sticker */}
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
      {/* title block */}
      <div
        className="absolute flex flex-col"
        style={{ left: pad, right: pad, bottom: pad, gap: 10 }}
      >
        <div
          className="font-display font-semibold leading-[0.92] tracking-[-0.03em] whitespace-pre-line uppercase"
          style={{ fontSize: titleSize, color: p.fg }}
        >
          {event.posterTitle}
        </div>
        <div
          className="font-mono tracking-[0.14em]"
          style={{ fontSize: metaSize, color: p.fg, opacity: 0.85 }}
        >
          {event.posterMeta}
        </div>
      </div>
      {/* accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: p.accent }}
      />
    </div>
  );
};
