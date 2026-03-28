import { useState } from 'react';

import { Toggle } from '../../../../libs/ui/toggle';

import { Example } from './example';

export const ToggleDemo = () => {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Example
      id="toggle-examples"
      title="Toggle"
      description="A switch control that allows users to toggle between two states, typically on or off."
    >
      <Example.Case
        id="toggle-basic"
        title="1) Basic (uncontrolled)"
        description="Toggle that manages its own pressed state internally via defaultPressed."
      >
        <div className="flex items-center gap-3">
          <Toggle defaultPressed={false}>Favourite</Toggle>
          <Toggle defaultPressed={true}>Following</Toggle>
        </div>
      </Example.Case>

      <Example.Case
        id="toggle-variants"
        title="2) Variants"
        description="Primary and secondary variants — both uncontrolled."
      >
        <div className="flex items-center gap-3">
          <Toggle variant="primary">Primary</Toggle>
          <Toggle variant="secondary">Secondary</Toggle>
        </div>
      </Example.Case>

      <Example.Case
        id="toggle-controlled"
        title="3) Controlled"
        description="Parent state drives the pressed value; onPressedChange syncs it back."
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Toggle
              variant="primary"
              pressed={notifications}
              onPressedChange={setNotifications}
            >
              {notifications ? 'Notifications on' : 'Notifications off'}
            </Toggle>
            <Toggle
              variant="secondary"
              pressed={darkMode}
              onPressedChange={setDarkMode}
            >
              {darkMode ? 'Dark mode' : 'Light mode'}
            </Toggle>
          </div>
          <p className="text-xs text-(--text-muted)">
            Notifications: <strong>{notifications ? 'on' : 'off'}</strong>
            {' · '}
            Mode: <strong>{darkMode ? 'dark' : 'light'}</strong>
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="toggle-disabled"
        title="4) Disabled"
        description="Toggle in a non-interactive disabled state."
      >
        <div className="flex items-center gap-3">
          <Toggle disabled>Unavailable</Toggle>
          <Toggle disabled defaultPressed>
            Locked on
          </Toggle>
        </div>
      </Example.Case>
    </Example>
  );
};
