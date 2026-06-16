import { useRef, useState, type DragEvent } from 'react';
import { cn } from '@/libs/ui/cn';
import { POSTER_ACCEPT } from '../../integration/repository';
import { useContext } from '../context';
import { Field } from './field';

export const PosterUpload = () => {
  const { $posterUrl, $posterStatus, $posterError, trigger } = useContext();
  const posterUrl = $posterUrl.use();
  const status = $posterStatus.use();
  const error = $posterError.use();

  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file?: File) => {
    if (!file) return;
    trigger('[TRIGGER]_UPLOAD_POSTER', { file });
  };

  const handleRemove = () => {
    trigger('[TRIGGER]_REMOVE_POSTER');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDragging(false);
    if (status === 'uploading') return;
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <Field
      label="Plakat wydarzenia"
      htmlFor="poster"
      error={error ?? undefined}
      optional
    >
      <input
        ref={inputRef}
        id="poster"
        type="file"
        accept={POSTER_ACCEPT}
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {posterUrl ? (
        <div className="relative overflow-hidden rounded-xs border border-hairline">
          <img
            src={posterUrl}
            alt="Podgląd plakatu"
            className="h-48 w-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded-pill bg-canvas/90 px-3 py-1 text-xs font-medium text-ink shadow-sm backdrop-blur-sm hover:opacity-80 transition-opacity"
          >
            Usuń
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          disabled={status === 'uploading'}
          className={cn(
            'flex h-48 w-full flex-col items-center justify-center gap-2 rounded-xs border border-dashed bg-canvas px-4 text-center transition-colors',
            'disabled:cursor-not-allowed',
            dragging
              ? 'border-primary bg-primary/5'
              : error
                ? 'border-coral/60'
                : 'border-hairline hover:border-primary',
          )}
        >
          {status === 'uploading' ? (
            <span className="text-sm text-muted">Przesyłanie…</span>
          ) : (
            <>
              <span className="text-sm font-medium text-ink">
                Przeciągnij plik lub kliknij, aby wybrać
              </span>
              <span className="text-xs text-muted">
                JPG, PNG, WEBP lub AVIF · maks. 5 MB
              </span>
            </>
          )}
        </button>
      )}
    </Field>
  );
};
