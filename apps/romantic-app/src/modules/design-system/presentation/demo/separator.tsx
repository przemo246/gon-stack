import { Separator } from '../../../../libs/ui/separator';

import { Example } from './example';

export const SeparatorDemo = () => {
  return (
    <Example
      id="separator-examples"
      title="Separator"
      description="A visual divider line that separates related content sections horizontally or vertically."
    >
      <Example.Case
        id="separator-default"
        title="1) Default (Horizontal)"
        description="Default horizontal separator using the default color token."
      >
        <div className="flex flex-col gap-4">
          <p className="b2">Our love story began on a quiet evening in June.</p>
          <Separator />
          <p className="b2">
            And it has been growing stronger every day since.
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="separator-primary"
        title="2) Primary Variant"
        description="Horizontal separator styled with the primary color token."
      >
        <div className="flex flex-col gap-4">
          <p className="b2 font-medium">Chapter One: The First Meeting</p>
          <Separator variant="primary" />
          <p className="b2">
            It was a serendipitous encounter neither of us expected.
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="separator-secondary"
        title="3) Secondary Variant"
        description="Horizontal separator styled with the secondary color token."
      >
        <div className="flex flex-col gap-4">
          <p className="b2 font-medium">Morning Routine</p>
          <Separator variant="secondary" />
          <p className="b2">Coffee, a quiet moment, and a good-morning kiss.</p>
        </div>
      </Example.Case>

      <Example.Case
        id="separator-vertical"
        title="4) Vertical Orientation"
        description="Vertical separator for side-by-side content divisions."
      >
        <div className="flex items-center gap-4 h-12">
          <span className="b2">Her side</span>
          <Separator orientation="vertical" />
          <span className="b2">His side</span>
          <Separator orientation="vertical" variant="primary" />
          <span className="b2">Our side</span>
        </div>
      </Example.Case>

      <Example.Case
        id="separator-in-profile"
        title="5) Inside a Profile Card"
        description="Practical usage: separating sections within a relationship profile."
      >
        <div className="flex flex-col gap-3 rounded-xl border border-(--card-border) bg-(--card-bg) p-5">
          <div>
            <p className="b1 font-semibold">Alex &amp; Jordan</p>
            <p className="b3 opacity-60">Together since 14 Feb 2020</p>
          </div>
          <Separator />
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <span className="b1 font-bold">1,869</span>
              <span className="b3 opacity-60">days together</span>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center">
              <span className="b1 font-bold">347</span>
              <span className="b3 opacity-60">memories logged</span>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center">
              <span className="b1 font-bold">12</span>
              <span className="b3 opacity-60">trips taken</span>
            </div>
          </div>
          <Separator />
          <p className="b3 opacity-60">
            &quot;Every day with you is my favorite day.&quot;
          </p>
        </div>
      </Example.Case>
    </Example>
  );
};
