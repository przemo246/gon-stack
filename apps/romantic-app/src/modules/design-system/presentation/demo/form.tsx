import { useState } from 'react';

import { Button } from '../../../../libs/ui/button';
import { Form } from '../../../../libs/ui/form';

import { Example } from './example';

export const FormDemo = () => {
  const [signupSubmitted, setSignupSubmitted] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  return (
    <Example
      id="form-examples"
      title="Form"
      description="A structured container for collecting user input through various form controls and fields."
    >
      <Example.Case
        id="form-basic"
        title="1) Basic sign-up"
        description="A simple two-field sign-up form using the Form primitive."
      >
        {signupSubmitted ? (
          <div className="rounded-xl border border-surface-200/70 p-6 text-center space-y-1">
            <p className="t3">Welcome to LoveSync!</p>
            <p className="b2 text-text-secondary">
              Your account has been created.
            </p>
            <button
              className="b2 text-accent-500 underline mt-2"
              onClick={() => setSignupSubmitted(false)}
            >
              Reset
            </button>
          </div>
        ) : (
          <Form
            className="gap-4 max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              setSignupSubmitted(true);
            }}
          >
            <div className="flex flex-col gap-1">
              <label className="b2 font-medium" htmlFor="form-email">
                Email
              </label>
              <input
                id="form-email"
                type="email"
                required
                className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                placeholder="you@lovesync.app"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="b2 font-medium" htmlFor="form-password">
                Password
              </label>
              <input
                id="form-password"
                type="password"
                required
                className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                placeholder="••••••••"
              />
            </div>
            <Button variant="primary" type="submit">
              Create account
            </Button>
          </Form>
        )}
      </Example.Case>

      <Example.Case
        id="form-feedback"
        title="2) Feedback form"
        description="A short feedback form with a controlled textarea and character count."
      >
        {feedbackSubmitted ? (
          <div className="rounded-xl border border-surface-200/70 p-6 text-center space-y-1">
            <p className="t3">Thank you!</p>
            <p className="b2 text-text-secondary">
              Your feedback helps us improve.
            </p>
            <button
              className="b2 text-accent-500 underline mt-2"
              onClick={() => {
                setFeedbackSubmitted(false);
                setFeedbackText('');
              }}
            >
              Send another
            </button>
          </div>
        ) : (
          <Form
            className="gap-4 max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              setFeedbackSubmitted(true);
            }}
          >
            <div className="flex flex-col gap-1">
              <label className="b2 font-medium" htmlFor="form-subject">
                Subject
              </label>
              <select
                id="form-subject"
                className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              >
                <option>Feature suggestion</option>
                <option>Bug report</option>
                <option>General feedback</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <label className="b2 font-medium" htmlFor="form-message">
                  Message
                </label>
                <span className="b2 text-text-secondary">
                  {feedbackText.length}/300
                </span>
              </div>
              <textarea
                id="form-message"
                required
                maxLength={300}
                rows={4}
                className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-text-primary resize-none focus:outline-none focus:ring-2 focus:ring-accent-400"
                placeholder="Tell us what you think..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </div>
            <Button
              variant="primary"
              type="submit"
              disabled={feedbackText.trim().length === 0}
            >
              Send feedback
            </Button>
          </Form>
        )}
      </Example.Case>

      <Example.Case
        id="form-profile"
        title="3) Profile settings"
        description="A multi-section profile form with both primary and secondary actions."
      >
        <Form className="gap-5 max-w-sm" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1">
            <label className="b2 font-medium" htmlFor="form-display-name">
              Display name
            </label>
            <input
              id="form-display-name"
              defaultValue="Alex & Jordan"
              className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="b2 font-medium" htmlFor="form-anniversary">
              Anniversary
            </label>
            <input
              id="form-anniversary"
              type="date"
              defaultValue="2022-06-15"
              className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="b2 font-medium" htmlFor="form-bio">
              Our story
            </label>
            <textarea
              id="form-bio"
              rows={3}
              defaultValue="We met at a coffee shop and never looked back."
              className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-text-primary resize-none focus:outline-none focus:ring-2 focus:ring-accent-400"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="primary" type="submit">
              Save changes
            </Button>
            <Button variant="secondary" type="reset">
              Cancel
            </Button>
          </div>
        </Form>
      </Example.Case>

      <Example.Case
        id="form-inline"
        title="4) Inline / horizontal layout"
        description="Form laid out horizontally for compact single-field interactions."
      >
        <Form
          className="flex-row items-end gap-3 flex-wrap"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
            <label className="b2 font-medium" htmlFor="form-invite">
              Invite your partner
            </label>
            <input
              id="form-invite"
              type="email"
              className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              placeholder="partner@email.com"
            />
          </div>
          <Button variant="primary" type="submit">
            Send invite
          </Button>
        </Form>
      </Example.Case>
    </Example>
  );
};
