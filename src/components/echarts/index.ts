import type { App } from "vue";
import echarts from "./src/index.vue";
export default {
  install(app: App) {
    app.component("y-echarts", echarts);
  },
};
