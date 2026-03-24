import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type ButtonGroupProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const ButtonGroup = ({ className, ...props }: ButtonGroupProps) => {
  return (
    <div
      role="group"
      className={cn('inline-flex items-center', className)}
      {...props}
    />
  );
};
