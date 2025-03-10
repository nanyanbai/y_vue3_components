<template>
  <div class="header">
    <span @click="toggle">
      <el-icon-expand v-if="collapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  collapse: boolean;
}>();

const emits = defineEmits(["update:collapse"]);

const toggle = () => {
  // 需要修改父组件的collapse属性
  emits("update:collapse", !props.collapse);
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 16px;
 
}

svg {
  cursor: pointer;
}
</style>
