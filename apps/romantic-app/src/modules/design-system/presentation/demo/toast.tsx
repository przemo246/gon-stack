import { useState } from 'react';

import { Button } from '../../../../libs/ui/button';
import { Toast } from '../../../../libs/ui/toast';

import { Example } from './example';

export const ToastDemo = () => {
  const [visible, setVisible] = useState(true);

  return (
    <Example
      id="toast-examples"
      title="Toast"
      description="A temporary notification that appears in the corner of the screen to deliver brief, non-blocking messages."
    >
      <Example.Case
        id="toast-variants"
        title="1) All variants"
        description="Primary, secondary, success, and error variants displayed statically."
      >
        <div className="flex flex-col gap-3">
          <Toast.Root variant="primary">
            <Toast.Content>
              <Toast.Title>New match!</Toast.Title>
              <Toast.Description>
                Someone just liked your profile.
              </Toast.Description>
            </Toast.Content>
            <Toast.Close />
          </Toast.Root>

          <Toast.Root variant="secondary">
            <Toast.Content>
              <Toast.Title>Reminder</Toast.Title>
              <Toast.Description>
                Your date night is scheduled for Friday at 7 pm.
              </Toast.Description>
            </Toast.Content>
            <Toast.Close />
          </Toast.Root>

          <Toast.Root variant="success">
            <Toast.Content>
              <Toast.Title>Love note sent!</Toast.Title>
              <Toast.Description>
                Your partner will receive it shortly.
              </Toast.Description>
            </Toast.Content>
            <Toast.Close />
          </Toast.Root>

          <Toast.Root variant="error">
            <Toast.Content>
              <Toast.Title>Could not send</Toast.Title>
              <Toast.Description>
                Check your connection and try again.
              </Toast.Description>
            </Toast.Content>
            <Toast.Close />
          </Toast.Root>
        </div>
      </Example.Case>

      <Example.Case
        id="toast-title-only"
        title="2) Title only"
        description="Minimal toast with just a title — no description or close button."
      >
        <Toast.Root variant="primary">
          <Toast.Content>
            <Toast.Title>You have a new message from Alex.</Toast.Title>
          </Toast.Content>
        </Toast.Root>
      </Example.Case>

      <Example.Case
        id="toast-dismissible"
        title="3) Dismissible (interactive)"
        description="Toast that can be dismissed; re-shown with the button below."
      >
        <div className="flex flex-col gap-3">
          {visible && (
            <Toast.Root variant="success">
              <Toast.Content>
                <Toast.Title>Anniversary reminder set!</Toast.Title>
                <Toast.Description>
                  We will remind you one week before your special day.
                </Toast.Description>
              </Toast.Content>
              <Toast.Close onClick={() => setVisible(false)} />
            </Toast.Root>
          )}
          {!visible && (
            <Button variant="secondary" onClick={() => setVisible(true)}>
              Show toast again
            </Button>
          )}
        </div>
      </Example.Case>
    </Example>
  );
};
