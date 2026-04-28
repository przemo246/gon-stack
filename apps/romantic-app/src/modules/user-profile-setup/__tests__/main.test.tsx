import { fireEvent, render, screen } from '@testing-library/react';
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

  it('keeps age value between 18 and 120', async () => {
    const user = userEvent.setup();

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
                {
                  id: 2,
                  key: 'age',
                  label: 'Age',
                  category: 'identity',
                  type: 'numeric',
                  constraints: { min: 18, max: 120, required: true },
                  value: 18,
                },
              ],
            },
          ],
        }),
      ),
    );

    render(
      <Provider>
        <Main />
      </Provider>,
    );

    await user.click(screen.getByRole('button', { name: /let's go/i }));

    const ageInput = await screen.findByRole('spinbutton');

    fireEvent.change(ageInput, { target: { value: '10' } });
    expect(ageInput).toHaveValue(18);

    fireEvent.change(ageInput, { target: { value: '130' } });
    expect(ageInput).toHaveValue(120);
  });

  it('finishes full flow and disables continue after back when a required answer is invalid', async () => {
    const user = userEvent.setup();

    server.use(
      http.get('/api/config/user-profile', () =>
        HttpResponse.json<InferOut<Schema['out'], 200>>({
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
                  constraints: { min: 1, max: 30, required: true },
                  value: '',
                },
                {
                  id: 2,
                  key: 'age',
                  label: 'Age',
                  category: 'Step One',
                  type: 'numeric',
                  constraints: { min: 18, max: 120, required: true },
                  value: 18,
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
                  id: 3,
                  key: 'about_me',
                  label: 'About me',
                  category: 'Step Two',
                  type: 'text',
                  constraints: { min: 0, max: 120, required: false },
                  value: '',
                },
              ],
            },
          ],
        }),
      ),
    );

    render(
      <Provider>
        <Main />
      </Provider>,
    );

    await user.click(screen.getByRole('button', { name: /let's go/i }));

    const answerInput = await screen.findByPlaceholderText('Your answer');
    await user.type(answerInput, 'Alice');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    const secondStepInput = await screen.findByPlaceholderText('Your answer');
    await user.type(secondStepInput, 'About me text');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    await screen.findByText("Here's your romantic vibe");

    await user.click(screen.getByRole('button', { name: 'Edit answers' }));
    await screen.findByRole('heading', { name: 'Step One' });

    const firstStepInput = await screen.findByPlaceholderText('Your answer');
    await user.clear(firstStepInput);
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled();
  });
});
