import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type CheckboxProps = ComponentProps<'input'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <input type="checkbox" className={cn('size-4', className)} {...props} />
  );
};
