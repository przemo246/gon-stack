import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type FieldsetProps = ComponentProps<'fieldset'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Fieldset = ({
  variant = 'primary',
  className,
  ...props
}: FieldsetProps) => {
  return <fieldset className={cn('flex flex-col', className)} {...props} />;
};
