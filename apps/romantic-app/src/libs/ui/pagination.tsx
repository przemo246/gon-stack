import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type PaginationProps = ComponentProps<'nav'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Pagination = ({
  variant = 'primary',
  className,
  ...props
}: PaginationProps) => {
  return (
    <nav
      className={cn('flex items-center justify-center', className)}
      {...props}
    />
  );
};
