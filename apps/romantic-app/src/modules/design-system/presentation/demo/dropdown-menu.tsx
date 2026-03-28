import { useRef, useState } from 'react';

import { Button } from '../../../../libs/ui/button';
import { DropdownMenu } from '../../../../libs/ui/dropdown-menu';

import { Example } from './example';

const useOutsideClick = (onClose: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  const handler = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) onClose();
  };
  const bind = () => document.addEventListener('mousedown', handler);
  const unbind = () => document.removeEventListener('mousedown', handler);
  return { ref, bind, unbind };
};

const BasicDropdown = () => {
  const [open, setOpen] = useState(false);
  const { ref, bind, unbind } = useOutsideClick(() => setOpen(false));

  const toggle = () => {
    if (!open) bind();
    else unbind();
    setOpen((v) => !v);
  };

  const choose = (label: string) => {
    alert(`Chosen: ${label}`);
    setOpen(false);
    unbind();
  };

  return (
    <DropdownMenu ref={ref}>
      <Button variant="secondary" onClick={toggle}>
        Plan a Date ▾
      </Button>
      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 w-48 rounded-xl border border-white/10 bg-black/80 py-1 shadow-xl backdrop-blur-sm">
          {['Dinner', 'Cinema', 'Stargazing', 'Cooking Together'].map(
            (item) => (
              <button
                key={item}
                className="w-full px-4 py-2 text-left text-sm hover:bg-white/10"
                onClick={() => choose(item)}
              >
                {item}
              </button>
            ),
          )}
        </div>
      )}
    </DropdownMenu>
  );
};

const IconDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) close();
  };

  const pick = (label: string) => {
    setSelected(label);
    close();
  };

  const moods = ['😍 Smitten', '💌 Thoughtful', '🥰 Grateful', '😊 Content'];

  return (
    <DropdownMenu ref={ref} onMouseLeave={close}>
      <Button variant="primary" onClick={() => setOpen((v) => !v)}>
        {selected ?? 'How are you feeling?'} ▾
      </Button>
      {open && (
        <div
          className="absolute left-0 top-full z-20 mt-1 w-52 rounded-xl border border-white/10 bg-black/80 py-1 shadow-xl backdrop-blur-sm"
          onMouseDown={handleMouseDown}
        >
          {moods.map((mood) => (
            <button
              key={mood}
              className="w-full px-4 py-2 text-left text-sm hover:bg-white/10"
              onClick={() => pick(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
      )}
    </DropdownMenu>
  );
};

export const DropdownMenuDemo = () => {
  return (
    <Example
      id="dropdown-menu-examples"
      title="Dropdown Menu"
      description="A menu that appears below a trigger element, displaying a list of selectable options."
    >
      <Example.Case
        id="dropdown-menu-basic"
        title="1) Basic"
        description="A simple dropdown triggered by a button — choose a date idea from the list."
      >
        <div className="flex items-start gap-4 pb-44">
          <BasicDropdown />
        </div>
      </Example.Case>

      <Example.Case
        id="dropdown-menu-mood"
        title="2) Selection with state"
        description="Dropdown that updates the trigger label with the selected mood."
      >
        <div className="flex items-start gap-4 pb-44">
          <IconDropdown />
        </div>
      </Example.Case>

      <Example.Case
        id="dropdown-menu-secondary"
        title="3) Secondary variant static"
        description="Static composition showing the secondary variant dropdown panel styling."
      >
        <DropdownMenu variant="secondary" className="w-52">
          <div className="rounded-xl border border-white/10 bg-white/5 py-1">
            {[
              'Edit Profile',
              'Share Invite',
              'Privacy Settings',
              'Sign Out',
            ].map((item) => (
              <div
                key={item}
                className="px-4 py-2 text-sm hover:bg-white/10 cursor-default"
              >
                {item}
              </div>
            ))}
          </div>
        </DropdownMenu>
      </Example.Case>
    </Example>
  );
};
