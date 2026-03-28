import { useState } from 'react';

import { Textarea } from '../../../../libs/ui/textarea';

import { Example } from './example';

export const TextareaDemo = () => {
  const [message, setMessage] = useState('');

  return (
    <Example
      id="textarea-examples"
      title="Textarea"
      description="A larger text input field that allows users to enter multiple lines of free-form text."
    >
      <Example.Case
        id="textarea-basic"
        title="1) Basic"
        description="Standard textarea with a placeholder prompt."
      >
        <Textarea placeholder="Write a love note…" className="max-w-sm" />
      </Example.Case>

      <Example.Case
        id="textarea-controlled"
        title="2) Controlled with character count"
        description="Textarea bound to state, showing a live character counter — useful for a profile bio field."
      >
        <div className="flex flex-col gap-1 max-w-sm">
          <Textarea
            placeholder="Tell your story in a few words…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={200}
            rows={4}
          />
          <p className="text-right text-xs text-(--text-muted)">
            {message.length} / 200
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="textarea-disabled"
        title="3) Disabled"
        description="Non-interactive state — pre-filled content that cannot be edited."
      >
        <Textarea
          value="Our first date was magical — a sunset picnic by the river."
          disabled
          className="max-w-sm"
          readOnly
        />
      </Example.Case>

      <Example.Case
        id="textarea-custom-rows"
        title="4) Custom rows"
        description="rows prop sets the initial visible height; the field is still resizable."
      >
        <Textarea
          placeholder="Describe your ideal romantic getaway in as much detail as you like…"
          rows={6}
          className="max-w-sm"
        />
      </Example.Case>
    </Example>
  );
};
