import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Container from "./../components/layout/src/index.vue";
import Home from "../pages/home/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Container",
    component: Container,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/chooseIcon",
        name: "ChooseIcon",
        component: () => import("../pages/chooseIcon/index.vue"),
      },

      {
        path: "/chooseArea",
        name: "ChooseArea",
        component: () => import("../pages/chooseArea/index.vue"),
      },

      {
        path: "/menu",
        name: "Menu",
        component: () => import("../pages/menu/index.vue"),
      },
      {
        path: "/form",
        name: "Form",
        component: () => import("../pages/form/index.vue"),
      },
      {
        path: "/table",
        name: "Table",
        component: () => import("../pages/table/index.vue"),
      },
      {
        path: "/echarts",
        name: "Echarts",
        component: () => import("../pages/echarts/index.vue"),
      },
      {
        path: "/contextMenu",
        name: "ContextMenu",
        component: () => import("../pages/contextMenu/index.vue"),
      },
      {
        path: "/meeting",
        name: "Meeting",
        component: () => import("../pages/meeting/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
