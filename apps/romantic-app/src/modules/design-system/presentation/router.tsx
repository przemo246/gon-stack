import { useState, type ComponentType } from 'react';

import { BadgeDemo } from './demo/badge';
import { ButtonDemo } from './demo/button';
import { CardDemo } from './demo/card';
import { ComboboxDemo } from './demo/combobox';
import { InputDemo } from './demo/input';
import { PaginationDemo } from './demo/pagination';
import { RatingDemo } from './demo/rating';
import { SliderDemo } from './demo/slider';
import { StepperDemo } from './demo/stepper';
import { TableDemo } from './demo/table';
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
    key: 'badge',
    label: 'Badge',
    rootId: 'badge-examples',
    items: [
      { id: 'badge-primary', label: 'Primary' },
      { id: 'badge-secondary', label: 'Secondary' },
      { id: 'badge-side-by-side', label: 'Side by side' },
      { id: 'badge-in-context', label: 'In context' },
    ],
    demo: BadgeDemo,
  }),
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
    key: 'card',
    label: 'Card',
    rootId: 'card-examples',
    items: [
      { id: 'card-basic', label: 'Basic usage' },
      { id: 'card-structured', label: 'Structured content' },
      { id: 'card-long-content', label: 'Long content' },
      { id: 'card-nested', label: 'Nested cards' },
    ],
    demo: CardDemo,
  }),
  createDemoConfig({
    key: 'combobox',
    label: 'Combobox',
    rootId: 'combobox-examples',
    items: [
      { id: 'combobox-basic', label: 'Basic (Uncontrolled)' },
      { id: 'combobox-controlled', label: 'Controlled' },
      { id: 'combobox-disabled-items', label: 'Disabled Items' },
      { id: 'combobox-empty', label: 'Empty State' },
    ],
    demo: ComboboxDemo,
  }),
  createDemoConfig({
    key: 'input',
    label: 'Input',
    rootId: 'input-examples',
    items: [
      { id: 'input-default', label: 'Default' },
      { id: 'input-password', label: 'Password' },
      { id: 'input-disabled', label: 'Disabled' },
    ],
    demo: InputDemo,
  }),
  createDemoConfig({
    key: 'text',
    label: 'Text',
    rootId: 'text-examples',
    items: [
      { id: 'text-headings', label: 'Headings (H1-H6)' },
      { id: 'text-body', label: 'Body (B1-B3)' },
      { id: 'text-meta', label: 'Captions / Labels / Overline' },
      { id: 'text-ornamental', label: 'Ornamental (O1-O2)' },
    ],
    demo: TextDemo,
  }),
  createDemoConfig({
    key: 'table',
    label: 'Table',
    rootId: 'table-examples',
    items: [
      { id: 'table-basic', label: 'Basic' },
      { id: 'table-no-foot', label: 'Without footer' },
    ],
    demo: TableDemo,
  }),
  createDemoConfig({
    key: 'stepper',
    label: 'Stepper',
    rootId: 'stepper-examples',
    items: [
      { id: 'stepper-default', label: 'Default (Uncontrolled)' },
      { id: 'stepper-controlled', label: 'Controlled' },
      { id: 'stepper-format', label: 'Format Display' },
      { id: 'stepper-disabled', label: 'Disabled' },
      { id: 'stepper-boundary', label: 'Min/Max Boundary' },
      { id: 'stepper-secondary', label: 'Secondary Variant' },
      { id: 'stepper-custom-step', label: 'Custom Step' },
    ],
    demo: StepperDemo,
  }),
  createDemoConfig({
    key: 'pagination',
    label: 'Pagination',
    rootId: 'pagination-examples',
    items: [
      { id: 'pagination-basic', label: 'Basic (Uncontrolled)' },
      { id: 'pagination-controlled', label: 'Controlled' },
      { id: 'pagination-single', label: 'Single Page' },
      { id: 'pagination-many', label: 'Many Pages' },
    ],
    demo: PaginationDemo,
  }),
  createDemoConfig({
    key: 'rating',
    label: 'Rating',
    rootId: 'rating-examples',
    items: [
      { id: 'rating-static-filled', label: 'Static (All Filled)' },
      { id: 'rating-static-empty', label: 'Static (All Empty)' },
      { id: 'rating-partial', label: 'Partial Rating' },
      { id: 'rating-interactive', label: 'Interactive (Controlled)' },
      { id: 'rating-sizes', label: 'Custom Sizes' },
    ],
    demo: RatingDemo,
  }),
  createDemoConfig({
    key: 'slider',
    label: 'Slider',
    rootId: 'slider-examples',
    items: [
      { id: 'slider-basic', label: 'Basic (Uncontrolled)' },
      { id: 'slider-controlled', label: 'Controlled + Commit' },
      { id: 'slider-range', label: 'Range (Two thumbs)' },
      { id: 'slider-vertical', label: 'Vertical' },
      { id: 'slider-triple', label: 'Multi-thumb (Three thumbs)' },
      { id: 'slider-manual', label: 'Manual single-thumb' },
      { id: 'slider-disabled', label: 'Disabled' },
      { id: 'slider-rtl', label: 'RTL Direction' },
      { id: 'slider-custom-step', label: 'Custom Step + Label' },
      { id: 'slider-form', label: 'Form Integration' },
    ],
    demo: SliderDemo,
  }),
];

const title = 'Design System Sandbox';
const subtitle = 'Choose a component from the sidebar to browse its examples.';

export const Router = () => {
  const [activeComponent, setActiveComponent] = useState<ComponentKey>(
    components[0]?.key ?? '',
  );
  const [activeSection, setActiveSection] = useState<string>(
    components[0]?.rootId ?? '',
  );

  const activeConfig =
    components.find((component) => component.key === activeComponent) ??
    components[0];

  const navigationGroups: NavigationGroup[] = components.map((component) => ({
    key: component.key,
    label: component.label,
    rootId: component.rootId,
    items: component.items,
  }));

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
      <div className="mb-6 space-y-2">
        <p className="v1">Components / UI</p>
        <h1 className="t1">{title}</h1>
        <p className="b2">{subtitle}</p>
      </div>

      <Layout>
        <Navigation
          groups={navigationGroups}
          activeGroupKey={activeComponent}
          activeSectionId={activeSection}
          onNavigate={navigateTo}
        />
        <Demo />
      </Layout>
    </div>
  );
};
