import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type SkipLinkProps = ComponentProps<'a'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const SkipLink = ({ className, ...props }: SkipLinkProps) => {
  return (
    <a className={cn('sr-only focus:not-sr-only', className)} {...props} />
  );
};
