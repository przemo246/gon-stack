import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type ToastProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Toast = ({ className, ...props }: ToastProps) => {
  return (
    <div
      role="alert"
      className={cn('flex items-center', className)}
      {...props}
    />
  );
};
