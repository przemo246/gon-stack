import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type SkeletonProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Skeleton = ({
  variant = 'primary',
  className,
  ...props
}: SkeletonProps) => {
  return <div className={cn('animate-pulse rounded', className)} {...props} />;
};
