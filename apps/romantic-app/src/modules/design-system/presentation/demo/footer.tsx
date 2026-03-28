import { Footer } from '../../../../libs/ui/footer';

import { Example } from './example';

export const FooterDemo = () => {
  return (
    <Example
      id="footer-examples"
      title="Footer"
      description="The bottom section of a page containing secondary navigation, legal information, or contact details."
    >
      <Example.Case
        id="footer-basic"
        title="1) Basic"
        description="A minimal footer with a single line of copyright text."
      >
        <div className="rounded-xl border border-surface-200/70 overflow-hidden">
          <div className="h-24 bg-surface-50 flex items-center justify-center">
            <p className="b2 text-text-secondary">(page content above)</p>
          </div>
          <Footer className="border-t border-surface-200/70 bg-surface-100 px-6 py-4">
            <p className="b2 text-text-secondary">
              © 2026 LoveSync · All rights reserved
            </p>
          </Footer>
        </div>
      </Example.Case>

      <Example.Case
        id="footer-navigation"
        title="2) Navigation links"
        description="Footer with a set of secondary navigation links spread across the bar."
      >
        <div className="rounded-xl border border-surface-200/70 overflow-hidden">
          <div className="h-20 bg-surface-50 flex items-center justify-center">
            <p className="b2 text-text-secondary">(page content above)</p>
          </div>
          <Footer className="border-t border-surface-200/70 bg-surface-100 px-6 py-4 justify-between flex-wrap gap-3">
            <p className="b2 text-text-secondary">© 2026 LoveSync</p>
            <nav className="flex items-center gap-4">
              {['About', 'Privacy', 'Terms', 'Contact'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="b2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </Footer>
        </div>
      </Example.Case>

      <Example.Case
        id="footer-rich"
        title="3) Rich footer with columns"
        description="Multi-column footer layout with branding, links, and social icons."
      >
        <div className="rounded-xl border border-surface-200/70 overflow-hidden">
          <div className="h-16 bg-surface-50 flex items-center justify-center">
            <p className="b2 text-text-secondary">(page content above)</p>
          </div>
          <Footer className="border-t border-surface-200/70 bg-surface-100 px-6 py-6 flex-col gap-6">
            <div className="flex flex-wrap justify-between gap-6 w-full">
              <div className="flex flex-col gap-2">
                <p className="t3">LoveSync</p>
                <p className="b2 text-text-secondary max-w-xs">
                  Helping couples grow closer, one shared moment at a time.
                </p>
              </div>
              <div className="flex gap-8">
                <div className="flex flex-col gap-2">
                  <p className="v2">Product</p>
                  {['Features', 'Pricing', 'Changelog'].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="b2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="v2">Company</p>
                  {['About', 'Blog', 'Careers'].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="b2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-surface-200/50 pt-4 w-full flex justify-between items-center flex-wrap gap-2">
              <p className="b2 text-text-secondary">© 2026 LoveSync, Inc.</p>
              <p className="b2 text-text-secondary">Made with love ♥</p>
            </div>
          </Footer>
        </div>
      </Example.Case>

      <Example.Case
        id="footer-centered"
        title="4) Centered layout"
        description="Centered footer content suitable for single-page or minimal apps."
      >
        <div className="rounded-xl border border-surface-200/70 overflow-hidden">
          <div className="h-16 bg-surface-50 flex items-center justify-center">
            <p className="b2 text-text-secondary">(page content above)</p>
          </div>
          <Footer className="border-t border-surface-200/70 bg-surface-100 px-6 py-5 justify-center flex-col gap-1">
            <p className="b2 font-semibold text-text-primary">LoveSync</p>
            <p className="b2 text-text-secondary">
              Built for couples who choose each other every day
            </p>
          </Footer>
        </div>
      </Example.Case>
    </Example>
  );
};
