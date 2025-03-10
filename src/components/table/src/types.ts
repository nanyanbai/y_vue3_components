export interface TableOptions {
  label: string; // 表头
  prop: string; // 对应字段名称
  width?: string | number; // 列宽
  align?: "left" | "center" | "right"; // 对齐方式
  slot?: string; // 自定义列表模板名称
  action?: boolean; // 是否是操作列
  editable?: boolean; // 是否可编辑的单元格
}
