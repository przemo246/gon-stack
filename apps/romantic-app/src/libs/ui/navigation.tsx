import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type NavigationProps = ComponentProps<'nav'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Navigation = ({
  variant = 'primary',
  className,
  ...props
}: NavigationProps) => {
  return <nav className={cn('flex items-center', className)} {...props} />;
};
