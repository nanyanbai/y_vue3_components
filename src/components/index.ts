import type { App } from "vue";

import chooseArea from "./chooseArea";
import chooseIcon from "./chooseIcon";
import menu from "./menu";
import form from "./form";
import table from "./table";
import contextMenu from "./contextMenu";
import echarts from "./echarts";
import meeting from "./meeting";

const components = [
  chooseArea,
  chooseIcon,
  menu,
  form,
  table,
  echarts,
  contextMenu,
  meeting,
];

export default {
  install(app: App) {
    components.map((item) => {
      app.use(item);
    });
  },
};
