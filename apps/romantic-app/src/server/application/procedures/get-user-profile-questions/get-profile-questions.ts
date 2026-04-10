import type { Database, Json } from '@/shared/server-contracts/db-schema';
import type { GetUserProfileSuccess } from '@/shared/server-contracts/rest-schema';
import { InternalServer } from '../../core/error-handling';
import type { Supabase } from '../../integration/supabase';

type UserProfileGroup = GetUserProfileSuccess['groups'][number];
type UserProfileQuestion = UserProfileGroup['questions'][number];
type ProfileQuestionRow =
  Database['public']['Tables']['profile_questions']['Row'];

const isSelectOption = (
  value: Json,
): value is { value: string; label: string } =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  typeof value.value === 'string' &&
  typeof value.label === 'string';

const toSelectOptions = (
  value: Json | null,
): { value: string; label: string }[] => {
  if (!Array.isArray(value)) return [];

  return value.filter(isSelectOption);
};

const mapQuestion = (question: ProfileQuestionRow): UserProfileQuestion => {
  const constraints = {
    min: question.min_value ?? 0,
    max: question.max_value ?? 0,
    required: question.required,
  };
  const common = {
    id: question.id,
    key: question.key,
    label: question.label,
    category: question.group_label,
    constraints,
  };

  switch (question.question_type) {
    case 'numeric':
      return {
        ...common,
        type: 'numeric',
        value: question.default_numeric ?? 0,
      };
    case 'text':
      return {
        ...common,
        type: 'text',
        value: question.default_text ?? '',
      };
    case 'slide':
      return {
        ...common,
        type: 'slide',
        badges: {
          min: question.badge_min ?? '',
          max: question.badge_max ?? '',
        },
        value: question.default_numeric ?? 0,
      };
    case 'select':
      return {
        ...common,
        type: 'select',
        options: toSelectOptions(question.select_options),
        value: question.default_text ?? '',
      };
  }
};

export const getProfileQuestions = async (
  db: Supabase,
): Promise<GetUserProfileSuccess['groups']> => {
  const questionsResult = await db.from('profile_questions').select('*');

  if (questionsResult.error) {
    throw new InternalServer('Failed to fetch profile questions');
  }

  const questions = [...(questionsResult.data ?? [])].sort(
    (a, b) => a.id - b.id,
  );
  const groupsByKey = new Map<string, UserProfileGroup>();

  for (const question of questions) {
    const existingGroup = groupsByKey.get(question.group_key);

    if (existingGroup) {
      existingGroup.questions.push(mapQuestion(question));
      continue;
    }

    groupsByKey.set(question.group_key, {
      id: groupsByKey.size,
      key: question.group_key,
      label: question.group_label,
      description: question.group_description,
      questions: [mapQuestion(question)],
    });
  }

  return Array.from(groupsByKey.values());
};
