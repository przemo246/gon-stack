import { type ComponentProps } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type FileUploadProps = ComponentProps<'div'> & {
  variant?: 'primary' | 'secondary';
};

/* =============================================================================
 * Component
 * ============================================================================= */

export const FileUpload = ({
  variant = 'primary',
  className,
  ...props
}: FileUploadProps) => {
  return (
    <div
      className={cn('flex flex-col items-center justify-center', className)}
      {...props}
    />
  );
};
