import { Image } from '../../../../libs/ui/image';

import { Example } from './example';

export const ImageDemo = () => {
  return (
    <Example
      id="image-examples"
      title="Image"
      description="A wrapper for the HTML img element with design-system styling and optional rounded variants."
    >
      <Example.Case
        id="image-basic"
        title="1) Basic"
        description="A simple image with alt text and fixed dimensions."
      >
        <Image
          src="https://picsum.photos/seed/romance/400/240"
          alt="A romantic scene"
          width={400}
          height={240}
          className="rounded-lg"
        />
      </Example.Case>

      <Example.Case
        id="image-rounded"
        title="2) Rounded / avatar style"
        description="Circular crop for a profile picture using rounded-full and object-cover."
      >
        <Image
          src="https://picsum.photos/seed/couple/160/160"
          alt="Profile photo"
          width={160}
          height={160}
          className="rounded-full object-cover size-24"
        />
      </Example.Case>

      <Example.Case
        id="image-full-width"
        title="3) Full-width banner"
        description="Responsive hero image that stretches to fill its container."
      >
        <Image
          src="https://picsum.photos/seed/date-night/800/300"
          alt="Date night banner"
          className="w-full rounded-xl object-cover h-40"
        />
      </Example.Case>

      <Example.Case
        id="image-gallery"
        title="4) Photo gallery"
        description="A grid of couple memory photos."
      >
        <div className="grid grid-cols-3 gap-2">
          {['spring', 'summer', 'autumn', 'winter', 'beach', 'city'].map(
            (seed) => (
              <Image
                key={seed}
                src={`https://picsum.photos/seed/${seed}-couple/200/200`}
                alt={`Memory: ${seed}`}
                className="rounded-lg object-cover aspect-square w-full"
              />
            ),
          )}
        </div>
      </Example.Case>

      <Example.Case
        id="image-with-caption"
        title="5) With caption"
        description="Image wrapped in a figure element with a romantic caption."
      >
        <figure className="max-w-xs space-y-2">
          <Image
            src="https://picsum.photos/seed/anniversary/320/200"
            alt="Our anniversary dinner"
            className="rounded-lg w-full"
          />
          <figcaption className="text-center text-sm text-gray-500 italic">
            Our first anniversary dinner, forever in my heart.
          </figcaption>
        </figure>
      </Example.Case>
    </Example>
  );
};
