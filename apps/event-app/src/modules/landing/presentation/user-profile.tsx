import { useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { UserRound } from 'lucide-react';
import { Dropdown } from '@/libs/ui/dropdown';
import { useContext } from './context';

type UserProfileProps = {
  user: User;
};

export const UserProfile = ({ user }: UserProfileProps) => {
  const ctx = useContext();
  const profile = ctx.useProfile();

  useEffect(() => {
    ctx.init(user.id);
  }, [ctx, user.id]);

  const avatarUrl = profile?.avatar_url;

  const avatar = avatarUrl ? (
    <img
      src={avatarUrl}
      alt="Avatar"
      className="w-9 h-9 rounded-full object-cover border border-neutral-900"
    />
  ) : (
    <div className="w-9 h-9 rounded-full bg-bg-secondary border border-neutral-900 flex items-center justify-center text-text-muted">
      <UserRound size={24} strokeWidth={1.5} />
    </div>
  );

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>{avatar}</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item
          onClick={() => {
            window.location.href = '/profil';
          }}
        >
          Profil
        </Dropdown.Item>
        <Dropdown.Item
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/';
          }}
        >
          Wyloguj się
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
