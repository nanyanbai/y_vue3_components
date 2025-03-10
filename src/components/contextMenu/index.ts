import type { App } from "vue";
import contextMenu from "./src/index.vue";

export default {
  install(app: App) {
    app.component("y-context-menu", contextMenu);
  },
};
