import { ArrowRight } from 'lucide-react';
import { CATEGORIES, EVENTS } from './mock-data';

type CategoryBandProps = {
  onPickCategory: (id: string) => void;
};

export const CategoryBand = ({ onPickCategory }: CategoryBandProps) => (
  <section className="px-8 pb-12 max-w-360 mx-auto">
    <div className="flex justify-between items-end gap-8 mt-18 mb-7">
      <div>
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-muted">
          KATEGORIE
        </span>
        <h2
          className="font-sans font-medium leading-[1.05] tracking-[-0.02em] mt-2 mb-0 max-w-180 text-text-primary"
          style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
        >
          Wybierz, co lubisz najbardziej.
        </h2>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3">
      {CATEGORIES.map((c) => {
        const count = EVENTS.filter((e) => e.category === c.id).length;
        return (
          <button
            key={c.id}
            onClick={() => onPickCategory(c.id)}
            className="relative bg-bg-base border border-border-default rounded-2xl px-5.5 py-5 text-left text-text-primary flex flex-col gap-2 min-h-32.5 hover:bg-text-primary hover:text-bg-base transition-colors duration-200 group cursor-pointer"
          >
            <span
              className="font-mono text-[11px] tracking-[0.18em] uppercase group-hover:opacity-70"
              style={{ color: '#ff7759' }}
            >
              {c.mono}
            </span>
            <span className="font-sans font-medium text-[28px] tracking-[-0.02em] leading-[1.05]">
              {c.label}
            </span>
            <span className="text-sm text-text-muted group-hover:text-inherit group-hover:opacity-70">
              {count} wydarzeń
            </span>
            <span className="absolute top-5 right-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowRight size={18} />
            </span>
          </button>
        );
      })}
    </div>
  </section>
);
