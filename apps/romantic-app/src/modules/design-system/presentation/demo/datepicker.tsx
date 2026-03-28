import { useState } from 'react';

import { Button } from '../../../../libs/ui/button';
import { Datepicker } from '../../../../libs/ui/datepicker';

import { Example } from './example';

const today = new Date().toISOString().split('T')[0];

export const DatepickerDemo = () => {
  const [dateA, setDateA] = useState('');
  const [dateB, setDateB] = useState(today);
  const [dateC, setDateC] = useState('');

  return (
    <Example
      id="datepicker-examples"
      title="Datepicker"
      description="A form control that allows users to select a single date or date range through a calendar interface."
    >
      <Example.Case
        id="datepicker-basic"
        title="1) Basic"
        description="A native date input wrapped in the Datepicker container — pick your anniversary date."
      >
        <Datepicker>
          <label className="b2 mb-1 block" htmlFor="anniversary">
            Anniversary Date
          </label>
          <input
            id="anniversary"
            type="date"
            value={dateA}
            onChange={(e) => setDateA(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400"
          />
          {dateA && <p className="b2 mt-2">Selected: {dateA}</p>}
        </Datepicker>
      </Example.Case>

      <Example.Case
        id="datepicker-prefilled"
        title="2) Pre-filled value"
        description="Datepicker pre-filled with today's date — useful for scheduling a date night."
      >
        <Datepicker>
          <label className="b2 mb-1 block" htmlFor="date-night">
            Schedule a Date Night
          </label>
          <input
            id="date-night"
            type="date"
            value={dateB}
            onChange={(e) => setDateB(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400"
          />
        </Datepicker>
      </Example.Case>

      <Example.Case
        id="datepicker-with-action"
        title="3) With action button"
        description="Datepicker paired with a primary action to confirm a special occasion reminder."
      >
        <Datepicker className="space-y-3">
          <div>
            <label className="b2 mb-1 block" htmlFor="reminder-date">
              Set a Special Reminder
            </label>
            <input
              id="reminder-date"
              type="date"
              value={dateC}
              onChange={(e) => setDateC(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <Button variant="primary" disabled={!dateC}>
            Save Reminder
          </Button>
        </Datepicker>
      </Example.Case>

      <Example.Case
        id="datepicker-secondary"
        title="4) Secondary variant"
        description="Datepicker using the secondary variant for a subtle inline form."
      >
        <Datepicker variant="secondary">
          <label className="b2 mb-1 block" htmlFor="first-met">
            Day We First Met
          </label>
          <input
            id="first-met"
            type="date"
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400"
          />
        </Datepicker>
      </Example.Case>
    </Example>
  );
};
