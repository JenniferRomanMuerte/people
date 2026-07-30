// defineConfig viene de vitest para poder declarar aquí también la sección `test`
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        // Las variables y mixins quedan disponibles en todos los SCSS sin importarlos.
        // Se excluyen los propios archivos de abstracts para no crear una dependencia circular.
        additionalData: (source: string, filename: string) => {
          const normalized = filename.replace(/\\/g, '/');
          if (normalized.includes('/styles/abstracts/')) return source;
          return `@use "@/styles/abstracts" as *;\n${source}`;
        },
      },
    },
  },

  server: {
    port: 5173,
    // Falla en vez de saltar a otro puerto: así la URL siempre es la misma
    strictPort: true,
    // Solo escucha en local a propósito. Con `host: true` Vite se abre en
    // 0.0.0.0 y, si hay WSL en marcha, Windows levanta un wslrelay sobre ese
    // puerto que se cuela en localhost:5173: el navegador deja de hablar con
    // Vite, la recarga en caliente se rompe y no se arregla recargando.
    // Para probar desde el móvil está `npm run dev:host`.
    host: 'localhost',
  },

  build: {
    // Las imágenes pequeñas se incrustan como base64; las grandes se sirven como archivo
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    // Los tests del formulario escriben carácter a carácter y cada tecla
    // repinta la página. Con las suites corriendo en paralelo, el límite por
    // defecto de 5s se queda corto y fallan por tiempo, no por lógica.
    testTimeout: 20000,
  },
});
