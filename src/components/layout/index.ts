import type { App } from "vue";
import container from "./src/index.vue";

export default {
  install(app: App) {
    app.component("y-container", container);
  },
};
