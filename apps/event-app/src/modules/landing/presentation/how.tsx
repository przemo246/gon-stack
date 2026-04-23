import {
  MOCK_HOW_SECTION_EYEBROW,
  MOCK_HOW_SECTION_TITLE,
  MOCK_HOW_STEPS,
} from './mock-data';

export const How = () => {
  return (
    <section className="max-w-350 mx-auto mt-20 px-9">
      <div className="flex justify-between items-end gap-6 mb-7 flex-wrap">
        <div>
          <div className="font-mono text-[11px] tracking-[.14em] text-text-muted mb-2">
            {MOCK_HOW_SECTION_EYEBROW}
          </div>
          <h2 className="font-serif italic text-[52px] leading-none m-0 tracking-tight">
            {MOCK_HOW_SECTION_TITLE}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 border-t border-border-default pt-8">
        {MOCK_HOW_STEPS.map((step) => (
          <div key={step.n} className="flex flex-col gap-3">
            <div className="font-mono text-xs tracking-[.14em] font-medium text-accent">
              {step.n}
            </div>
            <div className="font-serif italic text-[32px] leading-none tracking-tight">
              {step.title}
            </div>
            <div className="text-sm leading-normal text-text-muted max-w-70">
              {step.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
