import { useState } from 'react';

import { SegmentedControl } from '../../../../libs/ui/segmented-control';

import { Example } from './example';

export const SegmentedControlDemo = () => {
  const [view, setView] = useState('timeline');
  const [mood, setMood] = useState('happy');
  const [period, setPeriod] = useState('week');

  return (
    <Example
      id="segmented-control-examples"
      title="Segmented Control"
      description="A set of buttons grouped together where selecting one option deselects the others, acting as a toggle group."
    >
      <Example.Case
        id="segmented-control-basic"
        title="1) Basic (Uncontrolled)"
        description="Self-managed selection using defaultValue."
      >
        <SegmentedControl.Root defaultValue="messages" name="nav-basic">
          <SegmentedControl.Item value="messages">
            Messages
          </SegmentedControl.Item>
          <SegmentedControl.Item value="memories">
            Memories
          </SegmentedControl.Item>
          <SegmentedControl.Item value="plans">Plans</SegmentedControl.Item>
        </SegmentedControl.Root>
      </Example.Case>

      <Example.Case
        id="segmented-control-controlled"
        title="2) Controlled"
        description="Externally controlled with value and onChange, reflecting state below."
      >
        <div className="flex flex-col gap-4">
          <SegmentedControl.Root
            value={view}
            onChange={setView}
            name="nav-view"
          >
            <SegmentedControl.Item value="timeline">
              Timeline
            </SegmentedControl.Item>
            <SegmentedControl.Item value="calendar">
              Calendar
            </SegmentedControl.Item>
            <SegmentedControl.Item value="map">Map</SegmentedControl.Item>
          </SegmentedControl.Root>
          <p className="b2">
            Active view: <strong>{view}</strong>
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="segmented-control-mood"
        title="3) Relationship Mood Picker"
        description="Practical example selecting the couple's mood for the day."
      >
        <div className="flex flex-col gap-4">
          <SegmentedControl.Root
            value={mood}
            onChange={setMood}
            name="mood-picker"
          >
            <SegmentedControl.Item value="happy">Happy</SegmentedControl.Item>
            <SegmentedControl.Item value="romantic">
              Romantic
            </SegmentedControl.Item>
            <SegmentedControl.Item value="playful">
              Playful
            </SegmentedControl.Item>
            <SegmentedControl.Item value="cozy">Cozy</SegmentedControl.Item>
          </SegmentedControl.Root>
          <p className="b2">
            Today&apos;s mood: <strong>{mood}</strong>
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="segmented-control-period"
        title="4) Time Period Filter"
        description="Filter relationship stats by time period."
      >
        <div className="flex flex-col gap-4">
          <SegmentedControl.Root
            value={period}
            onChange={setPeriod}
            name="period-filter"
          >
            <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
            <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
            <SegmentedControl.Item value="year">Year</SegmentedControl.Item>
            <SegmentedControl.Item value="all">All time</SegmentedControl.Item>
          </SegmentedControl.Root>
          <p className="b3">
            Showing stats for: <strong>{period}</strong>
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="segmented-control-disabled-items"
        title="5) Disabled Items"
        description="Some segments can be individually disabled while others remain active."
      >
        <SegmentedControl.Root defaultValue="public" name="privacy-control">
          <SegmentedControl.Item value="public">Public</SegmentedControl.Item>
          <SegmentedControl.Item value="friends">Friends</SegmentedControl.Item>
          <SegmentedControl.Item value="private" disabled>
            Private (upgrade)
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </Example.Case>
    </Example>
  );
};
