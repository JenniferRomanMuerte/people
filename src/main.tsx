import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';

// Tipografías autoalojadas: sin peticiones a Google, así la web no envía
// datos de quien la visita a servidores de terceros.
import '@fontsource/zilla-slab/400.css';
import '@fontsource/zilla-slab/500.css';
import '@fontsource/zilla-slab/700.css';
import '@fontsource-variable/open-sans';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';

import './styles/main.scss';

export const createRoot = ViteReactSSG({ routes });
