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
    // Expone el servidor en la red local para poder abrir la web desde el móvil
    // y comprobar el diseño responsive en un dispositivo real
    host: true,
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
  },
});
