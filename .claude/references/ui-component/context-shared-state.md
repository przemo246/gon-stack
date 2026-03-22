---
title: Use createHookContext for Shared State in Compound Components
impact: MEDIUM
impactDescription: Avoids prop drilling across sub-parts while keeping the context API type-safe
tags: context, compound-components, state
---

## Use createHookContext for Shared State in Compound Components

When compound component sub-parts need to read shared state (e.g. current values, orientation, disabled flag), use `createHookContext` from the local `power-context` utility. Do not prop-drill or use React's raw `createContext` directly.

The provider lives in `Root`. Sub-parts consume via the generated hook.

**❌ Incorrect (raw createContext + manual consumer boilerplate):**

```tsx
const SliderContext = createContext<SliderContextValue | null>(null);

const useSliderContext = () => {
  const ctx = useContext(SliderContext);
  if (!ctx) throw new Error('useSliderContext must be used inside SliderRoot');
  return ctx;
};
```

**✅ Correct (createHookContext handles the null-check and error message):**

```tsx
import { createHookContext } from '../power-context';

type SliderContextValue = { values: number[] };

const [SliderProvider, useSliderContext] = createHookContext(
  'Slider', // used in the error message when consumed outside provider
  (value: SliderContextValue) => value,
);

// Root provides the context
export const SliderRoot = ({ value, defaultValue, onValueChange, ...props }) => {
  const [internalValue, setInternalValue] = useState(...);
  const isControlled = Array.isArray(value);
  const values = isControlled ? value : internalValue;

  return (
    <SliderProvider value={{ values }}>
      <SliderPrimitive.Root ... />
    </SliderProvider>
  );
};

// Sub-parts consume it
export const SliderThumb = ({ index, ...props }) => {
  const { values } = useSliderContext();
  const value = values[index];
  // ...
};
```

For controlled/uncontrolled dual support see `controlled-uncontrolled.md`.
