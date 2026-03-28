import { useState } from 'react';

import { Button } from '../../../../libs/ui/button';
import { Modal } from '../../../../libs/ui/modal';

import { Example } from './example';

export const ModalDemo = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <Example
      id="modal-examples"
      title="Modal"
      description="A dialog overlay that focuses user attention on a specific task or message before allowing other interactions."
    >
      <Example.Case
        id="modal-basic"
        title="1) Basic"
        description="A simple modal overlay with a dismiss button."
      >
        <Button variant="primary" onClick={() => setBasicOpen(true)}>
          Open Modal
        </Button>

        {basicOpen && (
          <Modal
            className="z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setBasicOpen(false);
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 space-y-4">
              <h2 className="text-xl font-semibold text-center">
                A message for you 💌
              </h2>
              <p className="text-gray-600 text-center">
                Every day with you is a gift I never want to return.
              </p>
              <div className="flex justify-center">
                <Button variant="primary" onClick={() => setBasicOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </Example.Case>

      <Example.Case
        id="modal-confirm"
        title="2) Confirmation dialog"
        description="Modal used as a confirmation prompt before a destructive action."
      >
        <Button variant="secondary" onClick={() => setConfirmOpen(true)}>
          Delete memory
        </Button>

        {confirmOpen && (
          <Modal className="z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 space-y-4">
              <h2 className="text-xl font-semibold text-center">
                Are you sure?
              </h2>
              <p className="text-gray-500 text-center text-sm">
                This will permanently delete &quot;Our First Anniversary&quot;
                from your memories. This cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setConfirmOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setConfirmOpen(false)}>
                  Delete
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </Example.Case>

      <Example.Case
        id="modal-form"
        title="3) Form inside modal"
        description="A modal containing a simple form to add a romantic note."
      >
        <Button variant="primary" onClick={() => setFormOpen(true)}>
          Add a love note
        </Button>

        {formOpen && (
          <Modal
            className="z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setFormOpen(false);
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 space-y-4">
              <h2 className="text-xl font-semibold">New love note</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <input
                    type="text"
                    defaultValue="My dearest"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write something from the heart…"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setFormOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setFormOpen(false)}>
                  Send
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </Example.Case>

      <Example.Case
        id="modal-inline-preview"
        title="4) Static preview"
        description="Modal rendered inline (not fixed) so it is always visible in the demo."
      >
        <div className="relative h-48 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center">
          <Modal className="static inset-auto flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-xs text-center space-y-2">
              <span className="text-3xl">🌹</span>
              <p className="font-medium">You mean the world to me.</p>
              <p className="text-xs text-gray-400">Tap anywhere to dismiss</p>
            </div>
          </Modal>
        </div>
      </Example.Case>
    </Example>
  );
};
