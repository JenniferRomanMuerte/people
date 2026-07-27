import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';

// Tipografías autoalojadas: sin peticiones a Google, así la web no envía
// datos de quien la visita a servidores de terceros. Es lo que declara la
// política de cookies.
import '@fontsource/zilla-slab/400.css';
import '@fontsource/zilla-slab/500.css';
import '@fontsource/zilla-slab/700.css';
// Cursiva real, para las citas destacadas
import '@fontsource/zilla-slab/400-italic.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/caveat/700.css';
import '@fontsource-variable/open-sans';

import './styles/main.scss';

export const createRoot = ViteReactSSG({ routes });
