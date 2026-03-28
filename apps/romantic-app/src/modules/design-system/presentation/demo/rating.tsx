import { useState } from 'react';

import { Rating } from '../../../../libs/ui/rating';

import { Example } from './example';

export const RatingDemo = () => {
  const [controlledRating, setControlledRating] = useState(3);

  return (
    <Example
      id="rating-examples"
      title="Rating"
      description="A control that lets users provide feedback by selecting a rating value, often displayed as stars."
    >
      <Example.Case
        id="rating-static-filled"
        title="1) Static (All Filled)"
        description="All stars filled — shows maximum rating."
      >
        <Rating.Root>
          {[1, 2, 3, 4, 5].map((i) => (
            <Rating.Item key={i} filled />
          ))}
        </Rating.Root>
      </Example.Case>

      <Example.Case
        id="rating-static-empty"
        title="2) Static (All Empty)"
        description="All stars empty — shows zero rating."
      >
        <Rating.Root>
          {[1, 2, 3, 4, 5].map((i) => (
            <Rating.Item key={i} />
          ))}
        </Rating.Root>
      </Example.Case>

      <Example.Case
        id="rating-partial"
        title="3) Partial Rating"
        description="Mixed filled/empty to show a specific score."
      >
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((score) => (
            <div key={score} className="flex items-center gap-3">
              <Rating.Root>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Rating.Item key={i} filled={i <= score} />
                ))}
              </Rating.Root>
              <span className="b2">{score} / 5</span>
            </div>
          ))}
        </div>
      </Example.Case>

      <Example.Case
        id="rating-interactive"
        title="4) Interactive (Controlled)"
        description="Click a star to set the rating. Demonstrates controlled usage."
      >
        <div className="space-y-4">
          <Rating.Root>
            {[1, 2, 3, 4, 5].map((i) => (
              <Rating.Item
                key={i}
                filled={i <= controlledRating}
                onClick={() => setControlledRating(i)}
                className="cursor-pointer"
              />
            ))}
          </Rating.Root>
          <p className="b2">
            Selected: <strong>{controlledRating}</strong> / 5
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="rating-sizes"
        title="5) Custom Sizes"
        description="Override text size via className for different contexts."
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Rating.Root>
              {[1, 2, 3, 4, 5].map((i) => (
                <Rating.Item key={i} filled={i <= 4} className="text-sm" />
              ))}
            </Rating.Root>
            <span className="b3">Small</span>
          </div>
          <div className="flex items-center gap-3">
            <Rating.Root>
              {[1, 2, 3, 4, 5].map((i) => (
                <Rating.Item key={i} filled={i <= 4} />
              ))}
            </Rating.Root>
            <span className="b3">Default</span>
          </div>
          <div className="flex items-center gap-3">
            <Rating.Root>
              {[1, 2, 3, 4, 5].map((i) => (
                <Rating.Item key={i} filled={i <= 4} className="text-3xl" />
              ))}
            </Rating.Root>
            <span className="b3">Large</span>
          </div>
        </div>
      </Example.Case>
    </Example>
  );
};
