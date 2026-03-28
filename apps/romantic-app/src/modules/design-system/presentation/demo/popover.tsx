import { useState } from 'react';

import { Button } from '../../../../libs/ui/button';
import { Popover } from '../../../../libs/ui/popover';

import { Example } from './example';

export const PopoverDemo = () => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Example
      id="popover-examples"
      title="Popover"
      description="A lightweight overlay that appears near a trigger element and dismisses when the user clicks outside."
    >
      <Example.Case
        id="popover-basic"
        title="1) Basic"
        description="A popover that reveals extra information on click."
      >
        <Popover>
          <Button variant="secondary" onClick={() => setInfoOpen((v) => !v)}>
            What is a love language?
          </Button>
          {infoOpen && (
            <div className="absolute left-0 top-full z-10 mt-2 w-72 rounded-xl border border-pink-100 bg-white p-4 shadow-lg">
              <p className="text-sm text-gray-600">
                A love language is the way you most naturally give and receive
                affection — words of affirmation, quality time, acts of service,
                gift-giving, or physical touch.
              </p>
              <button
                className="mt-2 text-xs text-pink-500 hover:underline"
                onClick={() => setInfoOpen(false)}
              >
                Got it
              </button>
            </div>
          )}
        </Popover>
      </Example.Case>

      <Example.Case
        id="popover-emoji-picker"
        title="2) Emoji reaction picker"
        description="Popover acting as a compact emoji reaction picker on a message."
      >
        <div className="flex items-start gap-3">
          <div className="rounded-2xl rounded-tl-none bg-pink-100 px-4 py-2 text-sm max-w-xs">
            You make every day brighter. ☀️
          </div>
          <Popover>
            <button
              className="mt-1 text-gray-400 hover:text-pink-500 text-sm transition-colors"
              onClick={() => setEmojiOpen((v) => !v)}
              aria-label="Add reaction"
            >
              😊
            </button>
            {emojiOpen && (
              <div className="absolute left-0 top-full z-10 mt-1 flex gap-1 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                {['❤️', '😍', '🥰', '😘', '💯'].map((emoji) => (
                  <button
                    key={emoji}
                    className="rounded-lg p-1 text-xl hover:bg-pink-50 transition-colors"
                    onClick={() => setEmojiOpen(false)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </Popover>
        </div>
      </Example.Case>

      <Example.Case
        id="popover-context-menu"
        title="3) Context menu"
        description="Popover used as a context menu with action items."
      >
        <Popover>
          <button
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
          >
            ⋯ More
          </button>
          {menuOpen && (
            <div className="absolute left-0 top-full z-10 mt-2 w-44 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
              {[
                { icon: '📌', label: 'Pin memory' },
                { icon: '✏️', label: 'Edit note' },
                { icon: '🔗', label: 'Share with partner' },
                { icon: '🗑️', label: 'Delete' },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          )}
        </Popover>
      </Example.Case>

      <Example.Case
        id="popover-tooltip-style"
        title="4) Tooltip-style hint"
        description="Popover always visible, styled as a persistent hint bubble."
      >
        <div className="flex items-center gap-6">
          <Popover>
            <span className="cursor-help underline decoration-dotted text-pink-600">
              Compatibility score
            </span>
            <div className="absolute left-0 top-full z-10 mt-2 w-56 rounded-xl border border-pink-200 bg-pink-50 p-3 shadow-md">
              <p className="text-xs text-pink-800">
                Calculated from shared interests, communication style, and
                long-term goal alignment.
              </p>
            </div>
          </Popover>
        </div>
      </Example.Case>
    </Example>
  );
};
