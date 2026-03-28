import { Stack } from '../../../../libs/ui/stack';

import { Example } from './example';

export const StackDemo = () => {
  return (
    <Example
      id="stack-examples"
      title="Stack"
      description="A layout primitive that arranges children in a vertical or horizontal stack with consistent spacing."
    >
      <Example.Case
        id="stack-basic"
        title="1) Basic"
        description="A vertical flex column stack with default spacing."
      >
        <Stack className="gap-3">
          <div className="rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 b2 text-rose-700">
            First date at the botanical garden
          </div>
          <div className="rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 b2 text-rose-700">
            Surprise weekend trip to the coast
          </div>
          <div className="rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 b2 text-rose-700">
            Movie marathon under a blanket
          </div>
        </Stack>
      </Example.Case>

      <Example.Case
        id="stack-primary"
        title="2) Primary Variant"
        description="Stack with the primary variant for emphasis."
      >
        <Stack variant="primary" className="gap-4">
          <div className="rounded-xl bg-pink-100 px-5 py-4">
            <p className="t4 text-pink-700">Morning Routine</p>
            <p className="b3 text-pink-500">
              Coffee together before the world wakes up
            </p>
          </div>
          <div className="rounded-xl bg-pink-100 px-5 py-4">
            <p className="t4 text-pink-700">Evening Ritual</p>
            <p className="b3 text-pink-500">Walk hand-in-hand at sunset</p>
          </div>
        </Stack>
      </Example.Case>

      <Example.Case
        id="stack-secondary"
        title="3) Secondary Variant"
        description="Stack with the secondary variant for softer grouping."
      >
        <Stack variant="secondary" className="gap-3">
          <div className="rounded-lg bg-purple-50 border border-purple-100 px-4 py-3 b2 text-purple-700">
            Write a love letter
          </div>
          <div className="rounded-lg bg-purple-50 border border-purple-100 px-4 py-3 b2 text-purple-700">
            Plan a surprise dinner
          </div>
          <div className="rounded-lg bg-purple-50 border border-purple-100 px-4 py-3 b2 text-purple-700">
            Pick wildflowers from the meadow
          </div>
        </Stack>
      </Example.Case>

      <Example.Case
        id="stack-nested"
        title="4) Nested Stacks"
        description="Composing stacks inside stacks for structured layouts."
      >
        <Stack className="gap-6">
          <Stack className="gap-2">
            <p className="t4 text-gray-700">This Year&apos;s Highlights</p>
            <div className="rounded-lg bg-amber-50 px-4 py-3 b2 text-amber-800">
              Adopted a puppy together
            </div>
            <div className="rounded-lg bg-amber-50 px-4 py-3 b2 text-amber-800">
              Cooked every recipe in the book
            </div>
          </Stack>
          <Stack className="gap-2">
            <p className="t4 text-gray-700">Dreams for Next Year</p>
            <div className="rounded-lg bg-teal-50 px-4 py-3 b2 text-teal-800">
              Travel to Portugal
            </div>
            <div className="rounded-lg bg-teal-50 px-4 py-3 b2 text-teal-800">
              Learn to dance salsa
            </div>
          </Stack>
        </Stack>
      </Example.Case>

      <Example.Case
        id="stack-form"
        title="5) Form Layout"
        description="Using Stack to vertically arrange form fields naturally."
      >
        <Stack className="gap-4 max-w-sm">
          <div className="flex flex-col gap-1">
            <label className="b3 font-medium text-gray-700">
              Partner&apos;s name
            </label>
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 b2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="e.g. Amara"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="b3 font-medium text-gray-700">
              Anniversary date
            </label>
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 b2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              type="date"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="b3 font-medium text-gray-700">
              Your favourite memory
            </label>
            <textarea
              className="border border-gray-200 rounded-lg px-3 py-2 b2 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
              rows={3}
              placeholder="The moment I knew…"
              readOnly
            />
          </div>
        </Stack>
      </Example.Case>

      <Example.Case
        id="stack-horizontal"
        title="6) Horizontal via className Override"
        description="Overriding flex-col with flex-row to produce a horizontal stack."
      >
        <Stack className="flex-row gap-3 flex-wrap">
          {['Paris', 'Rome', 'Kyoto', 'Cape Town', 'Lisbon'].map((city) => (
            <span
              key={city}
              className="rounded-full bg-rose-100 text-rose-700 px-3 py-1 b3"
            >
              {city}
            </span>
          ))}
        </Stack>
      </Example.Case>
    </Example>
  );
};
