import { useState } from 'react';

import { RadioButton } from '../../../../libs/ui/radio-button';

import { Example } from './example';

export const RadioButtonDemo = () => {
  const [selected, setSelected] = useState('dinner');
  const [preference, setPreference] = useState('');

  return (
    <Example
      id="radio-button-examples"
      title="Radio Button"
      description="A form control that allows users to select exactly one option from a set of mutually exclusive choices."
    >
      <Example.Case
        id="radio-button-basic"
        title="1) Basic"
        description="Standalone radio buttons in a group using native name attribute."
      >
        <fieldset className="flex flex-col gap-3 border-0 p-0">
          <legend className="b2 mb-2 font-medium">
            Choose your love language
          </legend>
          {[
            { value: 'words', label: 'Words of Affirmation' },
            { value: 'acts', label: 'Acts of Service' },
            { value: 'gifts', label: 'Receiving Gifts' },
            { value: 'quality', label: 'Quality Time' },
            { value: 'touch', label: 'Physical Touch' },
          ].map(({ value, label }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2.5"
            >
              <RadioButton name="love-language" value={value} />
              <span className="b2">{label}</span>
            </label>
          ))}
        </fieldset>
      </Example.Case>

      <Example.Case
        id="radio-button-controlled"
        title="2) Controlled"
        description="Controlled group with useState tracking the selected value."
      >
        <fieldset className="flex flex-col gap-3 border-0 p-0">
          <legend className="b2 mb-2 font-medium">Plan for tonight</legend>
          {[
            { value: 'dinner', label: 'Romantic dinner at home' },
            { value: 'movie', label: 'Movie night on the couch' },
            { value: 'walk', label: 'Evening walk under the stars' },
          ].map(({ value, label }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2.5"
            >
              <RadioButton
                name="evening-plan"
                value={value}
                checked={selected === value}
                onChange={() => setSelected(value)}
              />
              <span className="b2">{label}</span>
            </label>
          ))}
          <p className="b3 mt-1">
            Selected: <strong>{selected}</strong>
          </p>
        </fieldset>
      </Example.Case>

      <Example.Case
        id="radio-button-default-checked"
        title="3) Default Checked"
        description="Uncontrolled group with a pre-selected option via defaultChecked."
      >
        <fieldset className="flex flex-col gap-3 border-0 p-0">
          <legend className="b2 mb-2 font-medium">
            Preferred anniversary gift
          </legend>
          {[
            { value: 'flowers', label: 'Bouquet of flowers', default: false },
            { value: 'jewelry', label: 'A piece of jewelry', default: true },
            {
              value: 'experience',
              label: 'A shared experience',
              default: false,
            },
          ].map(({ value, label, default: isDefault }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2.5"
            >
              <RadioButton
                name="anniversary-gift"
                value={value}
                defaultChecked={isDefault}
              />
              <span className="b2">{label}</span>
            </label>
          ))}
        </fieldset>
      </Example.Case>

      <Example.Case
        id="radio-button-required"
        title="4) Required (Form Validation)"
        description="Radio group marked as required for native form validation."
      >
        <fieldset className="flex flex-col gap-3 border-0 p-0">
          <legend className="b2 mb-2 font-medium">
            Are you ready to commit? <span className="text-red-500">*</span>
          </legend>
          {[
            { value: 'yes', label: 'Yes, absolutely' },
            { value: 'almost', label: 'Almost there' },
            { value: 'no', label: 'Not yet' },
          ].map(({ value, label }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2.5"
            >
              <RadioButton
                name="commitment"
                value={value}
                checked={preference === value}
                onChange={() => setPreference(value)}
                required
              />
              <span className="b2">{label}</span>
            </label>
          ))}
          {preference && (
            <p className="b3 mt-1">
              Selected: <strong>{preference}</strong>
            </p>
          )}
        </fieldset>
      </Example.Case>

      <Example.Case
        id="radio-button-disabled"
        title="5) Disabled"
        description="Individual options can be disabled to prevent selection."
      >
        <fieldset className="flex flex-col gap-3 border-0 p-0">
          <legend className="b2 mb-2 font-medium">Vacation destination</legend>
          {[
            { value: 'paris', label: 'Paris, France', disabled: false },
            { value: 'maldives', label: 'Maldives (sold out)', disabled: true },
            { value: 'santorini', label: 'Santorini, Greece', disabled: false },
            {
              value: 'bali',
              label: 'Bali, Indonesia (sold out)',
              disabled: true,
            },
          ].map(({ value, label, disabled }) => (
            <label
              key={value}
              className={`flex cursor-pointer items-center gap-2.5 ${disabled ? 'opacity-50' : ''}`}
            >
              <RadioButton
                name="vacation"
                value={value}
                disabled={disabled}
                defaultChecked={value === 'paris'}
              />
              <span className="b2">{label}</span>
            </label>
          ))}
        </fieldset>
      </Example.Case>
    </Example>
  );
};
