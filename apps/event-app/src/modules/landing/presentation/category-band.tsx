import { IconArrow } from './icons';
import { CATEGORIES, EVENTS } from './mock-data';
import { Text } from '@/libs/ui/text';

type CategoryBandProps = {
  onPick: (categoryId: string) => void;
};

export const CategoryBand = ({ onPick }: CategoryBandProps) => (
  <section className="px-8 pb-12 max-w-360 mx-auto">
    <div className="flex justify-between items-end gap-8 mt-18 mb-7">
      <div>
        <Text.MonoLabel>KATEGORIE</Text.MonoLabel>
        <h2 className="font-display font-medium leading-[1.05] tracking-[-0.02em] mt-2 max-w-180 text-[clamp(32px,4.5vw,56px)]">
          Wybierz, co lubisz najbardziej.
        </h2>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map((c) => {
        const count = EVENTS.filter((e) => e.category === c.id).length;
        return (
          <button
            key={c.id}
            className="group relative bg-canvas border border-card-border rounded-[14px] p-5 text-left text-ink flex flex-col gap-2 min-h-32.5 transition-colors hover:bg-primary hover:text-on-primary"
            onClick={() => onPick(c.id)}
          >
            <Text.MonoLabel className="text-coral">{c.mono}</Text.MonoLabel>
            <div className="font-display font-medium text-[28px] leading-[1.05] tracking-[-0.02em]">
              {c.label}
            </div>
            <div className="text-muted text-sm group-hover:text-on-primary/70 transition-colors">
              {count} wydarzeń
            </div>
            <div className="absolute top-5 right-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[transform,opacity]">
              <IconArrow size={18} />
            </div>
          </button>
        );
      })}
    </div>
  </section>
);
