import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons-vue";
import { camelToLine } from "./utils";

import yUI from "./components/";

import "./mock";

const app = createApp(App);

// 全局注册图标 一点性能损耗
for (const i in Icons) {
  // 注册全部组件
  app.component(`el-icon-${camelToLine(i)}`, (Icons as any)[i]);
}

app.use(router).use(ElementPlus).use(yUI).mount("#app");
