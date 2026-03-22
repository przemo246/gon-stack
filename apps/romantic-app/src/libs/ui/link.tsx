import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type LinkProps = ComponentProps<'a'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Link = ({
  variant = 'primary',
  className,
  ...props
}: LinkProps) => {
  return <a className={cn('inline-flex items-center', className)} {...props} />;
};
