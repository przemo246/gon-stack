import {
  MOCK_CITIES_SECTION_EYEBROW,
  MOCK_CITIES_SECTION_TITLE,
  MOCK_CITY_DATA,
} from './mock-data';

type CityStripProps = {
  onPickCity: (city: string) => void;
};

export const CityStrip = ({ onPickCity }: CityStripProps) => {
  return (
    <section className="max-w-350 mx-auto mt-15 px-9 py-20 bg-bg-inverse text-text-inverse rounded-[28px]">
      <div className="flex justify-between items-end gap-6 mb-7 flex-wrap">
        <div>
          <div className="font-mono text-[11px] tracking-[.14em] text-text-inverse/60 mb-2">
            {MOCK_CITIES_SECTION_EYEBROW}
          </div>
          <h2 className="font-serif italic text-[52px] leading-none m-0 tracking-tight text-text-inverse">
            {MOCK_CITIES_SECTION_TITLE}
          </h2>
        </div>
        <a className="font-mono text-[11px] tracking-[.14em] text-text-inverse/70 cursor-pointer hover:text-text-inverse transition-colors">
          ZOBACZ WSZYSTKIE 92 →
        </a>
      </div>

      <div className="grid grid-cols-4 border-t border-white/12">
        {MOCK_CITY_DATA.map((item, i) => (
          <button
            key={item.city}
            onClick={() => onPickCity(item.city)}
            className="group text-left px-6.5 py-7 border-r border-b border-white/12 transition-colors duration-100 hover:bg-white/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-inverse/40 focus-visible:ring-inset grid grid-cols-[auto_1fr_auto] grid-rows-2 gap-1 gap-x-3 items-baseline cursor-pointer nth-[4n]:border-r-0 nth-[n+5]:border-b-0"
          >
            <div className="font-mono text-[10px] tracking-[.14em] opacity-50 row-start-1 col-start-1">
              0{i + 1}
            </div>
            <div className="font-serif italic text-[38px] tracking-tight row-start-2 col-span-2">
              {item.city}
            </div>
            <div className="font-mono text-[11px] tracking-widest opacity-60 row-start-1 col-start-2">
              {item.count} wydarzeń
            </div>
            <div className="text-accent row-span-2 col-start-3 self-center text-[22px] opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-1">
              →
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
