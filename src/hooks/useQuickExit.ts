import { useCallback } from 'react';

/** Sitio neutro al que se sale. Un buscador no levanta ninguna sospecha. */
const URL_SALIDA = 'https://www.google.com';

/**
 * Salida rápida de la web.
 *
 * Importante sobre sus límites: desde una página web no se puede borrar el
 * historial del navegador. Lo que sí se consigue es que la página actual no
 * quede registrada, usando `location.replace` en lugar de una navegación
 * normal, de modo que el botón "atrás" no devuelve a esta web.
 * La navegación anterior a esta visita sigue existiendo en el navegador.
 */
export const useQuickExit = () => {
  const exit = useCallback(() => {
    // Se limpia lo que esta web haya podido guardar en la sesión
    try {
      window.sessionStorage.clear();
    } catch {
      // Algunos navegadores lo bloquean en modo privado: no es motivo de fallo
    }

    // replace() sustituye la entrada actual del historial en vez de añadir una
    window.location.replace(URL_SALIDA);
  }, []);

  return { exit };
};
