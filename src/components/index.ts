import type { App } from "vue";

import chooseArea from "./chooseArea";
import chooseIcon from "./chooseIcon";
import menu from "./menu";
import form from "./form";
import table from "./table";
import contextMenu from "./contextMenu";
import echarts from "./echarts";

const components = [
  chooseArea,
  chooseIcon,
  menu,
  form,
  table,
  echarts,
  contextMenu,
];

export default {
  install(app: App) {
    components.map((item) => {
      app.use(item);
    });
  },
};
