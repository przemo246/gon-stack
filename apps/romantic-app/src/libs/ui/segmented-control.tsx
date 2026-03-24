import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type SegmentedControlProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const SegmentedControl = ({
  className,
  ...props
}: SegmentedControlProps) => {
  return (
    <div
      role="radiogroup"
      className={cn('inline-flex items-center', className)}
      {...props}
    />
  );
};
