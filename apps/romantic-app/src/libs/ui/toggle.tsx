import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type ToggleProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Toggle = ({
  variant = 'primary',
  className,
  ...props
}: ToggleProps) => {
  return (
    <button
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    />
  );
};
