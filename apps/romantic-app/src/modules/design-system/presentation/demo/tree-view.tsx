import { useState } from 'react';

import { TreeView } from '../../../../libs/ui/tree-view';

import { Example } from './example';

const ChevronRight = ({ open }: { open: boolean }) => (
  <span
    className="inline-block transition-transform duration-200 text-gray-400 text-xs mr-1"
    style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
  >
    ▶
  </span>
);

export const TreeViewDemo = () => {
  const [openNodes, setOpenNodes] = useState<Set<string>>(
    new Set(['memories', 'trips']),
  );
  const [selected, setSelected] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  return (
    <Example
      id="tree-view-examples"
      title="Tree View"
      description="A hierarchical list that lets users expand and collapse nested items to navigate structured data."
    >
      <Example.Case
        id="tree-view-basic"
        title="1) Basic"
        description="A simple tree rendered inside the TreeView wrapper (role=tree)."
      >
        <TreeView className="gap-1 text-sm">
          <div
            role="treeitem"
            className="px-3 py-1.5 rounded hover:bg-rose-50 cursor-pointer b2 text-gray-700"
          >
            💌 First Message
          </div>
          <div
            role="treeitem"
            className="px-3 py-1.5 rounded hover:bg-rose-50 cursor-pointer b2 text-gray-700"
          >
            🌹 First Date
          </div>
          <div
            role="treeitem"
            className="px-3 py-1.5 rounded hover:bg-rose-50 cursor-pointer b2 text-gray-700"
          >
            💍 Proposal
          </div>
        </TreeView>
      </Example.Case>

      <Example.Case
        id="tree-view-nested"
        title="2) Nested Tree"
        description="Collapsible parent nodes with indented children."
      >
        <TreeView className="gap-0.5 select-none">
          {/* Memories */}
          <div>
            <div
              role="treeitem"
              aria-expanded={openNodes.has('memories')}
              className="flex items-center gap-1 px-3 py-1.5 rounded cursor-pointer hover:bg-pink-50 b2 text-gray-700 font-medium"
              onClick={() => toggle('memories')}
            >
              <ChevronRight open={openNodes.has('memories')} />
              📸 Our Memories
            </div>
            {openNodes.has('memories') && (
              <div role="group" className="ml-6 flex flex-col gap-0.5">
                <div
                  role="treeitem"
                  className="px-3 py-1 rounded hover:bg-pink-50 cursor-pointer b3 text-gray-600"
                >
                  Beach Sunset — July 2023
                </div>
                <div
                  role="treeitem"
                  className="px-3 py-1 rounded hover:bg-pink-50 cursor-pointer b3 text-gray-600"
                >
                  Rainy Day at Home — November 2023
                </div>
                <div
                  role="treeitem"
                  className="px-3 py-1 rounded hover:bg-pink-50 cursor-pointer b3 text-gray-600"
                >
                  New Year&apos;s Eve — December 2023
                </div>
              </div>
            )}
          </div>

          {/* Trips */}
          <div>
            <div
              role="treeitem"
              aria-expanded={openNodes.has('trips')}
              className="flex items-center gap-1 px-3 py-1.5 rounded cursor-pointer hover:bg-pink-50 b2 text-gray-700 font-medium"
              onClick={() => toggle('trips')}
            >
              <ChevronRight open={openNodes.has('trips')} />
              ✈️ Trips Together
            </div>
            {openNodes.has('trips') && (
              <div role="group" className="ml-6 flex flex-col gap-0.5">
                <div
                  role="treeitem"
                  className="px-3 py-1 rounded hover:bg-pink-50 cursor-pointer b3 text-gray-600"
                >
                  Lisbon, Portugal
                </div>
                <div
                  role="treeitem"
                  className="px-3 py-1 rounded hover:bg-pink-50 cursor-pointer b3 text-gray-600"
                >
                  Kyoto, Japan
                </div>
              </div>
            )}
          </div>
        </TreeView>
      </Example.Case>

      <Example.Case
        id="tree-view-selectable"
        title="3) Selectable Nodes"
        description="Highlighting the selected node with active state styling."
      >
        <TreeView className="gap-1 max-w-xs">
          {[
            { id: 'poetry', label: '📝 Love Poetry', icon: '' },
            { id: 'photos', label: '🖼️ Photo Album', icon: '' },
            { id: 'playlist', label: '🎵 Our Playlist', icon: '' },
            { id: 'journal', label: '📖 Shared Journal', icon: '' },
          ].map(({ id, label }) => (
            <div
              key={id}
              role="treeitem"
              aria-selected={selected === id}
              className={[
                'px-3 py-2 rounded-lg cursor-pointer b2 transition-colors',
                selected === id
                  ? 'bg-rose-500 text-white'
                  : 'text-gray-700 hover:bg-rose-50',
              ].join(' ')}
              onClick={() => setSelected(id)}
            >
              {label}
            </div>
          ))}
        </TreeView>
        {selected && (
          <p className="b3 text-rose-500 mt-3">
            Selected: <strong>{selected}</strong>
          </p>
        )}
      </Example.Case>

      <Example.Case
        id="tree-view-primary"
        title="4) Primary Variant"
        description="TreeView with primary variant prop applied."
      >
        <TreeView variant="primary" className="gap-2">
          <div
            role="treeitem"
            className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 b2 text-rose-700 cursor-pointer hover:bg-rose-100"
          >
            Morning Coffee Ritual
          </div>
          <div
            role="treeitem"
            className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 b2 text-rose-700 cursor-pointer hover:bg-rose-100"
          >
            Evening Walk Tradition
          </div>
          <div
            role="treeitem"
            className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 b2 text-rose-700 cursor-pointer hover:bg-rose-100"
          >
            Sunday Brunch Together
          </div>
        </TreeView>
      </Example.Case>

      <Example.Case
        id="tree-view-deep"
        title="5) Deep Multi-Level Nesting"
        description="Three levels of nesting to represent a relationship scrapbook hierarchy."
      >
        <TreeView className="gap-0.5 select-none">
          <div>
            <div
              role="treeitem"
              aria-expanded={openNodes.has('scrapbook')}
              className="flex items-center gap-1 px-3 py-1.5 rounded cursor-pointer hover:bg-purple-50 b2 text-gray-700 font-medium"
              onClick={() => toggle('scrapbook')}
            >
              <ChevronRight open={openNodes.has('scrapbook')} />
              📔 Scrapbook
            </div>
            {openNodes.has('scrapbook') && (
              <div role="group" className="ml-6 flex flex-col gap-0.5">
                <div>
                  <div
                    role="treeitem"
                    aria-expanded={openNodes.has('year2024')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded cursor-pointer hover:bg-purple-50 b3 text-gray-700 font-medium"
                    onClick={() => toggle('year2024')}
                  >
                    <ChevronRight open={openNodes.has('year2024')} />
                    2024
                  </div>
                  {openNodes.has('year2024') && (
                    <div role="group" className="ml-6 flex flex-col gap-0.5">
                      <div
                        role="treeitem"
                        className="px-3 py-1 b3 text-gray-500 hover:bg-purple-50 rounded cursor-pointer"
                      >
                        Valentine&apos;s dinner
                      </div>
                      <div
                        role="treeitem"
                        className="px-3 py-1 b3 text-gray-500 hover:bg-purple-50 rounded cursor-pointer"
                      >
                        Summer road trip
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </TreeView>
      </Example.Case>
    </Example>
  );
};
