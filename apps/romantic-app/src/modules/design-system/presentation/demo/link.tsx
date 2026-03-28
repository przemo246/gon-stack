import { Link } from '../../../../libs/ui/link';

import { Example } from './example';

export const LinkDemo = () => {
  return (
    <Example
      id="link-examples"
      title="Link"
      description="A clickable text element that navigates to another page, section, or external resource."
    >
      <Example.Case
        id="link-primary"
        title="1) Primary"
        description="Default primary variant with branded colour and hover underline."
      >
        <Link href="#">Explore relationship insights</Link>
      </Example.Case>

      <Example.Case
        id="link-secondary"
        title="2) Secondary"
        description="Secondary variant with a softer tone, suitable for supporting copy."
      >
        <Link href="#" variant="secondary">
          Learn more about love languages
        </Link>
      </Example.Case>

      <Example.Case
        id="link-both-variants"
        title="3) Both variants side by side"
        description="Visual comparison of primary and secondary links."
      >
        <div className="flex flex-wrap items-center gap-6">
          <Link href="#">Primary link</Link>
          <Link href="#" variant="secondary">
            Secondary link
          </Link>
        </div>
      </Example.Case>

      <Example.Case
        id="link-inline-text"
        title="4) Inline in a paragraph"
        description="Links sit naturally within flowing body text."
      >
        <p className="b2 max-w-prose">
          Strengthen your bond by reading our{' '}
          <Link href="#">communication guide</Link> and exploring the{' '}
          <Link href="#" variant="secondary">
            five love languages
          </Link>
          . Building a meaningful relationship takes intention and practice.
        </p>
      </Example.Case>

      <Example.Case
        id="link-external"
        title="5) External link"
        description="External link opens in a new tab with an accessible rel attribute."
      >
        <Link
          href="https://example.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          Open relationship guide ↗
        </Link>
      </Example.Case>

      <Example.Case
        id="link-with-icon"
        title="6) Link with icon"
        description="Link uses inline-flex with gap-1, so icons align correctly."
      >
        <Link href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          View your matches
        </Link>
      </Example.Case>
    </Example>
  );
};
