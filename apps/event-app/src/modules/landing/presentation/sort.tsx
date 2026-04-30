import { MOCK_SORT_OPTIONS } from './mock-data';

type SortProps = {
  sort: string;
  setSort: (v: string) => void;
};

export const Sort = ({ sort, setSort }: SortProps) => {
  return (
    <div className="flex items-center gap-2.5 ml-auto">
      <span className="font-mono text-[10px] tracking-[.16em] text-text-muted">
        SORTUJ
      </span>
      <div className="relative">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="appearance-none bg-transparent border border-border-default pl-3.5 pr-8 py-2 rounded-full text-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {MOCK_SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-1.5 pointer-events-none fill-current opacity-60"
          viewBox="0 0 10 6"
        >
          <path d="M5 6L0 0h10z" />
        </svg>
      </div>
    </div>
  );
};
