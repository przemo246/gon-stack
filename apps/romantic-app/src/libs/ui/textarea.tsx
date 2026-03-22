import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type TextareaProps = ComponentProps<'textarea'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Textarea = ({
  variant = 'primary',
  className,
  ...props
}: TextareaProps) => {
  return <textarea className={cn('flex w-full', className)} {...props} />;
};
