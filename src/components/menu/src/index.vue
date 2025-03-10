<template>
  <el-menu
    :default-active="defaultActive"
    :router="router"
    v-bind="$attrs"
    class="el-menu-vertical-demo"
  >
    <template v-for="(item, i) in data" :key="i">
      <el-menu-item
        v-if="!item[children] || !item[children].length"
        :index="item[index]"
      >
        <component
          v-if="item[icon]"
          :is="`el-icon-${camelToLine(item[icon])}`"
        />
        <span>{{ item[name] }}</span>
      </el-menu-item>

      <el-sub-menu
        v-if="item[children] && item[children].length"
        :index="item[index]"
      >
        <template #title>
          <component
            v-if="item[icon]"
            :is="`el-icon-${camelToLine(item[icon])}`"
          />
          <span>{{ item[name] }}</span>
        </template>
        <el-menu-item
          v-for="(item1, index1) in item[children]"
          :key="index1"
          :index="item1[index]"
        >
          <component
            v-if="item1.icon"
            :is="`el-icon-${camelToLine(item1.icon)}`"
          />
          <span>{{ item1[name] }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

import { camelToLine } from "../../../utils";

defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  // 默认选中菜单
  defaultActive: {
    type: String,
    default: "",
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false,
  },

  // 这样做的话，如果后台的数据字段名和组件的默认字段名不一致，就可以通过这个属性来修改
  // <y-menu :data="data" :name="对应后台数据字段名" :icon="对应后台数据字段名" :index="对应后台数据字段名" :children="对应后台数据字段名"></y-menu>on" :index="index" :children="children"></y-menu>
  // 键名
  name: {
    type: String,
    default: "name",
  },
  icon: {
    type: String,
    default: "icon",
  },
  // 菜单标 识的 键名
  index: {
    type: String,
    default: "index",
  },
  // 子菜单的 键名
  children: {
    type: String,
    default: "children",
  },
});
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

svg {
  margin-right: 8px;
}
</style>
