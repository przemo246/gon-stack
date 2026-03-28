import { useState } from 'react';

import { ColorPicker } from '../../../../libs/ui/color-picker';

import { Example } from './example';

export const ColorPickerDemo = () => {
  const [color, setColor] = useState('#e91e8c');
  const [accentColor, setAccentColor] = useState('#ff6b9d');

  return (
    <Example
      id="color-picker-examples"
      title="Color Picker"
      description="A control that lets users select a color using a native or custom color input interface."
    >
      <Example.Case
        id="color-picker-basic"
        title="1) Basic"
        description="Simple uncontrolled color picker with a default value."
      >
        <ColorPicker defaultValue="#e91e8c" aria-label="Pick a color" />
      </Example.Case>

      <Example.Case
        id="color-picker-controlled"
        title="2) Controlled"
        description="Controlled picker that reflects the selected color in real time."
      >
        <div className="flex items-center gap-4">
          <ColorPicker
            value={color}
            onChange={(e) => setColor(e.target.value)}
            aria-label="Relationship color"
          />
          <span className="b2">
            Selected: <strong style={{ color }}>{color}</strong>
          </span>
        </div>
      </Example.Case>

      <Example.Case
        id="color-picker-multiple"
        title="3) Multiple pickers"
        description="Pick a primary and accent color to theme your love notes."
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <ColorPicker
              value={color}
              onChange={(e) => setColor(e.target.value)}
              aria-label="Primary color"
            />
            <span className="b2">Primary</span>
          </div>
          <div className="flex items-center gap-3">
            <ColorPicker
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              aria-label="Accent color"
            />
            <span className="b2">Accent</span>
          </div>
          <div
            className="h-8 w-32 rounded-full"
            style={{
              background: `linear-gradient(to right, ${color}, ${accentColor})`,
            }}
            aria-hidden="true"
          />
        </div>
      </Example.Case>

      <Example.Case
        id="color-picker-disabled"
        title="4) Disabled"
        description="Non-interactive state – used when the palette is locked."
      >
        <ColorPicker
          defaultValue="#c0392b"
          disabled
          aria-label="Locked color"
        />
      </Example.Case>
    </Example>
  );
};
