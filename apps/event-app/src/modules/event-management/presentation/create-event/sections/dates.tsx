import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type FormValues } from '../schema';
import { Field, inputCls } from '../field';

// ── Types ──────────────────────────────────────────────────────────────────────

type Props = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
};

// ── Component ──────────────────────────────────────────────────────────────────

export const DatesSection = ({ register, errors }: Props) => (
  <section id="dates" className="flex flex-col gap-6 scroll-mt-20">
    <div className="flex items-baseline gap-3 pb-4 border-b border-hairline">
      <span className="mono-label">02</span>
      <h2 className="subsection-heading text-ink">Termin</h2>
    </div>

    <Field
      label="Data i godzina rozpoczęcia"
      error={errors.startDateTime?.message}
      htmlFor="startDateTime"
    >
      <input
        id="startDateTime"
        type="datetime-local"
        {...register('startDateTime')}
        className={inputCls(!!errors.startDateTime)}
      />
    </Field>

    <Field label="Data i godzina zakończenia" htmlFor="endDateTime" optional>
      <input
        id="endDateTime"
        type="datetime-local"
        {...register('endDateTime')}
        className={inputCls()}
      />
    </Field>
  </section>
);
