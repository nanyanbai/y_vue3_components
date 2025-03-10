export interface MenuItem {
  icon?: string; // 图标
  i?: any; // 处理之后的图标
  name: string; // 名称
  index: string; // 唯一标识
  children?: MenuItem[]; // 子菜单
}
