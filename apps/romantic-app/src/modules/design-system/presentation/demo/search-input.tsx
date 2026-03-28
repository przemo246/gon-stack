import { useState } from 'react';

import { SearchInput } from '../../../../libs/ui/search-input';

import { Example } from './example';

const PROFILES = [
  'Alex & Jordan',
  'Casey & Riley',
  'Morgan & Taylor',
  'Sam & Jamie',
  'Quinn & Drew',
  'Avery & Blake',
];

export const SearchInputDemo = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const filtered = PROFILES.filter((p) =>
    p.toLowerCase().includes(query.toLowerCase()),
  );

  const handleDebounced = (value: string) => {
    if (timer) clearTimeout(timer);
    const t = setTimeout(() => setDebouncedQuery(value), 400);
    setTimer(t);
  };

  return (
    <Example
      id="search-input-examples"
      title="Search Input"
      description="An input field combined with search functionality that helps users find content or filter results."
    >
      <Example.Case
        id="search-input-basic"
        title="1) Basic"
        description="Default search input with placeholder text."
      >
        <SearchInput placeholder="Search couples..." />
      </Example.Case>

      <Example.Case
        id="search-input-controlled"
        title="2) Controlled with live filter"
        description="Controlled value wired to useState to filter a list in real time."
      >
        <div className="flex flex-col gap-3">
          <SearchInput
            placeholder="Search couple profiles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <ul className="flex flex-col gap-1">
              {filtered.length > 0 ? (
                filtered.map((name) => (
                  <li key={name} className="b2 rounded-md px-2 py-1">
                    {name}
                  </li>
                ))
              ) : (
                <li className="b3 px-2 py-1 opacity-60">No results found.</li>
              )}
            </ul>
          )}
        </div>
      </Example.Case>

      <Example.Case
        id="search-input-debounced"
        title="3) Debounced Search"
        description="Input fires a debounced update 400 ms after the user stops typing."
      >
        <div className="flex flex-col gap-3">
          <SearchInput
            placeholder="Search memories..."
            onChange={(e) => handleDebounced(e.target.value)}
          />
          <p className="b3">
            Debounced query:{' '}
            <strong>
              {debouncedQuery || <span className="opacity-50">waiting…</span>}
            </strong>
          </p>
        </div>
      </Example.Case>

      <Example.Case
        id="search-input-default-value"
        title="4) Default Value (Uncontrolled)"
        description="Pre-filled uncontrolled search input using defaultValue."
      >
        <SearchInput defaultValue="anniversary ideas" />
      </Example.Case>

      <Example.Case
        id="search-input-disabled"
        title="5) Disabled"
        description="Search is unavailable in this context."
      >
        <SearchInput placeholder="Search locked…" disabled />
      </Example.Case>
    </Example>
  );
};
