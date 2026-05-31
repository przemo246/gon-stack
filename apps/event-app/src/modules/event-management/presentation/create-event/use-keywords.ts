import { useState } from 'react';
import { useWatch, type UseFormSetValue, type Control } from 'react-hook-form';
import { toast } from 'sonner';
import { suggestKeywords } from '../../integration/repository';
import { type FormValues } from './schema';

export const useKeywords = (
  control: Control<FormValues>,
  setValue: UseFormSetValue<FormValues>,
) => {
  const keywords = useWatch({ control, name: 'keywords' }) ?? [];
  const name = useWatch({ control, name: 'name' });
  const description = useWatch({ control, name: 'description' });
  const category = useWatch({ control, name: 'category' });

  const [keywordInput, setKeywordInput] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const addKeyword = (kw: string) => {
    const trimmed = kw.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setValue('keywords', [...keywords, trimmed]);
    }
    setKeywordInput('');
  };

  const removeKeyword = (kw: string) => {
    setValue(
      'keywords',
      keywords.filter((k) => k !== kw),
    );
  };

  const acceptSuggestion = (kw: string) => {
    addKeyword(kw);
    setAiSuggestions((prev) => prev.filter((s) => s !== kw));
  };

  const dismissSuggestion = (kw: string) => {
    setAiSuggestions((prev) => prev.filter((s) => s !== kw));
  };

  const handleSuggest = async () => {
    if (!name) {
      toast.error('Podaj najpierw nazwę wydarzenia.');
      return;
    }
    setIsSuggesting(true);
    const result = await suggestKeywords({ name, description, category });
    setIsSuggesting(false);
    if (result.code === 200 && 'keywords' in result) {
      setAiSuggestions(result.keywords.filter((k) => !keywords.includes(k)));
    } else {
      toast.error('Nie udało się wygenerować słów kluczowych.');
    }
  };

  return {
    keywords,
    keywordInput,
    setKeywordInput,
    aiSuggestions,
    isSuggesting,
    addKeyword,
    removeKeyword,
    acceptSuggestion,
    dismissSuggestion,
    handleSuggest,
  };
};
