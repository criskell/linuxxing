import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true
    }
  },
  redirects: {
    '/': '/en'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});