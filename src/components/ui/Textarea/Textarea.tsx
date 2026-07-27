import type { ChangeEvent } from 'react';
import './Textarea.scss';

interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  error?: string;
  rows?: number;
  maxLength?: number;
  placeholder?: string;
}

const Textarea = ({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  error,
  rows = 6,
  maxLength,
  placeholder,
}: Props) => {
  const idError = `${id}-error`;
  const idContador = `${id}-contador`;

  return (
    <div className="textarea">
      <label className="textarea__etiqueta" htmlFor={id}>
        {label}
        {required && (
          <span className="textarea__obligatorio" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <textarea
        className={`textarea__campo${error ? ' textarea__campo--error' : ''}`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={[error ? idError : null, maxLength ? idContador : null]
          .filter(Boolean)
          .join(' ') || undefined}
      />

      <div className="textarea__pie">
        {error ? (
          <span className="textarea__error" id={idError} role="alert">
            {error}
          </span>
        ) : (
          <span />
        )}

        {maxLength && (
          <span className="textarea__contador" id={idContador}>
            {value.length} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default Textarea;
