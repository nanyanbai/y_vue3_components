<template>
  <y-menu
    router
    :default-active="$route.path"
    :data="data"
    :collapse="collapse"
  />
</template>

<script setup lang="ts">
defineProps<{
  collapse: boolean;
}>();

const data = [
  {
    icon: "HomeFilled",
    name: "首页",
    index: "/",
  },
  {
    icon: "Check",
    name: "图标选择器",
    index: "/chooseIcon",
  },
  {
    icon: "Place",
    name: "省市区选择",
    index: "/chooseArea",
  },
  {
    icon: "Menu",
    name: "导航菜单",
    index: "/menu",
  },
  {
    icon: "Setting",
    name: "表单",
    index: "/form",
  },
  {
    icon: "Film",
    name: "表格",
    index: "/table",
  },
  {
    icon: "Histogram",
    name: "Echarts",
    index: "/echarts",
  },
  {
    icon: "Dish",
    name: "右键菜单",
    index: "/contextMenu",
  },
];
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
svg {
  margin-right: 8px;
}
</style>
