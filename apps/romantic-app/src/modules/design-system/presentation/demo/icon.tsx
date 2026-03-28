import { Icon } from '../../../../libs/ui/icon';

import { Example } from './example';

export const IconDemo = () => {
  return (
    <Example
      id="icon-examples"
      title="Icon"
      description="A small visual glyph or symbol that reinforces meaning or provides visual context alongside text."
    >
      <Example.Case
        id="icon-basic"
        title="1) Basic"
        description="Icon wraps any inline SVG or emoji in a centred flex span."
      >
        <Icon>❤️</Icon>
      </Example.Case>

      <Example.Case
        id="icon-with-text"
        title="2) With text"
        description="Icon paired with a label to communicate meaning."
      >
        <div className="flex items-center gap-2">
          <Icon>💌</Icon>
          <span>Send a love letter</span>
        </div>
      </Example.Case>

      <Example.Case
        id="icon-multiple"
        title="3) Multiple icons"
        description="A row of themed icons representing relationship milestones."
      >
        <div className="flex items-center gap-4 text-2xl">
          <Icon title="First date">🌹</Icon>
          <Icon title="Engaged">💍</Icon>
          <Icon title="Married">👰</Icon>
          <Icon title="Anniversary">🥂</Icon>
          <Icon title="Family">👨‍👩‍👧</Icon>
        </div>
      </Example.Case>

      <Example.Case
        id="icon-sized"
        title="4) Custom sizes"
        description="Icon size is controlled via className / font-size utilities."
      >
        <div className="flex items-end gap-4">
          <Icon className="text-sm">💕</Icon>
          <Icon className="text-xl">💕</Icon>
          <Icon className="text-3xl">💕</Icon>
          <Icon className="text-5xl">💕</Icon>
        </div>
      </Example.Case>

      <Example.Case
        id="icon-svg"
        title="5) Inline SVG"
        description="Icon wrapping a raw SVG heart shape."
      >
        <Icon className="text-pink-500 size-8">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            width="1em"
            height="1em"
            aria-label="Heart"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
          </svg>
        </Icon>
      </Example.Case>
    </Example>
  );
};
