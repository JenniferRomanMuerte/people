import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

type Variante = 'primario' | 'secundario' | 'claro' | 'acento';

interface Props {
  children: ReactNode;
  /** Ruta interna: se renderiza como enlace de React Router */
  to?: string;
  /** URL externa o mailto: se renderiza como enlace normal */
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: Variante;
  disabled?: boolean;
  fullWidth?: boolean;
  /** Texto accesible cuando el contenido visible no basta para entender la acción */
  ariaLabel?: string;
}

const Button = ({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primario',
  disabled = false,
  fullWidth = false,
  ariaLabel,
}: Props) => {
  const clases = [
    'button',
    `button--${variant}`,
    fullWidth ? 'button--ancho-completo' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Enlace externo, mailto o tel
  if (href) {
    const esExterno = href.startsWith('http');

    return (
      <a
        className={clases}
        href={href}
        aria-label={ariaLabel}
        {...(esExterno ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  // Navegación interna
  if (to) {
    return (
      <Link className={clases} to={to} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={clases}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
