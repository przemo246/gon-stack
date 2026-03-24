import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type LabelProps = ComponentProps<'label'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Label = ({ className, ...props }: LabelProps) => {
  return (
    <label className={cn('inline-flex items-center', className)} {...props} />
  );
};
