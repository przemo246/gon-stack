import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type ProgressBarProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const ProgressBar = ({
  variant = 'primary',
  className,
  ...props
}: ProgressBarProps) => {
  return (
    <div
      role="progressbar"
      className={cn('relative w-full overflow-hidden', className)}
      {...props}
    />
  );
};
