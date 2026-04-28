type Difficulty = 'easy' | 'medium' | 'hard';

type Question = {
  id: string;
  difficulty: Difficulty;
};

type RandomizedQuestion = {
  questionId: string;
  ordinal: number;
  timeLimitSec: number;
};

export type QuestionsRandomizerStrategy = 'auto';

const DEFAULT_QUESTION_COUNT = 12;
const TIME_LIMIT_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 30,
  medium: 45,
  hard: 60,
};

const shuffle = <T>(items: T[]): T[] => {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }

  return copy;
};

const autoStrategy = (
  questions: Question[],
  questionCount: number,
): RandomizedQuestion[] => {
  const easy = shuffle(
    questions.filter((question) => question.difficulty === 'easy'),
  );
  const medium = shuffle(
    questions.filter((question) => question.difficulty === 'medium'),
  );
  const hard = shuffle(
    questions.filter((question) => question.difficulty === 'hard'),
  );

  // Keeps a simple progression: start lighter, then medium, then deeper.
  const bucketOrder: Question[][] = [easy, medium, hard];
  const selected: Question[] = [];
  let pointer = 0;

  while (selected.length < questionCount) {
    const bucket = bucketOrder[pointer % bucketOrder.length];
    const next = bucket.shift();

    if (next) {
      selected.push(next);
    }

    const hasAnyQuestionsLeft = bucketOrder.some((entry) => entry.length > 0);

    if (!hasAnyQuestionsLeft) {
      break;
    }

    pointer += 1;
  }

  return selected.map((question, index) => ({
    questionId: question.id,
    ordinal: index + 1,
    timeLimitSec: TIME_LIMIT_BY_DIFFICULTY[question.difficulty],
  }));
};

export const questionsRandomizer = (
  strategy: QuestionsRandomizerStrategy,
  questions: Question[],
  questionCount = DEFAULT_QUESTION_COUNT,
): RandomizedQuestion[] => {
  if (strategy === 'auto') {
    return autoStrategy(questions, questionCount);
  }

  return [];
};
