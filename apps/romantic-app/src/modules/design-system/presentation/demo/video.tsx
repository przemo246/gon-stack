import { useRef, useState } from 'react';

import { Video } from '../../../../libs/ui/video';
import { Button } from '../../../../libs/ui/button';

import { Example } from './example';

export const VideoDemo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <Example
      id="video-examples"
      title="Video"
      description="A wrapper for HTML video elements with design-system styling and variant support."
    >
      <Example.Case
        id="video-basic"
        title="1) Basic"
        description="The Video component renders a native <video> element with block display."
      >
        <Video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          controls
          className="rounded-xl w-full max-w-md"
        />
        <p className="b3 text-gray-500 mt-2">
          Native controls — play, pause, and seek your favourite moment
          together.
        </p>
      </Example.Case>

      <Example.Case
        id="video-autoplay-muted"
        title="2) Autoplay Muted Loop"
        description="Background-style looping video, muted and autoplaying."
      >
        <Video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="rounded-xl w-full max-w-md object-cover"
        />
        <p className="b3 text-gray-500 mt-2">
          Perfect for ambient romantic background clips.
        </p>
      </Example.Case>

      <Example.Case
        id="video-poster"
        title="3) With Poster Image"
        description="Showing a custom poster frame before the user presses play."
      >
        <Video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          poster="https://picsum.photos/seed/anniversary/640/360"
          controls
          className="rounded-xl w-full max-w-md"
        />
        <p className="b3 text-gray-500 mt-2">
          The poster is displayed before playback begins — set it to a special
          photo.
        </p>
      </Example.Case>

      <Example.Case
        id="video-custom-controls"
        title="4) Custom Play / Pause Controls"
        description="Using a ref to control playback programmatically with a custom button."
      >
        <div className="space-y-3 max-w-md">
          <Video
            ref={videoRef}
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            className="rounded-xl w-full"
          />
          <Button variant="primary" onClick={togglePlay}>
            {playing ? 'Pause' : 'Play our memory'}
          </Button>
        </div>
      </Example.Case>

      <Example.Case
        id="video-primary"
        title="5) Primary Variant"
        description="Video with the primary variant prop forwarded."
      >
        <Video
          variant="primary"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          controls
          className="rounded-2xl border-2 border-rose-300 w-full max-w-md shadow-lg"
        />
      </Example.Case>

      <Example.Case
        id="video-secondary"
        title="6) Secondary Variant"
        description="Video with the secondary variant for a softer presentation frame."
      >
        <Video
          variant="secondary"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          controls
          className="rounded-2xl border border-purple-200 w-full max-w-md opacity-90"
        />
      </Example.Case>

      <Example.Case
        id="video-aspect-ratio"
        title="7) Aspect-Ratio Container"
        description="Constraining video inside a fixed aspect-ratio wrapper."
      >
        <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden bg-black">
          <Video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            controls
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <p className="b3 text-gray-500 mt-2">
          16:9 aspect-ratio wrapper — great for our video diary entries.
        </p>
      </Example.Case>
    </Example>
  );
};
