import { SkipLink } from '../../../../libs/ui/skip-link';

import { Example } from './example';

export const SkipLinkDemo = () => {
  return (
    <Example
      id="skip-link-examples"
      title="Skip Link"
      description="A hidden-by-default link that appears on focus and allows keyboard users to skip repetitive navigation."
    >
      <Example.Case
        id="skip-link-primary"
        title="1) Primary (focus to reveal)"
        description="Visually hidden until focused via keyboard — Tab into the box below to see it appear."
      >
        <div className="relative border border-dashed border-(--input-border) rounded-lg p-6 text-sm text-(--text-muted)">
          <SkipLink href="#main-content" variant="primary">
            Skip to main content
          </SkipLink>
          <p>
            Press Tab to reveal the skip link above (it is sr-only until
            focused).
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="skip-link-secondary"
        title="2) Secondary variant"
        description="Same accessibility behaviour with the secondary colour scheme."
      >
        <div className="relative border border-dashed border-(--input-border) rounded-lg p-6 text-sm text-(--text-muted)">
          <SkipLink href="#main-content" variant="secondary">
            Skip to main content
          </SkipLink>
          <p>Press Tab to reveal the secondary-styled skip link.</p>
        </div>
      </Example.Case>

      <Example.Case
        id="skip-link-multiple"
        title="3) Multiple skip links"
        description="A set of skip links targeting different landmark regions of a page."
      >
        <div className="relative border border-dashed border-(--input-border) rounded-lg p-6 text-sm text-(--text-muted)">
          <SkipLink href="#main-content">Skip to main content</SkipLink>
          <SkipLink href="#date-planner">Skip to date planner</SkipLink>
          <SkipLink href="#messages">Skip to messages</SkipLink>
          <p>Tab through to cycle between the three skip links.</p>
        </div>
      </Example.Case>
    </Example>
  );
};
