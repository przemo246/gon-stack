import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type HeadingProps = ComponentProps<'h2'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Heading = ({ className, ...props }: HeadingProps) => {
  return <h2 className={cn('text-2xl font-bold', className)} {...props} />;
};
