import { expect, test, type Page } from '@playwright/test';
import { interpreter } from '@/__e2e__/interpreter';

const mockConfigResponse = {
  code: 200,
  groups: [
    {
      id: 1,
      key: 'step-one',
      label: 'Step One',
      description: 'First step description',
      questions: [
        {
          id: 1,
          key: 'nickname',
          label: 'Nickname',
          category: 'Step One',
          type: 'text',
          constraints: {
            min: 1,
            max: 30,
            required: true,
          },
          value: '',
        },
      ],
    },
    {
      id: 2,
      key: 'step-two',
      label: 'Step Two',
      description: 'Second step description',
      questions: [
        {
          id: 2,
          key: 'about_me',
          label: 'About me',
          category: 'Step Two',
          type: 'text',
          constraints: {
            min: 0,
            max: 120,
            required: false,
          },
          value: '',
        },
      ],
    },
  ],
} as const;

const commands = {
  'mock user profile config': (page: Page) =>
    page.route('**/api/config/user-profile', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockConfigResponse),
      }),
    ),
  'im on user profile setup page': (page: Page) =>
    page.goto('/user-profile-setup'),
  'i click start profile setup button': (page: Page) =>
    page.getByRole('button', { name: "Let's go" }).click(),
  'i complete first step and continue': async (page: Page) => {
    await page.getByPlaceholder('Your answer').first().fill('Alice');
    await page.getByRole('button', { name: 'Continue' }).click();
  },
  'i complete second step and continue': async (page: Page) => {
    await page.getByPlaceholder('Your answer').first().fill('I like sunsets');
    await page.getByRole('button', { name: 'Continue' }).click();
  },
  'i should see second step text': (page: Page) =>
    expect(page.getByText('Step 2 of 2 - Step Two')).toBeVisible(),
  'i should see results screen': (page: Page) =>
    expect(page.getByText("Here's your romantic vibe")).toBeVisible(),
  'i go back to edit answers': async (page: Page) => {
    await page.getByRole('button', { name: 'Edit answers' }).click();
    await expect(page.getByRole('heading', { name: 'Step One' })).toBeVisible();
  },
  'i should see first step answer prefilled as Alice': (page: Page) =>
    expect(page.getByPlaceholder('Your answer').first()).toHaveValue('Alice'),
  'i update first step answer and continue': async (page: Page) => {
    await page.getByPlaceholder('Your answer').first().fill('Bob');
    await page.getByRole('button', { name: 'Continue' }).click();
  },
  'i should see second step answer prefilled': (page: Page) =>
    expect(page.getByPlaceholder('Your answer').first()).toHaveValue(
      'I like sunsets',
    ),
  'i reload page': (page: Page) => page.reload(),
  'i should be back on start screen': (page: Page) =>
    expect(page.getByRole('button', { name: "Let's go" })).toBeVisible(),
};

test('user profile setup goes to second step', async ({ page }) => {
  await interpreter(commands)(
    ['mock user profile config', page],
    ['im on user profile setup page', page],
    ['i click start profile setup button', page],
    ['i complete first step and continue', page],
    ['i should see second step text', page],
  );
});

test('user can finish flow, go back, edit answers, and refresh resets to start', async ({
  page,
}) => {
  await interpreter(commands)(
    ['mock user profile config', page],
    ['im on user profile setup page', page],
    ['i click start profile setup button', page],
    ['i complete first step and continue', page],
    ['i should see second step text', page],
    ['i complete second step and continue', page],
    ['i should see results screen', page],
    ['i go back to edit answers', page],
    ['i should see first step answer prefilled as Alice', page],
    ['i update first step answer and continue', page],
    ['i should see second step answer prefilled', page],
    ['i reload page', page],
    ['i should be back on start screen', page],
  );
});
