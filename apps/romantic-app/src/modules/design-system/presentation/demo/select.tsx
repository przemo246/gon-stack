import { useState } from 'react';

import { Select } from '../../../../libs/ui/select';
import { Button } from '../../../../libs/ui/button';

import { Example } from './example';

export const SelectDemo = () => {
  const [language, setLanguage] = useState('');
  const [formResult, setFormResult] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setFormResult(`Destination: ${data.get('destination') ?? '—'}`);
  };

  return (
    <Example
      id="select-examples"
      title="Select"
      description="A form control that displays a dropdown list allowing users to choose one option from many."
    >
      <Example.Case
        id="select-basic"
        title="1) Basic"
        description="Standard select with a list of options."
      >
        <Select defaultValue="">
          <option value="" disabled>
            Choose your anniversary month…
          </option>
          {[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ].map((month) => (
            <option key={month} value={month.toLowerCase()}>
              {month}
            </option>
          ))}
        </Select>
      </Example.Case>

      <Example.Case
        id="select-controlled"
        title="2) Controlled"
        description="Controlled select with value and onChange reflecting state below."
      >
        <div className="flex flex-col gap-3">
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="" disabled>
              Select your love language…
            </option>
            <option value="words">Words of Affirmation</option>
            <option value="acts">Acts of Service</option>
            <option value="gifts">Receiving Gifts</option>
            <option value="quality">Quality Time</option>
            <option value="touch">Physical Touch</option>
          </Select>
          <p className="b2">
            Selected:{' '}
            <strong>
              {language || <span className="opacity-50">none</span>}
            </strong>
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="select-option-groups"
        title="3) Option Groups"
        description="Related options grouped with optgroup for clearer hierarchy."
      >
        <Select defaultValue="">
          <option value="" disabled>
            Pick a date idea…
          </option>
          <optgroup label="Outdoor">
            <option value="picnic">Sunset Picnic</option>
            <option value="hike">Nature Hike</option>
            <option value="beach">Beach Stroll</option>
          </optgroup>
          <optgroup label="Indoor">
            <option value="cooking">Cooking Together</option>
            <option value="movie">Movie Night</option>
            <option value="spa">Home Spa</option>
          </optgroup>
          <optgroup label="Adventure">
            <option value="travel">Weekend Getaway</option>
            <option value="concert">Live Concert</option>
          </optgroup>
        </Select>
      </Example.Case>

      <Example.Case
        id="select-form"
        title="4) Form Integration"
        description="Select inside a native form; value is read via FormData on submit."
      >
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Select name="destination" defaultValue="">
            <option value="" disabled>
              Choose honeymoon destination…
            </option>
            <option value="paris">Paris, France</option>
            <option value="maldives">Maldives</option>
            <option value="santorini">Santorini, Greece</option>
            <option value="bali">Bali, Indonesia</option>
            <option value="kyoto">Kyoto, Japan</option>
          </Select>
          <Button variant="secondary" type="submit">
            Book now
          </Button>
          {formResult && <p className="b2">{formResult}</p>}
        </form>
      </Example.Case>

      <Example.Case
        id="select-disabled"
        title="5) Disabled"
        description="Non-interactive state when the selection is not available."
      >
        <Select disabled defaultValue="locked">
          <option value="locked">Selection unavailable</option>
          <option value="other">Other option</option>
        </Select>
      </Example.Case>
    </Example>
  );
};
