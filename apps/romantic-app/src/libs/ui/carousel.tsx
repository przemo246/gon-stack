import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type CarouselProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Carousel = ({
  variant = 'primary',
  className,
  ...props
}: CarouselProps) => {
  return (
    <div className={cn('relative overflow-hidden', className)} {...props} />
  );
};
