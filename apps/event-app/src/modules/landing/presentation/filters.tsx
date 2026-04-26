import { MOCK_CATEGORIES, MOCK_DATE_CHIPS } from './mock-data';

type FiltersProps = {
  cat: string;
  setCat: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
};

export const Filters = ({ cat, setCat, date, setDate }: FiltersProps) => {
  return (
    <div className="max-w-350 mx-auto mt-14 px-9 flex flex-col gap-4.5 ">
      <div className="flex items-center gap-5.5 flex-wrap">
        <span className="font-mono text-[10px] tracking-[.16em] text-text-muted min-w-20">
          KIEDY
        </span>
        <div className="flex gap-2 flex-wrap flex-1">
          {MOCK_DATE_CHIPS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDate(d.id)}
              className={`px-4 py-2 rounded-full border text-sm transition-all cursor-pointer flex items-center gap-1.75 ${
                date === d.id
                  ? 'bg-accent text-white border-accent'
                  : 'bg-bg-base text-text-primary border-border-default hover:border-text-primary'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-5.5 flex-wrap">
        <span className="font-mono text-[10px] tracking-[.16em] text-text-muted min-w-20">
          KATEGORIA
        </span>
        <div className="flex gap-2 flex-wrap max-w-[calc(100%-280px)]">
          {MOCK_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`py-2 px-3 rounded-full border-0 text-sm transition-all cursor-pointer flex items-center gap-1.75 ${
                cat === c ? 'text-text-primary font-medium' : 'text-text-muted'
              }`}
            >
              {cat === c && (
                <span className="w-1.25 h-1.25 rounded-full bg-accent" />
              )}
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
