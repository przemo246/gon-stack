import { useState } from 'react';

import { ProgressBar } from '../../../../libs/ui/progress-bar';
import { Button } from '../../../../libs/ui/button';

import { Example } from './example';

export const ProgressBarDemo = () => {
  const [compatValue, setCompatValue] = useState(62);

  const increment = () => setCompatValue((v) => Math.min(v + 10, 100));
  const decrement = () => setCompatValue((v) => Math.max(v - 10, 0));

  return (
    <Example
      id="progress-bar-examples"
      title="Progress Bar"
      description="A visual indicator that shows the progress of a linear process toward completion."
    >
      <Example.Case
        id="progress-bar-primary"
        title="1) Primary variant"
        description="Default primary gradient bar at various fill levels."
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <ProgressBar value={25} />
          <ProgressBar value={50} />
          <ProgressBar value={75} />
          <ProgressBar value={100} />
        </div>
      </Example.Case>

      <Example.Case
        id="progress-bar-secondary"
        title="2) Secondary variant"
        description="Secondary gradient for alternate visual contexts."
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <ProgressBar variant="secondary" value={30} />
          <ProgressBar variant="secondary" value={60} />
          <ProgressBar variant="secondary" value={90} />
        </div>
      </Example.Case>

      <Example.Case
        id="progress-bar-edge-cases"
        title="3) Edge cases — 0 % and 100 %"
        description="The bar clamps value between 0 and max, so it never overflows."
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div>
            <p className="b3 mb-1">0 % (empty)</p>
            <ProgressBar value={0} />
          </div>
          <div>
            <p className="b3 mb-1">100 % (full)</p>
            <ProgressBar value={100} />
          </div>
          <div>
            <p className="b3 mb-1">value=200 clamped to 100 %</p>
            <ProgressBar value={200} />
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="progress-bar-custom-max"
        title="4) Custom max"
        description="Pass a custom max to track arbitrary totals, like compatibility points."
      >
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <p className="b2">Compatibility score: 7 / 10</p>
          <ProgressBar value={7} max={10} />
          <p className="b2">Shared interests: 3 / 8</p>
          <ProgressBar variant="secondary" value={3} max={8} />
        </div>
      </Example.Case>

      <Example.Case
        id="progress-bar-interactive"
        title="5) Interactive (controlled)"
        description="Controlled value updated by buttons to demonstrate the animated transition."
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <p className="b2">
            Relationship compatibility: <strong>{compatValue}%</strong>
          </p>
          <ProgressBar value={compatValue} />
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={decrement}
              disabled={compatValue <= 0}
            >
              − 10
            </Button>
            <Button
              variant="secondary"
              onClick={increment}
              disabled={compatValue >= 100}
            >
              + 10
            </Button>
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="progress-bar-labelled-list"
        title="6) Labelled list"
        description="Multiple labelled bars showing a compatibility breakdown."
      >
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {[
            { label: 'Communication', value: 85 },
            { label: 'Trust', value: 72 },
            { label: 'Shared values', value: 60 },
            { label: 'Physical affection', value: 90 },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="flex justify-between mb-1">
                <span className="b3">{label}</span>
                <span className="b3">{value}%</span>
              </div>
              <ProgressBar value={value} />
            </div>
          ))}
        </div>
      </Example.Case>
    </Example>
  );
};
