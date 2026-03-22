import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type DateInputProps = ComponentProps<'input'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const DateInput = ({
  variant = 'primary',
  className,
  ...props
}: DateInputProps) => {
  return (
    <input
      type="date"
      className={cn('inline-flex items-center', className)}
      {...props}
    />
  );
};
