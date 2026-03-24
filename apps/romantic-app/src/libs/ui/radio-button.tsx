import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type RadioButtonProps = ComponentProps<'input'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const RadioButton = ({ className, ...props }: RadioButtonProps) => {
  return <input type="radio" className={cn('size-4', className)} {...props} />;
};
