import { cn } from '@/libs/ui/cn';

type SkeletonCardLayout = 'grid' | 'list';

type SkeletonCardProps = {
  layout?: SkeletonCardLayout;
};

const block = (className?: string) =>
  cn('animate-pulse rounded bg-hairline/60', className);

export const SkeletonCard = ({ layout = 'grid' }: SkeletonCardProps) => {
  if (layout === 'list') {
    return (
      <article
        className="grid gap-5 items-center p-4.5 bg-card-bg border border-card-border-c rounded-[14px] grid-cols-[80px_1fr_auto]"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1.5 border-r border-hairline pr-3">
          <div className={block('h-7 w-8')} />
          <div className={block('h-3 w-9')} />
          <div className={block('h-3 w-7')} />
        </div>
        <div className={block('aspect-3/4 h-27.5')} />
        <div className="flex flex-col gap-2">
          <div className={block('h-3 w-40')} />
          <div className={block('h-5 w-64')} />
        </div>
        <div className="flex gap-3 items-center">
          <div className={block('h-9 w-9 rounded-full')} />
          <div className={block('h-9 w-24 rounded-full')} />
        </div>
      </article>
    );
  }

  return (
    <article
      className="bg-card-bg border border-card-border-c rounded-md overflow-hidden flex flex-col"
      aria-hidden="true"
    >
      <div className={block('aspect-3/4 m-2.5 rounded-[10px]')} />
      <div className="px-3.5 py-3 pb-4 flex flex-col gap-2.5">
        <div className={block('h-3 w-32')} />
        <div className={block('h-5 w-3/4')} />
      </div>
    </article>
  );
};
