import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lleva la vista al principio al cambiar de página.
 * Sin esto, al navegar desde la mitad de una página larga se entraría en la
 * siguiente a esa misma altura.
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 'instant' evita el desplazamiento animado, que aquí solo distrae
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
};
