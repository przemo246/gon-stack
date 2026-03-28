import { Button } from '../../../../libs/ui/button';
import { ButtonGroup } from '../../../../libs/ui/button-group';

import { Example } from './example';

export const ButtonGroupDemo = () => {
  return (
    <Example
      id="button-group-examples"
      title="Button Group"
      description="A set of related buttons grouped together, allowing users to select one option or perform related actions."
    >
      <Example.Case
        id="button-group-basic"
        title="1) Basic"
        description="Two primary actions grouped inline — accept or decline a date invitation."
      >
        <ButtonGroup>
          <Button variant="primary">Accept Date</Button>
          <Button variant="secondary">Maybe Later</Button>
        </ButtonGroup>
      </Example.Case>

      <Example.Case
        id="button-group-secondary"
        title="2) Secondary actions"
        description="A group of secondary action buttons for managing a shared memory."
      >
        <ButtonGroup>
          <Button variant="secondary">Edit</Button>
          <Button variant="secondary">Share</Button>
          <Button variant="secondary">Delete</Button>
        </ButtonGroup>
      </Example.Case>

      <Example.Case
        id="button-group-mixed"
        title="3) Mixed variants"
        description="Pairing a primary CTA with a secondary escape hatch for a proposal prompt."
      >
        <div className="space-y-4">
          <p className="b2 text-center">Will you be my Valentine?</p>
          <div className="flex justify-center">
            <ButtonGroup>
              <Button variant="primary">Yes, of course!</Button>
              <Button variant="secondary">Ask me again</Button>
            </ButtonGroup>
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="button-group-disabled"
        title="4) Disabled state"
        description="Button group where actions are temporarily unavailable."
      >
        <ButtonGroup>
          <Button variant="primary" disabled>
            Send Love Note
          </Button>
          <Button variant="secondary" disabled>
            Schedule
          </Button>
        </ButtonGroup>
      </Example.Case>
    </Example>
  );
};
