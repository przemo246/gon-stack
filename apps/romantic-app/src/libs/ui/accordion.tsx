import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type AccordionProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Accordion = ({
  variant = 'primary',
  className,
  ...props
}: AccordionProps) => {
  return <div className={cn('flex flex-col', className)} {...props} />;
};
