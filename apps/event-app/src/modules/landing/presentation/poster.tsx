import { MOCK_POSTERS } from './mock-data';

interface Props {
  idx: number;
  title: string;
}

export const Poster = ({ idx, title }: Props) => {
  const p = MOCK_POSTERS[idx % MOCK_POSTERS.length];
  const id = `poster-${idx}`;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: p.bg }}
    >
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id={`${id}blur`}>
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {p.shape === 'radial' && (
          <>
            <circle
              cx="320"
              cy="110"
              r="140"
              fill="rgba(255,255,255,.2)"
              filter={`url(#${id}blur)`}
            />
            <circle
              cx="80"
              cy="420"
              r="110"
              fill="rgba(0,0,0,.3)"
              filter={`url(#${id}blur)`}
            />
          </>
        )}
        {p.shape === 'rings' && (
          <g fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1.5">
            {[40, 80, 120, 160, 200, 240, 280].map((r) => (
              <circle key={r} cx="200" cy="260" r={r} />
            ))}
          </g>
        )}
        {p.shape === 'grid' && (
          <g stroke="rgba(255,255,255,.18)">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`h${i}`} x1="0" x2="400" y1={i * 26} y2={i * 26} />
            ))}
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={`v${i}`} y1="0" y2="500" x1={i * 26} x2={i * 26} />
            ))}
          </g>
        )}
        {p.shape === 'sun' && (
          <>
            <circle cx="200" cy="380" r="220" fill="rgba(255,200,120,.35)" />
            <circle cx="200" cy="380" r="120" fill="rgba(255,140,80,.5)" />
            <circle cx="200" cy="380" r="60" fill="rgba(255,255,255,.6)" />
          </>
        )}
        {p.shape === 'waves' && (
          <g fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="2">
            {[80, 130, 180, 230, 280, 330, 380].map((y) => (
              <path key={y} d={`M0 ${y} Q100 ${y - 20} 200 ${y} T400 ${y}`} />
            ))}
          </g>
        )}
        {p.shape === 'bloom' && (
          <>
            <ellipse
              cx="200"
              cy="260"
              rx="180"
              ry="60"
              fill="rgba(255,255,255,.2)"
              transform="rotate(-20 200 260)"
            />
            <ellipse
              cx="200"
              cy="260"
              rx="180"
              ry="60"
              fill="rgba(255,255,255,.2)"
              transform="rotate(20 200 260)"
            />
            <ellipse
              cx="200"
              cy="260"
              rx="180"
              ry="60"
              fill="rgba(255,255,255,.2)"
              transform="rotate(60 200 260)"
            />
          </>
        )}
        {p.shape === 'tape' && (
          <g>
            <rect
              x="-50"
              y="150"
              width="500"
              height="40"
              fill="rgba(255,255,255,.15)"
              transform="rotate(-12 200 170)"
            />
            <rect
              x="-50"
              y="260"
              width="500"
              height="40"
              fill="rgba(0,0,0,.2)"
              transform="rotate(-12 200 280)"
            />
            <rect
              x="-50"
              y="370"
              width="500"
              height="40"
              fill="rgba(255,255,255,.15)"
              transform="rotate(-12 200 390)"
            />
          </g>
        )}
        {p.shape === 'triangle' && (
          <g>
            <polygon
              points="200,100 340,400 60,400"
              fill="rgba(255,255,255,.25)"
            />
            <polygon points="200,180 300,380 100,380" fill="rgba(0,0,0,.25)" />
          </g>
        )}
      </svg>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,.55)_100%)]" />
      <div className="absolute bottom-4 left-4 right-4 font-serif text-[28px] leading-[.95] text-white italic tracking-tight text-pretty">
        {title.split('—')[0]}
      </div>
    </div>
  );
};
