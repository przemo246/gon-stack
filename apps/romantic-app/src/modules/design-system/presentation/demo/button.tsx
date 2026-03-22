import { Button } from '../../../../libs/ui/button';

import { Example } from './example';

export const ButtonDemo = () => {
  return (
    <Example
      id="button-examples"
      title="Button Demo"
      description="Button - usage examples"
    >
      <Example.Case
        id="button-primary"
        title="1) Primary"
        description="Default primary button with gradient background and glow."
      >
        <Button variant="primary">Continue</Button>
      </Example.Case>

      <Example.Case
        id="button-secondary"
        title="2) Secondary"
        description="Secondary button with border and translucent background."
      >
        <Button variant="secondary">Learn more</Button>
      </Example.Case>

      <Example.Case
        id="button-side-by-side"
        title="3) Side by side"
        description="Primary and secondary buttons displayed together."
      >
        <div className="flex items-center gap-4">
          <Button variant="primary">Continue</Button>
          <Button variant="secondary">Learn more</Button>
        </div>
      </Example.Case>

      <Example.Case
        id="button-disabled"
        title="4) Disabled states"
        description="Both button variants in their disabled state."
      >
        <div className="flex items-center gap-4">
          <Button variant="primary" disabled>
            Continue
          </Button>
          <Button variant="secondary" disabled>
            Learn more
          </Button>
        </div>
      </Example.Case>
    </Example>
  );
};
