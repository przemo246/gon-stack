import { useState } from 'react';

import { Button } from '../../../../libs/ui/button';
import { Header } from '../../../../libs/ui/header';

import { Example } from './example';

export const HeaderDemo = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Example
      id="header-examples"
      title="Header"
      description="The top section of a page or section, typically containing a logo, navigation, and utility actions."
    >
      <Example.Case
        id="header-basic"
        title="1) Basic"
        description="A minimal header with a brand name and a single action."
      >
        <div className="rounded-xl border border-surface-200/70 overflow-hidden">
          <Header className="border-b border-surface-200/70 bg-surface-50 px-5 py-3 justify-between gap-4">
            <p className="t3">LoveSync</p>
            <Button variant="primary">Get started</Button>
          </Header>
          <div className="h-20 bg-surface-100 flex items-center justify-center">
            <p className="b2 text-text-secondary">(page content below)</p>
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="header-navigation"
        title="2) Navigation bar"
        description="Header with a logo, nav links, and two CTA buttons."
      >
        <div className="rounded-xl border border-surface-200/70 overflow-hidden">
          <Header className="border-b border-surface-200/70 bg-surface-50 px-5 py-3 justify-between gap-4">
            <p className="t3">LoveSync</p>
            <nav className="hidden sm:flex items-center gap-6">
              {['Features', 'Pricing', 'Blog'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="b2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="secondary">Log in</Button>
              <Button variant="primary">Sign up</Button>
            </div>
          </Header>
          <div className="h-20 bg-surface-100 flex items-center justify-center">
            <p className="b2 text-text-secondary">(page content below)</p>
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="header-app-bar"
        title="3) In-app top bar"
        description="A compact app bar showing the current section and user avatar."
      >
        <div className="rounded-xl border border-surface-200/70 overflow-hidden">
          <Header className="border-b border-surface-200/70 bg-surface-50 px-5 py-2.5 justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                className="rounded-lg p-1.5 hover:bg-surface-200/60 transition-colors"
                aria-label="Back"
              >
                ←
              </button>
              <p className="b2 font-semibold text-text-primary">
                Relationship Goals
              </p>
            </div>
            <div
              className="h-8 w-8 rounded-full bg-accent-400 flex items-center justify-center text-white text-xs font-bold"
              aria-label="User avatar"
            >
              AJ
            </div>
          </Header>
          <div className="h-20 bg-surface-100 flex items-center justify-center">
            <p className="b2 text-text-secondary">(page content below)</p>
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="header-mobile-menu"
        title="4) Mobile menu toggle"
        description="Header with a hamburger button that reveals a mobile nav panel."
      >
        <div className="rounded-xl border border-surface-200/70 overflow-hidden">
          <Header className="border-b border-surface-200/70 bg-surface-50 px-5 py-3 justify-between gap-4">
            <p className="t3">LoveSync</p>
            <button
              className="rounded-lg px-3 py-1.5 text-sm font-medium border border-surface-200 bg-surface-100 hover:bg-surface-200/60 transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? 'Close ✕' : 'Menu ☰'}
            </button>
          </Header>
          {menuOpen && (
            <nav className="bg-surface-50 border-b border-surface-200/70 px-5 py-3 flex flex-col gap-2">
              {['Home', 'Discover', 'Activities', 'Profile'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="b2 text-text-secondary hover:text-text-primary py-1 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}
          <div className="h-20 bg-surface-100 flex items-center justify-center">
            <p className="b2 text-text-secondary">(page content below)</p>
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="header-transparent"
        title="5) Transparent / overlay"
        description="Header rendered over a coloured background, common on hero sections."
      >
        <div className="rounded-xl overflow-hidden bg-gradient-to-br from-pink-500 to-purple-600">
          <Header className="px-5 py-4 justify-between gap-4 bg-transparent">
            <p className="t3 text-white">LoveSync</p>
            <nav className="flex items-center gap-5">
              {['Features', 'Pricing'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="b2 text-white/80 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
            <Button variant="secondary">Log in</Button>
          </Header>
          <div className="h-24 flex items-center justify-center">
            <p className="b2 text-white/70">(hero content below)</p>
          </div>
        </div>
      </Example.Case>
    </Example>
  );
};
