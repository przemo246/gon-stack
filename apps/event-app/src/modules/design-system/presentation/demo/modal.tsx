import { useState } from 'react';

import { Button } from '../../../../libs/ui/button';
import { Modal } from '../../../../libs/ui/modal';

import { Example } from '../example';

/* =============================================================================
 * Helpers
 * ============================================================================= */

const BasicModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <Modal.Header>
            <span className="text-base font-semibold text-text-primary">
              Event details
            </span>
          </Modal.Header>

          <Modal.Body>
            <p className="text-sm text-text-muted">
              Jazz &amp; Blues Night — Saturday, 14 June · Stara Przepompownia,
              Warsaw. Doors open at 19:00.
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="ghost-with-border" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Buy tickets
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

const BodyOnlyModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost-with-border" onClick={() => setOpen(true)}>
        Open minimal modal
      </Button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <Modal.Body>
            <p className="text-sm text-text-muted text-center py-4">
              Click outside or press Escape to close.
            </p>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

const ScrollableModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="solid" onClick={() => setOpen(true)}>
        Open scrollable modal
      </Button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <Modal.Header>
            <span className="text-base font-semibold text-text-primary">
              Terms &amp; Conditions
            </span>
            <button
              aria-label="Close"
              className="text-text-muted hover:text-text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </Modal.Header>

          <Modal.Body>
            <div className="space-y-4 text-sm text-text-muted">
              {Array.from({ length: 8 }, (_, i) => (
                <p key={i}>
                  Section {i + 1} — Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris.
                </p>
              ))}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="ghost-with-border" onClick={() => setOpen(false)}>
              Decline
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Accept
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

/* =============================================================================
 * Demo
 * ============================================================================= */

export const ModalDemo = () => {
  return (
    <Example
      id="modal-examples"
      title="Modal"
      description="Rendered via createPortal on top of all content. Clicking the backdrop or triggering onClose dismisses the modal."
    >
      <Example.Case
        id="modal-basic"
        title="1) Basic"
        description="Modal with Header, Body, and Footer. Includes a close button and two actions."
      >
        <BasicModal />
      </Example.Case>

      <Example.Case
        id="modal-body-only"
        title="2) Body only"
        description="Minimal modal with only the Body slot — no chrome."
      >
        <BodyOnlyModal />
      </Example.Case>

      <Example.Case
        id="modal-scrollable"
        title="3) Scrollable body"
        description="Long content scrolls inside the Body while Header and Footer stay fixed."
      >
        <ScrollableModal />
      </Example.Case>
    </Example>
  );
};
