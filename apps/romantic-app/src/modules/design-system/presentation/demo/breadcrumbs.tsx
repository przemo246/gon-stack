import { Breadcrumbs } from '../../../../libs/ui/breadcrumbs';

import { Example } from './example';

export const BreadcrumbsDemo = () => {
  return (
    <Example
      id="breadcrumbs-examples"
      title="Breadcrumbs"
      description="A navigation aid that displays the hierarchical path of the current page within a site structure."
    >
      <Example.Case
        id="breadcrumbs-basic"
        title="1) Basic"
        description="Simple three-level breadcrumb trail using the default '/' separator."
      >
        <Breadcrumbs.Root>
          <Breadcrumbs.List>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Separator />
              <Breadcrumbs.Link href="#">Matches</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Separator />
              <Breadcrumbs.Link href="#" active>
                Profile
              </Breadcrumbs.Link>
            </Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs.Root>
      </Example.Case>

      <Example.Case
        id="breadcrumbs-custom-separator"
        title="2) Custom separator"
        description="Replace the default '/' with an arrow or any character."
      >
        <Breadcrumbs.Root>
          <Breadcrumbs.List>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href="#">Couples</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Separator>›</Breadcrumbs.Separator>
              <Breadcrumbs.Link href="#">Date Ideas</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Separator>›</Breadcrumbs.Separator>
              <Breadcrumbs.Link href="#" active>
                Outdoor Adventures
              </Breadcrumbs.Link>
            </Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs.Root>
      </Example.Case>

      <Example.Case
        id="breadcrumbs-deep-path"
        title="3) Deep path"
        description="A longer navigation trail spanning several levels."
      >
        <Breadcrumbs.Root>
          <Breadcrumbs.List>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Separator />
              <Breadcrumbs.Link href="#">Journey</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Separator />
              <Breadcrumbs.Link href="#">Milestones</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Separator />
              <Breadcrumbs.Link href="#">2024</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Separator />
              <Breadcrumbs.Link href="#" active>
                First Anniversary
              </Breadcrumbs.Link>
            </Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs.Root>
      </Example.Case>

      <Example.Case
        id="breadcrumbs-single-level"
        title="4) Single level (root active)"
        description="Only one item — marks the current page as active with no ancestors."
      >
        <Breadcrumbs.Root>
          <Breadcrumbs.List>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href="#" active>
                Love Notes
              </Breadcrumbs.Link>
            </Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs.Root>
      </Example.Case>

      <Example.Case
        id="breadcrumbs-emoji-separator"
        title="5) Emoji separator"
        description="Fun variant using a heart as the breadcrumb separator."
      >
        <Breadcrumbs.Root>
          <Breadcrumbs.List>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href="#">Us</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Separator>♡</Breadcrumbs.Separator>
              <Breadcrumbs.Link href="#">Memories</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Separator>♡</Breadcrumbs.Separator>
              <Breadcrumbs.Link href="#" active>
                Paris Trip
              </Breadcrumbs.Link>
            </Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs.Root>
      </Example.Case>
    </Example>
  );
};
