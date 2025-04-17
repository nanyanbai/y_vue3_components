import type { App } from "vue";
import meeting from "./src/index.vue";

export default {
  install(app: App) {
    app.component("y-meeting", meeting);
  },
};
