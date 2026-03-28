import { Alert } from '../../../../libs/ui/alert';

import { Example } from './example';

export const AlertDemo = () => {
  return (
    <Example
      id="alert-examples"
      title="Alert"
      description="A container that communicates a message of varying importance to the user, often with color-coded severity levels."
    >
      <Example.Case
        id="alert-primary"
        title="1) Primary"
        description="Default primary variant — used for informational messages."
      >
        <Alert variant="primary">
          💌 You have a new message from your partner. Tap to read it.
        </Alert>
      </Example.Case>

      <Example.Case
        id="alert-secondary"
        title="2) Secondary"
        description="Secondary variant for neutral or supplementary information."
      >
        <Alert variant="secondary">
          📅 Your next date-night reminder is scheduled for Friday at 7 PM.
        </Alert>
      </Example.Case>

      <Example.Case
        id="alert-success"
        title="3) Success"
        description="Success variant to confirm a completed action."
      >
        <Alert variant="success">
          ✅ Your anniversary event has been saved successfully!
        </Alert>
      </Example.Case>

      <Example.Case
        id="alert-error"
        title="4) Error"
        description="Error variant to surface a problem that needs attention."
      >
        <Alert variant="error">
          ❌ We couldn&apos;t send your love note. Please check your connection
          and try again.
        </Alert>
      </Example.Case>

      <Example.Case
        id="alert-all-variants"
        title="5) All variants"
        description="All four variants displayed together for comparison."
      >
        <div className="space-y-3">
          <Alert variant="primary">Primary — informational context.</Alert>
          <Alert variant="secondary">Secondary — neutral context.</Alert>
          <Alert variant="success">Success — positive outcome.</Alert>
          <Alert variant="error">Error — something went wrong.</Alert>
        </div>
      </Example.Case>

      <Example.Case
        id="alert-with-icon-and-text"
        title="6) With icon and structured content"
        description="Alert used with an icon and multi-line body for richer messaging."
      >
        <Alert variant="primary">
          <span className="text-xl leading-none" aria-hidden="true">
            💬
          </span>
          <div className="space-y-0.5">
            <p className="font-semibold">Compatibility reminder</p>
            <p className="text-sm opacity-80">
              Research shows that couples who share a daily check-in report
              higher relationship satisfaction. Set up your daily moment now.
            </p>
          </div>
        </Alert>
      </Example.Case>
    </Example>
  );
};
