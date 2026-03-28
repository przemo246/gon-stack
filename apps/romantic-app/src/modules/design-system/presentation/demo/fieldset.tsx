import { useState } from 'react';

import { Button } from '../../../../libs/ui/button';
import { Fieldset } from '../../../../libs/ui/fieldset';

import { Example } from './example';

export const FieldsetDemo = () => {
  const [goal, setGoal] = useState('');
  const [love, setLove] = useState('words');

  return (
    <Example
      id="fieldset-examples"
      title="Fieldset"
      description="A semantic container that groups related form fields with an optional legend for accessibility."
    >
      <Example.Case
        id="fieldset-basic"
        title="1) Basic"
        description="Simple fieldset grouping related form inputs together."
      >
        <Fieldset className="gap-3 rounded-xl border border-surface-200/70 p-4">
          <legend className="px-1 text-sm font-semibold text-text-primary">
            Personal Details
          </legend>
          <div className="flex flex-col gap-1">
            <label className="b2 font-medium" htmlFor="fs-name">
              Your name
            </label>
            <input
              id="fs-name"
              className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              placeholder="e.g. Alex"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="b2 font-medium" htmlFor="fs-partner">
              Partner&apos;s name
            </label>
            <input
              id="fs-partner"
              className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              placeholder="e.g. Jordan"
            />
          </div>
        </Fieldset>
      </Example.Case>

      <Example.Case
        id="fieldset-disabled"
        title="2) Disabled state"
        description="All controls inside a disabled fieldset become non-interactive."
      >
        <Fieldset
          disabled
          className="gap-3 rounded-xl border border-surface-200/40 p-4 opacity-50"
        >
          <legend className="px-1 text-sm font-semibold text-text-primary">
            Anniversary Details (locked)
          </legend>
          <div className="flex flex-col gap-1">
            <label className="b2 font-medium" htmlFor="fs-date">
              Anniversary date
            </label>
            <input
              id="fs-date"
              type="date"
              defaultValue="2022-06-15"
              className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-text-primary"
            />
          </div>
          <Button variant="primary" disabled>
            Update date
          </Button>
        </Fieldset>
      </Example.Case>

      <Example.Case
        id="fieldset-relationship-goal"
        title="3) Relationship goal form"
        description="A practical fieldset capturing a shared couple goal with controlled input."
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <Fieldset className="gap-3 rounded-xl border border-surface-200/70 p-4">
            <legend className="px-1 text-sm font-semibold text-text-primary">
              Set a Shared Goal
            </legend>
            <div className="flex flex-col gap-1">
              <label className="b2 font-medium" htmlFor="fs-goal">
                Goal description
              </label>
              <input
                id="fs-goal"
                className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                placeholder="e.g. Cook dinner together every Friday"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
          </Fieldset>
          <Fieldset className="gap-3 rounded-xl border border-surface-200/70 p-4">
            <legend className="px-1 text-sm font-semibold text-text-primary">
              Love Language
            </legend>
            {['words', 'touch', 'gifts', 'time', 'service'].map((lang) => (
              <label
                key={lang}
                className="flex cursor-pointer items-center gap-2 text-sm text-text-primary"
              >
                <input
                  type="radio"
                  name="love-lang"
                  value={lang}
                  checked={love === lang}
                  onChange={() => setLove(lang)}
                  className="accent-accent-500"
                />
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </label>
            ))}
          </Fieldset>
          <Button variant="primary" type="submit" disabled={!goal}>
            Save goal
          </Button>
          {goal && (
            <p className="b2 text-text-secondary">
              Goal saved: <strong>{goal}</strong> — love language:{' '}
              <strong>{love}</strong>
            </p>
          )}
        </form>
      </Example.Case>

      <Example.Case
        id="fieldset-nested"
        title="4) Nested fieldsets"
        description="Fieldsets can be nested to group sub-sections within a larger form section."
      >
        <Fieldset className="gap-4 rounded-xl border border-surface-200/70 p-4">
          <legend className="px-1 text-sm font-semibold text-text-primary">
            Date Night Planner
          </legend>
          <Fieldset className="gap-2 rounded-lg border border-surface-200/50 p-3">
            <legend className="px-1 text-xs font-semibold text-text-secondary">
              Location
            </legend>
            <label className="flex items-center gap-2 text-sm text-text-primary">
              <input
                type="radio"
                name="location"
                defaultChecked
                className="accent-accent-500"
              />
              Home — cozy night in
            </label>
            <label className="flex items-center gap-2 text-sm text-text-primary">
              <input
                type="radio"
                name="location"
                className="accent-accent-500"
              />
              Restaurant — dress up
            </label>
          </Fieldset>
          <Fieldset className="gap-2 rounded-lg border border-surface-200/50 p-3">
            <legend className="px-1 text-xs font-semibold text-text-secondary">
              Activity
            </legend>
            <label className="flex items-center gap-2 text-sm text-text-primary">
              <input
                type="checkbox"
                defaultChecked
                className="accent-accent-500"
              />
              Watch a film together
            </label>
            <label className="flex items-center gap-2 text-sm text-text-primary">
              <input type="checkbox" className="accent-accent-500" />
              Cook a new recipe
            </label>
          </Fieldset>
        </Fieldset>
      </Example.Case>
    </Example>
  );
};
