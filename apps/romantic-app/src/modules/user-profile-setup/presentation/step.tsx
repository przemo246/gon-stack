import { useForm } from 'react-hook-form';
import { Button } from '@/libs/ui/button';
import { Card } from '@/libs/ui/card';
import { Text } from '@/libs/ui/text';
import { useContext } from './context';
import { QuestionInput } from './question-input';

const StepForm = () => {
  const ctx = useContext();
  const activeStep = ctx.useActiveStep();
  const hasPreviousStep = ctx.useHasPreviousStep();
  const stepAnswers = ctx.useStepAnswers();

  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: stepAnswers,
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit((values) => {
        ctx.next(values);
      })}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Text.T4>{activeStep.label}</Text.T4>
        <Text.B2>{activeStep.description}</Text.B2>
      </div>

      {activeStep.questions.map((question) => {
        return (
          <Card key={question.key} className="flex flex-col gap-3">
            <Text.B2>{question.label}</Text.B2>

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
          <Button type="button" variant="secondary" onClick={ctx.prev}>
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
  const activeStepIndex = ctx.useActiveStepIndex();

  return <StepForm key={activeStepIndex} />;
};
