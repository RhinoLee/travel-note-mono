import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import vue from '@astrojs/vue';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [vue({
    appEntrypoint: '/src/pages/_app'
  }), tailwind()]
});