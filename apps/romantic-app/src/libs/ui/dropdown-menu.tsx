import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type DropdownMenuProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const DropdownMenu = ({
  variant = 'primary',
  className,
  ...props
}: DropdownMenuProps) => {
  return <div className={cn('relative inline-block', className)} {...props} />;
};
