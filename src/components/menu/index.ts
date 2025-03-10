import type { App } from "vue";
import menu from "./src/index.vue";
import infiniteMenu from "./src/menu";

export default {
  install(app: App) {
    app.component("y-menu", menu);
    app.component("y-infinite-menu", infiniteMenu);
  },
};
