import { useState } from 'react';

import { Button } from '../../../../libs/ui/button';
import { Spinner } from '../../../../libs/ui/spinner';

import { Example } from './example';

export const SpinnerDemo = () => {
  const [loading, setLoading] = useState(false);

  const simulate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Example
      id="spinner-examples"
      title="Spinner"
      description="An animated circular indicator that signals loading or processing is in progress."
    >
      <Example.Case
        id="spinner-sizes"
        title="1) Sizes"
        description="All three sizes — sm, md (default), lg — side by side."
      >
        <div className="flex items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </Example.Case>

      <Example.Case
        id="spinner-variants"
        title="2) Variants"
        description="Primary and secondary colour variants."
      >
        <div className="flex items-center gap-6">
          <Spinner variant="primary" />
          <Spinner variant="secondary" />
        </div>
      </Example.Case>

      <Example.Case
        id="spinner-inline"
        title="3) Inline with text"
        description="Spinner placed alongside a status message while loading partner suggestions."
      >
        <div className="flex items-center gap-2 text-sm text-(--text-muted)">
          <Spinner size="sm" />
          <span>Finding your perfect match…</span>
        </div>
      </Example.Case>

      <Example.Case
        id="spinner-button-loading"
        title="4) Button loading state"
        description="Button that triggers a simulated async action and shows a spinner while in-flight."
      >
        <Button
          onClick={simulate}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading && <Spinner size="sm" />}
          {loading ? 'Sending love note…' : 'Send love note'}
        </Button>
      </Example.Case>
    </Example>
  );
};
