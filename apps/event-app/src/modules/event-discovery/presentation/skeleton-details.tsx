import { cn } from '@/libs/ui/cn';

const block = (className?: string) =>
  cn('animate-pulse rounded bg-hairline/60', className);

export const SkeletonDetails = () => (
  <section className="px-8 pt-8 pb-16 max-w-7xl mx-auto" aria-hidden="true">
    <div className={block('h-4 w-40 mb-6')} />

    {/* Hero block */}
    <div className="grid gap-12 items-stretch bg-surface rounded-lg p-8 mb-8 grid-cols-[0.9fr_1.1fr]">
      <div className={block('rounded-[18px] aspect-3/4')} />
      <div className="flex flex-col gap-5 py-3">
        <div className={block('h-3 w-44')} />
        <div className={block('h-10 w-4/5')} />
        <div className={block('h-10 w-3/5')} />

        {/* When / where */}
        <div className="grid grid-cols-2 gap-6 border-t border-b border-hairline py-5">
          <div className="flex flex-col gap-2.5">
            <div className={block('h-3 w-16')} />
            <div className={block('h-8 w-28')} />
            <div className={block('h-3 w-32')} />
          </div>
          <div className="flex flex-col gap-2.5">
            <div className={block('h-3 w-16')} />
            <div className={block('h-6 w-36')} />
            <div className={block('h-3 w-24')} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 flex-wrap">
          <div className={block('h-11 w-48 rounded-full')} />
          <div className={block('h-11 w-32 rounded-full')} />
          <div className={block('h-11 w-32 rounded-full')} />
        </div>
      </div>
    </div>

    {/* Body */}
    <div className="grid gap-12 mb-12 grid-cols-[1.6fr_0.9fr]">
      <div>
        <section className="mb-10 flex flex-col gap-3">
          <div className={block('h-3 w-32')} />
          <div className={block('h-5 w-full')} />
          <div className={block('h-5 w-full')} />
          <div className={block('h-5 w-2/3')} />
        </section>
        <section className="mb-10 flex flex-col gap-4">
          <div className={block('h-3 w-32')} />
          <div className={block('h-6 w-1/2')} />
          <div className={block('aspect-4/3 rounded-[18px]')} />
        </section>
      </div>

      <aside className="flex flex-col gap-4">
        <div className="bg-card-bg border border-border-light rounded-md p-5 flex flex-col gap-3">
          <div className={block('h-3 w-24')} />
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex justify-between gap-4">
              <div className={block('h-4 w-20')} />
              <div className={block('h-4 w-24')} />
            </div>
          ))}
        </div>
        <div className="bg-soft-stone border border-border-light rounded-md p-5 flex flex-col gap-2">
          <div className={block('h-3 w-16')} />
          <div className={block('h-4 w-full')} />
          <div className={block('h-4 w-3/4')} />
        </div>
      </aside>
    </div>
  </section>
);
