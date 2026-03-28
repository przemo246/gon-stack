import { useState } from 'react';

import { ProgressIndicator } from '../../../../libs/ui/progress-indicator';
import { Button } from '../../../../libs/ui/button';

import { Example } from './example';

export const ProgressIndicatorDemo = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const stepPct = Math.round((step / totalSteps) * 100);

  return (
    <Example
      id="progress-indicator-examples"
      title="Progress Indicator"
      description="A circular or segmented visual indicator of progress toward a goal or completion state."
    >
      <Example.Case
        id="progress-indicator-primary"
        title="1) Primary variant"
        description="Default primary circular indicator at various completion levels."
      >
        <div className="flex flex-wrap items-center gap-6">
          <ProgressIndicator value={0} />
          <ProgressIndicator value={25} />
          <ProgressIndicator value={50} />
          <ProgressIndicator value={75} />
          <ProgressIndicator value={100} />
        </div>
      </Example.Case>

      <Example.Case
        id="progress-indicator-secondary"
        title="2) Secondary variant"
        description="Secondary colour for alternate contexts."
      >
        <div className="flex flex-wrap items-center gap-6">
          <ProgressIndicator variant="secondary" value={20} />
          <ProgressIndicator variant="secondary" value={55} />
          <ProgressIndicator variant="secondary" value={80} />
        </div>
      </Example.Case>

      <Example.Case
        id="progress-indicator-sizes"
        title="3) Sizes — sm / md / lg"
        description="Three sizes to fit different layout densities."
      >
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <ProgressIndicator size="sm" value={65} />
            <span className="b3">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ProgressIndicator size="md" value={65} />
            <span className="b3">md (default)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ProgressIndicator size="lg" value={65} />
            <span className="b3">lg</span>
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="progress-indicator-no-label"
        title="4) Hidden label"
        description="Set showLabel=false when the percentage text is not needed."
      >
        <div className="flex flex-wrap items-center gap-6">
          <ProgressIndicator value={40} showLabel={false} />
          <ProgressIndicator variant="secondary" value={70} showLabel={false} />
          <ProgressIndicator size="lg" value={90} showLabel={false} />
        </div>
      </Example.Case>

      <Example.Case
        id="progress-indicator-custom-max"
        title="5) Custom max"
        description="Track steps through a relationship quiz using a custom max value."
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <ProgressIndicator value={1} max={5} size="lg" />
            <span className="b3">Step 1 of 5</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ProgressIndicator value={3} max={5} size="lg" />
            <span className="b3">Step 3 of 5</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ProgressIndicator value={5} max={5} size="lg" />
            <span className="b3">Complete!</span>
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="progress-indicator-interactive"
        title="6) Interactive step tracker"
        description="Navigate through relationship quiz steps to see the animated arc."
      >
        <div className="flex flex-col items-center gap-4">
          <ProgressIndicator value={step} max={totalSteps} size="lg" />
          <p className="b2">
            Step <strong>{step}</strong> of <strong>{totalSteps}</strong> —{' '}
            {stepPct}% complete
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setStep((s) => Math.max(s - 1, 0))}
              disabled={step <= 0}
            >
              ← Back
            </Button>
            <Button
              variant="secondary"
              onClick={() => setStep((s) => Math.min(s + 1, totalSteps))}
              disabled={step >= totalSteps}
            >
              Next →
            </Button>
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="progress-indicator-dashboard"
        title="7) Dashboard row"
        description="Multiple indicators side by side showing a couple's compatibility breakdown."
      >
        <div className="flex flex-wrap gap-6">
          {[
            { label: 'Communication', value: 82, variant: 'primary' as const },
            { label: 'Trust', value: 74, variant: 'secondary' as const },
            { label: 'Shared goals', value: 61, variant: 'primary' as const },
            { label: 'Affection', value: 93, variant: 'secondary' as const },
          ].map(({ label, value, variant }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <ProgressIndicator variant={variant} value={value} size="lg" />
              <span className="b3 text-center">{label}</span>
            </div>
          ))}
        </div>
      </Example.Case>
    </Example>
  );
};
