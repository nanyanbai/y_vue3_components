<template>
  <div class="container">
    <y-table
      border
      isEditRow
      v-model:editRowIndex="editRowIndex"
      :data="tableData"
      :options="options"
      selectable
      element-loading-text="加载中..."
      pagination
      paginationAlign="center"
      :total="total"
      :currentPage="current"
      :pageSize="pageSize"
      @confirm="confirm"
      @cancel="cancel"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      @selection-change="selectionChange"
    >
      <template #date="{ scope }">
        <el-icon-timer />
        {{ scope.row.date }}
      </template>
      <template #name="{ scope }">
        <el-tag>{{ scope.row.name }}</el-tag>
      </template>

      <template #editCell="{ scope }">
        <el-button size="small" type="primary" @click="handleEdit(scope.row)">
          保存
        </el-button>
        <el-button size="small" type="primary" @click="handleEdit(scope.row)">
          取消
        </el-button>
      </template>

      <template #action="{ scope }">
        <el-button size="small" type="primary" @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button size="small" type="danger">删除</el-button>
      </template>

      <template #editRow="{ scope }">
        <el-button size="small" type="primary" @click="handleEdit(scope.row)">
          确认
        </el-button>
        <el-button size="small" type="danger">取消</el-button>
      </template>
    </y-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { TableOptions } from "../../components/table/src/types";

import axios from "axios";

// 表格配置
const options: TableOptions[] = [
  {
    label: "日期",
    prop: "date",
    align: "center",
    slot: "date",
    editable: true,
  },
  {
    label: "姓名",
    prop: "name",
    align: "center",
    slot: "name",
  },
  {
    label: "地址",
    prop: "address",
    align: "center",
    editable: true,
  },
  {
    label: "操作",
    prop: "action",
    align: "center",
    action: true,
  },
];

const tableData = ref([]);
const editRowIndex = ref<string>("");
const current = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);

onMounted(() => {
  getData();
});

const getData = () => {
  axios
    .post("/api/list", {
      current: current.value,
      pageSize: pageSize.value,
    })
    .then((res: any) => {
      tableData.value = res.data.data.rows;
      total.value = res.data.data.total;
    });
};

const confirm = (scope: any) => {
  console.log("父组件", scope);
};

const cancel = (scope: any) => {
  console.log("父组件", scope);
};

const handleEdit = (scope: any) => {
  // console.log(scope);
  editRowIndex.value = "edit";
};

const selectionChange = (val: any) => {
  console.log(val);
};

const sizeChange = (val: number) => {
  pageSize.value = val;
  getData();
};

const currentChange = (val: number) => {
  current.value = val;
  getData();
};
</script>

<style scoped></style>
