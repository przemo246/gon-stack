import { Button } from '../../../../libs/ui/button';
import { Card } from '../../../../libs/ui/card';

import { Example } from './example';

export const CardDemo = () => {
  return (
    <Example
      id="card-examples"
      title="Card Demo"
      description="UI primitive - usage examples"
    >
      <Example.Case
        id="card-basic"
        title="1) Basic usage"
        description="Simple children-based composition with spacing utilities."
      >
        <Card className="p-5 md:p-6">
          <h3 className="t3">Date Night Plan</h3>
          <p className="b2">
            Pick a cozy movie and order your favorite dessert.
          </p>
        </Card>
      </Example.Case>

      <Example.Case
        id="card-structured"
        title="2) Structured content"
        description="Header / body / footer composition with utility classes."
      >
        <Card className="p-5 md:p-6">
          <header className="pb-4 border-b border-surface-200/70">
            <p className="v2">Compatibility Insight</p>
            <h3 className="t3">Communication style</h3>
          </header>
          <div className="py-4">
            <p className="b2">
              You both prefer calm conversations and clear expectations.
            </p>
          </div>
          <footer className="pt-4 border-t border-surface-200/70">
            <Button variant="secondary">See details</Button>
          </footer>
        </Card>
      </Example.Case>

      <Example.Case
        id="card-long-content"
        title="3) Long content"
        description="Card remains readable with longer text and nested lists."
      >
        <Card className="p-5 md:p-6 space-y-4">
          <h3 className="t3">Weekly Reflection</h3>
          <p className="b2">
            This week felt meaningful because both partners made space for
            deeper conversations. Small rituals, like checking in before sleep,
            built emotional safety and reduced friction during busy workdays.
          </p>
          <ul className="list-disc space-y-2 pl-4 text-text-primary">
            <li>
              <p className="b2">Shared one appreciation each evening</p>
            </li>
            <li>
              <p className="b2">Planned one no-phone dinner</p>
            </li>
            <li>
              <p className="b2">Resolved one conflict with active listening</p>
            </li>
          </ul>
        </Card>
      </Example.Case>

      <Example.Case
        id="card-nested"
        title="4) Nested cards"
        description="Card can host nested cards for grouped blocks."
      >
        <Card className="p-5 md:p-6 space-y-3">
          <h3 className="t3">Match summary</h3>
          <Card className="p-4">
            <p className="v2">Shared category</p>
            <p className="b2">Love Languages</p>
          </Card>
          <Card className="p-4">
            <p className="v2">Next challenge</p>
            <p className="b2">Creative Drawing Round</p>
          </Card>
        </Card>
      </Example.Case>
    </Example>
  );
};
