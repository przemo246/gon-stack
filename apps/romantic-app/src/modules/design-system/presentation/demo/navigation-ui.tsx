import { useState } from 'react';

import { Navigation } from '../../../../libs/ui/navigation';

import { Example } from './example';

export const NavigationUiDemo = () => {
  const [active, setActive] = useState('discover');

  const links = [
    { id: 'discover', label: 'Discover' },
    { id: 'matches', label: 'Matches' },
    { id: 'messages', label: 'Messages' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <Example
      id="navigation-ui-examples"
      title="Navigation"
      description="A set of navigation links or tabs used to move between sections of an application or website."
    >
      <Example.Case
        id="navigation-ui-basic"
        title="1) Basic"
        description="A simple horizontal navigation bar with text links."
      >
        <Navigation className="gap-6 border-b border-gray-200 pb-2">
          {links.map(({ id, label }) => (
            <a
              key={id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActive(id);
              }}
              className={[
                'text-sm font-medium transition-colors',
                active === id
                  ? 'text-pink-600 border-b-2 border-pink-600 pb-2'
                  : 'text-gray-500 hover:text-gray-900',
              ].join(' ')}
            >
              {label}
            </a>
          ))}
        </Navigation>
      </Example.Case>

      <Example.Case
        id="navigation-ui-with-logo"
        title="2) With logo and actions"
        description="App-style top navigation bar with a brand name and icon actions."
      >
        <Navigation className="w-full justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <span className="font-bold text-pink-600 text-lg">Amore</span>
          <div className="flex items-center gap-4 text-gray-500">
            <a href="#" className="hover:text-pink-500 transition-colors">
              🔔
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              💌
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              ⚙️
            </a>
          </div>
        </Navigation>
      </Example.Case>

      <Example.Case
        id="navigation-ui-pill-tabs"
        title="3) Pill tabs"
        description="Navigation used as pill-style tabs for content filtering."
      >
        <Navigation className="gap-2 flex-wrap">
          {['All', 'Nearby', 'Online', 'New', 'Favourites'].map((tab) => (
            <button
              key={tab}
              className="rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 text-sm font-medium text-pink-700 hover:bg-pink-100 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              {tab}
            </button>
          ))}
        </Navigation>
      </Example.Case>

      <Example.Case
        id="navigation-ui-breadcrumb-style"
        title="4) Breadcrumb-style"
        description="Navigation wrapping breadcrumb links to show relationship profile depth."
      >
        <Navigation className="gap-1 text-sm text-gray-500">
          <a href="#" className="hover:text-pink-600 transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="#" className="hover:text-pink-600 transition-colors">
            Matches
          </a>
          <span>/</span>
          <span className="font-medium text-gray-800">
            Sophie&apos;s Profile
          </span>
        </Navigation>
      </Example.Case>
    </Example>
  );
};
