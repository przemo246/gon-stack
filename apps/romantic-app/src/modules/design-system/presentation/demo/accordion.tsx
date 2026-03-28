import { Accordion } from '../../../../libs/ui/accordion';

import { Example } from './example';

type RenderProp = (isOpen: boolean, toggle: () => void) => React.ReactNode;
const rp = (fn: RenderProp) => fn as unknown as React.ReactNode;

export const AccordionDemo = () => {
  return (
    <Example
      id="accordion-examples"
      title="Accordion"
      description="A vertically stacked set of interactive headings that each reveal an associated section of content when clicked."
    >
      <Example.Case
        id="accordion-basic"
        title="1) Basic"
        description="Default closed accordion — trigger toggles content via the render-prop."
      >
        <Accordion.Root className="max-w-md">
          {rp((isOpen, toggle) => (
            <>
              <Accordion.Trigger onClick={toggle}>
                What are your love languages?
              </Accordion.Trigger>
              {isOpen && (
                <Accordion.Content>
                  My top love languages are words of affirmation and quality
                  time. I feel most connected when we have deep conversations or
                  simply enjoy each other&apos;s company without distractions.
                </Accordion.Content>
              )}
            </>
          ))}
        </Accordion.Root>
      </Example.Case>

      <Example.Case
        id="accordion-default-open"
        title="2) Default open"
        description="Accordion that starts expanded via the defaultOpen prop."
      >
        <Accordion.Root defaultOpen className="max-w-md">
          {rp((isOpen, toggle) => (
            <>
              <Accordion.Trigger onClick={toggle}>
                Our first date story
              </Accordion.Trigger>
              {isOpen && (
                <Accordion.Content>
                  We met at a cozy bookshop on a rainy Tuesday. You picked up
                  the same novel I had been searching for weeks — and the rest,
                  as they say, is history.
                </Accordion.Content>
              )}
            </>
          ))}
        </Accordion.Root>
      </Example.Case>

      <Example.Case
        id="accordion-multiple"
        title="3) Multiple items (controlled)"
        description="A list of FAQs where each accordion manages its own open state independently."
      >
        <div className="max-w-md space-y-2">
          {[
            {
              q: 'How do you handle conflict?',
              a: 'I believe in calm, open conversations. Taking a short break to breathe before discussing helps me stay constructive.',
            },
            {
              q: 'What does a perfect evening look like?',
              a: 'Cooking dinner together, a long walk, then curling up with a film and a glass of wine.',
            },
            {
              q: 'Are you an introvert or extrovert?',
              a: 'A blend of both — I recharge alone but truly come alive in meaningful one-on-one connection.',
            },
          ].map(({ q, a }) => (
            <Accordion.Root key={q}>
              {rp((isOpen, toggle) => (
                <>
                  <Accordion.Trigger onClick={toggle}>{q}</Accordion.Trigger>
                  {isOpen && <Accordion.Content>{a}</Accordion.Content>}
                </>
              ))}
            </Accordion.Root>
          ))}
        </div>
      </Example.Case>

      <Example.Case
        id="accordion-external-control"
        title="4) External control"
        description="Accordion with secondary variant styling."
      >
        <Accordion.Root variant="secondary" className="max-w-md">
          {rp((isOpen, toggle) => (
            <>
              <Accordion.Trigger onClick={toggle}>
                A love note for you
              </Accordion.Trigger>
              {isOpen && (
                <Accordion.Content>
                  Every moment with you turns ordinary days into memories I will
                  cherish forever. Thank you for being you.
                </Accordion.Content>
              )}
            </>
          ))}
        </Accordion.Root>
      </Example.Case>
    </Example>
  );
};
