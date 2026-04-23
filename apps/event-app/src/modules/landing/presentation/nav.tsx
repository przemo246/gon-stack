import { MOCK_NAV_LINKS } from './mock-data';

export const Nav = () => {
  return (
    <header className="sticky top-0 z-50 bg-bg-base/80 backdrop-blur-[14px] border-b border-border-default">
      <div className="max-w-350 mx-auto px-9 py-4 flex items-center gap-10">
        <div className="flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 28 28">
            <rect
              x="2"
              y="2"
              width="24"
              height="24"
              rx="4"
              fill="var(--color-bg-inverse)"
            />
            <text
              x="14"
              y="19"
              textAnchor="middle"
              fontFamily="Instrument Serif"
              fontSize="18"
              fill="var(--color-text-inverse)"
              fontStyle="italic"
            >
              A
            </text>
          </svg>
          <span className="font-serif text-2xl italic tracking-tight">
            Afisz
          </span>
          <span className="opacity-50">·</span>
          <span className="font-mono text-[11px] tracking-widest opacity-55 uppercase pt-1.5">
            pl
          </span>
        </div>

        <nav className="flex gap-7 ml-5">
          {MOCK_NAV_LINKS.map((link) => (
            <a
              key={link.label}
              className={`relative text-sm cursor-pointer py-1.5 transition-colors ${
                link.active
                  ? 'text-text-primary'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {link.active && (
                <span className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-text-primary" />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex gap-2.5 items-center">
          <button className="px-4 py-2.5 rounded-full text-sm cursor-pointer hover:bg-black/4">
            Zaloguj
          </button>
          <button className="px-4.5 py-2.5 rounded-full bg-bg-inverse text-text-inverse text-sm font-medium cursor-pointer hover:bg-black">
            Załóż konto
          </button>
        </div>
      </div>
    </header>
  );
};
