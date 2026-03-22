import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type ComboboxProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Combobox = ({
  variant = 'primary',
  className,
  ...props
}: ComboboxProps) => {
  return <div className={cn('relative inline-block', className)} {...props} />;
};
