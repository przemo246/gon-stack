import { useState } from 'react';

import { Checkbox } from '../../../../libs/ui/checkbox';

import { Example } from './example';

export const CheckboxDemo = () => {
  const [agreed, setAgreed] = useState(false);
  const loveLanguages = [
    { id: 'words', label: 'Words of affirmation' },
    { id: 'acts', label: 'Acts of service' },
    { id: 'gifts', label: 'Receiving gifts' },
    { id: 'time', label: 'Quality time' },
    { id: 'touch', label: 'Physical touch' },
  ];
  const [selected, setSelected] = useState<string[]>(['words', 'time']);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );

  return (
    <Example
      id="checkbox-examples"
      title="Checkbox"
      description="A form control that allows users to select or deselect one or more independent options."
    >
      <Example.Case
        id="checkbox-basic"
        title="1) Basic"
        description="A single unchecked checkbox with a label."
      >
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <Checkbox />
          Remember this device
        </label>
      </Example.Case>

      <Example.Case
        id="checkbox-checked"
        title="2) Checked by default"
        description="Checkbox rendered with defaultChecked so it starts in the checked state."
      >
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <Checkbox defaultChecked />
          Receive date-night reminders
        </label>
      </Example.Case>

      <Example.Case
        id="checkbox-controlled"
        title="3) Controlled"
        description="Checkbox whose value is driven by React state — toggling updates the label."
      >
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          {agreed
            ? 'I have read our relationship agreement ✓'
            : 'I agree to always hold hands during scary movies'}
        </label>
      </Example.Case>

      <Example.Case
        id="checkbox-group"
        title="4) Checkbox group"
        description="Multiple checkboxes used to select love languages."
      >
        <fieldset className="space-y-2">
          <legend className="mb-3 text-sm font-medium">
            Select your love languages
          </legend>
          {loveLanguages.map(({ id, label }) => (
            <label
              key={id}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                checked={selected.includes(id)}
                onChange={() => toggle(id)}
              />
              {label}
            </label>
          ))}
          {selected.length > 0 && (
            <p className="pt-1 text-xs text-(--text-muted)">
              Selected: {selected.join(', ')}
            </p>
          )}
        </fieldset>
      </Example.Case>

      <Example.Case
        id="checkbox-disabled"
        title="5) Disabled states"
        description="Disabled unchecked and disabled checked variants."
      >
        <div className="space-y-2">
          <label className="flex cursor-not-allowed items-center gap-2 text-sm opacity-60">
            <Checkbox disabled />
            Premium feature (upgrade to unlock)
          </label>
          <label className="flex cursor-not-allowed items-center gap-2 text-sm opacity-60">
            <Checkbox disabled defaultChecked />
            Verified couple (cannot be changed)
          </label>
        </div>
      </Example.Case>
    </Example>
  );
};
