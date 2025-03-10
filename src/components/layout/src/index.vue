<template>
  <el-container>
    <el-aside width="auto">
      <nav-side v-model:collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="isCollapse" />
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

import NavSide from "./navSide/index.vue";
import NavHeader from "./navHeader/index.vue";

const isCollapse = ref(false);
</script>

<style scoped>
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}

.main {
  background: rgb(242, 243, 245);
}
</style>
