import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type VisuallyHiddenProps = ComponentProps<'span'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const VisuallyHidden = ({
  className,
  ...props
}: VisuallyHiddenProps) => {
  return <span className={cn('sr-only', className)} {...props} />;
};
