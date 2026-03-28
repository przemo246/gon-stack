import { Skeleton } from '../../../../libs/ui/skeleton';

import { Example } from './example';

export const SkeletonDemo = () => {
  return (
    <Example
      id="skeleton-examples"
      title="Skeleton"
      description="A placeholder component that mimics the shape of content while data is loading."
    >
      <Example.Case
        id="skeleton-basic"
        title="1) Basic"
        description="Simple block skeleton used as a loading placeholder."
      >
        <Skeleton className="h-6 w-48" />
      </Example.Case>

      <Example.Case
        id="skeleton-text-lines"
        title="2) Text lines"
        description="Multiple lines mimicking a paragraph of text loading."
      >
        <div className="flex flex-col gap-2 max-w-sm">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </Example.Case>

      <Example.Case
        id="skeleton-profile-card"
        title="3) Profile card"
        description="Avatar + name and bio lines — a typical partner profile loading state."
      >
        <div className="flex items-start gap-4 max-w-sm">
          <Skeleton className="size-14 shrink-0 rounded-full" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="skeleton-media-card"
        title="4) Media card"
        description="Image thumbnail + metadata skeleton for a date-night activity card."
      >
        <div className="flex flex-col gap-3 max-w-xs">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-28" />
        </div>
      </Example.Case>
    </Example>
  );
};
