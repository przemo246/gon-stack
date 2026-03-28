import { useState } from 'react';

import { Tooltip } from '../../../../libs/ui/tooltip';

import { Example } from './example';

export const TooltipDemo = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Example
      id="tooltip-examples"
      title="Tooltip"
      description="A small popup that displays additional information when a user hovers over or focuses on an element."
    >
      <Example.Case
        id="tooltip-basic"
        title="1) Basic"
        description="A simple inline tooltip container wrapping trigger content."
      >
        <div className="flex items-center gap-4">
          <Tooltip className="cursor-default">
            <span className="b2 underline decoration-dotted text-rose-600">
              Hover over me
            </span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block rounded bg-gray-800 text-white text-xs px-2 py-1 whitespace-nowrap">
              I love you to the moon and back
            </div>
          </Tooltip>
          <p className="b3 text-gray-500">
            Tooltip wraps trigger as relative inline-block
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="tooltip-primary"
        title="2) Primary Variant"
        description="Tooltip with primary variant styling applied."
      >
        <Tooltip variant="primary" className="cursor-pointer">
          <span className="b2 font-semibold text-pink-600 border-b border-dashed border-pink-400">
            Our anniversary
          </span>
        </Tooltip>
        <p className="b3 text-gray-400 mt-3">
          The primary variant is passed through to the wrapper div.
        </p>
      </Example.Case>

      <Example.Case
        id="tooltip-secondary"
        title="3) Secondary Variant"
        description="Tooltip with secondary variant for softer contexts."
      >
        <Tooltip variant="secondary" className="cursor-help">
          <span className="b2 text-purple-600 border-b border-dashed border-purple-300">
            What is a love language?
          </span>
        </Tooltip>
        <p className="b3 text-gray-400 mt-3">
          The secondary variant lets you theme the container differently.
        </p>
      </Example.Case>

      <Example.Case
        id="tooltip-interactive"
        title="4) Interactive Hover State"
        description="Managing visible tooltip content with React state on mouseenter/mouseleave."
      >
        <div className="flex flex-wrap gap-6">
          {[
            {
              key: 'roses',
              label: '🌹 Roses',
              tip: 'Classic symbol of deep love',
            },
            {
              key: 'stars',
              label: '⭐ Stars',
              tip: 'Wishing on stars together',
            },
            {
              key: 'letters',
              label: '💌 Letters',
              tip: 'Handwritten notes from the heart',
            },
          ].map(({ key, label, tip }) => (
            <div key={key} className="relative inline-block">
              <Tooltip
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-default"
              >
                <span className="b2 rounded-full bg-rose-50 border border-rose-200 px-3 py-1.5 text-rose-700">
                  {label}
                </span>
              </Tooltip>
              {hovered === key && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5 whitespace-nowrap shadow-lg z-10">
                  {tip}
                </div>
              )}
            </div>
          ))}
        </div>
      </Example.Case>

      <Example.Case
        id="tooltip-inline-text"
        title="5) Inline Within Paragraph"
        description="Tooltip used inline within a sentence for contextual hints."
      >
        <p className="b1 text-gray-700 leading-relaxed">
          We celebrated our{' '}
          <Tooltip
            onMouseEnter={() => setHovered('anniv')}
            onMouseLeave={() => setHovered(null)}
            className="cursor-help"
          >
            <span className="underline decoration-dotted text-rose-500">
              fifth anniversary
            </span>
            {hovered === 'anniv' && (
              <span className="absolute bottom-full left-0 mb-1 rounded bg-gray-800 text-white text-xs px-2 py-1 whitespace-nowrap z-10">
                June 14 — a perfect summer day
              </span>
            )}
          </Tooltip>{' '}
          with a sunset picnic by the lake.
        </p>
      </Example.Case>

      <Example.Case
        id="tooltip-icon-button"
        title="6) Wrapping an Icon Button"
        description="Tooltip as accessibility wrapper around an icon-only action button."
      >
        <div className="flex gap-4 items-center">
          <Tooltip
            onMouseEnter={() => setHovered('heart')}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <button
              className="rounded-full w-10 h-10 flex items-center justify-center bg-rose-100 hover:bg-rose-200 text-rose-600 transition-colors"
              aria-label="Add to favourites"
            >
              ♥
            </button>
            {hovered === 'heart' && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 rounded bg-gray-900 text-white text-xs px-2 py-1 whitespace-nowrap z-10">
                Save to favourites
              </span>
            )}
          </Tooltip>
          <p className="b3 text-gray-500">Hover the heart button</p>
        </div>
      </Example.Case>
    </Example>
  );
};
