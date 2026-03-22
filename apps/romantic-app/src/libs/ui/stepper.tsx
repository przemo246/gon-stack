import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type StepperProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Stepper = ({
  variant = 'primary',
  className,
  ...props
}: StepperProps) => {
  return <div className={cn('flex items-center', className)} {...props} />;
};
