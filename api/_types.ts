/**
 * Tipos mínimos del runtime de funciones de Vercel.
 *
 * Se declaran aquí en lugar de instalar `@vercel/node`: ese paquete arrastra
 * el CLI entero como dependencia (y con él una quincena de avisos de
 * seguridad) cuando lo único que se necesita son estas dos interfaces.
 * El archivo empieza por guion bajo para que Vercel no lo publique como
 * endpoint.
 */

export interface VercelRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  query: Record<string, string | string[]>;
}

export interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}
