import { Badge } from '../../../../libs/ui/badge';

import { Example } from './example';

export const BadgeDemo = () => {
  return (
    <Example
      id="badge-examples"
      title="Badge Demo"
      description="Badge - usage examples"
    >
      <Example.Case
        id="badge-primary"
        title="1) Primary"
        description="Primary badge with pink border and tinted background."
      >
        <Badge variant="primary">Love Languages</Badge>
      </Example.Case>

      <Example.Case
        id="badge-secondary"
        title="2) Secondary"
        description="Secondary badge with cyan border and tinted background."
      >
        <Badge variant="secondary">Medium</Badge>
      </Example.Case>

      <Example.Case
        id="badge-side-by-side"
        title="3) Side by side"
        description="Both badge variants displayed together."
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Direct</Badge>
          <Badge variant="secondary">Expressive</Badge>
          <Badge variant="primary">Playful</Badge>
          <Badge variant="secondary">Spontaneous</Badge>
        </div>
      </Example.Case>

      <Example.Case
        id="badge-in-context"
        title="4) In context"
        description="Badges used alongside content as labels and metadata."
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">Relationship Dynamics</Badge>
          <Badge variant="secondary">Easy</Badge>
          <Badge variant="primary">Trust & Fidelity</Badge>
          <Badge variant="secondary">Hard</Badge>
          <Badge variant="primary">Active</Badge>
        </div>
      </Example.Case>
    </Example>
  );
};
