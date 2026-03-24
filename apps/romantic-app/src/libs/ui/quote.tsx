import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type QuoteProps = ComponentProps<'blockquote'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Quote = ({ className, ...props }: QuoteProps) => {
  return <blockquote className={cn('border-l-4 pl-4', className)} {...props} />;
};
