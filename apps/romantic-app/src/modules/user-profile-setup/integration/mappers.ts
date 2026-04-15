import type { Schema } from '@/shared/server-contracts/schemas/get-user-profile-questions';
import {
  type Question,
  type QuestionId,
  type QuestionKey,
} from '../domain/models';
import type { InferOut } from '@/shared/server-contracts/extraction';

export const toQuestion = (
  question: InferOut<Schema['out'], 200>['groups'][number]['questions'][number],
): Question => {
  const baseQuestion = {
    id: question.id as QuestionId,
    key: question.key as QuestionKey,
    type: question.type,
    label: question.label,
    min: question.constraints.min,
    max: question.constraints.max,
    required: question.constraints.required,
  } as const;

  switch (question.type) {
    case 'numeric':
      return {
        ...baseQuestion,
        type: 'numeric',
        value: question.value,
      };
    case 'slide':
      return {
        ...baseQuestion,
        type: 'slide',
        value: question.value,
      };
    case 'text':
      return {
        ...baseQuestion,
        type: 'text',
        value: question.value,
      };
    case 'select':
      return {
        ...baseQuestion,
        type: 'select',
        value: question.value,
        options: question.options,
      };
    default: {
      const unhandledQuestionType: never = question;
      return unhandledQuestionType;
    }
  }
};
