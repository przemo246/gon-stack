import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type AlertProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Alert = ({ className, ...props }: AlertProps) => {
  return (
    <div
      role="alert"
      className={cn('flex items-center', className)}
      {...props}
    />
  );
};
