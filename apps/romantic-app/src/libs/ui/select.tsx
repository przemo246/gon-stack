import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type SelectProps = ComponentProps<'select'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Select = ({
  variant = 'primary',
  className,
  ...props
}: SelectProps) => {
  return (
    <select className={cn('inline-flex items-center', className)} {...props} />
  );
};
