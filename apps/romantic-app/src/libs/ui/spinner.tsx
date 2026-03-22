import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type SpinnerProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Spinner = ({
  variant = 'primary',
  className,
  ...props
}: SpinnerProps) => {
  return (
    <div
      role="status"
      className={cn('inline-flex animate-spin', className)}
      {...props}
    />
  );
};
