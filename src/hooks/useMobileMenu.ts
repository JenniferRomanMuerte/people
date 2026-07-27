import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Estado del menú de navegación en móvil.
 * Se encarga de cerrarlo al cambiar de página, al pulsar Escape y de bloquear
 * el scroll del fondo mientras está abierto.
 */
export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((previo) => !previo), []);

  // Al navegar a otra página el menú debe cerrarse solo
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Escape cierra el menú, que es lo que espera cualquiera al pulsarlo
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Evita que la página de debajo se desplace con el menú abierto
  useEffect(() => {
    if (!isOpen) return;

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflowPrevio;
    };
  }, [isOpen]);

  return { isOpen, open, close, toggle };
};
