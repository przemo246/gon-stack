import { useState } from 'react';

import { Button } from '../../../../libs/ui/button';
import { Drawer } from '../../../../libs/ui/drawer';

import { Example } from './example';

export const DrawerDemo = () => {
  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);

  return (
    <Example
      id="drawer-examples"
      title="Drawer"
      description="A panel that slides in from the edge of the screen, overlaying content without navigating away from the page."
    >
      <Example.Case
        id="drawer-basic"
        title="1) Basic (right)"
        description="A right-side drawer panel that slides in when triggered — shown here as a static composition."
      >
        <div className="relative h-40 w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <p className="b2 p-4">Main content area</p>
          <Drawer className="right-0 top-0 h-full w-56 border-l border-white/10 bg-white/10 p-4 backdrop-blur-sm">
            <p className="t3 mb-2">Date Planner</p>
            <p className="b2">Candlelit dinner at 7 pm</p>
            <p className="b2">Stargazing walk at 9 pm</p>
          </Drawer>
        </div>
      </Example.Case>

      <Example.Case
        id="drawer-left"
        title="2) Left side"
        description="A navigation drawer anchored to the left — useful for a sidebar of shared lists."
      >
        <div className="relative h-40 w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <p className="b2 p-4 pl-64">Main content shifts right</p>
          <Drawer className="left-0 top-0 h-full w-56 border-r border-white/10 bg-white/10 p-4 backdrop-blur-sm">
            <p className="t3 mb-2">Our Lists</p>
            <ul className="b2 space-y-1">
              <li>Bucket list</li>
              <li>Restaurants to try</li>
              <li>Movies to watch</li>
            </ul>
          </Drawer>
        </div>
      </Example.Case>

      <Example.Case
        id="drawer-interactive"
        title="3) Interactive toggle"
        description="Toggle a right-side drawer open and closed using a button — simulates real overlay behaviour."
      >
        <div className="relative h-48 w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <div className="p-4">
            <Button variant="secondary" onClick={() => setRightOpen((v) => !v)}>
              {rightOpen ? 'Close Drawer' : 'Open Drawer'}
            </Button>
          </div>
          {rightOpen && (
            <>
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setRightOpen(false)}
              />
              <Drawer className="right-0 top-0 z-10 h-full w-56 border-l border-white/10 bg-black/70 p-4 backdrop-blur-sm">
                <p className="t3 mb-3">Love Notes</p>
                <p className="b2 mb-4">
                  &quot;You make every ordinary moment feel magical.&quot;
                </p>
                <Button variant="primary" onClick={() => setRightOpen(false)}>
                  Close
                </Button>
              </Drawer>
            </>
          )}
        </div>
      </Example.Case>

      <Example.Case
        id="drawer-left-interactive"
        title="4) Left interactive"
        description="Left-anchored drawer with a navigation list toggled by a button."
      >
        <div className="relative h-48 w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <div className="flex items-center gap-3 p-4">
            <Button variant="secondary" onClick={() => setLeftOpen((v) => !v)}>
              ☰ Menu
            </Button>
            <span className="b2">Relationship Dashboard</span>
          </div>
          {leftOpen && (
            <>
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setLeftOpen(false)}
              />
              <Drawer className="left-0 top-0 z-10 h-full w-52 border-r border-white/10 bg-black/70 p-4 backdrop-blur-sm">
                <p className="t3 mb-3">Navigate</p>
                <ul className="b2 space-y-2">
                  <li>💌 Messages</li>
                  <li>📅 Date Nights</li>
                  <li>🗺️ Bucket List</li>
                  <li>❤️ Memories</li>
                </ul>
              </Drawer>
            </>
          )}
        </div>
      </Example.Case>
    </Example>
  );
};
