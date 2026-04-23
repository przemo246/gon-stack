import {
  MOCK_CITIES,
  MOCK_DATE_CHIPS,
  MOCK_HERO_CTA_PRIMARY,
  MOCK_HERO_CTA_SECONDARY,
  MOCK_HERO_SUBTITLE,
  MOCK_TICKET_DATE_LABEL,
  MOCK_TICKET_NUM,
  MOCK_TICKET_SCHEDULE,
  MOCK_TICKET_SEAT,
  MOCK_TICKET_TITLE,
  MOCK_TICKET_URL,
} from './mock-data';

interface Props {
  query: string;
  setQuery: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  onSearch: () => void;
}

export const Hero = ({
  query,
  setQuery,
  city,
  setCity,
  date,
  setDate,
  onSearch,
}: Props) => {
  return (
    <section className="max-w-350 mx-auto px-9 pt-10 pb-6 relative">
      <div className="grid grid-cols-[1.1fr_.9fr] gap-20 place-items-center">
        <div>
          <h1 className="font-serif text-8xl leading-[.92] font-normal m-0 mb-7 tracking-[-0.02em]">
            <span className="italic">Co robisz</span>
            <br />w ten
            <span className="italic text-accent"> weekend?</span>
          </h1>
          <p className="text-[17px] leading-[1.55] text-text-muted max-w-115 m-0 mb-9">
            {MOCK_HERO_SUBTITLE}
          </p>
          <div className="flex gap-3.5 mb-10">
            <button className="px-6.5 py-3.5 rounded-full text-[15px] font-medium bg-accent text-white transition-transform hover:-translate-y-px cursor-pointer inline-flex items-center gap-2">
              {MOCK_HERO_CTA_PRIMARY}
            </button>
            <button className="px-5.5 py-3.5 rounded-full text-[15px] border border-border-default cursor-pointer hover:bg-black/3">
              {MOCK_HERO_CTA_SECONDARY}
            </button>
          </div>
        </div>

        {/* ticket */}
        <div className="relative pt-2.5 scale-[0.90] origin-left" aria-hidden>
          <div className="absolute inset-x-5 -bottom-2.5 rounded-[18px] opacity-18 blur-[30px] bg-accent" />
          <div className="relative grid grid-cols-[130px_1fr] bg-bg-inverse rounded-[20px] overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,.35)] -rotate-[1.8deg] transition-transform duration-400 hover:rotate-0 hover:scale-[1.02]">
            {/* stub */}
            <div className="relative p-[22px_16px] [border-right:2px_dashed_rgba(255,255,255,.15)] text-bg-surface flex flex-col gap-3.5 text-center">
              <span className="absolute -right-2.5 -top-2.5 w-5 h-5 rounded-full bg-bg-base z-10" />
              <span className="absolute -right-2.5 -bottom-2.5 w-5 h-5 rounded-full bg-bg-base z-10" />
              <div className="font-mono text-[9px] tracking-[.16em] opacity-60">
                ADMIT ONE
              </div>
              <div className="font-serif text-[22px] leading-none tracking-[.02em]">
                {MOCK_TICKET_NUM}
              </div>
              <div className="font-mono text-[9px] tracking-[.16em] opacity-60">
                {MOCK_TICKET_SEAT}
              </div>
              <div
                className="h-20 w-full mt-auto"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg,var(--color-bg-surface) 0 2px,transparent 2px 4px,var(--color-bg-surface) 4px 7px,transparent 7px 10px)',
                }}
              />
            </div>

            {/* main */}
            <div className="bg-accent p-[26px_28px_22px] text-white flex flex-col gap-3.5 min-h-90 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,.18),transparent_40%)] pointer-events-none" />
              <div className="font-mono text-[9px] tracking-[.16em] text-white/75">
                {MOCK_TICKET_DATE_LABEL}
              </div>
              <div className="font-serif text-[44px] leading-[.95] text-white mt-0.5 italic">
                {MOCK_TICKET_TITLE}
              </div>
              <div className="font-mono text-[11px] tracking-widest flex gap-2.5 opacity-85">
                <span>WARSZAWA</span>
                <span>·</span>
                <span>CAŁE MIASTO</span>
              </div>
              <div className="flex flex-col gap-2.25 mt-1.5 pt-4 border-t border-dashed border-white/35 font-mono text-xs">
                {MOCK_TICKET_SCHEDULE.map((item) => (
                  <div
                    key={item.time}
                    className="grid grid-cols-[52px_1fr] gap-3 items-baseline"
                  >
                    <span className="font-medium opacity-95">{item.time}</span>
                    <span className="opacity-85 tracking-[.03em]">
                      {item.venue}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex items-end justify-between gap-3 pt-3.5">
                <div className="flex gap-px items-end">
                  {Array.from({ length: 38 }).map((_, i) => (
                    <span
                      key={i}
                      className="bg-white h-9 block"
                      style={{ width: `${1 + (i % 4) * 0.8}px` }}
                    />
                  ))}
                </div>
                <div className="font-mono text-[9px] tracking-[.16em] text-white/90">
                  {MOCK_TICKET_URL}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* search bar */}
      <div className="mt-14 bg-bg-inverse rounded-[22px] p-2 grid grid-cols-[1fr_1fr_1fr_auto] gap-0.5 items-stretch text-text-inverse shadow-[0_20px_60px_-25px_rgba(0,0,0,.3)]">
        <label className="flex flex-col gap-0.75 px-5 py-3.5 rounded-2xl cursor-text transition-colors hover:bg-white/4">
          <span className="font-mono text-[10px] tracking-[.16em] text-white/50">
            SZUKAJ
          </span>
          <input
            placeholder="koncert, festiwal, nazwa artysty…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-0 outline-none text-white text-[15px] py-0.5 w-full min-w-0"
          />
        </label>
        <label className="flex flex-col gap-0.75 px-5 py-3.5 rounded-2xl cursor-pointer transition-colors hover:bg-white/4">
          <span className="font-mono text-[10px] tracking-[.16em] text-white/50">
            MIASTO
          </span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="appearance-none bg-transparent border-0 outline-none text-white text-[15px] py-0.5 w-full min-w-0 cursor-pointer"
          >
            <option value="all">Cała Polska</option>
            {MOCK_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-0.75 px-5 py-3.5 rounded-2xl cursor-pointer transition-colors hover:bg-white/4">
          <span className="font-mono text-[10px] tracking-[.16em] text-white/50">
            KIEDY
          </span>
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="appearance-none bg-transparent border-0 outline-none text-white text-[15px] py-0.5 w-full min-w-0 cursor-pointer"
          >
            {MOCK_DATE_CHIPS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={onSearch}
          className="px-7 rounded-2xl text-[15px] font-medium flex items-center gap-2.5 bg-accent text-white transition-transform hover:-translate-y-px cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle
              cx="7"
              cy="7"
              r="5"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M11 11l3 3"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          Szukaj
        </button>
      </div>
    </section>
  );
};
