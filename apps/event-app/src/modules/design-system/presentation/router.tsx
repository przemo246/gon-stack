import { useState, type ComponentType } from 'react';

import { ButtonDemo } from './demo/button';
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
