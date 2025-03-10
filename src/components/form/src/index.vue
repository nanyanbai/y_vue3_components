<template>
  <el-form
    v-if="model"
    ref="form"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in options"
        :key="index"
        :span="item.span || 24"
        :offset="item.offset || 0"
      >
        <el-form-item
          v-if="!isHidden(item)"
          :label="item.label"
          :prop="item.prop"
        >
          <template v-if="item.render">
            <component :is="item.render" />
          </template>

          <!-- 单独处理上传 -->
          <el-upload
            v-if="item.type === 'upload'"
            v-bind="item.uploadAttrs"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :on-success="onSuccess"
            :on-error="onError"
            :on-progress="onProgress"
            :on-change="onChange"
            :on-exceed="onExceed"
            :before-remove="beforeRemove"
            :before-upload="beforeUpload"
            :http-request="httpRequest"
          >
            <slot name="uploadArea"></slot>
            <slot name="uploadTip"></slot>
          </el-upload>
          <component
            :is="`el-${item.type}`"
            v-model="model[item.prop!]"
            v-bind="item.attrs"
            v-on="item.events || {}"
            :disabled="isDisabled(item)"
            :placeholder="item.placeholder || `请输入${item.label}`"
          >
            <template v-if="item.children && item.children.length">
              <component
                v-for="(child, i) in item.children"
                :key="i"
                :is="`el-${child.type}`"
                :label="child.label"
                :value="child.value"
              />
            </template>
          </component>
        </el-form-item>
      </el-col>

      <!-- 操作按钮插槽 -->
      <el-col v-if="$slots.action" :span="24">
        <slot name="action" :form="form" :model="model"></slot>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, type PropType } from "vue";
import type { FormOptions, FormInstance } from "./types/types";
import cloneDeep from "lodash/cloneDeep";

const props = defineProps({
  // 表单配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function,
  },
});

const emits = defineEmits([
  "on-preview",
  "on-remove",
  "on-success",
  "on-error",
  "on-progress",
  "on-change",
  "on-exceed",
  "before-remove",
  "before-upload",
]);

const model = ref<any>(null);
const rules = ref<any>(null);
const form = ref<FormInstance | null>(null);

// 初始化表单
const initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};

    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value;
      r[item.prop!] = item.rules;
    });
    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
  }
};

onMounted(() => {
  initForm();
});

const isHidden = (item: FormOptions) => {
  return typeof item.hidden === "function" ? item.hidden() : item.hidden;
};

const isDisabled = (item: FormOptions) => {
  return typeof item.disabled === "function" ? item.disabled() : item.disabled;
};

/**
 *  上传组件的 相关事件
 */
const onPreview = (file: File) => {
  emits("on-preview", file);
};

const onRemove = (file: File, fileList: FileList) => {
  emits("on-remove", { file, fileList });
};

const onSuccess = (response: any, file: File, fileList: FileList) => {
  // 传图片成功  给表单赋值
  const uploadItem = props.options.find((item) => item.type === "upload")!;
  model.value[uploadItem.prop!] = { response, file, fileList };
  emits("on-success", { response, file, fileList });
};

const onError = (err: any, file: File, fileList: FileList) => {
  emits("on-error", { err, file, fileList });
};

const onProgress = (event: any, file: File, fileList: FileList) => {
  emits("on-progress", { event, file, fileList });
};

const onChange = (file: File, fileList: FileList) => {
  emits("on-change", { file, fileList });
};

const onExceed = (files: File, fileList: FileList) => {
  emits("on-exceed", { files, fileList });
};

const beforeRemove = (file: File, fileList: FileList) => {
  emits("before-remove", { file, fileList });
};

const beforeUpload = (file: File) => {
  emits("before-upload", file);
};

// 监听父组件传递进来的options变化
watch(
  () => props.options,
  () => {
    initForm();
  },
  { deep: true }
);
</script>

<style scoped></style>
