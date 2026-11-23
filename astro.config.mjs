import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://revisionhipoteca.es',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
