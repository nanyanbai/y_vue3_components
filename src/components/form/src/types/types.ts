// 可配置的表单

import type { CSSProperties, VNode } from "vue";
import type { RuleItem } from "./rules";

import type { ValidateFieldsError } from "async-validator";

interface Callback {
  (isValid: boolean, invalidFields?: ValidateFieldsError): void;
}

export interface FormOptions {
  // 表单项显示名的元
  type:
    | "input"
    | "input-number"
    | "cascader "
    | "checkbox"
    | "checkbox-group"
    | "checkbox-button"
    | "color-picker"
    | "date-picker"
    | "input"
    | "input-number"
    | "radio"
    | "radio-group"
    | "radio-button"
    | "rate"
    | "select"
    | "option"
    | "slider"
    | "switch"
    | "time-picker"
    | "transfer"
    | "upload";
  // 表单项的值
  value?: any;
  // 表单项的label
  label?: string;
  // 表单的标
  prop?: string;
  // 表单项的验证规则
  rules?: RuleItem;
  // 表单项的占位符
  placeholder?: string;
  // 表单元素 特有的 属性
  attrs?: {
    type?: "text" | "password" | "textarea";
    clearable?: boolean;
    showPassword?: boolean;
    // css 样式
    style?: CSSProperties;
    multiple?: boolean;
    readonly?: boolean;
  };

  // 表单项的子元素
  children?: FormOptions[];

  // 新增布局相关配置
  span?: number; // 栅格布局
  offset?: number;

  // 新增通用配置
  hidden?: boolean | (() => boolean); // 是否隐藏
  disabled?: boolean | (() => boolean); // 是否禁用

  // 新增自定义渲染
  render?: (h: any) => VNode;

  // 事件处理
  events?: Record<string, Function>;

  // 处理上传组件的 方法和属性
  uploadAttrs?: {
    action: string;
    headers?: object;
    method?: "post" | "put" | "patch";
    multiple?: boolean;
    data?: any;
    name?: string;
    withCredentials?: boolean;
    showFileList?: boolean;
    drag?: boolean;
    accept?: string;
    thumbnailMode?: boolean;
    fileList?: any[];
    listType?: "picture" | "text" | "picture-card";
    autoUpload?: boolean;
    disabled?: boolean;
    limit?: number;
  };
}

export interface ValidateFieldCallback {
  (message: string, invalidFields?: ValidateFieldsError): void;
}

export interface FormInstance {
  registerLabelWidth(width: number, oldWidth: number): void;
  deregisterLabelWidth(width: number): void;
  autoLabelWidth: string | undefined;
  emit: (evt: string, ...args: any[]) => void;
  labelSuffix: string;
  inline?: boolean;
  model?: Record<string, unknown>;
  size?: string;
  showMessage?: boolean;
  labelPosition?: string;
  labelWidth?: string;
  rules?: Record<string, unknown>;
  statusIcon?: boolean;
  hideRequiredAsterisk?: boolean;
  disabled?: boolean;
  validate: (callback?: Callback) => Promise<boolean>;
  resetFields: () => void;
  clearValidate: (props?: string | string[]) => void;
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void;
}
