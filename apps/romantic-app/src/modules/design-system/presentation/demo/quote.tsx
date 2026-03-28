import { Quote } from '../../../../libs/ui/quote';

import { Example } from './example';

export const QuoteDemo = () => {
  return (
    <Example
      id="quote-examples"
      title="Quote"
      description="Displays a pull quote or blockquote with optional attribution to the source or author."
    >
      <Example.Case
        id="quote-primary"
        title="1) Primary variant"
        description="Default primary blockquote with a left border accent."
      >
        <Quote variant="primary">
          The best thing to hold onto in life is each other.
        </Quote>
      </Example.Case>

      <Example.Case
        id="quote-secondary"
        title="2) Secondary variant"
        description="Secondary colour scheme for a softer visual tone."
      >
        <Quote variant="secondary">
          A successful marriage requires falling in love many times, always with
          the same person.
        </Quote>
      </Example.Case>

      <Example.Case
        id="quote-with-cite"
        title="3) With attribution (cite)"
        description="Passing the cite prop renders a figcaption below the quote."
      >
        <div className="flex flex-col gap-6 max-w-prose">
          <Quote variant="primary" cite="Audrey Hepburn">
            The best thing to hold onto in life is each other.
          </Quote>
          <Quote variant="secondary" cite="Mignon McLaughlin">
            A successful marriage requires falling in love many times, always
            with the same person.
          </Quote>
        </div>
      </Example.Case>

      <Example.Case
        id="quote-no-cite"
        title="4) Without attribution"
        description="When cite is omitted the figcaption is not rendered."
      >
        <Quote>
          Love is not about how many days, months, or years you have been
          together. Love is about how much you love each other every single day.
        </Quote>
      </Example.Case>

      <Example.Case
        id="quote-both-variants"
        title="5) Both variants compared"
        description="Side-by-side comparison of primary and secondary styling."
      >
        <div className="flex flex-col gap-4 max-w-prose">
          <Quote variant="primary" cite="Pablo Neruda">
            I love you without knowing how, or when, or from where.
          </Quote>
          <Quote variant="secondary" cite="Nicholas Sparks">
            The best love is the kind that awakens the soul and makes us reach
            for more.
          </Quote>
        </div>
      </Example.Case>

      <Example.Case
        id="quote-long-content"
        title="6) Long-form quote"
        description="The component handles multi-sentence text comfortably within the bordered block."
      >
        <Quote
          variant="primary"
          cite="Rainer Maria Rilke"
          className="max-w-prose"
        >
          Once the realization is accepted that even between the closest human
          beings infinite distances continue, a wonderful living side by side
          can grow, and they can rejoice in all that is bright and share quietly
          all that is dark.
        </Quote>
      </Example.Case>

      <Example.Case
        id="quote-feed"
        title="7) Quote feed"
        description="A list of alternating quotes as you might see in a 'daily inspiration' section."
      >
        <div className="flex flex-col gap-4 max-w-prose">
          {[
            {
              text: 'To love and be loved is to feel the sun from both sides.',
              cite: 'David Viscott',
              variant: 'primary' as const,
            },
            {
              text: 'Where there is love there is life.',
              cite: 'Mahatma Gandhi',
              variant: 'secondary' as const,
            },
            {
              text: 'The greatest happiness of life is the conviction that we are loved.',
              cite: 'Victor Hugo',
              variant: 'primary' as const,
            },
          ].map(({ text, cite, variant }) => (
            <Quote key={cite} variant={variant} cite={cite}>
              {text}
            </Quote>
          ))}
        </div>
      </Example.Case>
    </Example>
  );
};
