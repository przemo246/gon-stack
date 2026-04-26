import { type ComponentProps } from 'react';
import { createPortal } from 'react-dom';

import { cn } from './cn';

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type ModalProps = ComponentProps<'div'> & {
  onClose?: () => void;
};

export type ModalHeaderProps = ComponentProps<'header'> & {
  onClose?: () => void;
};
export type ModalBodyProps = ComponentProps<'div'>;
export type ModalFooterProps = ComponentProps<'footer'>;

/* =============================================================================
 * Compound Parts
 * ============================================================================= */

const Header = ({ className, onClose, ...props }: ModalHeaderProps) => {
  const { children, ...rest } = props;
  return (
    <header
      className={cn(
        'flex items-center justify-between border-b border-border-default px-6 py-4',
        className,
      )}
      {...rest}
    >
      {children}
      {onClose && (
        <button
          aria-label="Close"
          className="text-text-muted hover:text-text-primary transition-colors"
          onClick={onClose}
        >
          ✕
        </button>
      )}
    </header>
  );
};

const Body = ({ className, ...props }: ModalBodyProps) => {
  return (
    <div
      className={cn('flex-1 overflow-y-auto px-6 py-5', className)}
      {...props}
    />
  );
};

const Footer = ({ className, ...props }: ModalFooterProps) => {
  return (
    <footer
      className={cn(
        'flex items-center justify-end gap-3 border-t border-border-default px-6 py-4',
        className,
      )}
      {...props}
    />
  );
};

/* =============================================================================
 * Root
 * ============================================================================= */

const Root = ({ className, onClose, children, ...props }: ModalProps) => {
  return createPortal(
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col',
          'rounded-2xl bg-bg-base shadow-2',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

/* =============================================================================
 * Compound Export
 * ============================================================================= */

export const Modal = Object.assign(Root, {
  Header,
  Body,
  Footer,
});
