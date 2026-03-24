import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type FormProps = ComponentProps<'form'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const Form = ({ className, ...props }: FormProps) => {
  return <form className={cn('flex flex-col', className)} {...props} />;
};
