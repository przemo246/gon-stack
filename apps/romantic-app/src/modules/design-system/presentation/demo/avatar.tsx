import { Avatar } from '../../../../libs/ui/avatar';

import { Example } from './example';

export const AvatarDemo = () => {
  return (
    <Example
      id="avatar-examples"
      title="Avatar"
      description="A visual representation of a user or entity, typically a small circular image or initials."
    >
      <Example.Case
        id="avatar-initials"
        title="1) Initials"
        description="Avatar displaying two-letter initials — useful when no photo is available."
      >
        <div className="flex items-center gap-3">
          <Avatar initials="SJ" />
          <Avatar initials="MR" variant="secondary" />
        </div>
      </Example.Case>

      <Example.Case
        id="avatar-sizes"
        title="2) Sizes"
        description="Three available sizes: sm, md (default), and lg."
      >
        <div className="flex items-end gap-4">
          <Avatar size="sm" initials="SM" />
          <Avatar size="md" initials="MD" />
          <Avatar size="lg" initials="LG" />
        </div>
      </Example.Case>

      <Example.Case
        id="avatar-variants"
        title="3) Variants"
        description="Primary and secondary colour variants side by side."
      >
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <Avatar variant="primary" initials="LP" size="lg" />
            <span className="text-xs text-(--text-muted)">primary</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar variant="secondary" initials="LP" size="lg" />
            <span className="text-xs text-(--text-muted)">secondary</span>
          </div>
        </div>
      </Example.Case>

      <Example.Case
        id="avatar-image"
        title="4) With image"
        description="Avatar renders an <img> when a src prop is provided."
      >
        <div className="flex items-center gap-3">
          <Avatar
            size="lg"
            src="https://i.pravatar.cc/150?img=47"
            alt="Sophia"
          />
          <Avatar
            size="md"
            src="https://i.pravatar.cc/150?img=32"
            alt="Marcus"
          />
          <Avatar
            size="sm"
            src="https://i.pravatar.cc/150?img=20"
            alt="Elena"
          />
        </div>
      </Example.Case>

      <Example.Case
        id="avatar-custom-children"
        title="5) Custom children"
        description="Pass any content as children — here an emoji stands in for a photo."
      >
        <div className="flex items-center gap-3">
          <Avatar size="lg">🌹</Avatar>
          <Avatar size="md" variant="secondary">
            💑
          </Avatar>
          <Avatar size="sm">🌙</Avatar>
        </div>
      </Example.Case>

      <Example.Case
        id="avatar-group"
        title="6) Avatar group (stacked)"
        description="Overlapping avatars to represent a couple or a group."
      >
        <div className="flex -space-x-2">
          <Avatar
            size="md"
            src="https://i.pravatar.cc/150?img=47"
            alt="Sophia"
            className="ring-2 ring-(--surface-page)"
          />
          <Avatar
            size="md"
            src="https://i.pravatar.cc/150?img=32"
            alt="Marcus"
            className="ring-2 ring-(--surface-page)"
          />
          <Avatar
            size="md"
            initials="+3"
            className="ring-2 ring-(--surface-page)"
          />
        </div>
      </Example.Case>
    </Example>
  );
};
