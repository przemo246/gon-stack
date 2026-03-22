import { Input } from '../../../../libs/ui/input';

import { Example } from './example';

export const InputDemo = () => {
  return (
    <Example
      id="input-examples"
      title="Input Demo"
      description="Input - usage examples"
    >
      <Example.Case
        id="input-default"
        title="1) Default"
        description="Standard text input with border and focus glow."
      >
        <Input placeholder="you@example.com" />
      </Example.Case>

      <Example.Case
        id="input-password"
        title="2) Password"
        description="Password type with masked characters."
      >
        <Input type="password" placeholder="••••••••" />
      </Example.Case>

      <Example.Case
        id="input-disabled"
        title="3) Disabled"
        description="Non-interactive state using explicit color tokens."
      >
        <div className="flex flex-col gap-3">
          <Input placeholder="you@example.com" disabled />
          <Input type="password" placeholder="••••••••" disabled />
        </div>
      </Example.Case>
    </Example>
  );
};
