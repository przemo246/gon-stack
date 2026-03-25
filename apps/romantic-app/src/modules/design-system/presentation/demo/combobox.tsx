import { useMemo, useState } from 'react';

import { Combobox } from '../../../../libs/ui/combobox';

import { Example } from './example';

const ALL_FRUITS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'dragonfruit', label: 'Dragonfruit' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
];

export const ComboboxDemo = () => {
  const [controlledValue, setControlledValue] = useState('');
  const [controlledSearch, setControlledSearch] = useState('');

  const filteredControlled = useMemo(
    () =>
      ALL_FRUITS.filter((f) =>
        f.label.toLowerCase().includes(controlledSearch.toLowerCase()),
      ),
    [controlledSearch],
  );

  return (
    <Example
      id="combobox-examples"
      title="Combobox Demo"
      description="Compound Combobox — usage examples"
    >
      <Example.Case
        id="combobox-basic"
        title="1) Basic (Uncontrolled)"
        description="Default uncontrolled usage — search filters the rendered items externally."
      >
        <BasicUncontrolled />
      </Example.Case>

      <Example.Case
        id="combobox-controlled"
        title="2) Controlled"
        description="Controlled value and search with useState — displays the selected value below."
      >
        <div className="space-y-3">
          <Combobox.Root
            value={controlledValue}
            onValueChange={setControlledValue}
            onSearchChange={setControlledSearch}
            className="max-w-xs"
          >
            <Combobox.Search placeholder="Search fruits…" />
            <Combobox.List>
              {filteredControlled.length > 0 ? (
                filteredControlled.map((fruit) => (
                  <Combobox.ListItem key={fruit.value} value={fruit.value}>
                    {fruit.label}
                  </Combobox.ListItem>
                ))
              ) : (
                <li className="px-3 py-2 text-sm text-(--combobox-item-disabled-text)">
                  No results found
                </li>
              )}
            </Combobox.List>
          </Combobox.Root>
          <p className="b2">
            Selected:{' '}
            <strong>
              {controlledValue !== '' ? controlledValue : '(none)'}
            </strong>
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="combobox-disabled-items"
        title="3) With Disabled Items"
        description="Some items carry the disabled prop — they are non-interactive and visually muted."
      >
        <DisabledItems />
      </Example.Case>

      <Example.Case
        id="combobox-empty"
        title="4) Empty State"
        description="When no items match the search query a fallback message is shown inside the list."
      >
        <EmptyState />
      </Example.Case>
    </Example>
  );
};

/* --------------------------------------------------------------------------- */

const BasicUncontrolled = () => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      ALL_FRUITS.filter((f) =>
        f.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <Combobox.Root
      defaultValue=""
      onSearchChange={setSearch}
      className="max-w-xs"
    >
      <Combobox.Search placeholder="Search fruits…" />
      <Combobox.List>
        {filtered.length > 0 ? (
          filtered.map((fruit) => (
            <Combobox.ListItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </Combobox.ListItem>
          ))
        ) : (
          <li className="px-3 py-2 text-sm text-(--combobox-item-disabled-text)">
            No results found
          </li>
        )}
      </Combobox.List>
    </Combobox.Root>
  );
};

/* --------------------------------------------------------------------------- */

const ITEMS_WITH_DISABLED = [
  { value: 'apple', label: 'Apple', disabled: false },
  { value: 'banana', label: 'Banana', disabled: true },
  { value: 'cherry', label: 'Cherry', disabled: false },
  { value: 'dragonfruit', label: 'Dragonfruit', disabled: true },
  { value: 'elderberry', label: 'Elderberry', disabled: false },
  { value: 'fig', label: 'Fig', disabled: false },
];

const DisabledItems = () => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      ITEMS_WITH_DISABLED.filter((f) =>
        f.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <Combobox.Root onSearchChange={setSearch} className="max-w-xs">
      <Combobox.Search placeholder="Search fruits…" />
      <Combobox.List>
        {filtered.map((fruit) => (
          <Combobox.ListItem
            key={fruit.value}
            value={fruit.value}
            disabled={fruit.disabled}
          >
            {fruit.label}
          </Combobox.ListItem>
        ))}
      </Combobox.List>
    </Combobox.Root>
  );
};

/* --------------------------------------------------------------------------- */

const EmptyState = () => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      ALL_FRUITS.filter((f) =>
        f.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <div className="space-y-3">
      <Combobox.Root onSearchChange={setSearch} className="max-w-xs">
        <Combobox.Search placeholder="Try typing something with no match…" />
        <Combobox.List>
          {filtered.length > 0 ? (
            filtered.map((fruit) => (
              <Combobox.ListItem key={fruit.value} value={fruit.value}>
                {fruit.label}
              </Combobox.ListItem>
            ))
          ) : (
            <li className="px-3 py-2 text-sm text-(--combobox-item-disabled-text)">
              No results found
            </li>
          )}
        </Combobox.List>
      </Combobox.Root>
      <p className="b3">
        Type a string that does not match any fruit to see the empty state.
      </p>
    </div>
  );
};
