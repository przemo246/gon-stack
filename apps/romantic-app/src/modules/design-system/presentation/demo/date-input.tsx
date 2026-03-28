import { useState } from 'react';

import { DateInput } from '../../../../libs/ui/date-input';
import { Button } from '../../../../libs/ui/button';

import { Example } from './example';

export const DateInputDemo = () => {
  const [anniversary, setAnniversary] = useState('2023-02-14');
  const [formResult, setFormResult] = useState('No submission yet');

  return (
    <Example
      id="date-input-examples"
      title="Date Input"
      description="A simple date input field that allows users to enter a date using native browser date controls."
    >
      <Example.Case
        id="date-input-basic"
        title="1) Basic"
        description="Uncontrolled date input with a placeholder-like default."
      >
        <DateInput aria-label="Pick a date" />
      </Example.Case>

      <Example.Case
        id="date-input-default-value"
        title="2) Default value"
        description="Pre-filled with your first date anniversary."
      >
        <DateInput defaultValue="2023-02-14" aria-label="Anniversary date" />
      </Example.Case>

      <Example.Case
        id="date-input-controlled"
        title="3) Controlled"
        description="Two-way binding – reflects the selected date beneath the input."
      >
        <div className="space-y-3">
          <DateInput
            value={anniversary}
            onChange={(e) => setAnniversary(e.target.value)}
            aria-label="Controlled anniversary"
          />
          <p className="b2">
            Anniversary date: <strong>{anniversary || '—'}</strong>
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="date-input-min-max"
        title="4) Min / Max constraints"
        description="Restrict the selectable range – here only dates in 2024 are allowed."
      >
        <DateInput
          min="2024-01-01"
          max="2024-12-31"
          defaultValue="2024-06-15"
          aria-label="Date in 2024"
        />
      </Example.Case>

      <Example.Case
        id="date-input-disabled"
        title="5) Disabled"
        description="Read-only locked state for confirmed dates."
      >
        <DateInput
          defaultValue="2022-07-04"
          disabled
          aria-label="Locked date"
        />
      </Example.Case>

      <Example.Case
        id="date-input-form"
        title="6) Form integration"
        description="Native form submission – the date value is captured via FormData."
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            setFormResult(`Submitted date: ${data.get('meetup') || '—'}`);
          }}
        >
          <DateInput
            name="meetup"
            defaultValue="2025-03-21"
            aria-label="Meetup date"
          />
          <Button variant="secondary" type="submit">
            Submit form
          </Button>
          <p className="b2">{formResult}</p>
        </form>
      </Example.Case>
    </Example>
  );
};
