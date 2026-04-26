import {
  B1,
  B2,
  B3,
  C1,
  C2,
  L1,
  L2,
  O1,
  O2,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  V1,
  V2,
} from '../../../../libs/ui/text';

import { Example } from '../example';

export const TextDemo = () => {
  return (
    <Example
      id="text-examples"
      title="Text"
      description="Typography scale built on Instrument Serif and Geist. Use semantic variants (T1–T6, B1–B3, …) instead of raw Tailwind classes."
    >
      <Example.Case
        id="text-titles"
        title="1) Title scale — T1–T6"
        description="Display and heading variants. T1–T4 use the serif face; T5 uses sans; T6 uses mono."
      >
        <div className="space-y-4 overflow-hidden">
          <T1>T1 — Display Serif</T1>
          <T2>T2 — Serif Italic</T2>
          <T3>T3 — Serif Italic</T3>
          <T4>T4 — Serif Italic</T4>
          <T5>T5 — Sans Medium</T5>
          <T6>T6 — Mono Overline</T6>
        </div>
      </Example.Case>

      <Example.Case
        id="text-body"
        title="2) Body — B1–B3"
        description="Paragraph text at three size levels."
      >
        <div className="space-y-4 max-w-xl">
          <B1>
            B1 — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </B1>
          <B2>
            B2 — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </B2>
          <B3>
            B3 — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </B3>
        </div>
      </Example.Case>

      <Example.Case
        id="text-captions"
        title="3) Captions — C1–C2"
        description="Supporting text and helper labels."
      >
        <div className="space-y-3">
          <C1 as="p">C1 — Caption regular</C1>
          <C2 as="p">C2 — Caption small</C2>
        </div>
      </Example.Case>

      <Example.Case
        id="text-labels"
        title="4) Labels — L1–L2"
        description="UI labels for form fields, badges, and tags."
      >
        <div className="space-y-3">
          <L1 as="p">L1 — Label regular</L1>
          <L2 as="p">L2 — Label small</L2>
        </div>
      </Example.Case>

      <Example.Case
        id="text-overline"
        title="5) Overline & Verbose — V1–V2, O1–O2"
        description="Decorative overlines and verbose paragraph styles."
      >
        <div className="space-y-4 max-w-xl">
          <V1 as="p">V1 — Verbose regular</V1>
          <V2 as="p">V2 — Verbose small</V2>
          <O1>O1 — Overline paragraph regular</O1>
          <O2>O2 — Overline paragraph small</O2>
        </div>
      </Example.Case>

      <Example.Case
        id="text-polymorphic"
        title="6) Polymorphic rendering"
        description='Any variant can render as any tag via the "as" prop.'
      >
        <div className="space-y-2">
          <T5 as="span" className="block">
            T5 rendered as &lt;span&gt;
          </T5>
          <B1 as="div">B1 rendered as &lt;div&gt;</B1>
          <B2 as="label">B2 rendered as &lt;label&gt;</B2>
        </div>
      </Example.Case>
    </Example>
  );
};
