import { Brand } from '@repo/type-beast/brand';
import { Prettify } from '@repo/type-beast/prettify';

export type StepId = Brand<number, 'StepId'>;
export type StepKey = Brand<string, 'StepKey'>;
export type QuestionId = Brand<number, 'QuestionId'>;
export type QuestionKey = Brand<string, 'QuestionKey'>;

export type Constraints = {
  min: number;
  max: number;
  required: boolean;
};

type QuestionVariant<
  TType extends string,
  TValue extends string | number,
  TRest extends Record<string, unknown> = Record<never, never>,
> = Prettify<
  {
    id: QuestionId;
    key: QuestionKey;
    type: TType;
    label: string;
    min: number;
    max: number;
    required: boolean;
    value: TValue;
  } & TRest
>;

export type Question =
  | QuestionVariant<'numeric', number>
  | QuestionVariant<
      'select',
      string,
      { options: { value: string; label: string }[] }
    >
  | QuestionVariant<'text', string>
  | QuestionVariant<'slide', number>;

export type Step = {
  id: StepId;
  key: StepKey;
  label: string;
  description: string;
  questions: Question[];
};

export type Answers = Record<string, string | number>;
