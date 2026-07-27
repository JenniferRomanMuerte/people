import { useQuickExit } from '@/hooks/useQuickExit';
import './QuickExit.scss';

/**
 * Botón fijo de salida rápida.
 * Está en todas las páginas y siempre visible para que se pueda abandonar
 * la web de un solo clic si alguien se acerca.
 */
const QuickExit = () => {
  const { exit } = useQuickExit();

  return (
    <button
      className="quick-exit"
      type="button"
      onClick={exit}
      aria-label="Salir rápidamente de esta web e ir a Google"
    >
      <span className="quick-exit__icono" aria-hidden="true">
        ✕
      </span>
      <span className="quick-exit__texto">Salir</span>
    </button>
  );
};

export default QuickExit;
