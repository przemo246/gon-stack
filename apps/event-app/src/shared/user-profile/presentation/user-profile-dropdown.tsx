import { UserRound } from 'lucide-react';

import { Dropdown } from '@/libs/ui/dropdown';

export const UserProfileDropdown = () => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <button className="bg-primary text-on-primary border-0 rounded-full inline-flex justify-center items-center text-sm hover:opacity-90 transition-opacity h-10 w-10">
          <UserRound size={14} />
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content align="right">
        <Dropdown.Item
          label="Profil"
          onSelect={() => {
            window.location.href = '/profil';
          }}
        />
        <Dropdown.Item
          label="Wyloguj się"
          onSelect={() => {
            window.location.href = '/wyloguj';
          }}
        />
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
