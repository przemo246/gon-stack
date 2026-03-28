import { VisuallyHidden } from '../../../../libs/ui/visually-hidden';
import { Button } from '../../../../libs/ui/button';

import { Example } from './example';

export const VisuallyHiddenDemo = () => {
  return (
    <Example
      id="visually-hidden-examples"
      title="Visually Hidden"
      description="Hides content visually while keeping it accessible to screen readers for inclusive design."
    >
      <Example.Case
        id="visually-hidden-basic"
        title="1) Basic"
        description="VisuallyHidden renders an sr-only span invisible on screen but readable by screen readers."
      >
        <div className="flex items-center gap-3">
          <span className="b2 text-gray-700">
            This text is visible.
            <VisuallyHidden>
              {' '}
              This text is only available to screen readers — like a secret
              whisper of love.
            </VisuallyHidden>
          </span>
        </div>
        <p className="b3 text-gray-400 mt-3">
          Inspect the DOM to see the hidden span with class <code>sr-only</code>
          .
        </p>
      </Example.Case>

      <Example.Case
        id="visually-hidden-icon-button"
        title="2) Accessible Icon Button Label"
        description="Providing a screen-reader label for an icon-only button."
      >
        <div className="flex items-center gap-4">
          <button
            className="rounded-full w-10 h-10 flex items-center justify-center bg-rose-100 hover:bg-rose-200 text-rose-600 transition-colors"
            aria-label="Send love"
          >
            ♥<VisuallyHidden>Send love</VisuallyHidden>
          </button>
          <button
            className="rounded-full w-10 h-10 flex items-center justify-center bg-purple-100 hover:bg-purple-200 text-purple-600 transition-colors"
            aria-label="Add to favourites"
          >
            ★<VisuallyHidden>Add to favourites</VisuallyHidden>
          </button>
          <button
            className="rounded-full w-10 h-10 flex items-center justify-center bg-teal-100 hover:bg-teal-200 text-teal-600 transition-colors"
            aria-label="Share memory"
          >
            ↗<VisuallyHidden>Share memory</VisuallyHidden>
          </button>
          <p className="b3 text-gray-500">
            Each icon button has a hidden accessible label.
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="visually-hidden-form-context"
        title="3) Form Field Context"
        description="Providing extra context for form inputs without cluttering the visual design."
      >
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex flex-col gap-1">
            <label
              className="b3 font-medium text-gray-700"
              htmlFor="partner-name"
            >
              Partner&apos;s name
              <VisuallyHidden> (as it appears on their ID)</VisuallyHidden>
            </label>
            <input
              id="partner-name"
              className="border border-gray-200 rounded-lg px-3 py-2 b2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="e.g. Amara"
              readOnly
            />
          </div>
          <p className="b3 text-gray-400">
            The parenthetical hint is only announced by assistive technology.
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="visually-hidden-status"
        title="4) Live Region Announcement"
        description="Hiding a status message visually while keeping it in a live region for screen readers."
      >
        <div className="flex items-center gap-4">
          <Button variant="secondary">Send anniversary reminder</Button>
          <span role="status" aria-live="polite">
            <VisuallyHidden>
              Reminder sent successfully to your partner.
            </VisuallyHidden>
          </span>
        </div>
        <p className="b3 text-gray-400 mt-3">
          The status message inside <code>aria-live</code> is read aloud without
          visual clutter.
        </p>
      </Example.Case>

      <Example.Case
        id="visually-hidden-primary"
        title="5) Primary Variant"
        description="VisuallyHidden with primary variant — variant prop is forwarded but sr-only remains applied."
      >
        <p className="b2 text-gray-700">
          Visible content here.
          <VisuallyHidden variant="primary">
            Hidden primary-variant context: you are deeply loved.
          </VisuallyHidden>
        </p>
        <p className="b3 text-gray-400 mt-2">
          The variant prop is available for potential CSS-layer theming while
          the element stays invisible.
        </p>
      </Example.Case>

      <Example.Case
        id="visually-hidden-skip-equivalent"
        title="6) Skip Navigation Pattern"
        description="Using VisuallyHidden to label a landmark for screen reader navigation."
      >
        <nav aria-labelledby="love-notes-nav">
          <VisuallyHidden id="love-notes-nav">
            Love notes navigation
          </VisuallyHidden>
          <ul className="flex gap-3 list-none">
            <li>
              <a href="#letters" className="b2 text-rose-600 hover:underline">
                Letters
              </a>
            </li>
            <li>
              <a href="#poems" className="b2 text-rose-600 hover:underline">
                Poems
              </a>
            </li>
            <li>
              <a href="#songs" className="b2 text-rose-600 hover:underline">
                Songs
              </a>
            </li>
          </ul>
        </nav>
      </Example.Case>
    </Example>
  );
};
