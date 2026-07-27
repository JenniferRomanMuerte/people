import type { ChangeEvent } from 'react';
import './Input.scss';

interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}

const Input = ({
  id,
  name,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  error,
  autoComplete,
  placeholder,
}: Props) => {
  const idError = `${id}-error`;

  return (
    <div className="input">
      <label className="input__etiqueta" htmlFor={id}>
        {label}
        {required && (
          <span className="input__obligatorio" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        className={`input__campo${error ? ' input__campo--error' : ''}`}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        // Conecta el campo con su mensaje de error para los lectores de pantalla
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? idError : undefined}
      />

      {error && (
        <span className="input__error" id={idError} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
