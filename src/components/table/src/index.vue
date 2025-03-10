<template>
  <el-table
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-background="elementLoadingBackground"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    :data="tableData"
    v-bind="$attrs"
    @row-click="rowClick"
    @selection-change="selectionChange"

  >
    <el-table-column
      v-if="selectable"
      type="selection"
      width="60"
      align="center"
    />
    <el-table-column
      v-if="showIndex"
      label="序号"
      type="index"
      width="60"
      align="center"
    />
    <template v-for="item in tableOptions" :key="item.prop">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input size="small" v-model="scope.row[item.prop]" />
          </template>

          <template v-else>
            <template v-if="scope.$index + scope.column.id === currentEditCell">
              <div class="edit-cell">
                <span class="edit-input">
                  <el-input size="small" v-model="scope.row[item.prop]" />
                </span>
                <div @click.stop="clickEditCell">
                  <!-- 提供用户自定义插槽 -->
                  <span v-if="$slots.editCell" style="margin-left: 8px">
                    <slot name="editCell" :scope="scope"></slot>
                  </span>
                  <span v-else class="icons">
                    <el-icon-check class="check" @click="check(scope)" />
                    <el-icon-close class="close" @click="close(scope)" />
                  </span>
                </div>
              </div>
            </template>
            <template v-else>
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <span v-else>{{ scope.row[item.prop] }} </span>
              <component
                v-if="item.editable"
                :is="`el-icon-${camelToLine(editIcon)}`"
                class="edit"
                @click.stop="clickEdit(scope)"
              />
            </template>
          </template>
        </template>
      </el-table-column>
    </template>

    <el-table-column
      :label="actionOptions!.label"
      :align="actionOptions!.align"
      :width="actionOptions!.width"
    >
      <template #default="scope">
        <slot v-if="scope.row.rowEdit" name="editRow" :scope="scope"></slot>
        <slot v-else name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>

  <div
    v-if="pagination && !isLoading"
    class="pagination"
    :style="{ justifyContent: paginationAlignJustify }"
  >
    <el-pagination
      background
      :current-page="currentPageValue"
      :page-size="pageSizeValue"
      :page-sizes="pageSizes"
      layout="prev, pager, next"
      :total="total"
      @update:current-page="updateCurrentPage"
      @update:page-size="updatePageSize"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import type { PropType } from "vue";
import type { TableOptions } from "./types";
import { camelToLine } from "../../../utils";
import cloneDeep from "lodash/cloneDeep";

const props = defineProps({
  // 表格的配置
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  // 表格的 数据
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  // 是否显示序号
  showIndex: {
    type: Boolean,
    default: true,
  },
  // 表格选择
  selectable: {
    type: Boolean,
    default: false,
  },

  // 加载文案
  elementLoadingText: {
    type: String,
  },
  // 加载图标
  elementLoadingSpinner: {
    type: String,
  },
  // 背景遮罩的颜色
  elementLoadingBackground: {
    type: String,
  },
  // 加载Svg
  elementLoadingSvg: {
    type: String,
  },
  // 加载图标颜色
  elementLoadingSvgViewBox: {
    type: String,
  },
  // 可编辑单元格的图标
  editIcon: {
    type: String,
    default: "edit",
  },
  // 是否可以编辑行
  isEditRow: {
    type: Boolean,
    default: false,
  },
  // 编辑行按钮的标识
  editRowIndex: {
    type: String,
    default: "",
  },
  // 是否显示分页
  pagination: {
    type: Boolean,
    default: false,
  },
  // 显示分页的对齐方式
  paginationAlign: {
    type: String as PropType<"left" | "center" | "right">,
    default: "left",
  },
  // 当前为第几页
  currentPage: {
    type: Number,
    default: 1,
  },
  // 一页多少数据
  pageSize: {
    type: Number,
    default: 10,
  },
  // 每页的数据选项
  pageSizes: {
    type: Array as PropType<number[]>,
    default: [10, 20, 30, 40],
  },
  // 数据总数
  total: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits([
  "confirm",
  "cancel",
  "update:editRowIndex",
  "currentChange",
  "sizeChange",
  "selection-change"
]);

// 当前点击的单元格
const currentEditCell = ref<string>("");

// 拷贝一份表格的数据，防止子组件直接修改父组件传递过来的原数据
const tableData = ref<any[]>(cloneDeep(props.data));

// 拷贝一份按钮的标识，
const cloneEditRowIndex = ref<string>(props.editRowIndex);

const currentPageValue = ref(props.currentPage);
const pageSizeValue = ref(props.pageSize);

// 监听父组件传递过来的数据
watch(
  () => props.data,
  (newVal) => {
    tableData.value = cloneDeep(newVal);
    tableData.value.forEach((item) => {
      item.rowEdit = false;
    });
  },
  { deep: true }
);

// 监听父组件传递过来的按钮标识
watch(
  () => props.editRowIndex,
  (newVal) => {
    if (newVal) cloneEditRowIndex.value = newVal;
  }
);

watch(
  () => props.currentPage,
  (newVal) => {
    currentPageValue.value = newVal;
  }
);

watch(
  () => props.pageSize,
  (newVal) => {
    pageSizeValue.value = newVal;
  }
);

onMounted(() => {
  tableData.value.forEach((item) => {
    // 代表当前行是否可以编辑的状态
    item.rowEdit = false;
  });
});

// 过滤操作选项之后的表格配置
const tableOptions = computed(() => {
  return props.options.filter((item) => !item.action);
});

// 找出操作列
const actionOptions = computed(() => {
  return props.options.find((item) => item.action);
});

// 表格是否在加载中
const isLoading = computed(() => !props.data || !props.data.length);

// 和flex 布局结合的排列方式
const paginationAlignJustify = computed(() => {
  if (props.paginationAlign === "left") return "flex-start";
  else if (props.paginationAlign === "center") return "center";
  else return "flex-end";
});

const updateCurrentPage = (val: number) => {
  currentPageValue.value = val;
  emits("currentChange", val);
};

const updatePageSize = (val: number) => {
  pageSizeValue.value = val;
  emits("sizeChange", val);
};

const selectionChange = (val: any) => {
  emits("selection-change", val);
}

const clickEdit = (scope: any) => {
  // 一的标识
  currentEditCell.value = scope.$index + scope.column.id;
};

const clickEditCell = () => {
  currentEditCell.value = "";
};

// 点击每一行的
const rowClick = (row: any, column: any) => {
  // 判断当前点击的是否是 操作项的内容
  if (column.label === actionOptions.value!.label) {
    if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
      row.rowEdit = !row.rowEdit;
      // 重置其他数据的rowEdit
      tableData.value.forEach((item) => {
        if (item !== row) item.rowEdit = false;
      });
      // 要重置按钮的 标识
      if (!row.rowEdit) emits("update:editRowIndex", "");
    }
  }
};

const check = (scope: any) => {
  emits("confirm", scope);
};

const close = (scope: any) => {
  emits("cancel", scope);
};
</script>

<style scoped>
.edit {
  position: relative;
  top: 3px;
  left: 5px;
  cursor: pointer;
}

.edit-cell {
  display: flex;
  align-items: center;
}

.edit-input {
  flex: 1;
}

.icons {
  width: fit-content;
  cursor: pointer;
}

.edit-cell .check {
  margin-left: 8px;
  color: red;
}

.edit-cell .close {
  margin-left: 8px;
  color: green;
}

.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
}
</style>
