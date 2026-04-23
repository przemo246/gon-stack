import { Button } from '../../../../libs/ui/button';

import { Example } from '../example';

export const ButtonDemo = () => {
  return (
    <Example
      id="button-examples"
      title="Button"
      description="An interactive element that triggers an action or navigates to a new location when clicked."
    >
      <Example.Case
        id="button-primary"
        title="1) Primary"
        description="Default primary button using the accent colour with hover darkening."
      >
        <Button variant="primary">Buy tickets</Button>
      </Example.Case>

      <Example.Case
        id="button-ghost-with-border"
        title="2) Ghost with border"
        description="Ghost button with a border and transparent background."
      >
        <Button variant="ghost-with-border">Learn more</Button>
      </Example.Case>

      <Example.Case
        id="button-ghost"
        title="3) Ghost"
        description="Ghost button with no border and transparent background."
      >
        <Button variant="ghost">Learn more</Button>
      </Example.Case>

      <Example.Case
        id="button-solid"
        title="4) Solid"
        description="Solid button with a dark background and inverse text."
      >
        <Button variant="solid">Learn more</Button>
      </Example.Case>

      <Example.Case
        id="button-side-by-side"
        title="5) Side by side"
        description="All variants displayed together."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Buy tickets</Button>
          <Button variant="ghost-with-border">Learn more</Button>
          <Button variant="ghost">Learn more</Button>
          <Button variant="solid">Learn more</Button>
        </div>
      </Example.Case>

      <Example.Case
        id="button-disabled"
        title="6) Disabled states"
        description="All variants in their disabled state."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" disabled>
            Buy tickets
          </Button>
          <Button variant="ghost-with-border" disabled>
            Learn more
          </Button>
          <Button variant="ghost" disabled>
            Learn more
          </Button>
          <Button variant="solid" disabled>
            Learn more
          </Button>
        </div>
      </Example.Case>
    </Example>
  );
};
