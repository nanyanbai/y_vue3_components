<template>
  <div class="container">
    <div style="margin: 16px 0">
      <el-button type="primary" size="small" @click="toggleShowAddress">
        切换地址显示
      </el-button>
    </div>

    <y-form
      :options="options"
      label-suffix="："
      label-width="90px"
      @on-preview="handlePreview"
      @on-success="handleSuccess"
    >
      <template #uploadArea>
        <el-button type="primary" size="small">上传</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc; font-size: 13px; margin-left: 10px">
          jpg/png files with a size less than 500KB.
        </div>
      </template>

      <!-- 操作 -->
      <template #action="scope">
        <el-button type="primary" size="small" @click="submitForm(scope)">
          提交
        </el-button>
        <el-button size="small" @click="resetForm(scope)">重置</el-button>
      </template>
    </y-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type {
  FormOptions,
  FormInstance,
} from "../../components/form/src/types/types";
import { ElMessage } from "element-plus";

interface Scope {
  form: FormInstance;
  model: any;
}

const showAddress = ref(false);

// 切换地址显示状态
const toggleShowAddress = () => {
  showAddress.value = !showAddress.value;
};

const options: FormOptions[] = [
  {
    type: "input",
    label: "用户名",
    prop: "username",
    placeholder: "请输入用户名",
    value: "",
    span: 12,
    rules: [
      {
        required: true,
        message: "请输入姓名",
        trigger: "blur",
      },
      {
        min: 3,
        max: 15,
        message: "用户名长度在3到15个字符之间",
        trigger: "blur",
      },
    ],
    attrs: {
      type: "text",
      clearable: true,
    },
  },
  {
    type: "input-number",
    label: "年龄",
    prop: "age",
    value: "",
    span: 12,
    rules: [
      {
        required: true,
        message: "请输入年龄",
        trigger: "blur",
      },
    ],
    attrs: {
      style: {
        width: "100%",
      },
      clearable: true,
    },
  },

  {
    type: "input",
    label: "密码",
    prop: "password",
    value: "",
    span: 12,
    rules: [
      {
        required: true,
        message: "请输入密码",
        trigger: "blur",
      },
      {
        min: 6,
        max: 15,
        message: "密码长度在6到15个字符之间",
        trigger: "blur",
      },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },

  {
    type: "select",
    label: "技能",
    prop: "skill",
    value: "",
    span: 12,
    placeholder: "请选择技能",
    rules: [
      {
        required: true,
        message: "请选择技能",
        trigger: "change",
      },
    ],
    events: {
      change: (value: any) => {
        console.log(value);
      },
    },
    attrs: {
      multiple: true,
      style: {
        width: "100%",
      },
    },
    children: [
      {
        type: "option",
        label: "Vue",
        value: "vue",
      },
      {
        type: "option",
        label: "React",
        value: "react",
      },
      {
        type: "option",
        label: "Angular",
        value: "angular",
      },
    ],
  },

  {
    type: "checkbox-group",
    label: "爱好",
    prop: "hobbies",
    value: [],
    span: 12,
    rules: [
      {
        required: true,
        message: "请选择爱好",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "checkbox",
        label: "篮球",
        value: "basketball",
      },
      {
        type: "checkbox",
        label: "足球",
        value: "football",
      },
      {
        type: "checkbox",
        label: "羽毛球",
        value: "badminton",
      },
    ],
  },

  {
    type: "radio-group",
    label: "性别",
    prop: "gender",
    value: [],
    span: 12,
    rules: [
      {
        required: true,
        message: "请选择性别",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "radio",
        label: "男",
        value: "male",
      },
      {
        type: "radio",
        label: "女",
        value: "female",
      },
    ],
  },

  // 评分
  {
    type: "rate",
    label: "评分",
    prop: "rate",
    value: 3,
    span: 12,
    rules: [
      {
        required: true,
        message: "请选择评分",
        trigger: "change",
      },
    ],
    attrs: {},
  },

  {
    type: "input",
    label: "内容",
    prop: "content",
    value: "xxxxxxxxxxxxxxxxxxxxx",
    disabled: true,
    rules: [
      {
        required: true,
        message: "请输入内容",
        trigger: "blur",
      },
    ],
    attrs: {
      type: "textarea",
      readonly: true,
    },
  },
  {
    type: "input",
    label: "地址",
    prop: "address",
    value: "",
    placeholder: "请输入地址",
    hidden: () => !showAddress.value, // 使用函数动态控制显示/隐藏
  },

  {
    type: "upload",
    label: "上传",
    prop: "picture",
    uploadAttrs: {
      action: "https://jsonplaceholder.typicode.com/posts/",
      multiple: true,
      limit: 3,
    },
    rules: [
      {
        required: true,
        message: "请选择上传",
        trigger: "change",
      },
    ],
  },
];

const handlePreview = (file: any) => {
  console.log(file);
};

const handleSuccess = (val: any) => {
  console.log("success");
  console.log(val);
};

const submitForm = (scope: Scope) => {
  console.log(scope);
  scope.form.validate((valid: boolean) => {
    if (valid) {
      console.log(scope.model);
      ElMessage.success("提交成功");
    } else {
      ElMessage.error("提交失败");
    }
  });
};
const resetForm = (scope: Scope) => {
  scope.form.resetFields();
};
</script>

<style scoped></style>
