import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type RatingProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Rating = ({ className, ...props }: RatingProps) => {
  return (
    <div className={cn('inline-flex items-center', className)} {...props} />
  );
};
