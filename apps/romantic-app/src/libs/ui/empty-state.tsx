import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type EmptyStateProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const EmptyState = ({
  variant = 'primary',
  className,
  ...props
}: EmptyStateProps) => {
  return (
    <div
      className={cn('flex flex-col items-center justify-center', className)}
      {...props}
    />
  );
};
