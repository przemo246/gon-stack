import { useForm } from 'react-hook-form';
import { Button } from '@/libs/ui/button';
import { Card } from '@/libs/ui/card';
import { Heading } from '@/libs/ui/heading';
import { useContext } from './context';
import { QuestionInput } from './question-input';

const StepForm = () => {
  const ctx = useContext();
  const activeStep = ctx.$activeStep.use();
  const hasPreviousStep = ctx.$hasPreviousStep.use();
  const stepAnswers = ctx.$stepAnswers.use();

  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: stepAnswers,
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit((values) => {
        ctx.trigger('[TRIGGER]_NEXT', values);
      })}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Heading level={4}>{activeStep.label}</Heading>
        <p className="b2">{activeStep.description}</p>
      </div>

      {activeStep.questions.map((question) => {
        return (
          <Card key={question.key} className="flex flex-col gap-3">
            <p className="b2">{question.label}</p>

            <QuestionInput
              question={question}
              register={form.register}
              control={form.control}
              setValue={form.setValue}
            />
          </Card>
        );
      })}

      <footer
        className={`flex items-center gap-3 ${
          hasPreviousStep ? 'justify-between' : 'justify-end'
        }`}
      >
        {hasPreviousStep && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => ctx.trigger('[TRIGGER]_PREV')}
          >
            Back
          </Button>
        )}
        <Button
          type="submit"
          className="disabled:opacity-50"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Continue
        </Button>
      </footer>
    </form>
  );
};

export const Step = () => {
  const ctx = useContext();
  const activeStepIndex = ctx.$activeStepIndex.use();

  return <StepForm key={activeStepIndex} />;
};
