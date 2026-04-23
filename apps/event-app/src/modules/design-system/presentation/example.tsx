import { type ReactNode } from 'react';

export type ExampleProps = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

const ExampleRoot = ({
  id,
  title,
  description,
  children,
  className,
}: ExampleProps) => {
  return (
    <div
      id={id}
      className={['w-full max-w-6xl space-y-6', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-serif font-semibold text-text-primary">
          {title}
        </h2>
        <p className="text-xs font-mono uppercase tracking-widest text-text-muted">
          Usage examples &amp; demo
        </p>
        {description ? (
          <p className="text-sm text-text-muted max-w-xl">{description}</p>
        ) : null}
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
};

export type ExampleCaseProps = {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
};

const Case = ({ id, title, description, children }: ExampleCaseProps) => {
  return (
    <div
      id={id}
      className="scroll-mt-24 rounded-2xl border border-border-default bg-bg-surface p-5 md:p-6"
    >
      {title ? (
        <header className="mb-5 space-y-1">
          <h3 className="text-base font-semibold text-text-primary">{title}</h3>
          {description ? (
            <p className="text-sm text-text-muted">{description}</p>
          ) : null}
        </header>
      ) : null}
      {children}
    </div>
  );
};

export const Example = Object.assign(ExampleRoot, {
  Case,
}) as typeof ExampleRoot & {
  Case: typeof Case;
};
