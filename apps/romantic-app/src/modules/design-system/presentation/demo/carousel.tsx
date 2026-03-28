import { useState } from 'react';

import { Button } from '../../../../libs/ui/button';
import { Carousel } from '../../../../libs/ui/carousel';

import { Example } from './example';

const MEMORIES = [
  {
    id: 1,
    label: 'Our First Date',
    description: 'A rainy evening at the little bookshop on Elm Street.',
  },
  {
    id: 2,
    label: 'Weekend Getaway',
    description:
      'Sunrise hike in the mountains — breathtaking views and even better company.',
  },
  {
    id: 3,
    label: 'Anniversary Dinner',
    description:
      'Candlelit table for two, the best pasta, and a waltz to our song.',
  },
];

const SimpleSlider = ({ items }: { items: typeof MEMORIES }) => {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const item = items[index];

  return (
    <Carousel className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="min-h-[80px] text-center space-y-2">
        <p className="t3">{item.label}</p>
        <p className="b2">{item.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Button variant="secondary" onClick={prev}>
          ← Prev
        </Button>
        <span className="b2">
          {index + 1} / {items.length}
        </span>
        <Button variant="secondary" onClick={next}>
          Next →
        </Button>
      </div>
    </Carousel>
  );
};

export const CarouselDemo = () => {
  return (
    <Example
      id="carousel-examples"
      title="Carousel"
      description="A rotating container that displays a series of items one at a time, allowing users to navigate through them."
    >
      <Example.Case
        id="carousel-basic"
        title="1) Basic"
        description="A simple slide-through carousel of shared memories using internal state."
      >
        <SimpleSlider items={MEMORIES} />
      </Example.Case>

      <Example.Case
        id="carousel-secondary"
        title="2) Secondary variant"
        description="Carousel with the secondary variant class applied — suitable for a lighter background context."
      >
        <Carousel
          variant="secondary"
          className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6"
        >
          <div className="text-center space-y-2">
            <p className="t3">Love Letters</p>
            <p className="b2">
              Every note you have ever written to me lives here — words I return
              to whenever I need a smile.
            </p>
          </div>
        </Carousel>
      </Example.Case>

      <Example.Case
        id="carousel-photo-strip"
        title="3) Photo strip"
        description="Horizontal overflow container acting as a scrollable photo strip."
      >
        <Carousel className="w-full max-w-md">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {['Prague', 'Santorini', 'Kyoto', 'New York', 'Paris'].map(
              (city) => (
                <div
                  key={city}
                  className="shrink-0 w-32 h-24 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center"
                >
                  <span className="b2">{city}</span>
                </div>
              ),
            )}
          </div>
        </Carousel>
      </Example.Case>
    </Example>
  );
};
