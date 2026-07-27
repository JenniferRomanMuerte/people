/**
 * Configuración base de las peticiones.
 * Todos los servicios pasan por aquí en lugar de llamar a fetch directamente.
 */
const API_URL = import.meta.env.VITE_API_URL ?? '/api';

const getHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

/** Error con el mensaje que el servidor haya querido mostrar a la persona usuaria */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const parseResponse = async <T>(res: Response): Promise<T> => {
  const texto = await res.text();
  const datos = texto ? JSON.parse(texto) : null;

  if (!res.ok) {
    // Si el servidor manda un mensaje entendible se usa ese; si no, uno genérico
    const mensaje =
      datos && typeof datos.message === 'string'
        ? datos.message
        : 'No se ha podido completar la operación.';
    throw new ApiError(mensaje, res.status);
  }

  return datos as T;
};

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const res = await fetch(`${API_URL}${endpoint}`, { headers: getHeaders() });
    return parseResponse<T>(res);
  },

  post: async <T>(endpoint: string, body: unknown): Promise<T> => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return parseResponse<T>(res);
  },
};
