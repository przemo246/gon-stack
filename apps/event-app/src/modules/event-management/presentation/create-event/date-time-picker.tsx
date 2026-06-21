import DatePicker, { registerLocale } from 'react-datepicker';
import { pl } from 'date-fns/locale';
import { isValid } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import './date-time-picker.css';
import { inputCls } from './field';

registerLocale('pl', pl);

// ── Types ──────────────────────────────────────────────────────────────────────

type Props = {
  value?: string;
  onChange: (iso: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  id?: string;
};

// ── Helpers ────────────────────────────────────────────────────────────────────

const toDate = (iso?: string): Date | null => {
  if (!iso) return null;
  const d = new Date(iso);
  return isValid(d) ? d : null;
};

// ── Component ──────────────────────────────────────────────────────────────────

export const DateTimePicker = ({
  value,
  onChange,
  onBlur,
  hasError,
  id,
}: Props) => {
  const handleChange = (date: Date | null) => {
    onChange(date ? date.toISOString() : '');
  };

  return (
    <DatePicker
      id={id}
      selected={toDate(value)}
      onChange={handleChange}
      onBlur={onBlur}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="Godzina"
      dateFormat="dd/MM/yyyy HH:mm"
      locale="pl"
      calendarStartDay={1}
      placeholderText="dd/mm/rrrr gg:mm"
      className={inputCls(hasError)}
      wrapperClassName="block w-full"
      popperClassName="dp-popper"
      popperPlacement="bottom-start"
      shouldCloseOnSelect={false}
    />
  );
};
