import { useState } from 'react';

import { Stepper } from '../../../../libs/ui/stepper';

import { Example } from './example';

export const StepperDemo = () => {
  const [controlled, setControlled] = useState(5);

  return (
    <Example
      id="stepper-examples"
      title="Stepper"
      description="A numeric input control that allows users to increment or decrement a value in defined steps."
    >
      <Example.Case
        id="stepper-default"
        title="1) Default (Uncontrolled)"
        description="Basic uncontrolled stepper with default props."
      >
        <div className="space-y-4">
          <Stepper.Root
            defaultValue={3}
            min={0}
            max={10}
            aria-label="Default stepper"
          >
            <Stepper.Button action="decrement" />
            <Stepper.Input />
            <Stepper.Button action="increment" />
          </Stepper.Root>
          <p className="b3">Range: 0 to 10, step 1.</p>
        </div>
      </Example.Case>

      <Example.Case
        id="stepper-controlled"
        title="2) Controlled"
        description="Controlled value with external state display."
      >
        <div className="space-y-4">
          <Stepper.Root
            value={controlled}
            onChange={setControlled}
            min={1}
            max={20}
            aria-label="Controlled stepper"
          >
            <Stepper.Button action="decrement" />
            <Stepper.Input />
            <Stepper.Button action="increment" />
          </Stepper.Root>
          <p className="b2">
            Current value: <strong>{controlled}</strong>
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="stepper-format"
        title="3) Format Display"
        description="Custom display formatting with formatDisplay prop."
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Stepper.Root
              defaultValue={7}
              min={0}
              max={14}
              aria-label="Evenings per week"
            >
              <Stepper.Button action="decrement" />
              <Stepper.Input formatDisplay={(v) => `${v}×`} />
              <Stepper.Button action="increment" />
            </Stepper.Root>
            <span className="b3">evenings per week</span>
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="stepper-disabled"
        title="4) Disabled"
        description="Non-interactive disabled state."
      >
        <div className="space-y-4">
          <Stepper.Root
            defaultValue={4}
            min={0}
            max={10}
            disabled
            aria-label="Disabled stepper"
          >
            <Stepper.Button action="decrement" />
            <Stepper.Input />
            <Stepper.Button action="increment" />
          </Stepper.Root>
          <p className="b3">All interactions are disabled.</p>
        </div>
      </Example.Case>

      <Example.Case
        id="stepper-boundary"
        title="5) Min/Max Boundary"
        description="Buttons disable at boundaries. Try decrementing at 0 or incrementing at 3."
      >
        <div className="space-y-4">
          <Stepper.Root
            defaultValue={0}
            min={0}
            max={3}
            aria-label="Boundary stepper"
          >
            <Stepper.Button action="decrement" />
            <Stepper.Input />
            <Stepper.Button action="increment" />
          </Stepper.Root>
          <p className="b3">Range: 0 to 3. Buttons grey out at limits.</p>
        </div>
      </Example.Case>

      <Example.Case
        id="stepper-custom-step"
        title="6) Custom Step"
        description="Step of 5 with a larger range."
      >
        <div className="space-y-4">
          <Stepper.Root
            defaultValue={50}
            min={0}
            max={100}
            step={5}
            aria-label="Percentage stepper"
          >
            <Stepper.Button action="decrement" />
            <Stepper.Input formatDisplay={(v) => `${v}%`} />
            <Stepper.Button action="increment" />
          </Stepper.Root>
          <p className="b3">Range: 0–100, step 5.</p>
        </div>
      </Example.Case>
    </Example>
  );
};
