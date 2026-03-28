import { Button } from '../../../../libs/ui/button';
import { EmptyState } from '../../../../libs/ui/empty-state';

import { Example } from './example';

export const EmptyStateDemo = () => {
  return (
    <Example
      id="empty-state-examples"
      title="Empty State"
      description="A placeholder message displayed when a container has no data or results to show."
    >
      <Example.Case
        id="empty-state-basic"
        title="1) Basic"
        description="Minimal empty state with an icon, heading, and body text."
      >
        <EmptyState className="gap-3 py-10">
          <span className="text-4xl">💌</span>
          <p className="t3">No messages yet</p>
          <p className="b2 max-w-xs text-center">
            Start the conversation — send your first love note and make
            someone&apos;s day.
          </p>
        </EmptyState>
      </Example.Case>

      <Example.Case
        id="empty-state-with-action"
        title="2) With action"
        description="Empty state that guides the user toward a primary action to fill the void."
      >
        <EmptyState className="gap-4 py-10">
          <span className="text-5xl">📅</span>
          <p className="t3">No date nights planned</p>
          <p className="b2 max-w-xs text-center">
            Your calendar is wide open. Plan something special together and
            create a memory worth keeping.
          </p>
          <Button variant="primary">Plan a Date Night</Button>
        </EmptyState>
      </Example.Case>

      <Example.Case
        id="empty-state-secondary"
        title="3) Secondary variant"
        description="Empty state using the secondary variant — suitable for lower-emphasis contexts like sidebars."
      >
        <EmptyState
          variant="secondary"
          className="gap-3 rounded-xl border border-white/10 bg-white/5 py-8"
        >
          <span className="text-3xl">🗺️</span>
          <p className="t3">Bucket list is empty</p>
          <p className="b2 max-w-xs text-center">
            Dream big together. Add destinations, experiences, and adventures
            you want to share.
          </p>
          <Button variant="secondary">Add First Dream</Button>
        </EmptyState>
      </Example.Case>

      <Example.Case
        id="empty-state-error"
        title="4) Error / no results"
        description="Empty state displayed when a search returns no matching memories."
      >
        <EmptyState className="gap-3 py-10">
          <span className="text-4xl">🔍</span>
          <p className="t3">No memories found</p>
          <p className="b2 max-w-xs text-center">
            We couldn&apos;t find any memories matching &quot;Paris 2023&quot;.
            Try a different search term.
          </p>
          <Button variant="secondary">Clear Search</Button>
        </EmptyState>
      </Example.Case>
    </Example>
  );
};
