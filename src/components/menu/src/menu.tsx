// tsx jsx 的组件对应递归比较合适
import { defineComponent, type PropType, useAttrs } from "vue";
import type { MenuItem } from "./types";
import * as Icons from "@element-plus/icons-vue";

import "./styles/index.scss";

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<MenuItem[]>,
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
  },

  setup(props) {
    // console.log(props.data,'data');

    // 封装渲染无限层级菜单的方法
    let renderMenu = (data: any[]) => {
      return data.map((item: any) => {
        // 每个菜单的图标
        item.i = (Icons as any)[item[props.icon!]];
        // 处理sub-menu的插槽
        let slots = {
          title: () => {
            return (
              <>
                <item.i />
                <span>{item[props.name]}</span>
              </>
            );
          },
        };

        // 递归渲染children
        if (item[props.children] && item[props.children].length) {
          return (
            <el-sub-menu index={item[props.index]} v-slots={slots}>
              {renderMenu(item[props.children])}
            </el-sub-menu>
          );
        }

        // 正常渲染普通菜单
        return (
          <el-menu-item index={item[props.index]}>
            <item.i />
            <span>{item[props.name]}</span>
          </el-menu-item>
        );
      });
    };

    let attrs = useAttrs();

    return () => {
      return (
        <el-menu
          class="menu-icon-svg"
          default-active={props.defaultActive}
          router={props.router}
          {...attrs}
        >
          {renderMenu(props.data)}
        </el-menu>
      );
    };
  },
});
