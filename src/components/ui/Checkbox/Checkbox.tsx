import type { ChangeEvent, ReactNode } from 'react';
import './Checkbox.scss';

interface Props {
  id: string;
  name: string;
  /** Puede llevar enlaces dentro, por eso admite nodos y no solo texto */
  label: ReactNode;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const Checkbox = ({ id, name, label, checked, onChange, required = false, error }: Props) => {
  const idError = `${id}-error`;

  return (
    <div className="checkbox">
      <div className="checkbox__fila">
        <input
          className="checkbox__campo"
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? idError : undefined}
        />
        <label className="checkbox__etiqueta" htmlFor={id}>
          {label}
        </label>
      </div>

      {error && (
        <span className="checkbox__error" id={idError} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Checkbox;
