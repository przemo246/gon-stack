import { MOCK_MARQUEE_ITEMS } from './mock-data';

const line = [...MOCK_MARQUEE_ITEMS, ...MOCK_MARQUEE_ITEMS];

export const Marquee = () => {
  return (
    <div className="border-t border-b border-border-default overflow-hidden bg-bg-surface mt-9">
      <div className="flex gap-11 py-3.5 whitespace-nowrap animate-[slide_55s_linear_infinite] font-mono text-xs tracking-[.12em] text-text-primary">
        {line.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
