import { useState, type ComponentType } from 'react';

import { ButtonDemo } from './demo/button';
import { ModalDemo } from './demo/modal';
import { TextDemo } from './demo/text';
import { Layout } from './layout';
import {
  Navigation,
  type NavigationGroup,
  type NavigationItem,
} from './navigation';

type ComponentKey = string;

type DemoComponentConfig = {
  key: ComponentKey;
  label: string;
  rootId: string;
  items: NavigationItem[];
  demo: ComponentType;
};

function createDemoConfig(config: DemoComponentConfig): DemoComponentConfig {
  return config;
}

const components = [
  createDemoConfig({
    key: 'button',
    label: 'Button',
    rootId: 'button-examples',
    items: [
      { id: 'button-primary', label: 'Primary' },
      { id: 'button-secondary', label: 'Secondary' },
      { id: 'button-side-by-side', label: 'Side by side' },
      { id: 'button-disabled', label: 'Disabled states' },
    ],
    demo: ButtonDemo,
  }),
  createDemoConfig({
    key: 'modal',
    label: 'Modal',
    rootId: 'modal-examples',
    items: [
      { id: 'modal-basic', label: 'Basic' },
      { id: 'modal-body-only', label: 'Body only' },
      { id: 'modal-scrollable', label: 'Scrollable body' },
    ],
    demo: ModalDemo,
  }),
  createDemoConfig({
    key: 'text',
    label: 'Text',
    rootId: 'text-examples',
    items: [
      { id: 'text-titles', label: 'Title scale — T1–T6' },
      { id: 'text-body', label: 'Body — B1–B3' },
      { id: 'text-captions', label: 'Captions — C1–C2' },
      { id: 'text-labels', label: 'Labels — L1–L2' },
      { id: 'text-overline', label: 'Overline & Verbose' },
      { id: 'text-polymorphic', label: 'Polymorphic rendering' },
    ],
    demo: TextDemo,
  }),
];

const title = 'Design System';
const subtitle = 'Choose a component from the sidebar to browse its examples.';

export const Router = () => {
  const [activeComponent, setActiveComponent] = useState<ComponentKey>(
    components[0]?.key ?? '',
  );
  const [activeSection, setActiveSection] = useState<string>(
    components[0]?.rootId ?? '',
  );

  const activeConfig =
    components.find((c) => c.key === activeComponent) ?? components[0];

  const navigationGroups: NavigationGroup[] = components
    .map((c) => ({
      key: c.key,
      label: c.label,
      rootId: c.rootId,
      items: c.items,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const navigateTo = (componentKey: ComponentKey, sectionId: string) => {
    setActiveComponent(componentKey);
    setActiveSection(sectionId);

    window.requestAnimationFrame(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const Demo = activeConfig?.demo;

  return (
    <div className="w-full max-w-6xl">
      <div className="mb-8 space-y-2">
        <p className="text-xs font-mono uppercase tracking-widest text-accent">
          Components / UI
        </p>
        <h1 className="text-4xl font-serif text-text-primary">{title}</h1>
        <p className="text-sm text-text-muted">{subtitle}</p>
      </div>

      <Layout>
        <Navigation
          groups={navigationGroups}
          activeGroupKey={activeComponent}
          activeSectionId={activeSection}
          onNavigate={navigateTo}
        />
        {Demo ? <Demo /> : null}
      </Layout>
    </div>
  );
};
