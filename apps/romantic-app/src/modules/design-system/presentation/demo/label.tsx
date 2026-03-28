import { useState } from 'react';

import { Label } from '../../../../libs/ui/label';

import { Example } from './example';

export const LabelDemo = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Example
      id="label-examples"
      title="Label"
      description="Associates a text caption with a form control to improve accessibility and usability."
    >
      <Example.Case
        id="label-basic"
        title="1) Basic"
        description="A simple label element with default styling."
      >
        <Label htmlFor="partner-name">Partner&apos;s name</Label>
        <input
          id="partner-name"
          type="text"
          placeholder="e.g. Alex"
          className="mt-1 block w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm"
        />
      </Example.Case>

      <Example.Case
        id="label-with-checkbox"
        title="2) Wrapping a checkbox"
        description="Label wrapping a checkbox — clicking the label toggles the input."
      >
        <Label className="gap-3">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="h-4 w-4 rounded"
          />
          {checked
            ? 'Relationship status: taken 💑'
            : 'Relationship status: single'}
        </Label>
      </Example.Case>

      <Example.Case
        id="label-multiple-fields"
        title="3) Multiple labelled fields"
        description="Labels paired with several inputs in a simple form."
      >
        <div className="flex flex-col gap-4 max-w-xs">
          <div className="flex flex-col gap-1">
            <Label htmlFor="anniversary">Anniversary date</Label>
            <input
              id="anniversary"
              type="date"
              className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="love-lang">Primary love language</Label>
            <input
              id="love-lang"
              type="text"
              placeholder="e.g. Words of Affirmation"
              className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="label-icon"
        title="4) Label with icon"
        description="Label uses inline-flex with gap-2, so icons sit naturally alongside text."
      >
        <Label htmlFor="mood-note">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          Mood note
        </Label>
        <input
          id="mood-note"
          type="text"
          placeholder="How are you feeling today?"
          className="mt-1 block w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm"
        />
      </Example.Case>
    </Example>
  );
};
