import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Main } from '../presentation/main';
import { Provider } from '../presentation/context';
import { server } from '@/__tests__/mock-server';
import { http, HttpResponse } from 'msw';
import type { Schema } from '@/shared/server-contracts/schemas/get-user-profile-questions';
import type { InferOut } from '@/shared/server-contracts/extraction';

describe('User profile setup works when', () => {
  beforeEach(() => {
    server.use(
      http.get('/api/config/user-profile', () =>
        HttpResponse.json<InferOut<Schema['out'], 200>>({
          code: 200,
          groups: [
            {
              id: 1,
              key: 'basics',
              label: 'Basics',
              description: 'Tell us about you',
              questions: [
                {
                  id: 1,
                  key: 'display-name',
                  label: 'How should we call you?',
                  category: 'identity',
                  type: 'text',
                  constraints: { min: 1, max: 40, required: true },
                  value: '',
                },
              ],
            },
          ],
        }),
      ),
    );
  });

  it('displays welcome screen', () => {
    const { asFragment } = render(
      <Provider>
        <Main />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('loads config from mocked backend and opens first step', async () => {
    const user = userEvent.setup();

    render(
      <Provider>
        <Main />
      </Provider>,
    );

    await user.click(screen.getByRole('button', { name: /let's go/i }));

    await screen.findByRole('heading', { name: 'Basics' });
    screen.getByText('Tell us about you');
    screen.getByText('How should we call you?');
  });
});
