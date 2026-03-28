import { Example } from './example';

export const TextDemo = () => {
  return (
    <Example
      id="text-examples"
      title="Text"
      description="A typography system component that exposes the design system's type scale and text styles."
    >
      <Example.Case
        id="text-headings"
        title="1) Headings (H1-H6)"
        description="Within this page section, H1-H6 map to their typography styles."
      >
        <div className="space-y-3">
          <h1 className="t1">Heading 1</h1>
          <h2 className="t2">Heading 2</h2>
          <h3 className="t3">Heading 3</h3>
          <h4 className="t4">Heading 4</h4>
          <h5 className="t5">Heading 5</h5>
          <h6 className="t6">Heading 6</h6>
        </div>
      </Example.Case>

      <Example.Case
        id="text-body"
        title="2) Body (B1-B3)"
        description="Body scales for content blocks, helper text, and compact paragraphs."
      >
        <div className="space-y-3">
          <p className="b1">
            B1: Primary body copy for core content in cards and sections.
          </p>
          <p className="b2">
            B2: Secondary body text for supporting descriptions and details.
          </p>
          <p className="b3">
            B3: Compact body style for dense layouts and low-priority copy.
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="text-meta"
        title="3) Captions, labels and overline (V1-V2)"
        description="Utility text styles for metadata, labels, and two overline variants."
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <div>
              <span className="c1">
                C1 caption - timestamp, helper metadata, tiny notes.
              </span>
            </div>
            <div>
              <span className="c2">
                C2 caption - compact metadata for constrained spaces.
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <span className="l1">L1 label - uppercase field label</span>
            </div>
            <div>
              <span className="l2">L2 label - compact uppercase label</span>
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <span className="v1">Overline V1 for subtle section context</span>
            </div>
            <div>
              <span className="v2">
                Overline V2 for emphasized meta context
              </span>
            </div>
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="text-ornamental"
        title="4) Ornamental (O1-O2)"
        description="Expressive text styles for quotes, decorative subtitles, and accents."
      >
        <div className="space-y-3">
          <p className="o1">
            O1: &quot;Love grows best in the little moments we choose each
            day.&quot;
          </p>
          <p className="o2">
            O2: &quot;Tiny ornamental style for subtle romantic accents.&quot;
          </p>
        </div>
      </Example.Case>
    </Example>
  );
};
