import { tap } from 'rxjs';
import type { Store } from '../store';
import type { Bus } from '../bus';

export const next = (store: Store, { ofType }: Bus) =>
  ofType('[TRIGGER]_NEXT').pipe(
    tap((answers) => {
      const activeStepIndex = store.$activeStepIndex.get();

      const stepsWithUpdatedAnswers = store.$steps.get().map((step, idx) =>
        idx === activeStepIndex
          ? {
              ...step,
              questions: step.questions.map((question) => {
                const answer = answers[question.key];

                if (question.type === 'numeric' || question.type === 'slide') {
                  return {
                    ...question,
                    value: typeof answer === 'number' ? answer : question.value,
                  };
                }

                return {
                  ...question,
                  value: typeof answer === 'string' ? answer : question.value,
                };
              }),
            }
          : step,
      );

      store.$steps.set(stepsWithUpdatedAnswers);

      const maxStep = Math.max(0, store.$totalSteps.get() - 1);

      if (activeStepIndex >= maxStep) {
        store.$isFinished.set(true);
        return;
      }

      store.$activeStepIndex.set(Math.min(maxStep, activeStepIndex + 1));
    }),
  );
