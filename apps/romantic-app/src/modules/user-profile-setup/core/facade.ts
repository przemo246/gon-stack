import type { Answers } from '../domain/models';
import type { Registry } from './registry';
import type { Store } from './store';

export const createFacade = (store: Store, trigger: Registry['trigger']) => {
  return {
    init: () => {
      trigger('[TRIGGER]_INIT');
    },
    start: () => {
      trigger('[TRIGGER]_START');
    },
    prev: () => {
      trigger('[TRIGGER]_PREV');
    },
    next: (payload: Answers) => {
      trigger('[TRIGGER]_NEXT', payload);
    },
    saveAnswers: () => {
      trigger('[TRIGGER]_SAVE_ANSWERS');
    },
    editAnswers: () => {
      trigger('[TRIGGER]_EDIT_ANSWERS');
    },
    useIsLoading: () => store.$isLoading.use(),
    useIsIdle: () => store.$isIdle.use(),
    useIsStarted: () => store.$isStarted.use(),
    useIsFinished: () => store.$isFinished.use(),
    useIsSaving: () => store.$isSaving.use(),
    useIsSaved: () => store.$isSaved.use(),
    useActiveStepIndex: () => store.$activeStepIndex.use(),
    useActiveStep: () => store.$activeStep.use(),
    useTotalSteps: () => store.$totalSteps.use(),
    useProgressPercentage: () => store.$progressPercentage.use(),
    useSteps: () => store.$steps.use(),
    useStepAnswers: () => store.$stepAnswers.use(),
    useHasError: () => store.$hasError.use(),
    useHasPreviousStep: () => store.$hasPreviousStep.use(),
    useError: () => store.$error.use(),
  };
};
