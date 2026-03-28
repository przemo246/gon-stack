import { useState } from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../libs/ui/tabs';

import { Example } from './example';

export const TabsDemo = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Example
      id="tabs-examples"
      title="Tabs"
      description="A navigation component that displays multiple content panels, each associated with a tab button."
    >
      <Example.Case
        id="tabs-basic"
        title="1) Basic (uncontrolled)"
        description="Three-tab panel driven by internal state via defaultValue."
      >
        <Tabs defaultValue="about" className="max-w-md">
          <TabsList>
            <TabsTrigger value="about">About Me</TabsTrigger>
            <TabsTrigger value="interests">Interests</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <p className="text-sm">
              Hopeless romantic who loves slow Sunday mornings, good coffee, and
              even better conversations. Looking for someone to share adventures
              with.
            </p>
          </TabsContent>
          <TabsContent value="interests">
            <ul className="list-disc pl-4 text-sm space-y-1">
              <li>Hiking and nature walks</li>
              <li>Cooking together</li>
              <li>Live music and cosy concerts</li>
            </ul>
          </TabsContent>
          <TabsContent value="photos">
            <p className="text-sm text-(--text-muted)">
              No photos uploaded yet.
            </p>
          </TabsContent>
        </Tabs>
      </Example.Case>

      <Example.Case
        id="tabs-controlled"
        title="2) Controlled"
        description="Parent state drives the active tab; value and onValueChange are used."
      >
        <div className="max-w-md space-y-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="matches">Matches</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <p className="text-sm">
                Your profile is 85% complete. Add a bio to attract more matches!
              </p>
            </TabsContent>
            <TabsContent value="matches">
              <p className="text-sm">
                You have 12 new matches this week. Say hello!
              </p>
            </TabsContent>
            <TabsContent value="messages">
              <p className="text-sm">
                3 unread conversations are waiting for you.
              </p>
            </TabsContent>
          </Tabs>
          <p className="text-xs text-(--text-muted)">
            Active tab: <strong>{activeTab}</strong>
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="tabs-disabled-trigger"
        title="3) Disabled trigger"
        description="A tab trigger that is not yet available is marked as disabled."
      >
        <Tabs defaultValue="timeline" className="max-w-md">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="memories">Memories</TabsTrigger>
            <TabsTrigger value="future" disabled>
              Future Plans
            </TabsTrigger>
          </TabsList>
          <TabsContent value="timeline">
            <p className="text-sm">
              Your relationship timeline will appear here.
            </p>
          </TabsContent>
          <TabsContent value="memories">
            <p className="text-sm">
              Cherish the moments you have shared together.
            </p>
          </TabsContent>
          <TabsContent value="future">
            <p className="text-sm">Coming soon — plan your future together.</p>
          </TabsContent>
        </Tabs>
      </Example.Case>
    </Example>
  );
};
