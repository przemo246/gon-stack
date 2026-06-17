import { UserRound, ChevronDown } from 'lucide-react';

import { Dropdown } from '@/libs/ui/dropdown';
import { useContext } from './context';
import { Button } from '@/libs/ui/button';

export const UserProfileDropdown = () => {
  const { trigger } = useContext();
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button
          variant="tertiary"
          className="h-10 bg-surface hover:bg-primary hover:border-primary flex gap-2 items-center justify-center"
        >
          <UserRound size={14} />
          <ChevronDown size={14} />
        </Button>
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
          onSelect={() => trigger('[TRIGGER]_LOGOUT')}
        />
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
