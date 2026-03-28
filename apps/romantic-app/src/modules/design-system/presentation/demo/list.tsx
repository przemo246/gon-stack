import { List } from '../../../../libs/ui/list';

import { Example } from './example';

export const ListDemo = () => {
  return (
    <Example
      id="list-examples"
      title="List"
      description="A container that displays a series of related items in a vertical or horizontal sequence."
    >
      <Example.Case
        id="list-basic"
        title="1) Basic"
        description="Simple unordered list of romantic date ideas."
      >
        <List className="gap-1 list-disc pl-5">
          <li>Candlelit dinner at home</li>
          <li>Stargazing in the countryside</li>
          <li>Sunrise hike together</li>
          <li>Cooking a new recipe side by side</li>
        </List>
      </Example.Case>

      <Example.Case
        id="list-styled-items"
        title="2) Styled items"
        description="Each list item styled as a card-like row with an icon prefix."
      >
        <List className="gap-2 max-w-sm">
          {[
            { icon: '💌', text: 'Write love letters every Sunday' },
            { icon: '🌹', text: 'Surprise flowers on random days' },
            { icon: '🎵', text: 'Create a shared playlist' },
            { icon: '📸', text: 'Monthly photo date' },
          ].map(({ icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 rounded-lg border border-pink-100 bg-pink-50 px-4 py-2"
            >
              <span className="text-xl">{icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </List>
      </Example.Case>

      <Example.Case
        id="list-numbered"
        title="3) Ordered (numbered)"
        description="Top relationship tips in priority order using an ol wrapper inside List."
      >
        <ol className="flex flex-col gap-1 list-decimal pl-5">
          <li>Communicate openly and honestly</li>
          <li>Celebrate small victories together</li>
          <li>Maintain your individual passions</li>
          <li>Express gratitude daily</li>
          <li>Plan regular quality time</li>
        </ol>
      </Example.Case>

      <Example.Case
        id="list-horizontal"
        title="4) Horizontal layout"
        description="List rendered in a row — useful for tag or pill navigation."
      >
        <List className="flex-row flex-wrap gap-2">
          {['Romance', 'Trust', 'Communication', 'Laughter', 'Kindness'].map(
            (tag) => (
              <li
                key={tag}
                className="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800"
              >
                {tag}
              </li>
            ),
          )}
        </List>
      </Example.Case>
    </Example>
  );
};
