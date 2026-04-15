import type { Schema } from '@/shared/server-contracts/schemas/get-user-profile-questions';
import {
  type Answers,
  type Step,
  type StepId,
  type StepKey,
} from '../domain/models';
import { toQuestion } from './mappers';
import type { InferOut } from '@/shared/server-contracts/extraction';

export const getConfig = async (signal: AbortSignal): Promise<Step[]> => {
  const response = await fetch('/api/config/user-profile', {
    signal,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch config');
  }

  const data = (await response.json()) as InferOut<Schema['out'], 200>;

  return data.groups.map((group) => ({
    id: group.id as StepId,
    key: group.key as StepKey,
    label: group.label,
    description: group.description,
    questions: group.questions.map(toQuestion),
  }));
};

export const saveUserProfileAnswers = async (
  answers: Answers,
  signal?: AbortSignal,
): Promise<void> => {
  await fetch('/api/user-profile/save-answers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers }),
    signal,
  });
};
