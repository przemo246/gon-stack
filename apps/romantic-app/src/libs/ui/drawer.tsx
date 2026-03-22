import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type DrawerProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Drawer = ({
  variant = 'primary',
  className,
  ...props
}: DrawerProps) => {
  return <div className={cn('fixed inset-y-0', className)} {...props} />;
};
