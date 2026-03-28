import { Hero } from '../../../../libs/ui/hero';
import { Button } from '../../../../libs/ui/button';

import { Example } from './example';

export const HeroDemo = () => {
  return (
    <Example
      id="hero-examples"
      title="Hero"
      description="A prominent banner section at the top of a page, typically containing a headline and call-to-action."
    >
      <Example.Case
        id="hero-basic"
        title="1) Basic"
        description="A minimal hero with a headline, sub-copy, and a single CTA."
      >
        <Hero className="rounded-xl bg-surface-50 border border-surface-200/70 py-16 px-6 gap-4 text-center">
          <h1 className="t1">Grow closer, together</h1>
          <p className="b1 text-text-secondary max-w-md">
            LoveSync helps couples build deeper connection through shared goals
            and meaningful rituals.
          </p>
          <Button variant="primary">Start your journey</Button>
        </Hero>
      </Example.Case>

      <Example.Case
        id="hero-gradient"
        title="2) Gradient background"
        description="Hero with a vibrant gradient backdrop — ideal for landing pages."
      >
        <Hero className="rounded-xl bg-gradient-to-br from-pink-500 via-rose-400 to-purple-600 py-20 px-6 gap-5 text-center">
          <p className="v1 text-white/80 uppercase tracking-widest text-xs">
            Introducing LoveSync 2.0
          </p>
          <h1 className="t1 text-white">Every moment matters</h1>
          <p className="b1 text-white/75 max-w-sm">
            Track your relationship milestones and celebrate every achievement
            as a couple.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Button variant="secondary">Learn more</Button>
            <button className="text-sm font-semibold text-white underline underline-offset-2">
              Watch demo
            </button>
          </div>
        </Hero>
      </Example.Case>

      <Example.Case
        id="hero-split"
        title="3) Split layout"
        description="Hero with copy on the left and an illustration placeholder on the right."
      >
        <Hero className="rounded-xl bg-surface-50 border border-surface-200/70 py-12 px-8 flex-row flex-wrap gap-8 items-center justify-between text-left">
          <div className="flex flex-col gap-4 max-w-sm">
            <p className="v2 text-accent-500">For modern couples</p>
            <h1 className="t1">Your relationship, elevated</h1>
            <p className="b1 text-text-secondary">
              Set goals together, check in daily, and celebrate what makes your
              bond unique.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button variant="primary">Get started free</Button>
              <Button variant="secondary">See how it works</Button>
            </div>
          </div>
          <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-white text-5xl flex-shrink-0">
            ♥
          </div>
        </Hero>
      </Example.Case>

      <Example.Case
        id="hero-compact"
        title="4) Compact hero"
        description="A smaller hero suitable for interior pages or sub-section introductions."
      >
        <Hero className="rounded-xl bg-surface-50 border border-surface-200/70 py-10 px-6 gap-3 text-center">
          <h2 className="t2">Couple Activities</h2>
          <p className="b2 text-text-secondary max-w-sm">
            Discover fun, meaningful activities designed to bring you closer.
          </p>
        </Hero>
      </Example.Case>

      <Example.Case
        id="hero-dark"
        title="5) Dark / deep background"
        description="Hero rendered on a dark surface — great for contrast and atmosphere."
      >
        <Hero className="rounded-xl bg-neutral-900 py-20 px-6 gap-5 text-center">
          <p className="v1 text-pink-400 uppercase tracking-widest text-xs">
            Premium experience
          </p>
          <h1 className="t1 text-white">Love without limits</h1>
          <p className="b1 text-neutral-400 max-w-md">
            Unlock advanced insights, personalised date ideas, and unlimited
            shared journals with LoveSync Premium.
          </p>
          <Button variant="primary">Upgrade now</Button>
        </Hero>
      </Example.Case>
    </Example>
  );
};
