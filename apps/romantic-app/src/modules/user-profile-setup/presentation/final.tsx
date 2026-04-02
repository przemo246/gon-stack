import { useContext } from './context';
import { Alert } from '@/libs/ui/alert';
import { Button } from '@/libs/ui/button';
import { Card } from '@/libs/ui/card';
import { Heading } from '@/libs/ui/heading';

export const Final = () => {
  const ctx = useContext();
  const steps = ctx.$steps.use();
  const isSaving = ctx.$isSaving.use();
  const isSaved = ctx.$isSaved.use();

  const summaryItems = steps.flatMap((step) =>
    step.questions.map((question) => {
      const answer =
        question.type === 'select'
          ? (question.options.find((option) => option.value === question.value)
              ?.label ?? question.value)
          : question.value;

      return {
        id: `${step.key}-${question.key}`,
        stepLabel: step.label,
        questionKey: question.key,
        answer,
      };
    }),
  );

  return (
    <div className="flex flex-col gap-5">
      <Heading level={4}>Here&apos;s your romantic vibe</Heading>
      <p className="b2">
        This is how we&apos;ll describe your relationship style in the game. You
        can change this later if you want.
      </p>

      <Card className="flex flex-col gap-3">
        <p className="l1">Full profile summary</p>
        <div className="max-h-80 overflow-y-auto pr-1">
          <ul className="flex flex-col gap-2.5">
            {summaryItems.map((item) => (
              <Card key={item.id} className="flex flex-col gap-2">
                <p className="c1">{item.stepLabel}</p>
                <p className="b3 capitalize">
                  {item.questionKey.replace(/[-_]+/g, ' ')}
                </p>
                <p className="b2 text-text-primary">
                  {typeof item.answer === 'string' && item.answer.trim()
                    ? item.answer
                    : typeof item.answer === 'number'
                      ? item.answer
                      : 'Not set'}
                </p>
              </Card>
            ))}
          </ul>
        </div>
      </Card>

      {isSaved && (
        <Alert variant="success" className="b2">
          Profile saved. You are ready to start playing.
        </Alert>
      )}

      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => ctx.trigger('[TRIGGER]_EDIT_ANSWERS')}
        >
          Edit answers
        </Button>
        <Button
          type="button"
          disabled={isSaving}
          onClick={() => ctx.trigger('[TRIGGER]_SAVE_ANSWERS')}
        >
          Save profile &amp; start playing
        </Button>
      </div>
    </div>
  );
};
