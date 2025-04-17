import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],

  server: {
    port: 5174,
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
