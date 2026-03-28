import { useState, type ComponentType } from 'react';

import { AccordionDemo } from './demo/accordion';
import { ButtonGroupDemo } from './demo/button-group';
import { CarouselDemo } from './demo/carousel';
import { DatepickerDemo } from './demo/datepicker';
import { DrawerDemo } from './demo/drawer';
import { DropdownMenuDemo } from './demo/dropdown-menu';
import { EmptyStateDemo } from './demo/empty-state';
import { FieldsetDemo } from './demo/fieldset';
import { FooterDemo } from './demo/footer';
import { FormDemo } from './demo/form';
import { HeaderDemo } from './demo/header';
import { HeroDemo } from './demo/hero';
import { IconDemo } from './demo/icon';
import { ImageDemo } from './demo/image';
import { ListDemo } from './demo/list';
import { ModalDemo } from './demo/modal';
import { NavigationUiDemo } from './demo/navigation-ui';
import { PopoverDemo } from './demo/popover';
import { RichTextEditorDemo } from './demo/rich-text-editor';
import { StackDemo } from './demo/stack';
import { TooltipDemo } from './demo/tooltip';
import { TreeViewDemo } from './demo/tree-view';
import { VideoDemo } from './demo/video';
import { VisuallyHiddenDemo } from './demo/visually-hidden';
import { AlertDemo } from './demo/alert';
import { AvatarDemo } from './demo/avatar';
import { BadgeDemo } from './demo/badge';
import { BreadcrumbsDemo } from './demo/breadcrumbs';
import { ButtonDemo } from './demo/button';
import { CardDemo } from './demo/card';
import { CheckboxDemo } from './demo/checkbox';
import { ColorPickerDemo } from './demo/color-picker';
import { ComboboxDemo } from './demo/combobox';
import { DateInputDemo } from './demo/date-input';
import { FileDemo } from './demo/file';
import { FileUploadDemo } from './demo/file-upload';
import { HeadingDemo } from './demo/heading';
import { InputDemo } from './demo/input';
import { LabelDemo } from './demo/label';
import { LinkDemo } from './demo/link';
import { PaginationDemo } from './demo/pagination';
import { ProgressBarDemo } from './demo/progress-bar';
import { ProgressIndicatorDemo } from './demo/progress-indicator';
import { QuoteDemo } from './demo/quote';
import { RadioButtonDemo } from './demo/radio-button';
import { RatingDemo } from './demo/rating';
import { SearchInputDemo } from './demo/search-input';
import { SegmentedControlDemo } from './demo/segmented-control';
import { SelectDemo } from './demo/select';
import { SeparatorDemo } from './demo/separator';
import { SkeletonDemo } from './demo/skeleton';
import { SkipLinkDemo } from './demo/skip-link';
import { SliderDemo } from './demo/slider';
import { SpinnerDemo } from './demo/spinner';
import { StepperDemo } from './demo/stepper';
import { TableDemo } from './demo/table';
import { TabsDemo } from './demo/tabs';
import { TextDemo } from './demo/text';
import { TextareaDemo } from './demo/textarea';
import { ToastDemo } from './demo/toast';
import { ToggleDemo } from './demo/toggle';
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
    key: 'button-group',
    label: 'Button Group',
    rootId: 'button-group-examples',
    items: [
      { id: 'button-group-basic', label: 'Basic' },
      { id: 'button-group-secondary', label: 'Secondary actions' },
      { id: 'button-group-mixed', label: 'Mixed variants' },
      { id: 'button-group-disabled', label: 'Disabled state' },
    ],
    demo: ButtonGroupDemo,
  }),
  createDemoConfig({
    key: 'carousel',
    label: 'Carousel',
    rootId: 'carousel-examples',
    items: [
      { id: 'carousel-basic', label: 'Basic' },
      { id: 'carousel-secondary', label: 'Secondary variant' },
      { id: 'carousel-photo-strip', label: 'Photo strip' },
    ],
    demo: CarouselDemo,
  }),
  createDemoConfig({
    key: 'datepicker',
    label: 'Datepicker',
    rootId: 'datepicker-examples',
    items: [
      { id: 'datepicker-basic', label: 'Basic' },
      { id: 'datepicker-prefilled', label: 'Pre-filled value' },
      { id: 'datepicker-with-action', label: 'With action button' },
      { id: 'datepicker-secondary', label: 'Secondary variant' },
    ],
    demo: DatepickerDemo,
  }),
  createDemoConfig({
    key: 'drawer',
    label: 'Drawer',
    rootId: 'drawer-examples',
    items: [
      { id: 'drawer-basic', label: 'Basic (right)' },
      { id: 'drawer-left', label: 'Left side' },
      { id: 'drawer-interactive', label: 'Interactive toggle' },
      { id: 'drawer-left-interactive', label: 'Left interactive' },
    ],
    demo: DrawerDemo,
  }),
  createDemoConfig({
    key: 'dropdown-menu',
    label: 'Dropdown Menu',
    rootId: 'dropdown-menu-examples',
    items: [
      { id: 'dropdown-menu-basic', label: 'Basic' },
      { id: 'dropdown-menu-mood', label: 'Selection with state' },
      { id: 'dropdown-menu-secondary', label: 'Secondary variant static' },
    ],
    demo: DropdownMenuDemo,
  }),
  createDemoConfig({
    key: 'empty-state',
    label: 'Empty State',
    rootId: 'empty-state-examples',
    items: [
      { id: 'empty-state-basic', label: 'Basic' },
      { id: 'empty-state-with-action', label: 'With action' },
      { id: 'empty-state-secondary', label: 'Secondary variant' },
      { id: 'empty-state-error', label: 'Error / no results' },
    ],
    demo: EmptyStateDemo,
  }),
  createDemoConfig({
    key: 'fieldset',
    label: 'Fieldset',
    rootId: 'fieldset-examples',
    items: [
      { id: 'fieldset-basic', label: 'Basic' },
      { id: 'fieldset-disabled', label: 'Disabled state' },
      { id: 'fieldset-relationship-goal', label: 'Relationship goal form' },
      { id: 'fieldset-nested', label: 'Nested fieldsets' },
    ],
    demo: FieldsetDemo,
  }),
  createDemoConfig({
    key: 'footer',
    label: 'Footer',
    rootId: 'footer-examples',
    items: [
      { id: 'footer-basic', label: 'Basic' },
      { id: 'footer-navigation', label: 'Navigation links' },
      { id: 'footer-rich', label: 'Rich footer with columns' },
      { id: 'footer-centered', label: 'Centered layout' },
    ],
    demo: FooterDemo,
  }),
  createDemoConfig({
    key: 'form',
    label: 'Form',
    rootId: 'form-examples',
    items: [
      { id: 'form-basic', label: 'Basic sign-up' },
      { id: 'form-feedback', label: 'Feedback form' },
      { id: 'form-profile', label: 'Profile settings' },
      { id: 'form-inline', label: 'Inline / horizontal layout' },
    ],
    demo: FormDemo,
  }),
  createDemoConfig({
    key: 'header',
    label: 'Header',
    rootId: 'header-examples',
    items: [
      { id: 'header-basic', label: 'Basic' },
      { id: 'header-navigation', label: 'Navigation bar' },
      { id: 'header-app-bar', label: 'In-app top bar' },
      { id: 'header-mobile-menu', label: 'Mobile menu toggle' },
      { id: 'header-transparent', label: 'Transparent / overlay' },
    ],
    demo: HeaderDemo,
  }),
  createDemoConfig({
    key: 'hero',
    label: 'Hero',
    rootId: 'hero-examples',
    items: [
      { id: 'hero-basic', label: 'Basic' },
      { id: 'hero-gradient', label: 'Gradient background' },
      { id: 'hero-split', label: 'Split layout' },
      { id: 'hero-compact', label: 'Compact hero' },
      { id: 'hero-dark', label: 'Dark / deep background' },
    ],
    demo: HeroDemo,
  }),
  createDemoConfig({
    key: 'icon',
    label: 'Icon',
    rootId: 'icon-examples',
    items: [
      { id: 'icon-basic', label: 'Basic' },
      { id: 'icon-with-text', label: 'With text' },
      { id: 'icon-multiple', label: 'Multiple icons' },
      { id: 'icon-sized', label: 'Custom sizes' },
      { id: 'icon-svg', label: 'Inline SVG' },
    ],
    demo: IconDemo,
  }),
  createDemoConfig({
    key: 'image',
    label: 'Image',
    rootId: 'image-examples',
    items: [
      { id: 'image-basic', label: 'Basic' },
      { id: 'image-rounded', label: 'Rounded / avatar style' },
      { id: 'image-full-width', label: 'Full-width banner' },
      { id: 'image-gallery', label: 'Photo gallery' },
      { id: 'image-with-caption', label: 'With caption' },
    ],
    demo: ImageDemo,
  }),
  createDemoConfig({
    key: 'list',
    label: 'List',
    rootId: 'list-examples',
    items: [
      { id: 'list-basic', label: 'Basic' },
      { id: 'list-styled-items', label: 'Styled items' },
      { id: 'list-numbered', label: 'Ordered (numbered)' },
      { id: 'list-horizontal', label: 'Horizontal layout' },
    ],
    demo: ListDemo,
  }),
  createDemoConfig({
    key: 'modal',
    label: 'Modal',
    rootId: 'modal-examples',
    items: [
      { id: 'modal-basic', label: 'Basic' },
      { id: 'modal-confirm', label: 'Confirmation dialog' },
      { id: 'modal-form', label: 'Form inside modal' },
      { id: 'modal-inline-preview', label: 'Static preview' },
    ],
    demo: ModalDemo,
  }),
  createDemoConfig({
    key: 'navigation-ui',
    label: 'Navigation',
    rootId: 'navigation-ui-examples',
    items: [
      { id: 'navigation-ui-basic', label: 'Basic' },
      { id: 'navigation-ui-with-logo', label: 'With logo and actions' },
      { id: 'navigation-ui-pill-tabs', label: 'Pill tabs' },
      { id: 'navigation-ui-breadcrumb-style', label: 'Breadcrumb-style' },
    ],
    demo: NavigationUiDemo,
  }),
  createDemoConfig({
    key: 'popover',
    label: 'Popover',
    rootId: 'popover-examples',
    items: [
      { id: 'popover-basic', label: 'Basic' },
      { id: 'popover-emoji-picker', label: 'Emoji reaction picker' },
      { id: 'popover-context-menu', label: 'Context menu' },
      { id: 'popover-tooltip-style', label: 'Tooltip-style hint' },
    ],
    demo: PopoverDemo,
  }),
  createDemoConfig({
    key: 'rich-text-editor',
    label: 'Rich Text Editor',
    rootId: 'rich-text-editor-examples',
    items: [
      { id: 'rich-text-editor-basic', label: 'Basic' },
      { id: 'rich-text-editor-primary', label: 'Primary Variant' },
      { id: 'rich-text-editor-secondary', label: 'Secondary Variant' },
      { id: 'rich-text-editor-toolbar', label: 'With Toolbar' },
      { id: 'rich-text-editor-submit', label: 'With Submit Action' },
      { id: 'rich-text-editor-readonly', label: 'Read-Only Display' },
    ],
    demo: RichTextEditorDemo,
  }),
  createDemoConfig({
    key: 'stack',
    label: 'Stack',
    rootId: 'stack-examples',
    items: [
      { id: 'stack-basic', label: 'Basic' },
      { id: 'stack-primary', label: 'Primary Variant' },
      { id: 'stack-secondary', label: 'Secondary Variant' },
      { id: 'stack-nested', label: 'Nested Stacks' },
      { id: 'stack-form', label: 'Form Layout' },
      { id: 'stack-horizontal', label: 'Horizontal via className Override' },
    ],
    demo: StackDemo,
  }),
  createDemoConfig({
    key: 'tooltip',
    label: 'Tooltip',
    rootId: 'tooltip-examples',
    items: [
      { id: 'tooltip-basic', label: 'Basic' },
      { id: 'tooltip-primary', label: 'Primary Variant' },
      { id: 'tooltip-secondary', label: 'Secondary Variant' },
      { id: 'tooltip-interactive', label: 'Interactive Hover State' },
      { id: 'tooltip-inline-text', label: 'Inline Within Paragraph' },
      { id: 'tooltip-icon-button', label: 'Wrapping an Icon Button' },
    ],
    demo: TooltipDemo,
  }),
  createDemoConfig({
    key: 'tree-view',
    label: 'Tree View',
    rootId: 'tree-view-examples',
    items: [
      { id: 'tree-view-basic', label: 'Basic' },
      { id: 'tree-view-nested', label: 'Nested Tree' },
      { id: 'tree-view-selectable', label: 'Selectable Nodes' },
      { id: 'tree-view-primary', label: 'Primary Variant' },
      { id: 'tree-view-deep', label: 'Deep Multi-Level Nesting' },
    ],
    demo: TreeViewDemo,
  }),
  createDemoConfig({
    key: 'video',
    label: 'Video',
    rootId: 'video-examples',
    items: [
      { id: 'video-basic', label: 'Basic' },
      { id: 'video-autoplay-muted', label: 'Autoplay Muted Loop' },
      { id: 'video-poster', label: 'With Poster Image' },
      { id: 'video-custom-controls', label: 'Custom Play / Pause Controls' },
      { id: 'video-primary', label: 'Primary Variant' },
      { id: 'video-secondary', label: 'Secondary Variant' },
      { id: 'video-aspect-ratio', label: 'Aspect-Ratio Container' },
    ],
    demo: VideoDemo,
  }),
  createDemoConfig({
    key: 'visually-hidden',
    label: 'Visually Hidden',
    rootId: 'visually-hidden-examples',
    items: [
      { id: 'visually-hidden-basic', label: 'Basic' },
      {
        id: 'visually-hidden-icon-button',
        label: 'Accessible Icon Button Label',
      },
      { id: 'visually-hidden-form-context', label: 'Form Field Context' },
      { id: 'visually-hidden-status', label: 'Live Region Announcement' },
      { id: 'visually-hidden-primary', label: 'Primary Variant' },
      {
        id: 'visually-hidden-skip-equivalent',
        label: 'Skip Navigation Pattern',
      },
    ],
    demo: VisuallyHiddenDemo,
  }),
  createDemoConfig({
    key: 'accordion',
    label: 'Accordion',
    rootId: 'accordion-examples',
    items: [
      { id: 'accordion-basic', label: 'Basic' },
      { id: 'accordion-default-open', label: 'Default open' },
      { id: 'accordion-multiple', label: 'Multiple items (controlled)' },
      { id: 'accordion-external-control', label: 'External control' },
    ],
    demo: AccordionDemo,
  }),
  createDemoConfig({
    key: 'alert',
    label: 'Alert',
    rootId: 'alert-examples',
    items: [
      { id: 'alert-primary', label: 'Primary' },
      { id: 'alert-secondary', label: 'Secondary' },
      { id: 'alert-success', label: 'Success' },
      { id: 'alert-error', label: 'Error' },
      { id: 'alert-all-variants', label: 'All variants' },
      {
        id: 'alert-with-icon-and-text',
        label: 'With icon and structured content',
      },
    ],
    demo: AlertDemo,
  }),
  createDemoConfig({
    key: 'avatar',
    label: 'Avatar',
    rootId: 'avatar-examples',
    items: [
      { id: 'avatar-initials', label: 'Initials' },
      { id: 'avatar-sizes', label: 'Sizes' },
      { id: 'avatar-variants', label: 'Variants' },
      { id: 'avatar-image', label: 'With image' },
      { id: 'avatar-custom-children', label: 'Custom children' },
      { id: 'avatar-group', label: 'Avatar group (stacked)' },
    ],
    demo: AvatarDemo,
  }),
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
    key: 'breadcrumbs',
    label: 'Breadcrumbs',
    rootId: 'breadcrumbs-examples',
    items: [
      { id: 'breadcrumbs-basic', label: 'Basic' },
      { id: 'breadcrumbs-custom-separator', label: 'Custom separator' },
      { id: 'breadcrumbs-deep-path', label: 'Deep path' },
      { id: 'breadcrumbs-single-level', label: 'Single level (root active)' },
      { id: 'breadcrumbs-emoji-separator', label: 'Emoji separator' },
    ],
    demo: BreadcrumbsDemo,
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
    key: 'checkbox',
    label: 'Checkbox',
    rootId: 'checkbox-examples',
    items: [
      { id: 'checkbox-basic', label: 'Basic' },
      { id: 'checkbox-checked', label: 'Checked by default' },
      { id: 'checkbox-controlled', label: 'Controlled' },
      { id: 'checkbox-group', label: 'Checkbox group' },
      { id: 'checkbox-disabled', label: 'Disabled states' },
    ],
    demo: CheckboxDemo,
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
    key: 'color-picker',
    label: 'Color Picker',
    rootId: 'color-picker-examples',
    items: [
      { id: 'color-picker-basic', label: 'Basic' },
      { id: 'color-picker-controlled', label: 'Controlled' },
      { id: 'color-picker-multiple', label: 'Multiple Pickers' },
      { id: 'color-picker-disabled', label: 'Disabled' },
    ],
    demo: ColorPickerDemo,
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
    key: 'date-input',
    label: 'Date Input',
    rootId: 'date-input-examples',
    items: [
      { id: 'date-input-basic', label: 'Basic' },
      { id: 'date-input-default-value', label: 'Default Value' },
      { id: 'date-input-controlled', label: 'Controlled' },
      { id: 'date-input-min-max', label: 'Min / Max' },
      { id: 'date-input-disabled', label: 'Disabled' },
      { id: 'date-input-form', label: 'Form Integration' },
    ],
    demo: DateInputDemo,
  }),
  createDemoConfig({
    key: 'file',
    label: 'File',
    rootId: 'file-examples',
    items: [
      { id: 'file-basic', label: 'Basic' },
      { id: 'file-with-meta', label: 'Name + Meta' },
      { id: 'file-list', label: 'File List' },
      { id: 'file-custom-children', label: 'Custom Children' },
      { id: 'file-icon-only', label: 'Icon Only' },
    ],
    demo: FileDemo,
  }),
  createDemoConfig({
    key: 'file-upload',
    label: 'File Upload',
    rootId: 'file-upload-examples',
    items: [
      { id: 'file-upload-basic', label: 'Basic' },
      { id: 'file-upload-custom-content', label: 'Custom Content' },
      { id: 'file-upload-accept', label: 'Accept Filter' },
      { id: 'file-upload-multiple', label: 'Multiple Files' },
      { id: 'file-upload-disabled', label: 'Disabled' },
    ],
    demo: FileUploadDemo,
  }),
  createDemoConfig({
    key: 'heading',
    label: 'Heading',
    rootId: 'heading-examples',
    items: [
      { id: 'heading-levels', label: 'All Levels' },
      { id: 'heading-as-prop', label: 'Custom Tag (as)' },
      { id: 'heading-default', label: 'Default' },
      { id: 'heading-custom-class', label: 'Custom ClassName' },
      { id: 'heading-in-context', label: 'In-Context Composition' },
    ],
    demo: HeadingDemo,
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
    key: 'label',
    label: 'Label',
    rootId: 'label-examples',
    items: [
      { id: 'label-basic', label: 'Basic' },
      { id: 'label-with-checkbox', label: 'Wrapping a checkbox' },
      { id: 'label-multiple-fields', label: 'Multiple labelled fields' },
      { id: 'label-icon', label: 'Label with icon' },
    ],
    demo: LabelDemo,
  }),
  createDemoConfig({
    key: 'link',
    label: 'Link',
    rootId: 'link-examples',
    items: [
      { id: 'link-primary', label: 'Primary' },
      { id: 'link-secondary', label: 'Secondary' },
      { id: 'link-both-variants', label: 'Both variants side by side' },
      { id: 'link-inline-text', label: 'Inline in a paragraph' },
      { id: 'link-external', label: 'External link' },
      { id: 'link-with-icon', label: 'Link with icon' },
    ],
    demo: LinkDemo,
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
    key: 'progress-bar',
    label: 'ProgressBar',
    rootId: 'progress-bar-examples',
    items: [
      { id: 'progress-bar-primary', label: 'Primary variant' },
      { id: 'progress-bar-secondary', label: 'Secondary variant' },
      { id: 'progress-bar-edge-cases', label: 'Edge cases — 0% and 100%' },
      { id: 'progress-bar-custom-max', label: 'Custom max' },
      { id: 'progress-bar-interactive', label: 'Interactive (controlled)' },
      { id: 'progress-bar-labelled-list', label: 'Labelled list' },
    ],
    demo: ProgressBarDemo,
  }),
  createDemoConfig({
    key: 'progress-indicator',
    label: 'ProgressIndicator',
    rootId: 'progress-indicator-examples',
    items: [
      { id: 'progress-indicator-primary', label: 'Primary variant' },
      { id: 'progress-indicator-secondary', label: 'Secondary variant' },
      { id: 'progress-indicator-sizes', label: 'Sizes — sm / md / lg' },
      { id: 'progress-indicator-no-label', label: 'Hidden label' },
      { id: 'progress-indicator-custom-max', label: 'Custom max' },
      {
        id: 'progress-indicator-interactive',
        label: 'Interactive step tracker',
      },
      { id: 'progress-indicator-dashboard', label: 'Dashboard row' },
    ],
    demo: ProgressIndicatorDemo,
  }),
  createDemoConfig({
    key: 'quote',
    label: 'Quote',
    rootId: 'quote-examples',
    items: [
      { id: 'quote-primary', label: 'Primary variant' },
      { id: 'quote-secondary', label: 'Secondary variant' },
      { id: 'quote-with-cite', label: 'With attribution (cite)' },
      { id: 'quote-no-cite', label: 'Without attribution' },
      { id: 'quote-both-variants', label: 'Both variants compared' },
      { id: 'quote-long-content', label: 'Long-form quote' },
      { id: 'quote-feed', label: 'Quote feed' },
    ],
    demo: QuoteDemo,
  }),
  createDemoConfig({
    key: 'radio-button',
    label: 'Radio Button',
    rootId: 'radio-button-examples',
    items: [
      { id: 'radio-button-basic', label: 'Basic' },
      { id: 'radio-button-controlled', label: 'Controlled' },
      { id: 'radio-button-default-checked', label: 'Default Checked' },
      { id: 'radio-button-required', label: 'Required (Form Validation)' },
      { id: 'radio-button-disabled', label: 'Disabled' },
    ],
    demo: RadioButtonDemo,
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
    key: 'search-input',
    label: 'Search Input',
    rootId: 'search-input-examples',
    items: [
      { id: 'search-input-basic', label: 'Basic' },
      { id: 'search-input-controlled', label: 'Controlled with live filter' },
      { id: 'search-input-debounced', label: 'Debounced Search' },
      {
        id: 'search-input-default-value',
        label: 'Default Value (Uncontrolled)',
      },
      { id: 'search-input-disabled', label: 'Disabled' },
    ],
    demo: SearchInputDemo,
  }),
  createDemoConfig({
    key: 'segmented-control',
    label: 'Segmented Control',
    rootId: 'segmented-control-examples',
    items: [
      { id: 'segmented-control-basic', label: 'Basic (Uncontrolled)' },
      { id: 'segmented-control-controlled', label: 'Controlled' },
      { id: 'segmented-control-mood', label: 'Relationship Mood Picker' },
      { id: 'segmented-control-period', label: 'Time Period Filter' },
      { id: 'segmented-control-disabled-items', label: 'Disabled Items' },
    ],
    demo: SegmentedControlDemo,
  }),
  createDemoConfig({
    key: 'select',
    label: 'Select',
    rootId: 'select-examples',
    items: [
      { id: 'select-basic', label: 'Basic' },
      { id: 'select-controlled', label: 'Controlled' },
      { id: 'select-option-groups', label: 'Option Groups' },
      { id: 'select-form', label: 'Form Integration' },
      { id: 'select-disabled', label: 'Disabled' },
    ],
    demo: SelectDemo,
  }),
  createDemoConfig({
    key: 'separator',
    label: 'Separator',
    rootId: 'separator-examples',
    items: [
      { id: 'separator-default', label: 'Default (Horizontal)' },
      { id: 'separator-primary', label: 'Primary Variant' },
      { id: 'separator-secondary', label: 'Secondary Variant' },
      { id: 'separator-vertical', label: 'Vertical Orientation' },
      { id: 'separator-in-profile', label: 'Inside a Profile Card' },
    ],
    demo: SeparatorDemo,
  }),
  createDemoConfig({
    key: 'skeleton',
    label: 'Skeleton',
    rootId: 'skeleton-examples',
    items: [
      { id: 'skeleton-basic', label: 'Basic' },
      { id: 'skeleton-text-lines', label: 'Text lines' },
      { id: 'skeleton-profile-card', label: 'Profile card' },
      { id: 'skeleton-media-card', label: 'Media card' },
    ],
    demo: SkeletonDemo,
  }),
  createDemoConfig({
    key: 'skip-link',
    label: 'SkipLink',
    rootId: 'skip-link-examples',
    items: [
      { id: 'skip-link-primary', label: 'Primary' },
      { id: 'skip-link-secondary', label: 'Secondary' },
      { id: 'skip-link-multiple', label: 'Multiple' },
    ],
    demo: SkipLinkDemo,
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
  createDemoConfig({
    key: 'spinner',
    label: 'Spinner',
    rootId: 'spinner-examples',
    items: [
      { id: 'spinner-sizes', label: 'Sizes' },
      { id: 'spinner-variants', label: 'Variants' },
      { id: 'spinner-inline', label: 'Inline with text' },
      { id: 'spinner-button-loading', label: 'Button loading state' },
    ],
    demo: SpinnerDemo,
  }),
  createDemoConfig({
    key: 'tabs',
    label: 'Tabs',
    rootId: 'tabs-examples',
    items: [
      { id: 'tabs-basic', label: 'Basic (uncontrolled)' },
      { id: 'tabs-controlled', label: 'Controlled' },
      { id: 'tabs-disabled-trigger', label: 'Disabled trigger' },
    ],
    demo: TabsDemo,
  }),
  createDemoConfig({
    key: 'textarea',
    label: 'Textarea',
    rootId: 'textarea-examples',
    items: [
      { id: 'textarea-basic', label: 'Basic' },
      { id: 'textarea-controlled', label: 'Controlled with character count' },
      { id: 'textarea-disabled', label: 'Disabled' },
      { id: 'textarea-custom-rows', label: 'Custom rows' },
    ],
    demo: TextareaDemo,
  }),
  createDemoConfig({
    key: 'toast',
    label: 'Toast',
    rootId: 'toast-examples',
    items: [
      { id: 'toast-variants', label: 'All variants' },
      { id: 'toast-title-only', label: 'Title only' },
      { id: 'toast-dismissible', label: 'Dismissible' },
    ],
    demo: ToastDemo,
  }),
  createDemoConfig({
    key: 'toggle',
    label: 'Toggle',
    rootId: 'toggle-examples',
    items: [
      { id: 'toggle-basic', label: 'Basic (uncontrolled)' },
      { id: 'toggle-variants', label: 'Variants' },
      { id: 'toggle-controlled', label: 'Controlled' },
      { id: 'toggle-disabled', label: 'Disabled' },
    ],
    demo: ToggleDemo,
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

  const navigationGroups: NavigationGroup[] = components
    .map((component) => ({
      key: component.key,
      label: component.label,
      rootId: component.rootId,
      items: component.items,
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
