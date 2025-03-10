<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  <div class="y-choose-icon-dialog-body-height">
    <el-dialog
      :title="title"
      :model-value="visible"
      @update:model-value="emits('update:visible', $event)"
    >
      <div class="container">
        <div
          class="item"
          v-for="(item, index) in Object.keys(Icons)"
          :key="index"
          @click="handleClickItem(item)"
        >
          <div class="icon">
            <component :is="`el-icon-${camelToLine(item)}`"></component>
          </div>
          <div class="name">{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import * as Icons from "@element-plus/icons-vue";
import { camelToLine } from "../../../utils";
import { useCopy } from "../../../hooks/useCopy";

const props = defineProps<{
  title: string;
  visible: boolean;
}>();

const emits = defineEmits(["update:visible"]);

const handleClick = () => {
  emits("update:visible", !props.visible);
};

const handleClickItem = (item: string) => {
  const text = `<el-icon-${camelToLine(item)}  />`;

  useCopy(text);

  emits("update:visible", !props.visible);
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px 20px;
  .item {
    text-align: center;
    transition: all 0.3s ease-in-out;

    &:hover {
      cursor: pointer;
      color: #409eff;
    }

    .icon {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .name {
      font-size: 16px;
      color: #999;
    }
  }
}
</style>
