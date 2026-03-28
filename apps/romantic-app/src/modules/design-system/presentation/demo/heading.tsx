import { Heading } from '../../../../libs/ui/heading';

import { Example } from './example';

export const HeadingDemo = () => {
  return (
    <Example
      id="heading-examples"
      title="Heading"
      description="A semantic heading element (h1–h6) that establishes document hierarchy and visual weight."
    >
      <Example.Case
        id="heading-levels"
        title="1) All levels (level prop)"
        description="Six semantic heading levels rendered via the level prop."
      >
        <div className="space-y-3">
          <Heading level={1}>Level 1 — Our Love Story</Heading>
          <Heading level={2}>Level 2 — Chapter One</Heading>
          <Heading level={3}>Level 3 — The First Meeting</Heading>
          <Heading level={4}>Level 4 — A Rainy Afternoon</Heading>
          <Heading level={5}>Level 5 — Coffee and Confessions</Heading>
          <Heading level={6}>Level 6 — The Rest is History</Heading>
        </div>
      </Example.Case>

      <Example.Case
        id="heading-as-prop"
        title="2) Custom tag (as prop)"
        description="Override the rendered HTML tag while keeping level styles intact."
      >
        <div className="space-y-3">
          <Heading level={2} as="h1">
            Rendered as h1, styled as level 2
          </Heading>
          <Heading level={4} as="h2">
            Rendered as h2, styled as level 4
          </Heading>
        </div>
      </Example.Case>

      <Example.Case
        id="heading-default"
        title="3) Default (level 2)"
        description="When level is omitted the component defaults to h2 with t2 styles."
      >
        <Heading>Forever Yours</Heading>
      </Example.Case>

      <Example.Case
        id="heading-custom-class"
        title="4) Custom className"
        description="Additional Tailwind classes are merged in via cn()."
      >
        <Heading level={3} className="italic opacity-75">
          Whispered Promises
        </Heading>
      </Example.Case>

      <Example.Case
        id="heading-in-context"
        title="5) In-context composition"
        description="Headings used alongside body text to form a small card-like section."
      >
        <div className="space-y-2 max-w-md">
          <Heading level={3}>A Note for You</Heading>
          <p className="b2">
            Every morning I wake up grateful for the little moments we share —
            the coffee, the laughter, and the quiet of just being together.
          </p>
          <Heading level={5} className="opacity-60">
            — with all my heart
          </Heading>
        </div>
      </Example.Case>
    </Example>
  );
};
