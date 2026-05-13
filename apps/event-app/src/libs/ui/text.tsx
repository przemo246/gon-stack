import { type ComponentProps, createElement, type ElementType } from 'react';

import { cn } from './cn';

/* =============================================================================
 * Shared Types
 * ============================================================================= */

type TextVariant =
  | 'hero-display'
  | 'product-display'
  | 'section-display'
  | 'section-heading'
  | 'card-heading'
  | 'feature-heading'
  | 'body-large'
  | 'body'
  | 'button'
  | 'caption'
  | 'mono-label'
  | 'micro';

type TextBaseProps<TAs extends ElementType> = {
  as?: TAs;
  className?: string;
} & Omit<ComponentProps<TAs>, 'as' | 'className'>;

type TextPartProps<TAs extends ElementType = 'span'> = TextBaseProps<TAs>;

/* =============================================================================
 * Internal Factory
 * ============================================================================= */

const createTextPart = <TDefaultAs extends ElementType>(
  variant: TextVariant,
  defaultAs: TDefaultAs,
) => {
  const TextPart = <TAs extends ElementType = TDefaultAs>({
    as,
    className,
    ...props
  }: TextPartProps<TAs>) => {
    const tag = (as ?? defaultAs) as ElementType;

    return createElement(tag, {
      className: cn(variant, className),
      ...props,
    });
  };

  return TextPart;
};

/* =============================================================================
 * Compound Parts
 * ============================================================================= */

export const HeroDisplay = createTextPart('hero-display', 'h1');
export const ProductDisplay = createTextPart('product-display', 'h1');
export const SectionDisplay = createTextPart('section-display', 'h2');
export const SectionHeading = createTextPart('section-heading', 'h2');
export const CardHeading = createTextPart('card-heading', 'h3');
export const FeatureHeading = createTextPart('feature-heading', 'h4');
export const BodyLarge = createTextPart('body-large', 'p');
export const Body = createTextPart('body', 'p');
export const Button = createTextPart('button', 'span');
export const Caption = createTextPart('caption', 'span');
export const MonoLabel = createTextPart('mono-label', 'span');
export const Micro = createTextPart('micro', 'span');

/* =============================================================================
 * Compound Export
 * ============================================================================= */

export const Text = {
  HeroDisplay,
  ProductDisplay,
  SectionDisplay,
  SectionHeading,
  CardHeading,
  FeatureHeading,
  BodyLarge,
  Body,
  Button,
  Caption,
  MonoLabel,
  Micro,
};
