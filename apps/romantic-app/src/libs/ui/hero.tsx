import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type HeroProps = ComponentProps<'section'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Hero = ({
  variant = 'primary',
  className,
  ...props
}: HeroProps) => {
  return (
    <section
      className={cn('flex flex-col items-center justify-center', className)}
      {...props}
    />
  );
};
